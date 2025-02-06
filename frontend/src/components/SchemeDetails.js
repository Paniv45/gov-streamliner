import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../style/SchemeDetails.css';
import Footer from './footer';

const SchemeDetails = () => {
  const { id } = useParams(); // Get the scheme ID from the URL
  const [scheme, setScheme] = useState(null); // Store scheme data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [uploadedImages, setUploadedImages] = useState({}); // Store uploaded images
  const [pdfGenerated, setPdfGenerated] = useState(false); // Track if PDF is generated
  const [matchingSchemes, setMatchingSchemes] = useState([]); // Similar schemes
  const navigate = useNavigate(); // To navigate between pages

  // Fetch scheme details when component mounts
  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        // Fetch the scheme details by ID
        const schemeResponse = await axios.get(`http://localhost:5000/api/scheme/${id}`);
        setScheme(schemeResponse.data);

        // Fetch matching schemes based on the scheme's tags
        const tags = schemeResponse.data.tags;
        const matchesResponse = await axios.get('http://localhost:5000/api/schemes/matches', {
          params: { tags }
        });
        setMatchingSchemes(matchesResponse.data);
      } catch (error) {
        console.error('Error fetching scheme details:', error);
        setError('Failed to load scheme details');
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchSchemeDetails();
  }, [id]);

  // Handle image upload for documents
  const handleImageUpload = (doc, file) => {
    setUploadedImages((prev) => ({ ...prev, [doc]: file }));
  };

  // Generate PDF function
  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    let isFirstPage = true; // Track if it's the first page

    const addImageToPdf = (file, docName) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (!isFirstPage) {
            doc.addPage(); // Add a new page only after the first one
          }
          doc.setFontSize(18);
          doc.text(docName, 10, 20); // Document name as heading
          doc.addImage(img, 'JPEG', 10, 30, 120, 120); // Full-page image
          isFirstPage = false; // After the first page, mark this as false
          resolve();
        };
      });
    };

    const processDocuments = async () => {
      try {
        const requiredDocs = scheme.docs_required || [];
        const tasks = requiredDocs.map(async (docName) => {
          const file = uploadedImages[docName];
          if (file) {
            await addImageToPdf(file, docName); // Add each image to a separate page
          }
        });

        await Promise.all(tasks); // Wait for all documents to be added
        if (tasks.length === 0) {
          alert('No documents uploaded to generate PDF.');
          return;
        }

        doc.save('Documents-Required.pdf'); // Save the PDF
        setPdfGenerated(true); // Notify the user
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF. Please try again.');
      }
    };

    processDocuments();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div className="scheme-details-container">
      <h1>{scheme.title}</h1>
      <div className="tags">
        <h2>Tags</h2>
        <div className="tags-container">
          {Array.isArray(scheme.tags) ? (
            scheme.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))
          ) : (
            <p>{scheme.tags}</p>
          )}
        </div>
      </div>

      <p><strong>Description:</strong> {scheme.desc}</p>
      <p><strong>Benefits:</strong> {scheme.benefits}</p>
      <p><strong>Eligibility:</strong> {scheme.eligibility}</p>

      {/* Application Process */}
      <div className="application-process">
        <h2>Application Process</h2>
        {Array.isArray(scheme.application_process) ? (
          <ol>
            {scheme.application_process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>{scheme.application_process}</p>
        )}
      </div>



      {/* Documents Required */}
      <div className="documents">
        <h2>Documents Required</h2>
        {scheme.docs_required && scheme.docs_required.length > 0 ? (
          <ul>
            {scheme.docs_required.map((doc, index) => (
              <li key={index}>
                <span>{doc}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(doc, e.target.files[0])}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents required for this scheme.</p>
        )}
      </div>



      {/* Generate PDF */}
      <button onClick={handleGeneratePdf} className="generate-pdf-button">
        Generate PDF
      </button>
      {pdfGenerated && <p>PDF has been successfully generated!</p>}



      <div className="recommendations">
        <h2>Top 5 Matching Schemes</h2>
        <ul>
          {matchingSchemes.length > 0 ? (
            matchingSchemes.map((similarScheme) => (
              <li key={similarScheme._id}>
                <button onClick={() => navigate(`/scheme/${similarScheme._id}`)}>
                  {similarScheme.title} (Match Score: {similarScheme.matchScore})
                </button>
              </li>
            ))
          ) : (
            <p>No matching schemes found.</p>
          )}
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SchemeDetails;

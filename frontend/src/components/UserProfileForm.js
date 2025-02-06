import React, { useState } from 'react';
import axios from 'axios';
import '../style/UserProfileForm.css';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    panCardNumber: '',
    aadhaarCardNumber: '',
    disabilityCertificateNumber: '',
    incomeCertificateNumber: '',
    panCard: null,
    aadhaarCard: null,
    disabilityCertificate: null,
    incomeCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('panCardNumber', formData.panCardNumber);
    formDataToSend.append('aadhaarCardNumber', formData.aadhaarCardNumber);
    if (formData.disabilityCertificateNumber) {
      formDataToSend.append('disabilityCertificateNumber', formData.disabilityCertificateNumber);
    }
    if (formData.incomeCertificateNumber) {
      formDataToSend.append('incomeCertificateNumber', formData.incomeCertificateNumber);
    }
    formDataToSend.append('panCard', formData.panCard);
    formDataToSend.append('aadhaarCard', formData.aadhaarCard);
    if (formData.disabilityCertificate) {
      formDataToSend.append('disabilityCertificate', formData.disabilityCertificate);
    }
    if (formData.incomeCertificate) {
      formDataToSend.append('incomeCertificate', formData.incomeCertificate);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="user-profile-form">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Form Fields */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
        <label>State:</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label>PAN Card Number:</label>
        <input
          type="text"
          name="panCardNumber"
          placeholder="PAN Card Number"
          value={formData.panCardNumber}
          onChange={handleChange}
          required
        />
        <label>Aadhaar Card Number:</label>
        <input
          type="text"
          name="aadhaarCardNumber"
          placeholder="Aadhaar Card Number"
          value={formData.aadhaarCardNumber}
          onChange={handleChange}
          required
        />
        <label>Disability Certificate Number (Optional):</label>
        <input
          type="text"
          name="disabilityCertificateNumber"
          placeholder="Disability Certificate Number"
          value={formData.disabilityCertificateNumber}
          onChange={handleChange}
        />
        <label>Income Certificate Number (Optional):</label>
        <input
          type="text"
          name="incomeCertificateNumber"
          placeholder="Income Certificate Number"
          value={formData.incomeCertificateNumber}
          onChange={handleChange}
        />
        <label>Upload PAN Card:</label>
        <input
          type="file"
          name="panCard"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          required
        />
        <label>Upload Aadhaar Card:</label>
        <input
          type="file"
          name="aadhaarCard"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          required
        />
        <label>Upload Disability Certificate (Optional):</label>
        <input
          type="file"
          name="disabilityCertificate"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
        <label>Upload Income Certificate (Optional):</label>
        <input
          type="file"
          name="incomeCertificate"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserProfileForm;

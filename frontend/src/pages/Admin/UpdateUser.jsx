import React, { useState } from 'react';
import useAuth from '../../hook/useAuth';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios directly for Cloudinary

const UpdateUser = () => {
  const { user } = useAuth();
  const userCredentials = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // State to manage form data
  const [formData, setFormData] = useState({
    name: userCredentials.name || '',
    email: userCredentials.email || '',
    gender: userCredentials.gender || 'Is not specified',
    address: userCredentials.address || 'Is not Provided',
    photoUrl: userCredentials.photoUrl || '',
    role: userCredentials.role || '',
    skills: userCredentials.skills || '',
    phone: userCredentials.phone || 'Is not Provide',
  });

  // Handler to update state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadPreset = "yoga-website"; // Replace with your preset name
      const cloudName = "degfccw8e"; // Replace with your Cloudinary cloud name

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await axios.post(cloudinaryUrl, formData);
        const photoUrl = response.data.secure_url;
        setFormData((prev) => ({ ...prev, photoUrl }));
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        toast.error("An error occurred while uploading the image.");
      }
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.put(
        `/update-user/${userCredentials._id}`,
        formData
      );

      if (response.status === 200) {
        toast.success('User information updated successfully!');
        setFormData(response.data);
        navigate("/dashboard/manage-user");
      } else {
        toast.error('Failed to update user information.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error("An error occurred while updating the user information.");
    }
  };

  return (
    <div className="update-user">
      <h2>Update User Information</h2>
      <form onSubmit={handleSubmit} className="update-user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="Is not specified">Not Specified</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        {/* Conditional fields for roles */}
        {formData.role === "instructor" && (
          <div className="form-group">
            <label htmlFor="skills">Skills:</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
            />
          </div>
        )}

        {formData.role === "admin" && (
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>

      <style jsx>{`
        .update-user {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .update-user h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .update-user-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          margin-bottom: 5px;
          font-weight: 600;
          color: #555;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .form-group textarea {
          resize: vertical;
        }
        .submit-btn {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default UpdateUser;

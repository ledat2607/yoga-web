import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hook/useAxiosFetch';
import { toast } from 'react-toastify';

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const axiosFetch = useAxiosFetch();

  // Fetch applications on component mount
  useEffect(() => {
    axiosFetch
      .get("/application")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, []);

  // Handler for accepting an application
  const handleAccept = (id, email, skill) => {
    axiosFetch
      .put("/update-by-application", { email, skill })
      .then(() => {
        toast.success("Application accepted successfully!");
        setApplications((prev) => prev.filter((app) => app._id !== id));
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        toast.error("Failed to update user.");
      });
  };

  // Handler for rejecting an application
  const handleReject = (id) => {
    axiosFetch
      .post(`/application/${id}/reject`)
      .then(() => {
        toast.success('Application rejected successfully!');
        setApplications((prev) => prev.filter((app) => app._id !== id));
      })
      .catch((err) => {
        console.error('Error rejecting application:', err);
        toast.error('Failed to reject application.');
      });
  };

  return (
    <div className="manage-application">
      <h2>Manage Applications</h2>
      {applications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Email đăng ký</th>
              <th>Kỹ năng</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.skill}</td>
                <td>
                  <button
                    onClick={() => handleAccept(app._id, app.email, app.skill)}
                  >
                    Chấp nhận
                  </button>
                  <button onClick={() => handleReject(app._id)}>Từ chối</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications available.</p>
      )}
      <style jsx>{`
        .manage-application {
          padding: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
        button {
          margin-right: 10px;
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          opacity: 0.9;
        }
        button:first-of-type {
          background-color: #28a745;
          color: white;
        }
        button:last-of-type {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ManageApplication;

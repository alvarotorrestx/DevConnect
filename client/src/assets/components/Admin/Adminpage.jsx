import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../subcomponents/Loading";
import useAuth from "../../../auth/useAuth";
import { axiosPrivate } from "../../../api/axios";

const Adminpage = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get("/api/users", {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth?.accessToken]);

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!userToDelete) return;

    try {
      const res = await axiosPrivate.delete(`/api/users/${userToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (res.status === 200 || res.status === 204) {
        setStatusMessage({
            type: "success",
            text: `User "${userToDelete.username}" deleted successfully.`,
          });
          fetchUsers();
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setStatusMessage({
        type: "error",
        text: "Failed to delete user.",
      });
    } finally {
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-primary">User Management</h2>


      {statusMessage && (
        <div
          className={`mb-4 p-3 rounded ${
            statusMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage.text}
        </div>
      )}
      
      {loading ? (
        <Loading />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-5 bg-base-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>
                <p className="text-lg font-medium mb-1">
                  {user.firstName} {user.lastName}
                </p>

                <p className="text-sm text-base-content/70 mb-1">
                  <strong>Username:</strong> {user.username}
                </p>

                <Link
                  to={`/profile/${user.username}`}
                  className="inline-block mt-2 text-sm text-primary hover:underline"
                >
                  View Profile
                </Link>
              </div>

              <button
                onClick={() => confirmDelete(user)}
                className="mt-4 text-sm text-red-600 hover:text-red-800 self-start"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-semibold text-center text-red-600 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-center mb-4">
              Are you sure you want to delete <strong>{userToDelete.username}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminpage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../subcomponents/Loading";
import useAuth from "../../../auth/useAuth";
import { axiosPrivate } from "../../../api/axios";
import { FaTrashAlt, FaUserCircle, FaUserEdit } from "react-icons/fa";

const Adminpage = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const PER_PAGE_USERS = 6; 
  const [currentPage, setCurrentPage] = useState(1); 

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get("/api/users", {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
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
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!userToDelete) return;
    try {
      const res = await axiosPrivate.delete(`/api/users/${userToDelete._id}`, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });

      if (res.status === 200 || res.status === 204) {
        setStatusMessage({
          type: "success",
          text: `User "${userToDelete.username}" deleted successfully.`,
        });
        fetchUsers();
      } else throw new Error("Unexpected response status");
    } catch (err) {
      setStatusMessage({ type: "error", text: "Failed to delete user." });
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setEditData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      username: user.username || "",
    });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const res = await axiosPrivate.put(
        `/profile/${userToEdit.username}/edit`,
        editData,
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        }
      );
      if (res.status === 200) {
        setStatusMessage({
          type: "success",
          text: "User updated successfully.",
        });
        setEditModalOpen(false);
        fetchUsers();
      } else {
        setStatusMessage({ type: "error", text: "Failed to update user." });
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err?.response?.data?.message || "Update failed.",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PER_PAGE_USERS,
    currentPage * PER_PAGE_USERS
  );

  const totalPages = Math.ceil(filteredUsers.length / PER_PAGE_USERS);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getRoleBadge = (role) => {
    let roleClass = "bg-gray-300 text-slate-800";
    let roleText = "User";

    if (role === "admin") {
      roleClass = "bg-red-500 text-white";
      roleText = "Admin";
    } else if (role === "owner") {
      roleClass = "bg-blue-500 text-white";
      roleText = "Owner";
    }

    return (
      <span
        className={`px-4 py-1 rounded-full text-xs font-medium ${roleClass}`}
      >
        {roleText}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-primary">
        User Management
      </h2>

      <input
        type="text"
        placeholder="Search by name or username..."
        className="w-full px-4 py-2 mb-5 border border-gray-400 rounded-md bg-slate-300 text-gray-800"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
        <>
          {filteredUsers.length === 0 ? (
            <div className="text-center text-base-content/60 py-8">
              No users found matching {searchTerm}
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {paginatedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="p-5 bg-base-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-lg font-medium flex items-center gap-2">
                          <FaUserCircle className="text-primary text-xl" />
                          {user.firstName} {user.lastName}
                        </p>
                        <button
                          onClick={() => confirmDelete(user)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                      <p className="text-sm text-base-content/70 mb-1">
                        <strong>Username:</strong> {user.username}
                      </p>
                      <p className="text-sm text-base-content/70">
                        <strong>Email:</strong> {user.email}
                      </p>

                      <div className="mt-3">{getRoleBadge(user.role)}</div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <Link
                        to={`/admin/profile/${user.username}`}
                        className="text-primary hover:underline text-sm flex items-center gap-2"
                      >
                        <FaUserCircle />
                        View Profile
                      </Link>

                      <button
                        onClick={() => openEditModal(user)}
                        className="text-cyan-600 hover:text-cyan-800 text-sm flex items-center gap-2"
                      >
                        <FaUserEdit />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* pagination area */}
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-semibold text-center text-red-600 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm text-center mb-4">
              Are you sure you want to delete{" "}
              <strong>{userToDelete.username}</strong>?
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
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

      {/* Edit Modal */}
      {editModalOpen && userToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-xl w-[400px]">
            <h3 className="text-lg font-semibold mb-4 text-primary text-center">
              Edit User
            </h3>

            <label className="block text-sm mb-2 font-medium">First Name</label>
            <input
              name="firstName"
              value={editData.firstName}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mb-3 rounded border bg-base-200"
            />

            <label className="block text-sm mb-2 font-medium">Last Name</label>
            <input
              name="lastName"
              value={editData.lastName}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mb-3 rounded border bg-base-200"
            />

            <label className="block text-sm mb-2 font-medium">Email</label>
            <input
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mb-3 rounded border bg-base-200"
            />

            <label className="block text-sm mb-2 font-medium">Username</label>
            <input
              name="username"
              value={editData.username}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mb-3 rounded border bg-base-200"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-focus"
              >
                Save
              </button>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setUserToDelete(userToEdit);
                  setEditModalOpen(false);
                  setShowDeleteModal(true);
                }}
                className="text-sm text-red-600 hover:underline"
              >
                <FaTrashAlt className="inline-block mr-1" />
                Delete this user
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminpage;

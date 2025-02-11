import { useState, useEffect } from 'react';

const UserModal = ({ userId, isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/v1/user/getUser/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          // console.log(data);
          setUser(data.data);
        } catch (err) {
          setError(err.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Event Creator Details</h2>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {user && (
          <div>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact Number:</strong> {user.contactNumber}</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserModal;
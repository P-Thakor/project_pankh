const UserList = ({ userList }) => {
  return (
    <ul className="space-y-2">
      {userList.map((user) => (
        <li key={user._id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="font-medium">{user.collegeId}</span> -{" "}
          <span className="text-gray-600">{user.username}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;

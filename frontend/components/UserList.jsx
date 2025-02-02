const UserList = ({ userList }) => {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {userList.map((participant, index) => (
          <li
            key={index}
            className="flex items-center justify-start px-4 py-3 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center ml-4 space-x-2">
              <span className="text-gray-600">{participant.collegeId || ""} - </span>
              <p className="text-gray-900">{participant.username}</p>{" "}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

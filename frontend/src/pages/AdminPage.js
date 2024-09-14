import React, { useState } from 'react';
import ClassForm from '../components/ClassForm';
import ClassList from '../components/ClassList';

const AdminPage = () => {
  const [classes, setClasses] = useState([]);

  const handleClassCreated = (newClass) => {
    setClasses([...classes, newClass]);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ClassForm onClassCreated={handleClassCreated} />
      <ClassList />
    </div>
  );
};

export default AdminPage;

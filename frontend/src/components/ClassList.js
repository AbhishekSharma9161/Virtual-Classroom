import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data } = await axios.get('/api/classes');
      setClasses(data);
    };

    fetchClasses();
  }, []);

  return (
    <ul>
      {classes.map((cls) => (
        <li key={cls._id}>{cls.name}</li>
      ))}
    </ul>
  );
};

export default ClassList;

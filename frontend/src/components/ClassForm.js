import React, { useState } from 'react';
import axios from 'axios';

const ClassForm = ({ onClassCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/classes', { name }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      onClassCreated(data);
      setName('');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Class Name"
      />
      <button type="submit">Create Class</button>
    </form>
  );
};

export default ClassForm;

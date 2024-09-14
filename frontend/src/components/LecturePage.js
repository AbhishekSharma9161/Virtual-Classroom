import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LecturePage = ({ match }) => {
  const [session, setSession] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await axios.get(`/api/sessions/${match.params.id}`);
      setSession(data);
    };

    fetchSession();
  }, [match.params.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/sessions/${match.params.id}/comment`, { text: comment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setSession({ ...session, comments: [...session.comments, data] });
      setComment('');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div>
      {session && (
        <>
          <h1>{session.name}</h1>
          <div>
            {session.lectures.map((lecture, index) => (
              <p key={index}>{lecture}</p>
            ))}
          </div>
          <div>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
            <ul>
              {session.comments.map((comment) => (
                <li key={comment._id}>
                  {comment.text}
                  <ul>
                    {comment.replies.map((reply) => (
                      <li key={reply._id}>{reply.text}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default LecturePage;

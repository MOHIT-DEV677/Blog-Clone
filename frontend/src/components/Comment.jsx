import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addcomment } from '../store/commentSlice';
import Addcomment from './Addcomment';
import { setComments } from '../store/commentSlice';

const Comment = (props) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  // const [showcomment,setshowcomment]=useState(false);
  const [showpost,setshowpost]=useState(false);
const getComments = async () => {
  const res = await axios.get('http://localhost:3000/getcomment', { withCredentials: true });
  if (res.data.success) {
    dispatch(setComments(res.data.data)); 
  }
};

  useEffect(() => {
    getComments();
  }, []);

  const post = props.data;
  let filteredComments = [];

  if (comments && post) {
    console.log("post._id:", post?._id);
console.log("All comments:", comments);

    filteredComments = comments.filter((c) => c.blogId?.toString() === post._id?.toString());
  }

  return (
    <div className="mt-4 bg-base-100 rounded-xl shadow-md p-4 max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-3 text-primary">Comments</h3>

      {filteredComments.length > 0 ? (
        <div className="space-y-3 mb-4">
          {filteredComments.map((val, key) => (
            <div
              key={key}
              className="bg-base-200 p-3 rounded-lg shadow-sm border border-base-300"
            >
              <img 
                src={val.userId.profileurl} 
                alt="User profile"
                className="w-8 h-8 rounded-full mb-2"
              />
              <p className="text-sm">{val.Comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic mb-4">No comments yet.</p>
      )}
      <div className="text-right mt-4">
        <button className="btn btn-primary" onClick={()=>{
          // setshowcomment(true);
          setshowpost(true);
        }}>Add Comment</button>
      </div>
      <div>
        {showpost && <Addcomment data={props.file} showp={setshowpost}/>}
      </div>
    </div>
  );
};

export default Comment;

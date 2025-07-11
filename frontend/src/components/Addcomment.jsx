import axios from 'axios';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { addcomment,setComments } from '../store/commentSlice';
const Addcomment = (props) => {
 const [comment,setcomment]=useState("");
 const dispatch=useDispatch();
 const postcomment = async () => {
  try {
    const response = await axios.post('http://localhost:3000/comment', {
      blogId: props.data,
      comment
    }, { withCredentials: true });
    
    console.log("POST Response:", response.data);
    if (!response.data.success) {
      throw new Error("Post failed");
    }
    const commentList = await axios.get('http://localhost:3000/getcomment', { withCredentials: true });
    if (commentList.data.success) {
      dispatch(setComments(commentList.data.data));
    }

  } catch (err) {
    console.log(err.message || "something went wrong");
  }
};
  return (
    <div className="space-y-2">
      <textarea className="textarea textarea-bordered w-full" placeholder="Write your comment..." onChange={(e)=>setcomment(e.target.value)}></textarea>
      
      <div className="text-right">
        <button className="btn btn-primary" onClick={postcomment}>Post</button>
      </div>
    </div>
  );
};

export default Addcomment;

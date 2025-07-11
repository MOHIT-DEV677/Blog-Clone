import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../store/blogSlice'
import Comment from './Comment'

const Feed = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(false);
  const [userpost, setUserpost] = useState(null);

  const discomment = (data) => {
    setComment(true);
    setUserpost(data);
  }

  const blogdata = useSelector((state) => state.blog.nblog);

  const getBlog = async () => {
    try {
      const data = await axios.get('http://localhost:3000/feed', { withCredentials: true });
      if (!data.data.success) {
        throw new Error("data is not found");
      }
      dispatch(addBlog(data.data.data));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      {blogdata &&
        blogdata.map((data, key) => (
          <div key={key} className="w-full max-w-4xl mx-auto mt-6 mb-6">
            <div className="card card-side bg-base-100 shadow-sm h-64">
              <figure className="w-1/3 h-full">
                <img
                  src={data.postedBy.profileurl}
                  className="h-full w-full object-cover"
                  alt="Profile"
                />
              </figure>
              <div className="card-body bg-base-300 w-2/3 overflow-hidden">
                <h2 className="card-title">{data.title}</h2>
                <p className="text-sm line-clamp-4">{data.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">follow</button>
                  <button className="btn btn-primary" onClick={() => discomment(data)}>comment</button>
                </div>
              </div>
            </div>
            {comment && userpost._id===data._id && <div><Comment data={userpost} file={data._id}/>
                    </div>}
          </div>
        ))
      }
    </>
  )
}

export default Feed

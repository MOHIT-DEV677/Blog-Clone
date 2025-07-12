import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { addmyblog } from '../store/blogSlice'
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const myBlog = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const file = useSelector((state) => state.blog.myblog);
  const [showCom, setShowCom] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const getdata = async () => {
    try {
      const data = await axios.get('http://localhost:3000/myblog', { withCredentials: true });
      if (!data) {
        throw new Error('Blog is not found');
      }
      dispatch(addmyblog(data.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const showcomment = (blogid) => {
    const fil = comments.filter((c) => blogid === c.blogId);
    setFilteredComments(fil);
    setSelectedBlogId(blogid);
    setShowCom(true);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
       {file &&
        file.map((data, key) => (
          <div className="w-full max-w-4xl mx-auto mt-6 mb-6" key={key}>
            <div className="card card-side bg-base-100 shadow-sm">
              <figure className="w-1/3 h-full">
                <img
                  src={data.postedBy.profileurl}
                  className="h-full w-full object-cover"
                  alt="Blog"
                />
              </figure>
              <div className="card-body bg-base-300 w-2/3 overflow-hidden">
                <h2 className="card-title">{data.title}</h2>
                <p className="text-sm line-clamp-4">{data.description}</p>
                <button className="btn btn-primary" onClick={() => showcomment(data._id)}>
                  Show Comments
                </button>

                {showCom && selectedBlogId === data._id && (
                  <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                    {filteredComments.length > 0 ? (
                      filteredComments.map((val, key) => (
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
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic mb-4">No comments yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default myBlog
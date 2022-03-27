import React from 'react'
import { useParams } from 'react-router-dom'
import { auth, useAuth } from '../../Firebase';
import "../../PagesCSS/Forum/Post.css";
import Comments from "./Comments"
import Time from "../../Components/DatePosted"
import { useGetPost } from "./PostController"

// TODO: Post Edit with img ?

function Post() {
  const { postId } = useParams();
  const post = useGetPost(postId)

  return (
    <div>
      {post.map((details) => {
        return (
          <div key={details.id}>
            <h3 className="post-user" >{details.author.name}</h3>
            <Time comment={details} />
            <div className='post-container' >
              <h1 className="post-title" >{details.values.title}</h1>
              <p className="post-query" >{details.values.query}</p>
            </div>
          </div>
        )
      })}
      <div>
        <Comments />
      </div>
    </div>
  );
}

export default Post
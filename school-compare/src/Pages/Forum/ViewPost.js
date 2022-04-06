import React from 'react'
import { useParams } from 'react-router-dom'
import "../../PagesCSS/Forum/Post.css";
import Comments from "./ViewComments"
import Time from "../../Components/DatePosted"
import { useGetPost } from "./PostController"
import avatar from "../../PagesCSS/Dashboard/avatar.png";
import CommentText from "./AddComment"
import { useAddComment } from './CommentController';

// TODO: Responsive CSS

function ViewPost() {

  const { postId } = useParams();
  const post = useGetPost(postId)

  return (
    <div className='post-page'>
      {post.map((details) => {
        return (
          <div key={details.id}>
            <div className='post-header'>
              <img className="post-user-img"
                src={details.author.photoURL ? details.author.photoURL : avatar}
                alt="avatar" />
              <h3 className="post-user" >
                {details.author.name}
              </h3>
              <Time content={details} />
            </div>
            <div className='post-container' >
              {details.values.imageURL &&
                <a
                  href={details.values.imageURL}
                  target="_blank"
                  rel="noreferrer noopener">
                  <img className="post-img"
                    src={details.values.imageURL}
                    alt="" />
                </a>}

              <h1 className="post-title" >{details.values.title}</h1>
              <p className="post-query" >{details.values.query}</p>
            </div>
            <CommentText
              submitLabel='Comment'
              handleSubmit={useAddComment}
              postId={postId} />
          </div>
        )
      })}
      <div>

        <Comments />
      </div>
    </div>
  );
}

export default ViewPost
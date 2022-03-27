import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from "./CommentBlock"
import CommentText from "./CommentText"
import { auth, useAuth } from '../../Firebase'
import { useGetCommentList, useAddComment, useUpdateComment } from './CommentController';

function Comments() {
    const { postId } = useParams();
    const [activeComment, setActiveComment] = useState(null);
    const commentList = useGetCommentList(postId)
    // TODO: Authentication

    const rootComments = commentList.filter((doc) =>
        doc.values.parentId === null
    )

    const getReplies = (commentId) => {
        return commentList.filter((doc) => doc.values.parentId === commentId)
            .sort((a, b) => a.values.createdAt - b.values.createdAt)
    }

    return (
        <div className='comments'>
            <CommentText submitLabel='Comment' handleSubmit={useAddComment} postId={postId} />
            <div className='comments-container'>
                <h3 className='comments-title'> Comments </h3>
                {rootComments.map((comments) => {
                    return <Comment
                        key={comments.id}
                        comment={comments}
                        replies={getReplies(comments.id)}
                        getReplies={getReplies}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        updateComment={useUpdateComment}
                        addComment={useAddComment}

                    />
                })}
            </div>
        </div>
    );
}

export default Comments
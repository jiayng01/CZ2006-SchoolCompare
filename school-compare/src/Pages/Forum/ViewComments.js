import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from "./Comment"
import { useGetCommentList, useAddComment, useUpdateComment } from './CommentController';
import "../../PagesCSS/Forum/Comment.css"

function ViewComments() {
    const { postId } = useParams();
    const commentList = useGetCommentList(postId)
    const [activeComment, setActiveComment] = useState(null);

    // TODO: Responsive CSS

    const rootComments = commentList.filter((doc) =>
        doc.values.parentId === null
    )

    const getReplies = (commentId) => {
        return commentList.filter((doc) =>
            doc.values.parentId === commentId)
            .sort((a, b) =>
                a.values.createdAt - b.values.createdAt)
    }

    return (
        <>
            <h3 className='comments-title'>Comments</h3>
            <div className='comments'>
                <div className='comments-container'>

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
        </>
    );
}

export default ViewComments
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Comment from "./CommentBlock"
import CommentText from "./CommentText"
import { createComment as createCommentApi, getCommentList as getCommentListApi, updateComment as updateCommentApi } from "./CommentController"
import { toast } from "react-toastify";

function Comments(isAuth) {
    const { id } = useParams();
    const [commentList, setCommentList] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    const addComment = (text, parentId = null) => {
        createCommentApi(text, parentId, id).then(() => {
            toast("Succesfully Posted!", { type: "success" });
        }).catch(error => {
            toast("Comment upload failed!", { type: "error" })
            console.log(error)
        })
    }

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            toast("Succesfully updated!", { type: "success" });
        }).catch(error => {
            toast("Comment update failed!", { type: "error" })
            console.log(error)
        })
        setActiveComment(null)
    }

    const rootComments = commentList.filter((doc) =>
        doc.values.parentId === null
    )

    const getReplies = (commentId) => {
        return commentList.filter((doc) => doc.values.parentId === commentId)
            .sort((a, b) => a.values.createdAt - b.values.createdAt)
    }

    useEffect(() => {
        getCommentListApi(id, setCommentList)
        return getCommentListApi;
    }, []);

    return (
        <div className='comments'>
            <CommentText submitLabel='Reply' handleSubmit={addComment} />
            <div className='comments-container'>
                <h3 className='comments-title'> Comments </h3>
                {rootComments.map((comments) => {
                    return <Comment
                        key={comments.id}
                        comment={comments}
                        replies={getReplies(comments.id)}
                        getReplies={getReplies}
                        isAuth={isAuth}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        updateComment={updateComment}
                        addComment={addComment}
                    />
                })}
            </div>
        </div>
    );
}

export default Comments
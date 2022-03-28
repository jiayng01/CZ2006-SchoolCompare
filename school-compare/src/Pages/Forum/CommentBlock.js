import React from 'react'
import Time from "../../Components/DatePosted"
import { auth, db, useAuth } from "../../Firebase"
import CommentText from "./CommentText"
import { useNavigate } from 'react-router-dom';


function Comment({ comment, replies, getReplies, activeComment, setActiveComment, updateComment, addComment }) {

    // TODO: User Image + CSS
    const [user, isAuth] = useAuth()
    const editTime = 300000;
    const timePassed = (new Date() - comment.values.createdAt.toDate()) > editTime
    const canEdit = isAuth && comment.author.uid === user.uid && !timePassed
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const parentId = comment.id
    const postId = comment.values.postId
    const navigate = useNavigate();
    return (
        <div className='comment'>
            <div className='comment-image-container'>
                {/* <img /> */}
            </div>
            <div className='comment-right-part'>

                <div className='comment-content'>
                    {/*Author*/}
                    <div className='comment-author'>{comment.author.name}</div>
                    <Time content={comment} />
                </div>

                {/* Edit Comment or comment body */}
                {!isEditing ?
                    <div className='comment-text'>
                        {comment.values.body}
                    </div> :
                    <CommentText
                        submitLabel='Update'
                        hasCancelButton
                        initialText={comment.values.body}
                        handleSubmit={(text) => {
                            updateComment(text, comment.id)
                            setActiveComment(null)
                        }}
                        handleCancel={() => setActiveComment(null)}
                    />
                }

                {/* Comment Actions*/}
                <div className='comment-actions'>
                    <div
                        className='comment-action'
                        onClick={() => isAuth ? setActiveComment({ id: comment.id, type: 'replying' }) : navigate("/login")} >
                        Reply
                    </div>
                    {canEdit && (
                        <div
                            className='comment-action'
                            onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>
                            Edit
                        </div>
                    )}
                </div>


                {/* To Reply*/}
                {isReplying && (
                    <CommentText
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, postId, parentId)}
                    />
                )}

                {/* Nested Replies*/}
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                replies={getReplies(reply.id)}
                                getReplies={getReplies}
                                isAuth={isAuth}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                updateComment={updateComment}
                                addComment={addComment}
                                parentId={parentId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment
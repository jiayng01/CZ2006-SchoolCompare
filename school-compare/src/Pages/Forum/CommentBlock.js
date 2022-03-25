import React from 'react'
import Time from "../../Components/DatePosted"
import { auth, db } from "../../Firebase"
import { toast } from "react-toastify";
import CommentText from "./CommentText"
import { createComment } from './CommentController';

function Comment({ comment, replies, getReplies, isAuth, activeComment, setActiveComment, updateComment, addComment }) {

    const editTime = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > editTime
    // const canReply = isAuth;
    // const canEdit = canReply && comment.author.id === auth.currentUser.uid && !timePassed
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const parentId = comment.id
    //const postId = comment.values.postId

    return (
        <div className='comment'>
            <div className='comment-image-container'>
                {/* <img /> */}
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='comment-author'>{comment.author.name}</div>
                    <Time comment={comment} />
                </div>
                {!isEditing ?
                    <div className='comment-text'>
                        {comment.values.body}
                    </div> :
                    <CommentText
                        submitLabel='Update'
                        hasCancelButton
                        initialText={comment.values.body}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />}

                <div className='comment-actions'>
                    <div
                        className='comment-action'
                        onClick={() => setActiveComment({ id: comment.id, type: 'replying' })} >
                        Reply
                    </div>
                    <div
                        className='comment-action'
                        onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>
                        Edit
                    </div>
                </div>
                {isReplying && (
                    <CommentText
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, parentId)}
                    />
                )}
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
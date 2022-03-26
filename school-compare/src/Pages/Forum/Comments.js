import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Comment from "./CommentBlock"
import CommentText from "./CommentText"
import { toast } from "react-toastify";
import { doc, addDoc, collection, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore"
import { auth, db } from "../../Firebase"

function Comments(isAuth) {
    const { postId } = useParams();
    const [commentList, setCommentList] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    // Controller Functions

    const addComment = async (body, parentId = null) => {
        await addDoc(collection(db, "comments"), {
            author: {
                name: "User1",
                id: 123
            },
            values: {
                body,
                createdAt: Timestamp.now().toDate(),
                parentId,
                postId

            }
        }).then(() => {
            toast("Succesfully Posted!", { type: "success" });
        }).catch(error => {
            toast("Comment upload failed!", { type: "error" })
            console.log(error)
        })
    }

    const updateComment = async (text, commentId) => {
        await updateDoc(doc(db, "comments", commentId), {
            "values.body": text
        }).then(() => {
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
        const getCommentList = onSnapshot(query(collection(db, "comments"),
            orderBy("values.createdAt", "desc")), (snapshot) => {
                setCommentList(
                    snapshot.docs.filter((doc) => (
                        doc.data().values.postId === postId))
                        .map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        })))
            })
        return getCommentList;
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
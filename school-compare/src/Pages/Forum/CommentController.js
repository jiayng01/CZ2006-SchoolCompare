import React, { useState } from 'react'
import { doc, addDoc, collection, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore"
import { auth, db } from "../../Firebase"

// TODO: Fix error setCommentList not a function

const getCommentList = (id, setCommentList) =>
    onSnapshot(query(collection(db, "comments"),
        orderBy("values.createdAt", "desc")), (snapshot) => {
            setCommentList(
                snapshot.docs.filter((doc) => (
                    doc.data().values.postId === id))
                    .map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    })))
        })

const createComment = async (body, parentId, postId) => {
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
    })
}

const updateComment = async (text, id) => {
    await updateDoc(doc(db, "comments", id), {
        "values.body": text
    })
}


export { getCommentList, createComment, updateComment }
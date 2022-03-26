import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, orderBy, addDoc, Timestamp, updateDoc, doc } from "firebase/firestore"
import { db } from "../../Firebase"
import { toast } from 'react-toastify';


function useGetCommentList(postId) {

    const [commentList, setCommentList] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "comments"),
            orderBy("values.createdAt", "desc"));

        const getCommentList = onSnapshot(q, (snapshot) => {
            setCommentList(
                snapshot.docs.filter((doc) => (
                    doc.data().values.postId === postId))
                    .map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    })))
        });
        return getCommentList;
    }, [postId]);
    return commentList;
}

const useAddComment = async (body, postId, parentId = null) => {
    await addDoc(collection(db, "comments"), {
        author: {
            name: "User1",
            uid: "123"
        },
        values: {
            body,
            createdAt: Timestamp.now().toDate(),
            parentId,
            postId
        }
    }).then(() => {
        toast("Succesfully updated!", { type: "success" });
    }).catch(error => {
        toast("Comment update failed!", { type: "error" })
        console.log(error)
    })
}

const useUpdateComment = async (text, commentId) => {

    await updateDoc(doc(db, "comments", commentId), {
        "values.body": text
    }).then(() => {
        toast("Succesfully updated!", { type: "success" });
    }).catch(error => {
        toast("Comment update failed!", { type: "error" })
        console.log(error)
    })
}


export { useGetCommentList, useAddComment, useUpdateComment };
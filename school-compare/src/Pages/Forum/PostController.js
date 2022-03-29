import { useEffect, useState } from 'react'
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { ref } from "firebase/storage";
import { db } from "../../Firebase"


function useGetPost(postId) {
    const [post, setPost] = useState([]);
    useEffect(() => {
        const getSpecificPost = onSnapshot(doc(db, "posts", postId), (doc) => {
            setPost([{
                ...doc.data(),
                id: doc.id
            }])
        })
        return getSpecificPost;

    }, [postId]);
    return post
}
function useGetPostsReplies() {
    const [postList, setPostList] = useState([]);
    const [replyList, setReplyList] = useState([]);
    useEffect(() => {
        const postsCollectionRef = query(collection(db, "posts"),
            orderBy("values.createdAt", "desc"));
        const getPosts = async () => {
            const col = await getDocs(postsCollectionRef);
            setPostList(col.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
            return getPosts;
        }
        const getReplies = async () => {
            const querySnapshot = await getDocs(collection(db, "comments"));
            setReplyList(querySnapshot.docs.map((doc) => ({
                ...doc.data()
            })))
        }
        getPosts();
        getReplies();
    }, []);
    return [postList, replyList];
}


export { useGetPost, useGetPostsReplies }
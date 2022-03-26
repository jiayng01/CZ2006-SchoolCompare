import { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../../Firebase"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    return { postList, replyList };
}

const useSubmit = async (values) => {
    const navigate = useNavigate();
    //const username = !values.toggle ? auth.currentUser.displayName: "User" + auth.currentUser.uid;
    await addDoc(collection(db, "posts"), {
        values,
        author: {
            name: "test",
            uid: 123, //auth.currentUser.uid,
        }
    }).then(() => {
        toast("Succesfully Posted!", { type: "success" });
        navigate("/Forum");
    }).catch(err => {
        toast("Post upload failed!", { type: "error" })
        console.log(err)
    })
};

export { useGetPost, useGetPostsReplies, useSubmit }
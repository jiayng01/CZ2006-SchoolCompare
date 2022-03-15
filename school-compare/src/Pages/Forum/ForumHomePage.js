import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../../Firebase"
import "../../PagesCSS/Forum/ForumMainPage.css"

function ForumHomePage({ isAuth }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("values.createdAt", "desc"));
    const getPosts = onSnapshot(q, (snapshot) => {
      setPostList(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })))
        })
    return getPosts;
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
  }


  return (
    <div className="forum-mainpage">
      <h1> Forum Page </h1>
      <Link to="./PostCreate">Create Post</Link>
      {postList.map((post) => {
        return (
          <div className="post" key={post.id}>
            {""}
            <div className="post-Header">
              {""}
            </div>
            <div className="posts-container">
              <p className="posts-users" >{post.author.name}</p>
              <h1 className="posts-title">{post.values.title}</h1>
              {/* {isAuth && post.author.id === auth.currentUser.uid && ( */}
              <div className="post-delete" >
                <button onClick={() => deletePost(post.id)}>X</button>
              </div>
              {/* )} */}
            </div>
          </div>
        )
      })}
    </div>

  );
}

export default ForumHomePage; 

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../../Firebase"
import "../../PagesCSS/Forum/ForumMainPage.css"
import Time from "../../Components/DatePosted"
// TODO: Pagination of the posts
// TODO: Search bar
// TODO: Secure routing to individual posts
// TODO: Auth signed in users to create posts, if 
// not signed in redirect to login page


function ForumHomePage({ isAuth }) {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const postsCollectionRef = query(collection(db, "posts"),
      orderBy("values.createdAt", "desc"));

    // const getPosts = onSnapshot(postsCollectionRef, (snapshot) => {
    //   setPostList(
    //     snapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id
    //     })))
    // })
    // return getPosts;


    const getPosts = async () => {
      const col = await getDocs(postsCollectionRef);
      setPostList(col.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))
    }
    getPosts();

  }, []);

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "posts", id)
  //   await deleteDoc(postDoc)
  // }

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
              <Link to={`./Post/${post.values.title.trim().replace(/\s+/g, '-')}/${post.id}`}>
                <h3 className="posts-author" >{post.author.name}</h3>
                <Time comment={post} />
                <h1 className="posts-title">{post.values.title}</h1>
              </Link>
              {/* {isAuth && post.author.id === auth.currentUser.uid && ( */}
              {/* <div className="post-delete">
                <button onClick={() => deletePost(post.id)}>X</button>
              </div> }
              {)} */}
            </div>
          </div>
        )
      })}
    </div>

  );
}

export default ForumHomePage; 

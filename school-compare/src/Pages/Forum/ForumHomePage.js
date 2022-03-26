import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../../Firebase"
import "../../PagesCSS/Forum/ForumMainPage.css"
import Time from "../../Components/DatePosted"
import SearchBar from "../../Components/SearchBar";
// TODO: Pagination of the posts
// TODO: Auth signed in users to create posts, if 
// not signed in redirect to login page
// TODO: Drop down bar for sorting by activity and latest post
// TODO: Edit post

function ForumHomePage({ isAuth }) {

  const [postList, setPostList] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [textEntered, setTextEntered] = useState('')


  const handleFilter = (event) => {
    const searchTerm = event.target.value
    setTextEntered(searchTerm)
    const newFilter = postList.filter((post) => {
      return post.values.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    searchTerm === "" ? setFilteredPost([]) : setFilteredPost(newFilter)
  }

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
    getPosts();

    // const getPosts = onSnapshot(postsCollectionRef, (snapshot) => {
    //   setPostList(
    //     snapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id
    //     })))
    // })
    // return getPosts;

  }, []);

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "posts", id)
  //   await deleteDoc(postDoc)
  // }

  return (
    <div className="forum-mainpage">
      <div className="forum-header">
        <h1 className="forum-title"> Forum Page </h1>
        <Link to="./PostCreate">Create Post</Link>
        <SearchBar
          placeholder="Search post..."
          handleFilter={handleFilter}
          filteredPost={filteredPost}
          setFilteredPost={setFilteredPost}
          textEntered={textEntered}
          setTextEntered={setTextEntered} />
      </div>
      {filteredPost.length !== 0 ? (filteredPost.map((post) => {
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
      })) :
        postList.map((post) => {
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
        })
      }
    </div >
  );
}

export default ForumHomePage; 

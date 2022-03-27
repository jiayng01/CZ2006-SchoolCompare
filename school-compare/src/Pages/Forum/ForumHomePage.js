import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, useAuth } from "../../Firebase"
import "../../PagesCSS/Forum/ForumMainPage.css"
import Time from "../../Components/DatePosted"
import SearchBar from "../../Components/SearchBar";
import DropDownFilter from "./DropDownFilter";
import { useGetPostsReplies } from "./PostController"

// TODO: Pagination of the posts
// TODO: Keep track of signed in
// TODO: Edit post ?

function ForumHomePage() {


  const [filteredPost, setFilteredPost] = useState([]);
  const [textEntered, setTextEntered] = useState('')
  const [chosen, setChosen] = useState("Latest");
  const fullList = useGetPostsReplies();
  const replyList = fullList.replyList;
  const postList = fullList.postList;
  const [user, isAuth] = useAuth();

  const getRepliesNo = (post) => {
    return replyList.filter((reply) => reply.values.postId === post.id).length
  }

  const arrangeByAct = () => {
    return postList.map((post) => post).sort((a, b) => getRepliesNo(b) - getRepliesNo(a))
  }

  const arrangeByOld = () => {
    return postList.map((post) => post).sort((a, b) => a.values.createdAt - b.values.createdAt)
  }
  const list = chosen === "Latest" ? postList :
    chosen === "Oldest" ? arrangeByOld() :
      arrangeByAct()

  const handleFilter = (event) => {
    const searchTerm = event.target.value
    setTextEntered(searchTerm)
    const newFilter = list.filter((post) => {
      return post.values.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    searchTerm === "" ? setFilteredPost([]) : setFilteredPost(newFilter)
  }

  return (
    <div className="forum-mainpage">
      <div className="forum-header">
        <h1 className="forum-title"> Forum Page </h1>
        <Link
          to={isAuth ? "./PostCreate" : "../login"}>
          Create Post
        </Link>
        <DropDownFilter
          chosen={chosen}
          setChosen={setChosen} />
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
            </div>
          </div>
        )
      })) :
        list.map((post) => {
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
              </div>
            </div>
          )
        })
      }
    </div >
  );
}

export default ForumHomePage; 

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Firebase";
import "../../PagesCSS/Forum/Forum.css";
import Time from "./DatePosted";
import SearchBar from "./SearchBar";
import FilterPost from "./FilterPost";
import { useGetPostsReplies } from "./PostController"
import Card from "./PostCard"
import avatar from "../../PagesCSS/Dashboard/avatar.png";

// TODO: Pagination of the posts
// TODO: Fix moving components due to changing filters
// TODO: CSS responsive

function ViewForum() {
  const [filteredPost, setFilteredPost] = useState([]);
  const [textEntered, setTextEntered] = useState("");
  const [chosen, setChosen] = useState("Latest");
  const [postList, replyList] = useGetPostsReplies();
  const user = useAuth();

  const getRepliesNo = (post) => {
    return replyList.filter((reply) => reply.values.postId === post.id).length
  }
  const arrangeByAct = () => {
    return postList
      .map((post) => post)
      .sort((a, b) => getRepliesNo(b) - getRepliesNo(a));
  };

  const arrangeByOld = () => {
    return postList
      .map((post) => post)
      .sort((a, b) => a.values.createdAt - b.values.createdAt);
  };
  const list =
    chosen === "Latest"
      ? postList
      : chosen === "Oldest"
        ? arrangeByOld()
        : arrangeByAct();

  const handleFilter = (event) => {
    const searchTerm = event.target.value;
    setTextEntered(searchTerm);
    const newFilter = list.filter((post) => {
      return post.values.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    searchTerm === "" ? setFilteredPost([]) : setFilteredPost(newFilter);
  };

  return (
    <div className="forum-mainpage">
      <h1 className="forum-title"> Forum Page </h1>
      <div className='forum-header'>
        <Link className="forum-create-post"
          to={user ? "./PostCreate" : "../login"}>
          Create Post
        </Link>
        <div className="search-input-with-dropdown">
          <SearchBar
            placeholder="Search"
            handleFilter={handleFilter}
            filteredPost={filteredPost}
            setFilteredPost={setFilteredPost}
            textEntered={textEntered}
            setTextEntered={setTextEntered} />
          <div className="vertical-divider"></div>
          <FilterPost
            chosen={chosen}
            setChosen={setChosen} />
        </div>

      </div>
      {/* Filtered by search after selection from dropdown*/}
      {filteredPost.length !== 0 && textEntered.length !== 0 ? (filteredPost.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="post-header">
              <img className="post-user-img" src={user.photoURL ? user.photoURL : avatar}
                alt="avatar" />
              <p className="post-user-name">{post.author.name}</p>
              <Time content={post} />
            </div>
            <Card content={post} />
          </div>
        )
      }))
        /* No Posts */
        : textEntered.length !== 0 ?
          <div> No posts available... </div> :
          /* Filtered by dropdown*/
          list.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <img className="post-user-img" src={user.photoURL ? user.photoURL : avatar}
                    alt="avatar" />
                  <p className="post-user-name">{post.author.name}</p>
                  <Time content={post} />
                </div>
                <Card content={post} />
              </div>
            )
          })
      }
    </div >
  );
}

export default ViewForum;

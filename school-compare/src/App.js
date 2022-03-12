import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Schools from "./Pages/Schools/SchoolsMainPage";
import Favourites from "./Pages/Favourites";
import Forum from "./Pages/Forum";
import Feedback from "./Pages/Feedback";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"
import Error from "./Pages/Error";
import Primary from "./Pages/Schools/Primary";
import Secondary from "./Pages/Schools/Secondary";
import Tertiary from "./Pages/Schools/Tertiary";
import React from "react";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route>
          <Route path="schools" element={<Schools />} />
          <Route path="schools/primary" element={<Primary />} />
          <Route path="schools/secondary" element={<Secondary />} />
          <Route path="schools/tertiary" element={<Tertiary />} />
        </Route>
        <Route path="favourites" element={<Favourites />} />
        <Route path="forum" element={<Forum />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

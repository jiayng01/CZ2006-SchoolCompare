import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Schools from "./Pages/Schools/SchoolsMainPage";
import Favourites from "./Pages/Favourites";
import Feedback from "./Pages/Feedback";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Reset from "./Pages/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";

import Forum from "./Pages/Forum/ForumHomePage";
import PostCreate from "./Pages/Forum/PostCreate";
/* General Page */
import Primary from "./Pages/Schools/Primary/Primary";
import Secondary from "./Pages/Schools/Secondary/Secondary";
import Tertiary from "./Pages/Schools/Tertiary/Tertiary";

/* Subjects Page */
import PrimarySubjects from "./Pages/Schools/Primary/PrimarySubjects";
import SecondarySubjects from "./Pages/Schools/Secondary/SecondarySubjects";
import TertiarySubjects from "./Pages/Schools/Tertiary/TertiarySubjects";

/* Cut Off Page */
import SecondaryCutOff from "./Pages/Schools/Secondary/SecondaryCutOff";
import TertiaryCutOff from "./Pages/Schools/Tertiary/TertiaryCutOff";

/* CCA Page */
import PrimaryCCA from "./Pages/Schools/Primary/PrimaryCCA";
import SecondaryCCA from "./Pages/Schools/Secondary/SecondaryCCA";
import TertiaryCCA from "./Pages/Schools/Tertiary/TertiaryCCA";

/* Electives Page */
import PrimaryElective from "./Pages/Schools/Primary/PrimaryElective";
import SecondaryElective from "./Pages/Schools/Secondary/SecondaryElective";
import TertiaryElective from "./Pages/Schools/Tertiary/TertiaryElective";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route>
          <Route path="schools" element={<Schools />} />
          <Route>
            {" "}
            {/* Nested routes for  /schools/primary*/}
            <Route path="schools/primary" element={<Primary />} />
            <Route path="schools/primary/general" element={<Primary />} />
            <Route
              path="schools/primary/subjects-offered"
              element={<PrimarySubjects />}
            />
            <Route path="schools/primary/ccas" element={<PrimaryCCA />} />
            <Route
              path="schools/primary/electives&programmes"
              element={<PrimaryElective />}
            />
          </Route>
          <Route>
            {" "}
            {/* Nested routes for  /schools/secondary*/}
            <Route path="schools/secondary" element={<Secondary />} />
            <Route path="schools/secondary/general" element={<Secondary />} />
            <Route
              path="schools/secondary/cut-off-points"
              element={<SecondaryCutOff />}
            />
            <Route
              path="schools/secondary/subjects-offered"
              element={<SecondarySubjects />}
            />
            <Route path="schools/secondary/ccas" element={<SecondaryCCA />} />
            <Route
              path="schools/secondary/electives&programmes"
              element={<SecondaryElective />}
            />
          </Route>
          <Route>
            {" "}
            {/* Nested routes for  /schools/tertiary*/}
            <Route path="schools/tertiary" element={<Tertiary />} />
            <Route path="schools/tertiary/general" element={<Tertiary />} />
            <Route
              path="schools/tertiary/cut-off-points"
              element={<TertiaryCutOff />}
            />
            <Route
              path="schools/tertiary/subjects-offered"
              element={<TertiarySubjects />}
            />
            <Route path="schools/tertiary/ccas" element={<TertiaryCCA />} />
            <Route
              path="schools/tertiary/electives&programmes"
              element={<TertiaryElective />}
            />
          </Route>
        </Route>
        <Route path="favourites" element={<Favourites />} />
        <Route path="forum" element={<Forum /*isAuth={isAuth}*/ />} />
        <Route>
          {""}
          <Route
            path="forum/postCreate"
            element={<PostCreate /*isAuth={isAuth}*/ />}
          />
        </Route>{" "}
        <Route path="feedback" element={<Feedback />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

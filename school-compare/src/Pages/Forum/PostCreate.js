import React, { useEffect } from "react";
import "../../PagesCSS/Forum/PostCreate.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormTextError from "../../Components/FormTextError";
import { addDoc, collection, Timestamp, getDownloadURL } from "firebase/firestore";
import { db, auth, storage } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ref } from "firebase/storage";
import ProgressBar from "../../Components/ProgressBar";

// TODO: API for onSubmit method
// TODO: Word Limit for query Field
// TODO: Image attachment
// TODO: secure routing

function PostCreate({ isAuth }) {

  const initialValues = {
    checkbox: false,
    title: "",
    query: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("A title is required!"),
    query: Yup.string().required("A desciption of the query is required!"),
  });

  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();

  const onSubmit = async(values) => {
    //const username = !values.toggle ? auth.currentUser.displayName: "User" + auth.currentUser.uid;
    await addDoc(postsCollectionRef, {
      values,
      author: {
        name: "test",
        id: 123, //auth.currentUser.uid,
      }
    }).then(() => {
      toast("Succesfully Posted!", { type: "success" });
      navigate("/Forum");
    }).catch(err => {
      toast("Post upload failed!", { type: "error" })
    })


  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login")
  //   }
  // }, [])


  return (
    <div className="pcContainer">
      <p className="pc-forum">Forum</p>
      <p className="pc-sent">Post your questions here!</p>
      <hr color="black" size="1.2" width="320px" style={{ margin: "auto" }}/>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="pc-form">
          <Form>
            {/* title */}
            <div className="form-control">
              <label className="pc-label">Title:</label>
              <Field
                className="pc-field"
                type="text"
                id="title"
                name="title"
                placeholder="Enter a short title for your query e.g. Which school..."
              />
              <ErrorMessage name="title" component={FormTextError} />
            </div>

            {/* Query */}
            <div className="form-control">
              <label className="pc-label">Query:</label>
              <Field
                as="textarea"
                className="pc-field pc-query-field"
                id="query"
                name="query"
                placeholder="Describe your query"
              />
              <ErrorMessage name="query" component={FormTextError} />
            </div>

            {/* checkbox */}
            <div className="form-control-checkbox">
              <label>
                <Field type="checkbox" name="checkbox" id="checkbox" />
                Post anonymously
              </label>
            </div>

            {/* image */}
            <div className="form-control-checkbox">
              <label htmlFor="">
                <input type="file" name="image" accept="image/*"></input>
                {initialValues.image && console.log(initialValues)}
              </label>
            </div>

            {/* Submit button */}
            <div className="form-control">
              <button className="pc-button" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default PostCreate;

import React from "react";
import "../../PagesCSS/Forum/CreatePost.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormTextError from "../../Components/FormTextError";
import { addDoc, collection, Timestamp, getDocs, doc, where, query, } from "firebase/firestore";
import { auth, db, storage } from "../../Firebase";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import ProgressBar from "./ProgressBar";
// TODO: Multiple Image attachments
// TODO: CSS

function CreatePost() {

  const initialValues = {
    toggle: false,
    title: "",
    query: "",
    imageUrl: "",
    createdAt: Timestamp.now().toDate(),
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("A title is required!"),
    query: Yup.string().required("A desciption of the query is required!"),
  });
  const navigate = useNavigate();


  async function onSubmit(values) {

    const q = query(collection(db, "users"), where("uid", "==", `${auth.currentUser.uid}`));
    const doc = await getDocs(q);
    const username = !values.toggle ? doc.docs[0].data().name : "Anonymous";
    await addDoc(collection(db, "posts"), {
      values,
      author: {
        name: username,
        uid: auth.currentUser.uid
      }
    }).then(() => {
      toast("Succesfully Posted!", { type: "success" });
      navigate("/Forum");
    }).catch(err => {
      toast("Post upload failed!", { type: "error" })
      console.log(err)
    })
  };

  return (
    <div className="pc-container">
      <p className="pc-forum">Forum</p>
      <p className="pc-title">Post your questions here!</p>
      <hr color="black" size="1.2" width="320px" style={{ margin: "auto" }} />
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
                <Field
                  type="checkbox"
                  name="toggle"
                />
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

export default CreatePost;

import React from "react";
import "../../PagesCSS/Forum/PostCreate.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormTextError from "../../Components/FormTextError";
import { Timestamp } from "firebase/firestore";
import { auth, storage } from "../../Firebase";
import { ref } from "firebase/storage";
import { useSubmit as onSubmit } from "./PostController"
// import ProgressBar from "./ProgressBar";

// TODO: API for onSubmit method
// TODO: Word Limit for query Field
// TODO: Image attachment
// TODO: secure routing to forum main page

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

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login")
  //   }
  // }, [])

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
                  name="checkbox"
                  id="checkbox"
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

export default PostCreate;

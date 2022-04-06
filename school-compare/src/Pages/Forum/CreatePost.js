import React, { useState } from "react";
import "../../PagesCSS/Forum/CreatePost.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormTextError from "../../Components/FormTextError";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, storage, useAuth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import ProgressBar from "../../Components/ProgressBar"

// TODO: Multiple Image attachments
// TODO: CSS

function CreatePost() {
  const user = useAuth();
  const [imgFile, setImgFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const validationSchema = Yup.object({
    title: Yup.string().required("A title is required!"),
    query: Yup.string().required("A desciption of the query is required!"),
  });
  const navigate = useNavigate();


  const initialValues = {
    toggle: false,
    title: "",
    query: "",
    imageURL: imgFile,
    createdAt: Timestamp.now().toDate(),
  };

  function onSubmit(values) {

    if (imgFile) {
      const storageRef = ref(storage, `postImages/${imgFile.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);
      uploadTask.on('state_changed',
        (snapshot) => {
          const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(percentage);
        }, (error) => {
          toast("Image upload failed!", { type: "error" });
          console.log(error);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              values.imageURL = url
              const username = !values.toggle ? user.displayName : "Anonymous";
              addDoc(collection(db, "posts"), {
                values,
                author: {
                  name: username,
                  uid: user.uid,
                  photoURL: user.photoURL ? user.photoURL : null
                }
              }).then(() => {
                toast("Succesfully Posted!", { type: "success" });
                navigate("/Forum");
              }).catch(err => {
                toast("Post upload failed!", { type: "error" })
                console.log(err)
              })
            })
        });

    }
    else {
      const username = !values.toggle ? user.displayName : "Anonymous";
      addDoc(collection(db, "posts"), {
        values,
        author: {
          name: username,
          uid: user.uid,
          photoURL: user.photoURL ? user.photoURL : null
        }
      }).then(() => {
        toast("Succesfully Posted!", { type: "success" });
        navigate("/Forum");
      }).catch(err => {
        toast("Post upload failed!", { type: "error" })
        console.log(err)
      })
    }
  }

  return (

    < div className="pc-container" >
      <p className="pc-forum">Forum</p>
      <p className="pc-title">Post your questions here!</p>
      <hr color="black"
        size="1.2"
        width="320px"
        style={{ margin: "auto" }} />
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
                <input type="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => setImgFile(event.target.files[0])}>
                </input>
                {initialValues.image && console.log(initialValues)}
              </label>
            </div>


            {/*Progress Bar */}
            <div className="form-control">
              {progress > 0 && <ProgressBar progress={progress} />}
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
    </div >
  );
}

export default CreatePost;

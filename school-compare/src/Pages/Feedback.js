import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../PagesCSS/Feedback.css";
import FormTextArea from "../Components/FormTextError";

function Feedback() {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required"),
  });
  const onSubmit = (values, { setSubmitting }) => {
    // connect to API in the future
    //alert(JSON.stringify(values, null, 2));
    console.log("Form data", values);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="feedback-form-container">
      <p className="feedback-form-title">FEEDBACK</p>
      <p className="feedback-form-p">we'd love you hear your feedback!</p>
      <hr color="black" size="1.2" width="350px" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="feedback-form">
          <Form>
            <div className="feedback-form-control">
              <label className="feedback-form-label" htmlFor="name">
                Name:
              </label>
              <Field
                className="feedback-form-field"
                id="name"
                name="name"
                type="text"
                placeholder="Enter Name e.g. John"
              />
              <ErrorMessage component={FormTextArea} name="name" />
            </div>

            <div className="feedback-form-control">
              <label className="feedback-form-label" htmlFor="email">
                Email:
              </label>
              <Field
                className="feedback-form-field"
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email e.g. John@example.com"
              />
              <ErrorMessage component={FormTextArea} name="email" />
            </div>

            <div className="feedback-form-control">
              <label className="feedback-form-label" htmlFor="message">
                Message:
              </label>
              <Field
                className="feedback-form-field feedback-message-field"
                as="textarea"
                id="message"
                name="message"
                placeholder="Enter Message e.g The app was..."
              />
              <ErrorMessage component={FormTextArea} name="message" />
            </div>
            <div className="feedback-form-control">
              <button className="feedback-form-submit-button" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default Feedback;

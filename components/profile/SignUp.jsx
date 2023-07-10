import registerUser from "@/pages/api/auth/register";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";

function SignUp() {
  const router = useRouter();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState({...initialValues});

  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const isEmptyUser = Object.values(user).some((k) => k.length < 1);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    email: Yup.string()
      .required("Email address is required.")
      .matches(emailRegex, "Please, enter a valid email address!"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required."),
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Perform registration logic here
    await registerUser(user).then(() => router.replace("/"));
  };

  return (
    <div className="flex-1 flex-column space-y-5">
      <h1 className="font-semibold text-4xl">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <div>
            <Form className="" onChange={handleChange}>
              <div className="flex flex-col space-y-6 bg-[#393646] md:max-w-[450px] p-6 rounded-md">
                <div className="flex  flex-col">
                  <label className="font-semibold text-lg" htmlFor="username">
                    Username*
                  </label>
                  <Field
                    className="border-none"
                    type="text"
                    id="username"
                    name="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    render={(msg) => (
                      <div className="text-[#FFC95F]">{msg}</div>
                    )}
                  />
                </div>

                <div className="flex flex-col md:max-w-[450px]">
                  <label className="font-semibold text-lg" htmlFor="email">
                    Email*
                  </label>
                  <Field
                    className="border-none"
                    type="email"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    render={(msg) => (
                      <div className="text-[#FFC95F]">{msg}</div>
                    )}
                  />
                </div>

                <div className="flex flex-col md:max-w-[450px]">
                  <label className="font-semibold text-lg" htmlFor="password">
                    Password*
                  </label>
                  <Field
                    className="border-none"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    render={(msg) => (
                      <div className="text-[#FFC95F]">{msg}</div>
                    )}
                  />
                </div>

                <div className="flex flex-col md:max-w-[450px]">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password*
                  </label>
                  <Field
                    className="border-none"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    render={(msg) => (
                      <div className="text-[#FFC95F]">{msg}</div>
                    )}
                  />
                </div>

                <button
                  disabled={!isValid || isEmptyUser}
                  className={`${
                    isValid &&
                    !isEmptyUser &&
                    "hover:opacity-80 transition-opacity ease-in-out"
                  } md:mr-auto md:ml-0 min-h-[50px] bg-[#EEEEEE] rounded-[4px] ${
                    isValid && !isEmptyUser ? " opac-100" : "opacity-30"
                  } md:max-w-[450px] w-full text-[#393646]`}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;

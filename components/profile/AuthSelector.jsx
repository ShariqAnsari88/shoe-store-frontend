import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import login from '@/pages/api/auth/login'
import { useRouter } from "next/router";

function AuthSelector({ setChoice }) {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const isEmptyUser = Object.values(user).some((k) => k.length < 1);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  //=========================== Handler Functions START ============================//

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await login(user);
    router.reload()
    // Perform registration logic here
  };

  //=========================== Handler Functions END ============================//

  return (
    <div className="flex-1 flex-column space-y-5 md:max-w-[450px] mx-auto  p-[40px] shadow-md border-zinc-700 rounded-sm">
      <h1 className="font-semibold text-4xl text-center">Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <div className="flex-1">
            {isValid}
            <Form onChange={handleChange}>
              <div className="flex flex-col space-y-6 justify-center">
                <div className="flex flex-col">
                  <label className="font-semibold text-lg" htmlFor="username">
                    Username
                  </label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    render={(msg) => (
                      <div className="text-[#B22222]">{msg}</div>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-lg" htmlFor="password">
                    Password:
                  </label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    render={(msg) => (
                      <div className="text-[#B22222]">{msg}</div>
                    )}
                  />
                </div>

                <button
                  disabled={!isValid || isEmptyUser}
                  className={`${
                    isValid &&
                    !isEmptyUser &&
                    "hover:opacity-80 transition-opacity ease-in-out"
                  } md:mr-auto md:ml-0 min-h-[50px] bg-[#151718] rounded-[4px] ${
                    isValid && !isEmptyUser ? " opacity-100" : "opacity-30"
                  } md:max-w-[450px] w-full text-white`}
                  type="submit"
                >
                  Proceed
                </button>
                <div className="mx-auto">or</div>
                <button
                  onClick={setChoice}
                  className={`hover:opacity-80 transition-opacity ease-in-out md:mr-auto md:ml-0 min-h-[50px] bg-[#151718] rounded-[4px] md:max-w-[450px] w-full text-white`}
                  type="button"
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

export default AuthSelector;

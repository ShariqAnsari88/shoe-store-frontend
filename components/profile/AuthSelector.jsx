import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import login from "@/pages/api/auth/login";
import { useRouter } from "next/router";

function AuthSelector({ setChoice }) {
  const router = useRouter();
  
  const initialValues = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState({ ...initialValues });

  const isEmptyUser = Object.values(user).some((k) => k.length < 1);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Моля въведете потребителско име!"),
    password: Yup.string()
      .min(8, "Паролата трябва да съдържа поне 8 символа!")
      .required("Моля въведете парола!"),
  });

  //=========================== Handler Functions START ============================//

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await login(user);
    router.reload();
    // Perform registration logic here
  };

  const handleForgotPassword = async () => router.push("/forgot_password");

  //=========================== Handler Functions END ============================//

  return (
    <div className="bg-neonGreen flex-1 flex-column space-y-5 md:max-w-[450px] mx-auto  p-[40px] shadow-md border-zinc-700 rounded-sm">
      <h1 className="font-semibold text-4xl text-center text-[#F8F1F1]">
        Вход
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <div className="flex-1">
            <Form onChange={handleChange}>
              <div className="flex flex-col space-y-6 justify-center">
                <div className="flex flex-col">
                  <label
                    className="text-[#EEEEEE] font-semibold text-lg"
                    htmlFor="username"
                  >
                    Потребителско име
                  </label>
                  <Field
                    className="border-[#EEEEEE]"
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

                <div className="flex flex-col">
                  <label
                    className="text-[#EEEEEE] font-semibold text-lg"
                    htmlFor="password"
                  >
                    Парола
                  </label>
                  <Field
                    className="border-[#EEEEEE]"
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

                <button
                  disabled={!isValid || isEmptyUser}
                  className={`${
                    isValid &&
                    !isEmptyUser &&
                    "hover:opacity-80 transition-opacity ease-in-out"
                  } md:mr-auto md:ml-0 min-h-[50px] bg-[#EEEEEE] rounded-[4px] ${
                    isValid && !isEmptyUser ? " opacity-100" : "opacity-30"
                  } md:max-w-[450px] w-full text-[#181516]`}
                  type="submit"
                >
                  Влез
                </button>
                <div className="text-[#EEEEEE] text-center w-full">
                  Нямаш профил?
                  <div
                    onClick={setChoice}
                    className="ml-1 inline-block underline cursor-pointer"
                  >
                    Регистрирай се.
                  </div>
                </div>
                <div
                  onClick={handleForgotPassword}
                  className="text-[#EEEEEE] text-center w-full underline cursor-pointer"
                >
                  Забравена парола?
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AuthSelector;

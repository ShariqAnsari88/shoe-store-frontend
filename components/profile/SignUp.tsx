import registerUser from "@/pages/api/auth/register";
import { emailRegex } from "@/utils/regex";
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

  const isEmptyUser = Object.values(user).some((k) => k.length < 1);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Моля въведете потребителско име."),
    email: Yup.string()
      .required("Моля въведете e-mail адрес.")
      .matches(emailRegex, "Моля въведете валиден e-mail адрес."),
    password: Yup.string()
      .min(8, "Паролата трябва да бъде поне 8 символа.")
      .required("Моля въведете парола."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Паролите не съвпадат.")
      .required("Моля потвърдете паролата."),
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
      <h1 className="font-semibold text-4xl">Нов профил</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <div>
            <Form className="" onChange={handleChange}>
              <div className="flex flex-col space-y-6 bg-gradient-to-r from-[#0ba360] to-[#3cba92] md:max-w-[450px] p-6 rounded-md">
                <div className="flex  flex-col">
                  <label className="font-semibold text-lg" htmlFor="username">
                    Потребителско име*
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
                      <div className="text-errorYellow">{msg}</div>
                    )}
                  />
                </div>

                <div className="flex flex-col md:max-w-[450px]">
                  <label className="font-semibold text-lg" htmlFor="email">
                    E-mail адрес*
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
                      <div className="text-errorYellow">{msg}</div>
                    )}
                  />
                </div>

                <div className="flex flex-col md:max-w-[450px]">
                  <label className="font-semibold text-lg" htmlFor="password">
                    Парола*
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
                      <div className="text-errorYellow">{msg}</div>
                    )}
                  />
                </div>

                <div className="flex flex-col md:max-w-[450px]">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="confirmPassword"
                  >
                    Потвърди парола*
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
                      <div className="text-errorYellow">{msg}</div>
                    )}
                  />
                </div>

                <button
                  disabled={!isValid || isEmptyUser}
                  className={`${
                    isValid &&
                    !isEmptyUser &&
                    "hover:opacity-80 transition-opacity ease-in-out"
                  } md:mr-auto md:ml-0 min-h-[50px] bg-offWhite rounded-[4px] ${
                    isValid && !isEmptyUser ? " opac-100" : "opacity-30"
                  } md:max-w-[450px] w-full text-neonGreen`}
                  type="submit"
                >
                  Създай акаунт
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

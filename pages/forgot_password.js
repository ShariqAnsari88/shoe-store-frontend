import Wrapper from "@/components/Wrapper";
import { sendResetEmail } from "@/utils/api";
import { emailRegex } from "@/utils/regex";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const router = useRouter();
  const [userEmailInfo, setUserEmail] = useState({
    email: "",
  });

  const initialValues = {
    email: "",
  };

  const isEmptyUser = Object.values(userEmailInfo).some((k) => k.length < 1);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Моля въведете имейл адрес.")
      .matches(emailRegex, "Моля въведете валиден e-mail адрес."),
  });

  const handleChange = (e) => {
    setUserEmail({ ...userEmailInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await sendResetEmail(userEmailInfo.email)
      .then((res) => {
        toast.success(`Успешна заявка, моля проверете e-mail адресът си!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((e) => console.log(e, "Error sending email!"));
  };

  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <ToastContainer/>
        <div className="max-w-[600px] rounded-lg p-5 border text-offWhite border-offWhite mx-auto flex flex-col">
          <div className="text-2xl font-bold text-offWhite">
            Забравена парола?
          </div>
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
                      <label
                        className="text-offWhite font-semibold text-lg"
                        htmlFor="email"
                      >
                        E-mail адрес
                      </label>
                      <Field
                        className="border-offWhite"
                        type="text"
                        id="username"
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
                    <div className="text-base mt-5 text-offWhite">
                      Въведете имейл адреса предоставен при регистрацията си. Ще
                      изпратим имейл с инструкции за промяна на парола, на
                      посочения от вас адрес.
                    </div>

                    <button
                      disabled={!isValid || isEmptyUser}
                      className={`${
                        isValid &&
                        !isEmptyUser &&
                        "hover:opacity-80 transition-opacity ease-in-out"
                      } md:mr-auto md:ml-0 min-h-[50px] bg-offWhite rounded-[4px] ${
                        isValid && !isEmptyUser ? " opacity-100" : "opacity-30"
                      } w-full text-[#181516]`}
                      type="submit"
                    >
                      Изпрати
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </Wrapper>
    </div>
  );
};

export default ForgotPassword;

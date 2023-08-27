import Wrapper from "@/components/Wrapper";
import { changePassword } from "@/utils/api";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();
  const code = router.query?.code;

  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Паролата трябва да съдържа поне 8 символа.")
      .required("Моля въведете парола."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Паролите не съвпадат.")
      .required("Моля потвърдете паролата."),
  });

  const isEmptyPassword = Object.values(passwordInfo).some((k) => k.length < 1);

  const handleChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () =>
    await changePassword({ ...passwordInfo, code })
      .then(() => router.push("/profile"))
      .catch((e) => console.error(e,"Проблем със заявката :/"));

  return (
    <div className="min-h-[650px] mt-8 flex mb-10 md:mb-0">
      <Wrapper>
        <div className="bg-neonGreen flex-1 flex-column space-y-5 md:max-w-[450px] mx-auto  p-[40px] shadow-md border-zinc-700 rounded-sm">
          <h1 className="font-semibold text-3xl text-center text-[#F8F1F1]">
            Забравена парола
          </h1>
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
                        htmlFor="password"
                      >
                        Нова парола
                      </label>
                      <Field
                        className="border-offWhite"
                        type="text"
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

                    <div className="flex flex-col">
                      <label
                        className="text-offWhite font-semibold text-lg"
                        htmlFor="passwordConfirmation"
                      >
                        Потвърди парола
                      </label>
                      <Field
                        className="border-offWhite"
                        type="passwordConfirmation"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                      />
                      <ErrorMessage
                        name="passwordConfirmation"
                        component="div"
                        render={(msg) => (
                          <div className="text-[#FFC95F]">{msg}</div>
                        )}
                      />
                    </div>

                    <button
                      disabled={!isValid || isEmptyPassword}
                      className={`${
                        isValid &&
                        !isEmptyPassword &&
                        "hover:opacity-80 transition-opacity ease-in-out"
                      } md:mr-auto md:ml-0 min-h-[50px] bg-offWhite rounded-[4px] ${
                        isValid && !isEmptyPassword
                          ? " opacity-100"
                          : "opacity-30"
                      } md:max-w-[450px] w-full text-[#181516]`}
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

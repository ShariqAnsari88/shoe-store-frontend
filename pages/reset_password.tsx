import Wrapper from "@/components/Wrapper";
import { changePassword } from "@/utils/api";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ForgotPassword = () => {
  const router = useRouter();
  const { t } = useTranslation(["forms", "buttons"]);

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
      .min(8, t("password_min", { ns: "forms" }))
      .required(t("password_required", { ns: "forms" })),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), undefined], t("password_match", { ns: "forms" }))
      .required(t("password_confirm", { ns: "forms" })),
  });

  const isEmptyPassword = Object.values(passwordInfo).some((k) => k.length < 1);

  const handleChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () =>
    await changePassword({ ...passwordInfo, code })
      .then(() => router.push("/profile"))
      .catch((e) => console.error(e, "Error with request :/"));

  return (
    <div className="min-h-[650px] mt-8 flex mb-10 md:mb-0">
      <Wrapper>
        <div className="bg-gradient-to-r from-[#0ba360] to-[#3cba92] flex-1 flex-column space-y-5 md:max-w-[450px] mx-auto p-[40px] shadow-md border-zinc-700 rounded-sm">
          <h2 className="font-semibold text-3xl text-center text-[#F8F1F1]">
            Забравена парола
          </h2>
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
                        {t("new_password", { ns: "forms" })}
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
                          <div className="text-errorYellow">{msg}</div>
                        )}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="text-offWhite font-semibold text-lg"
                        htmlFor="passwordConfirmation"
                      >
                        {t("confirm_password", { ns: "forms" })}
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
                          <div className="text-errorYellow">{msg}</div>
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
                      {t("send", { ns: "buttons" })}
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

export async function getServerSideProps(ctx) {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["forms", "buttons"])),
      // Will be passed to the page component as props
    },
  };
}

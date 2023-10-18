import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { BsPhoneFill } from "react-icons/bs";
import { FaLocationArrow, FaTruckMoving } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { emailRegex } from "@/utils/regex";
import * as Yup from "yup";
import { sendContactEmail } from "@/utils/emailAPI";
import { useTranslation } from "next-i18next";
import Container from "@/components/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Textarea, Input } from "@material-tailwind/react";

export default function Contact() {
  const { t } = useTranslation(["forms", "buttons"]);

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("name_required")),
    subject: Yup.string().required(t("subject_required")),
    email: Yup.string()
      .required(t("email_required"))
      .matches(emailRegex, t("email_incorrect")),
    phone: Yup.number(t("phone_incorrect")).required(t("phone_required")),
    message: Yup.string()
      .required(t("message_required"))
      .min(10, t("message_min")),
  });

  const [contactForm, setContactForm] = useState({ ...initialValues });

  const isEmptyForm = Object.values(contactForm).some((k) => k.length < 1);

  const handleFormChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await sendContactEmail(contactForm);
  };

  return (
    <Container>
      <Wrapper>
        <div className="container p-4 my-12 grid sm:grid-cols-2 gap-4">
          <div className="bg-offWhite rounded p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold mb-4 text-neonGreen">
              {t("contact_us")}
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid, errors, handleBlur, handleChange }) => (
                <Form onChange={handleFormChange}>
                  <div className="mb-4">
                    <Input
                      className="bg-white"
                      label={t("firstName")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name}
                      type="text"
                      id="name"
                      name="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      label={t("email")}
                      error={errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      id="email"
                      name="email"
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      error={errors.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label={t("phoneNumber")}
                      type="tel"
                      id="phone"
                      name="phone"
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      error={errors.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="subject"
                      name="subject"
                      rows="4"
                      label={t("subject")}
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Textarea
                      error={errors.message}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label={t("message")}
                      id="message"
                      name="message"
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <button
                    disabled={!isValid || isEmptyForm}
                    type="submit"
                    className={`${
                      isValid && !isEmptyForm
                        ? "bg-neonGreen"
                        : "bg-neonGreen/[0.5]"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  >
                    {t("send", { ns: "buttons" })}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="h-full flex justify-between">
            <div className="grid w-full grid-cols-1 gap-4">
              {/* Safe Shopping Grid Card */}
              <div className="rounded-md p-6 bg-offWhite">
                <div className="flex flex-row items-center">
                  <BsPhoneFill color="#168900" />
                  <p className="text-xl text-neonGreen font-semibold leading-5 mt-6">
                    {t("phoneNumber")}
                  </p>
                </div>
                <p className="font-normal text-base leading-6 text-gray-600 my-4">
                  *
                </p>
              </div>

              {/* Personal Shopping Grid Card */}
              <div className="rounded-md p-6 bg-offWhite">
                <div className="flex flex-row items-center">
                  <FaLocationArrow color="#168900" />
                  <p className=" text-xl text-neonGreen font-semibold leading-5 mt-6">
                    {t("address")}
                  </p>
                </div>
                <p className="font-normal text-base leading-6 text-gray-600 my-4">
                  *
                </p>
              </div>

              {/* Free Shopping Grid Card */}
              <div className="rounded-md p-6 bg-offWhite">
                <div className="flex flex-row items-center">
                  <FaTruckMoving color="#168900" />
                  <p className=" text-xl text-neonGreen font-semibold leading-5 mt-6">
                    {t("email")}
                  </p>
                </div>
                <p className=" font-normal text-base leading-6 text-gray-600 my-4">
                  troyka@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "footer",
        "nav",
        "buttons",
        "forms",
        "banner",
      ])),
    },
  };
}

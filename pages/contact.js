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

export default function Contact() {
  const { t } = useTranslation("forms");

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Моля въведете вашето име!"),
    subject: Yup.string().required("Моля въведете тема на съобщението!"),
    email: Yup.string()
      .required("Моля въведете e-mail адрес!")
      .matches(emailRegex, "Моля въведете валиден e-mail адрес!"),
    phone: Yup.number("Моля използвайте валиден телефонен номер!").required(
      "Моля въведете телефонен номер!"
    ),
    message: Yup.string()
      .required("Моля въведете съобщение!")
      .min(10, "Трябва да въведете поне 10 символа."),
  });

  const [contactForm, setContactForm] = useState({ ...initialValues });

  const isEmptyForm = Object.values(contactForm).some((k) => k.length < 1);

  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => await sendContactEmail(contactForm);

  return (
    <Container>
      <Wrapper>
        <div class="container p-4 my-12 grid sm:grid-cols-2 gap-4">
          <div class="bg-offWhite rounded p-8 shadow-md">
            <h2 class="text-center text-2xl font-bold mb-4 text-neonGreen">
              Свържете се с нас!
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid }) => (
                <Form onChange={handleChange}>
                  <div class="mb-4">
                    <label
                      for="name"
                      className="text-neonGreen font-semibold block mb-2"
                    >
                      Име
                    </label>
                    <Field
                      onCha
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Пример"
                      class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      render={(msg) => (
                        <div className="text-darkRed">{msg}</div>
                      )}
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      for="email"
                      className="text-neonGreen font-semibold block mb-2"
                    >
                      E-mail адрес
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="пример@gmail.com"
                      className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      render={(msg) => (
                        <div className="text-darkRed">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      for="phone"
                      className="text-neonGreen font-semibold block mb-2"
                    >
                      Телефонен номер
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Вашият телефонен номер"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      render={(msg) => (
                        <div className="text-darkRed">{msg}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label
                      for="subject"
                      className="text-neonGreen font-semibold block mb-2"
                    >
                      Тема
                    </label>
                    <Field
                      id="subject"
                      name="subject"
                      rows="4"
                      placeholder="Въведете тема съобщението"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      render={(msg) => (
                        <div className="text-darkRed">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      for="message"
                      className="text-neonGreen font-semibold block mb-2"
                    >
                      Съобщение
                    </label>
                    <Field
                      id="message"
                      name="message"
                      rows="10"
                      placeholder="Примерно съобщение"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      render={(msg) => (
                        <div className="text-darkRed">{msg}</div>
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
                    Изпрати
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
                    Телефонен номер
                  </p>
                </div>
                <p className="font-normal text-base leading-6 text-gray-600 my-4">
                  +359877331274
                </p>
              </div>

              {/* Personal Shopping Grid Card */}
              <div className="rounded-md p-6 bg-offWhite">
                <div className="flex flex-row items-center">
                  <FaLocationArrow color="#168900" />
                  <p className=" text-xl text-neonGreen font-semibold leading-5 mt-6">
                    Адрес
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
                    E-mail адрес
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
        "cart",
        "footer",
        "nav",
        "buttons",
        "forms",
      ])),
    },
  };
}

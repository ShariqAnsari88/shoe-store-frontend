import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import {
  selectUserCredentials,
  updateCredentials,
} from "@/store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import { emailRegex } from "@/utils/regex";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import AddInfoButton from "./AddInfoButton";

function CredentialsForm({ disabled, setShowError }) {
  const dispatch = useDispatch();
  const { t } = useTranslation(["profile", "buttons", "forms"]);
  const credentialsInfo = useAppSelector(selectUserCredentials);
  const [isPressed, setIsPressed] = useState(false);
  const [shouldShowCredentialsInfo, setShouldShowCredentialsInfo] = useState(
    credentialsInfo ? true : false
  );
  const credentialsSaved = !!credentialsInfo;

  const labels = {
    firstName: t("firstName", { ns: "forms" }),
    secondName: t("secondName", { ns: "forms" }),
    company: t("company", { ns: "forms" }),
    phoneNumber: t("phoneNumber", { ns: "forms" }),
    email: t("email", { ns: "forms" }),
  };

  const initialValuesCredentials = {
    firstName: credentialsInfo?.firstName ?? "",
    secondName: credentialsInfo?.secondName ?? "",
    phoneNumber: credentialsInfo?.phoneNumber ?? "",
    email: credentialsInfo?.email ?? "",
  };

  const [credentials, setCredentials] = useState({
    ...initialValuesCredentials,
  });

  const isEmptyCredentials = Object.values(credentials).every(
    (k) => k.length < 1
  );

  const validationSchemaCredentials = Yup.object().shape({
    firstName: Yup.string().required(t("name_required", { ns: "forms" })),
    secondName: Yup.string().required(
      t("secondName_required", { ns: "forms" })
    ),
    phoneNumber: Yup.string().required(t("phone_required", { ns: "forms" })),
    email: Yup.string()
      .required(t("email_required", { ns: "forms" }))
      .matches(emailRegex, t("email_incorrect", { ns: "forms" })),
  });

  //=========================== Handler Functions START ============================//

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    dispatch(updateCredentials(credentials));

    setShouldShowCredentialsInfo(true);

    setShowError(false);

    toast.success(t("credentials_saved", { ns: "buttons" }), {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    // Perform registration logic here
  };

  //=========================== Handler Functions END ============================//

  if (shouldShowCredentialsInfo)
    return (
      <UserCredentials
        disabled={disabled}
        credentialsInfo={credentialsInfo}
        setShouldShowAddress={setShouldShowCredentialsInfo}
      />
    );

    if (!shouldShowCredentialsInfo && !isPressed) {
      return <AddInfoButton label={"credentials"} onPress={() => setIsPressed(!isPressed)}/>
    }

  return (
    <div className="bg-neonGreen flex-1 flex-column mt-4 space-y-2 p-[40px] shadow-md border-zinc-700 rounded-sm">
      <ToastContainer />
      <div className="flex items-center gap-2 mb-2 justify-center">
        <div>
          <FontAwesomeIcon color="#EEEEEE" icon={faUser} />
        </div>
        <h2 className="font-semibold text-xl text-[#F8F1F1]">
          {t("credentials", { ns: "forms" })}
        </h2>
      </div>
      <Formik
        initialValues={initialValuesCredentials}
        validationSchema={validationSchemaCredentials}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <div className="flex-1">
            <Form onChange={handleChange}>
              <div className="flex flex-col space-y-6 justify-center">
                {Object.keys(initialValuesCredentials).map((a) => (
                  <div key={a} className="flex flex-col">
                    <label
                      className="capitalize text-offWhite  text-sm"
                      htmlFor={a}
                    >
                      {labels[a]}
                    </label>
                    <Field
                      className="border-offWhite h-2"
                      type="text"
                      id={a}
                      name={a}
                    />
                    <ErrorMessage
                      name={a}
                      component="div"
                      render={(msg) => (
                        <div className="text-errorYellow">{msg}</div>
                      )}
                    />
                  </div>
                ))}
                <div className="flex flex-row gap-5">
                  <button
                    onClick={() =>
                      credentialsSaved
                        ? setShouldShowAddress(true)
                        : setIsPressed(false)
                    }
                    className={`hover:opacity-80 transition ease-in-out"
                   md:mr-auto md:ml-0 min-h-[50px] bg-[#181516] rounded-[4px] md:max-w-[450px] w-full text-offWhite`}
                    type="button"
                  >
                    {t("cancel", { ns: "buttons" })}
                  </button>

                  <button
                    disabled={!isValid || isEmptyCredentials}
                    className={`${
                      isValid &&
                      !isEmptyCredentials &&
                      "hover:opacity-80 transition-opacity ease-in-out"
                    } md:mr-auto md:ml-0 min-h-[50px] bg-offWhite rounded-[4px] ${
                      isValid && !isEmptyCredentials
                        ? " opacity-100"
                        : "opacity-30"
                    } md:max-w-[450px] w-full text-[#181516]`}
                    type="submit"
                  >
                    {t("save", { ns: "buttons" })}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export const UserCredentials = ({
  disabled,
  credentialsInfo,
  setShouldShowAddress,
}) => {
  const { t } = useTranslation(["profile", "buttons"]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-neonGreen w-8 h-8 rounded-full flex items-center justify-center">
          <FontAwesomeIcon color="#EEEEEE" icon={faUser} />
        </div>
        <h2 className="text-offWhite text-xl font-semibold">
          {t("credentials", { ns: "forms" })}
        </h2>
      </div>
      <div className="relative">
        <button
          className={`${
            disabled ? "pointer-events-none" : ""
          } w-8 hover:bg-black/[0.1] transition ease-in-out bg-transparent rounded-full h-8 top-2 absolute right-2`}
          name="button"
          onClick={() => setShouldShowAddress(false)}
        >
          <FontAwesomeIcon color="#151718" icon={faPenToSquare} />
        </button>

        <div
          className={`${
            disabled ? "opacity-60" : "opacity-100"
          } transition ease-in-out bg-offWhite p-4 rounded-md flex flex-col gap-1`}
        >
          <div className="text-[#151718] font-semibold">{`${credentialsInfo.firstName} ${credentialsInfo.secondName}`}</div>
          {credentialsInfo.company && <div>{`${credentialsInfo.company}`}</div>}
          <div className="text-[#151718]">{`${credentialsInfo.email}`}</div>
          <div className="text-[#151718]">{`${credentialsInfo.phoneNumber}`}</div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsForm;

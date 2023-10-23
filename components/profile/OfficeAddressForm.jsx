import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectOfficeAddress, updateOfficeAddres } from "@/store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer } from "react-toastify";
import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function OfficeAddressForm({ disabled, setShowError }) {
  const dispatch = useDispatch();
  const { t } = useTranslation(["profile", "buttons", "forms"]);
  const officeAddressInfo = useAppSelector(selectOfficeAddress);
  const [shouldShowAddress, setShouldShowAddress] = useState(
    officeAddressInfo ? true : false
  );

  const labels = {
    officeAddress: t("officeAddress", { ns: "forms" }),
  };

  const initialValues = {
    officeAddress: officeAddressInfo?.officeAddress ?? "",
  };

  const [address, setAddress] = useState({ ...initialValues });

  const isEmptyAddress = Object.values(address).every((k) => k.length < 1);
  const addressSaved = !!officeAddressInfo;

  const validationSchema = Yup.object().shape({
    officeAddress: Yup.string()
      .required(t("officeAddress_required", { ns: "forms" }))
      .min(10, t("officeAddress_min", { ns: "forms" })),
  });

  //=========================== Handler Functions START ============================//

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    dispatch(updateOfficeAddres(address));
    setShouldShowAddress(true);
    setShowError(false);

    toast.success(t("address_saved", { ns: "buttons" }), {
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

  if (shouldShowAddress)
    return (
      <OfficeAddressInfo
        disabled={disabled}
        officeAddressInfo={officeAddressInfo}
        setShouldShowAddress={setShouldShowAddress}
      />
    );

  return (
    <div className="bg-neonGreen flex-1 flex-column space-y-2 p-[40px] shadow-md border-zinc-700 rounded-sm">
      <ToastContainer />
      <div className="flex items-center gap-2 mb-2 justify-center">
        <div>
          <FontAwesomeIcon color="#EEEEEE" icon={faLocationDot} />
        </div>
        <h2 className="font-semibold text-xl text-[#F8F1F1]">
          {t("officeAddress", { ns: "forms" })}
        </h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <div className="flex-1">
            <Form onChange={handleChange}>
              <div className="flex flex-col space-y-6 justify-center">
                {Object.keys(initialValues).map((a) => (
                  <div key={a} className="flex flex-col">
                    <label
                      className="capitalize text-offWhite text-sm"
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
                      addressSaved ? setShouldShowAddress(true) : null
                    }
                    className={`
                   hover:opacity-80
                   transition 
                   ease-in-out"
                   md:mr-auto 
                   md:ml-0 
                   min-h-[50px] 
                   bg-[#181516] 
                   rounded-[4px] 
                   md:max-w-[450px] 
                   w-full 
                   text-offWhite
                   `}
                    type="button"
                  >
                    {t("cancel", { ns: "buttons" })}
                  </button>

                  <button
                    disabled={!isValid || isEmptyAddress}
                    className={`${
                      isValid &&
                      !isEmptyAddress &&
                      "hover:opacity-80 transition-opacity ease-in-out"
                    } md:mr-auto md:ml-0 min-h-[50px] bg-offWhite rounded-[4px] ${
                      isValid && !isEmptyAddress ? " opacity-100" : "opacity-30"
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

export const OfficeAddressInfo = ({
  disabled,
  officeAddressInfo,
  setShouldShowAddress,
}) => {
  const { t } = useTranslation(["profile", "buttons"]);
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-neonGreen w-8 h-8 rounded-full flex items-center justify-center">
          <FontAwesomeIcon color="#EEEEEE" icon={faTruck} />
        </div>
        <h2 className="text-offWhite text-xl font-semibold">
          {t("officeAddress", { ns: "forms" })}
        </h2>
      </div>
      <div className="relative">
        <button
          className={`${
            disabled ? "pointer-events-none" : "pointer-events-auto"
          }
          w-8 
          hover:bg-black/[0.1] 
          transition 
          ease-in-out 
          bg-transparent 
          rounded-full 
          h-8 
          top-2 
          absolute 
          right-2`}
          name="button"
          onClick={() => setShouldShowAddress(false)}
        >
          <FontAwesomeIcon color="#151718" icon={faPenToSquare} />
        </button>

        <div
          className={`${
            disabled
              ? "opacity-60 pointer-events-none"
              : "opacity-100 border-[2px] border-neonGreen"
          } bg-offWhite p-4 rounded-md flex flex-col gap-1`}
        >
          <div className="text-[#151718]">
            {officeAddressInfo.officeAddress}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeAddressForm;

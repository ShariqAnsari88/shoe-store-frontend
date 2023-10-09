import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectUserAddress, updateAddress } from "@/store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { emailRegex } from "@/utils/regex";
import { ToastContainer } from "react-toastify";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function AddressForm({ setShowError }) {
  const dispatch = useDispatch();
  const { t } = useTranslation(["profile", "buttons", "forms"]);
  const addressInfo = useAppSelector(selectUserAddress);
  const [shouldShowAddress, setShouldShowAddress] = useState(
    addressInfo ? true : false
  );

  const labels = {
    firstName: t("firstName", { ns: "forms" }),
    secondName: t("secondName", { ns: "forms" }),
    company: t("company", { ns: "forms" }),
    street: t("street", { ns: "forms" }),
    streetNumber: t("streetNumber", { ns: "forms" }),
    houseNumber: t("houseNumber", { ns: "forms" }),
    city: t("city", { ns: "forms" }),
    postalCode: t("postalCode", { ns: "forms" }),
    phoneNumber: t("phoneNumber", { ns: "forms" }),
    email: t("email", { ns: "forms" }),
  };

  const initialValues = {
    firstName: addressInfo?.firstName ?? "",
    secondName: addressInfo?.secondName ?? "",
    city: addressInfo?.city ?? "",
    company: addressInfo?.company ?? "",
    street: addressInfo?.street ?? "",
    streetNumber: addressInfo?.streetNumber ?? "",
    houseNumber: addressInfo?.houseNumber ?? "",
    postalCode: addressInfo?.postalCode ?? "",
    phoneNumber: addressInfo?.phoneNumber ?? "",
    email: addressInfo?.email ?? "",
  };

  const [address, setAddress] = useState({ ...initialValues });

  const isEmptyAddress = Object.values(address).every((k) => k.length < 1);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("name_required", { ns: "forms" })),
    secondName: Yup.string().required(
      t("secondName_required", { ns: "forms" })
    ),
    company: Yup.string().optional(),
    city: Yup.string()
      .required(t("city_required", { ns: "forms" }))
      .min(4, t("city_min", { ns: "forms" })),
    street: Yup.string().required(t("street_required", { ns: "forms" })),
    streetNumber: Yup.string().required(
      t("streetNumber_required", { ns: "forms" })
    ),
    houseNumber: Yup.string().required(t("house_required", { ns: "forms" })),
    postalCode: Yup.string().required(t("postal_required", { ns: "forms" })),
    phoneNumber: Yup.string().required(t("phone_required", { ns: "forms" })),
    email: Yup.string()
      .required(t("email_required", { ns: "forms" }))
      .matches(emailRegex, t("email_incorrect", { ns: "forms" })),
  });

  //=========================== Handler Functions START ============================//

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    dispatch(updateAddress(address));

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
      <AddressInfo
        addressInfo={addressInfo}
        setShouldShowAddress={setShouldShowAddress}
      />
    );

  return (
    <div className="bg-neonGreen flex-1 flex-column mt-4 space-y-2 p-[40px] shadow-md border-zinc-700 rounded-sm">
      <ToastContainer />
      <div className="flex items-center gap-2 mb-2 justify-center">
        <div>
          <FontAwesomeIcon color="#EEEEEE" icon={faLocationDot} />
        </div>
        <h2 className="font-semibold text-xl text-[#F8F1F1]">
          {t("address", { ns: "forms" })}
        </h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <div className="flex-1">
            <div>{isValid}</div>
            <Form onChange={handleChange}>
              <div className="flex flex-col space-y-6 justify-center">
                {Object.keys(initialValues).map((a) => (
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
                    onClick={() => setShouldShowAddress(true)}
                    className={`hover:opacity-80 transition ease-in-out"
                   md:mr-auto md:ml-0 min-h-[50px] bg-[#181516] rounded-[4px] md:max-w-[450px] w-full text-offWhite`}
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

export const AddressInfo = ({ addressInfo, setShouldShowAddress }) => {
  const { t } = useTranslation(["profile", "buttons"]);
  return (
    <div className="h-60">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-neonGreen w-8 h-8 rounded-full flex items-center justify-center">
          <FontAwesomeIcon color="#EEEEEE" icon={faLocationDot} />
        </div>
        <h2 className="text-offWhite text-xl font-semibold">
          {t("address", { ns: "forms" })}
        </h2>
      </div>
      <div className="relative">
        <button
          className="w-8  hover:bg-black/[0.1] transition ease-in-out bg-transparent rounded-full h-8 top-2 absolute right-2"
          name="button"
          onClick={() => setShouldShowAddress(false)}
        >
          <FontAwesomeIcon color="#151718" icon={faPenToSquare} />
        </button>

        <div className="bg-offWhite p-4 rounded-md flex flex-col gap-1">
          <div className="text-[#151718] font-semibold">{`${addressInfo.firstName} ${addressInfo.secondName}`}</div>
          {addressInfo.company && <div>{`${addressInfo.company}`}</div>}
          <div className="text-[#151718]">{`${addressInfo.email}`}</div>
          <div className="text-[#151718]">{`${addressInfo.phoneNumber}`}</div>
          <br />
          <div className="text-[#151718]">{addressInfo.city}</div>
          <div className="text-[#151718]">{`${addressInfo.postalCode}`}</div>
          <div className="text-[#151718]">{`${addressInfo.street} ${addressInfo.streetNumber}`}</div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;

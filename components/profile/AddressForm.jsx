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

const initialValues = {
  firstName: "",
  secondName: "",
  city: "",
  company: "",
  street: "",
  streetNumber: "",
  houseNumber: "",
  postalCode: "",
  phoneNumber: "",
  email: "",
};

const labels = {
  firstName: "Име*",
  secondName: "Фамилия*",
  company: "Компания",
  street: "Улица*",
  streetNumber: "Номер на улица*",
  houseNumber: "Номерн а вход/блок*",
  city: "Местонахождение*",
  postalCode: "Пощенски код*",
  phoneNumber: "Телфонен номер*",
  email: "E-mail адрес",
};

function AddressForm({ setShowError }) {
  const dispatch = useDispatch();
  const addressInfo = useAppSelector(selectUserAddress);
  const [shouldShowAddress, setShouldShowAddress] = useState(
    addressInfo ? true : false
  );

  const [address, setAddress] = useState({ ...initialValues });

  const isEmptyAddress = Object.values(address).every((k) => k.length < 1);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Моля, въведете име,"),
    secondName: Yup.string().required("Моля, въведете фамилия."),
    company: Yup.string().optional(),
    city: Yup.string()
      .required("Моля, въведете град.")
      .min(4, "Градът трябва да съдържа поне 4 символа."),
    street: Yup.string().required(),
    streetNumber: Yup.string().required("Моля, въведете номер на улица."),
    houseNumber: Yup.string().required("Моля, въведете номер на вход/блок."),
    postalCode: Yup.string().required("Моля, въведете пощенски код."),
    phoneNumber: Yup.string().required("Моля, въведете телефонен номер."),
    email: Yup.string()
      .required("Моля, въведете e-mail адрес.")
      .matches(emailRegex, "Моля, въведете валиден e-mail адрес."),
  });

  //=========================== Handler Functions START ============================//

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    dispatch(updateAddress(address));

    setShouldShowAddress(true);

    setShowError(false);

    toast.success(`Адресът е запазен!`, {
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
    <div className="bg-neonGreen flex-1 flex-column mt-4 space-y-2 md:max-w-[450px] p-[40px] shadow-md border-zinc-700 rounded-sm">
      <ToastContainer />
      <h1 className="font-semibold text-xl text-center text-[#F8F1F1]">
        Адрес
      </h1>
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
                      className="capitalize text-[#EEEEEE]  text-sm"
                      htmlFor={a}
                    >
                      {labels[a]}
                    </label>
                    <Field
                      className="border-[#EEEEEE] h-2"
                      type="text"
                      id={a}
                      name={a}
                    />
                    <ErrorMessage
                      name={a}
                      component="div"
                      render={(msg) => (
                        <div className="text-[#FFC95F]">{msg}</div>
                      )}
                    />
                  </div>
                ))}
                <div className="flex flex-row gap-5">
                  <button
                    onClick={() => setShouldShowAddress(true)}
                    className={`hover:opacity-80 transition-opacity ease-in-out"
                   md:mr-auto md:ml-0 min-h-[50px] bg-[#181516] rounded-[4px] md:max-w-[450px] w-full text-[#EEEEEE]`}
                    type="button"
                  >
                    Отказ
                  </button>

                  <button
                    disabled={!isValid || isEmptyAddress}
                    className={`${
                      isValid &&
                      !isEmptyAddress &&
                      "hover:opacity-80 transition-opacity ease-in-out"
                    } md:mr-auto md:ml-0 min-h-[50px] bg-[#EEEEEE] rounded-[4px] ${
                      isValid && !isEmptyAddress ? " opacity-100" : "opacity-30"
                    } md:max-w-[450px] w-full text-[#181516]`}
                    type="submit"
                  >
                    Запази
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
  return (
    <div className="h-60">
      <div className="text-[#EEEEEE] text-xl font-semibold mb-2">Адрес</div>
      <div className="relative">
        <button
          className="w-8  hover:bg-black/[0.1] bg-transparent rounded-full h-8 top-2 absolute right-2"
          name="button"
          onClick={() => setShouldShowAddress(false)}
        >
          <FontAwesomeIcon color="#151718" icon={faPenToSquare} />
        </button>

        <div className="bg-[#EEEEEE] p-4 rounded-md flex flex-col gap-1">
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

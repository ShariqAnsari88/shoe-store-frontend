import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'

import Wrapper from '@/components/Wrapper'
import { sendResetEmail } from '@/utils/api'
import { emailRegex } from '@/utils/regex'

import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const { t } = useTranslation([ 'forms', 'buttons' ])
  const [ userEmailInfo, setUserEmail ] = useState({
    email: ''
  })

  const initialValues = {
    email: ''
  }

  const isEmptyUser = Object.values(userEmailInfo).some((k) => k.length < 1)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('email_required'))
      .matches(emailRegex, t('email_incorrect'))
  })

  const handleChange = (e) => {
    setUserEmail({ ...userEmailInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    await sendResetEmail(userEmailInfo.email)
      .then(() => {
        toast.success(t('success_request', { ns: 'buttons' }), {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        })
      })
      .catch((e) => console.log(e, 'Error sending email!'))
  }

  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <>
          <ToastContainer />
          <div className="max-w-[600px] rounded-lg p-5 border text-offWhite border-offWhite mx-auto flex flex-col">
            <div className="text-2xl font-bold text-offWhite">
              {t('forgot_password')}
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
                          {t('email')}
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
                            <div className="text-errorYellow">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="text-base mt-5 text-offWhite">
                        {t('address_registration')}
                      </div>

                      <button
                        disabled={!isValid || isEmptyUser}
                        className={`${
                          isValid &&
                        !isEmptyUser &&
                        'hover:opacity-80 transition-opacity ease-in-out'
                        } md:mr-auto md:ml-0 min-h-[50px] bg-offWhite rounded-[4px] ${
                          isValid && !isEmptyUser ? ' opacity-100' : 'opacity-30'
                        } w-full text-[#181516]`}
                        type="submit"
                      >
                        {t('send', { ns: 'buttons' })}
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </>
      </Wrapper>
    </div>
  )
}

export default ForgotPassword

export async function getServerSideProps(ctx) {
  const { locale } = ctx

  return {
    props: {
      ...(await serverSideTranslations(locale, [ 'forms', 'buttons' ]))
      // Will be passed to the page component as props
    }
  }
}

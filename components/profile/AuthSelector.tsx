import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import * as Yup from 'yup'

import login from '@/pages/api/auth/login'


interface Props {
  choice?: string
  setChoice: () => void
}

function AuthSelector({ setChoice }: Props) {
	const router = useRouter()
	const { t } = useTranslation(['forms', 'buttons'])

	const initialValues = {
		username: '',
		password: '',
	}

	const [user, setUser] = useState({ ...initialValues })

	const isEmptyUser = Object.values(user).some((k) => k.length < 1)

	const validationSchema = Yup.object().shape({
		username: Yup.string().required(t('username_required')),
		password: Yup.string()
			.min(8, t('password_min'))
			.required(t('password_required')),
	})

	//=========================== Handler Functions START ============================//

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const handleSubmit = async () => {
		await login(user)
		router.reload()
		// Perform registration logic here
	}

	const handleForgotPassword = async () => router.push('/forgot_password')

	//=========================== Handler Functions END ============================//

	return (
		<div className="
    bg-gradient-to-r from-[#0ba360] to-[#3cba92] 
    flex-1
    flex-column 
    space-y-5 
    md:max-w-[450px] 
    mx-auto 
    p-[40px] 
    shadow-md 
    rounded-sm">
			<h2 className="font-semibold text-4xl text-center text-[#F8F1F1]">
        Вход
			</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isValid }) => (
					<div className="flex-1">
						<Form onChange={handleChange}>
							<div className="flex flex-col space-y-6 justify-center">
								<div className="flex flex-col">
									<label
										className="text-offWhite font-semibold text-lg"
										htmlFor="username"
									>
										{t('username', { ns: 'forms' })}
									</label>
									<Field
										className="border-offWhite"
										type="text"
										id="username"
										name="username"
									/>
									<ErrorMessage
										name="username"
										component="div"
										render={(msg) => (
											<div className="text-errorYellow">{msg}</div>
										)}
									/>
								</div>

								<div className="flex flex-col">
									<label
										className="text-offWhite font-semibold text-lg"
										htmlFor="password"
									>
										{t('password', { ns: 'forms' })}
									</label>
									<Field
										className="border-offWhite"
										type="password"
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

								<button
									disabled={!isValid || isEmptyUser}
									className={`${
										isValid &&
                    !isEmptyUser &&
                    'hover:opacity-80 transition-opacity ease-in-out'
									} md:mr-auto md:ml-0 min-h-[50px] bg-offWhite rounded-[4px] ${
										isValid && !isEmptyUser ? ' opacity-100' : 'opacity-30'
									} md:max-w-[450px] w-full text-[#181516]`}
									type="submit"
								>
                  Влез
								</button>
								<div className="text-offWhite text-center w-full">
									{t('no_profile', { ns: 'forms' })}
									<div
										onClick={setChoice}
										className="ml-1 inline-block underline cursor-pointer"
									>
										{t('register', { ns: 'forms' })}
									</div>
								</div>
								<div
									onClick={handleForgotPassword}
									className="text-offWhite text-center w-full underline cursor-pointer"
								>
									{t('forgot_password', { ns: 'forms' })}
								</div>
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	)
}

export default AuthSelector

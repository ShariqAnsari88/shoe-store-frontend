import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'


import { sendSubscriptionEmail } from '@/utils/api'
import { sendContactEmail } from '@/utils/emailAPI'
import { emailRegex } from '@/utils/regex'
import { errorConfig, successConfig } from '@/utils/toastConfig'

import Divider from '../Divider'
import HeroBanner from '../HeroBanner'
import LanguageSwitcher from '../lang/LanguageSwitcher'
import Wrapper from '../Wrapper'


export default function ComingSoon() {
	const { locale } = useRouter()
	const { t } = useTranslation(['coming_soon', 'buttons'])
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [hasError, setError] = useState(false)

	const onSubmit = async (e) => {
		setIsLoading(true)
		e?.preventDefault()

		if (!emailRegex.test(email)) {
			setError(true)
			setIsLoading(false)
		} else {
			await sendSubscriptionEmail('/api/subscriptions', {
				email,
			})
				.then((r) => {
					if (r.error) {
						toast.error(t('failed_subscribe', { ns: 'buttons' }), errorConfig)
						setIsLoading(false)
						setEmail('')
					} else {
						try {
							sendContactEmail({ type: 'subscribe', email, locale })
							toast.success(
								t('success_subscribe', { ns: 'buttons' }),
								successConfig
							)
							setIsLoading(false)
							setEmail('')
						} catch (error) {
							toast.error(
								t('failed_subscribe', { ns: 'buttons' }),
								errorConfig
							)
							setIsLoading(false)
							setEmail('')
						}
					}
				})
				.catch(() => {
					setIsLoading(false)
					setEmail('')
					toast.error(t('failed_subscribe', { ns: 'buttons' }), errorConfig)
				})
		}
	}

	const handleChange = (e) => {
		setEmail(e.target.value)

		if (!emailRegex.test(e.target.value)) {
			setError(true)
		} else {
			setError(false)
		}
	}

	return (
		<Wrapper className="flex flex-col md:flex-row max-w-full h-screen justify-around items-center gap-12 md:my-0 ">
			<ToastContainer />
			<div className="flex flex-col items-center md:gap-0 gap-10 h-full">
				<HeroBanner />
				<div className="md:mt-12">
					<Image width="70" height="70" alt="img" src="/logo-white.png" />
				</div>
				<div className="text-center flex flex-1 flex-col items-center justify-center">
					<h1 className="mb-2 font-semibold text-center text-[42px] sm:text-[50px] md:text-[82px]">
						{t('welcome')}
					</h1>
					<Divider />
					<p className="md:text-[18px] text-[18px] mb-12 md:max-w-[600px] max-w-[90%]">
						{t('description')}
					</p>
					<div className="flex flex-col gap-2 mb-12">
						<div className="flex max-h-10 items-center justify-center gap-2 w-full">
							<input
								value={email}
								name="email"
								id="email"
								onChange={handleChange}
								className="rounded-full text-sm md:w-80 p-2 border-[2px] border-neonGreen"
							/>

							<button
								type="button"
								disabled={isLoading || hasError ? true : false}
								onClick={onSubmit}
								className={`rounded-full h-full w-24 ${
									isLoading || hasError ? 'disabled' : ''
								}   
                ${
		isLoading || hasError
			? 'bg-darkBlack'
			: 'bg-gradient-to-r from-[#0ba360] to-[#3cba92]'
		}
                ${isLoading || hasError ? ' border-[1px]' : 'border-0'}
                text-offWhite
                 text-[12px]
                font-semibold
                transition
                ease-in-out 
                active:scale-95
                hover:opacity-75
                text-center
              `}
							>
								{isLoading ? (
									<svg
										aria-hidden="true"
										role="status"
										className="inline w-4 h-4 text-white animate-spin"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="#E5E7EB"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentColor"
										/>
									</svg>
								) : (
									t('sign')
								)}
							</button>
						</div>
						{hasError ? (
							<div className="text-left text-errorYellow md:text-md text-sm font-semibold">
								{t('error')}
							</div>
						) : null}
					</div>
					<div className="flex flex-col justify-center items-center gap-10">
						<LanguageSwitcher />
						<div
							onClick={() =>
								window.open('https://www.instagram.com/troykawear/')
							}
							className="
         w-10 
         h-10
         mb-10
         md:mb-12
         rounded-full
         bg-white/[0.25] 
         transition 
         ease-in-out 
         flex 
         items-center 
         justify-center 
         hover:text-white/[0.5] cursor-pointer"
						>
							<FaInstagram size={20} />
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

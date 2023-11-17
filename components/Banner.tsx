import { XMarkIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'

import { useAppDispatch } from '@/helpers/store'
import useCurrency from '@/hooks/useCurrency'
import { useAppSelector } from '@/store/hooks'
import { selectShowBanner, setShowBanner } from '@/store/uiSlice'

export default function Banner() {
	const dispatch = useAppDispatch()
	const shouldShowBanner = useAppSelector(selectShowBanner)
	const { currency } = useCurrency()
	const { t } = useTranslation('banner')

	if (!shouldShowBanner) return null

	return (
		<div className="relative isolate flex  sm:flex-row justify-between items-center gap-2 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5">
			<div className="w-6 h-6 md:w-12 md:h-12" />

			<div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
				<div className="flex justify-center items-center  sm:flex-row gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="#181516"
						className="sm:w-8 w-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<svg
						viewBox="0 0 2 2"
						className="mx-2 inline h-0.5 w-0.5 fill-current"
						aria-hidden="true"
					>
						<circle cx={1} cy={1} r={1} />
					</svg>
					<p className="text-sm md:text-lg leading-6 text-gray-900 font-semibold uppercase">
						{t('description')}
					</p>

					<div className="uppercase ml-4 cursor-pointer font-semibold flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm md:text-lg font-phlatt-9000 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
            50 {currency}
					</div>
				</div>
			</div>
			<button
				onClick={() => dispatch(setShowBanner(false))}
				type="button"
				className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
			>
				<XMarkIcon className="sm:w-7 w-6 text-gray-900" aria-hidden="true" />
			</button>
		</div>
	)
}

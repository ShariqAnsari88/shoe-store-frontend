import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

export default function Exclaimer() {
	const { t } = useTranslation(['common'])
	return (
		<div className="
    mx-auto
    bg-offWhite
    rounded-md 
    px-4
    py-2
    mb-4
    flex
    items-center 
    justify-between 
    gap-4">
			<FontAwesomeIcon size="xl" className="text-darkBlack shadow-md rounded-full" icon={faCircleExclamation} />
			<div className="text-darkBlack text-[14px]">
				{t('shipping_exclaimer')}
			</div>
		</div>
	)
}

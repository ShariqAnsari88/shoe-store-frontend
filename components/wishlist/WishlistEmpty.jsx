import { faHeartCrack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const WishlistEmpty = () => {
  const { t } = useTranslation([ 'wishlist', 'buttons' ])
  return (
    <div className="flex-1 flex flex-col items-center">
      <FontAwesomeIcon
        color="#EEEEEE"
        icon={faHeartCrack}
        className="w-20 md:w-40 flex flex-1"
      />
      <span className="text-offWhite text-xl font-bold">{t('empty')}</span>
      <span className="text-offWhite text-center mt-4 max-w-md">
        {t('empty_description')}
      </span>
      <Link
        href="/"
        className="
        rounded-full
        py-4
        px-8 
        bg-gradient-to-r 
        from-[#0ba360] 
        to-[#3cba92] 
        text-offWhite 
        font-semibold
        transition 
        ease-in-out 
        active:scale-95 
        mb-3 
        hover:opacity-75 
        mt-8"
      >
        {t('continue', { ns: 'buttons' })}
      </Link>
    </div>
  )
}

export default WishlistEmpty

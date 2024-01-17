/* eslint-disable react/prop-types */
import { Variants, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import useCurrency from '@/hooks/useCurrency'
import { getDiscountedPricePercentage } from '@/utils/helper'

const ProductCard = ({
  data: { attributes: p },
  isCarouselCard,
  border,
  mIndex // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const variants: Variants = {
    initial: {
      opacity: 0,
      transition: { duration: 0.5 }
    },
    initialCarousel: {
      opacity: 1
    },
    animate: () => ({
      opacity: 1,
      transition: { delay: 0.15 * mIndex }
    })
  }

  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router
  const { currency } = useCurrency()
  const discount = Number(
    getDiscountedPricePercentage(p.original_price, p.price)
  )

  const disabled: boolean = p.outOfStock

  return (
    <motion.div
      variants={variants}
      initial={!isCarouselCard ? 'initial' : 'initialCarousel'}
      whileInView={!isCarouselCard ? 'animate' : undefined}
      viewport={{ once: true }}
      className={`${isCarouselCard && 'h-[500px] w-[450px]'} 
      relative
      overflow-hidden
    bg-darkBlack
      transition 
      ease-in-out duration-300
      drop-shadow-2xl
   ${
    disabled
      ? 'hover:scale-1 pointer-events-none cursor-auto'
      : 'sm:hover:scale-105 hover:-translate-y-5'
    }
   cursor-pointer
   `}
    >
      <Link href={{ pathname: `/product/${p.slug}` }} locale={locale}>
        {disabled && (
          <div
            className="
       absolute 
       z-10 
       inset-0
       flex 
       flex-1
       flex-col
       items-center
       justify-center
      text-white
       font-bold
       top-50"
          >
            <div className="bg-black p-2 text-center">{t('out_of_stock')}</div>
          </div>
        )}
        <div
          className={` ${
            isCarouselCard &&
            'sm:border-[2px] sm:border-white sm:w-[250px] sm:min-h-[500px]'
          } 
        ${border ?? 'border-[2px] border-white'}`}
        >
          {disabled && <div className="inset-0 absolute bg-white opacity-50" />}
          <Image
            className={'bg-cover'}
            width={isCarouselCard ? 250 : 400}
            height={isCarouselCard ? 250 : 400}
            src={p.thumbnail.data.attributes.url}
            alt={p.name ?? 'No Photo'}
          />
          <div className="justify-end flex-col p-4 text-offWhite/[0.9]">
            <h2 className="text-lg text-transparent  bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92] font-bold">
              {p.name}
            </h2>
            <div className="flex items-center justify-between flex-row sm:flex-row text-black/[0.5]">
              <div className="flex flex-row">
                <p className="mr-2 text-lg font-semibold">
                  {p.price} {currency}
                </p>

                {discount > 0 && (
                  <p className="text-base font-normal line-through">
                    {p.original_price} {currency}
                  </p>
                )}
              </div>
              {p.original_price && (
                <>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <p className="text-base font-semibold rounded-md bg-orange-400 p-[5px] text-white">
                        -{discount}%
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard

import {
  useScroll,
  useMotionValueEvent,
  motion,
  Variant
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '@/helpers/store'
import useWindowSize from '@/hooks/useWindowSize'
import { useAppSelector } from '@/store/hooks'
import { setShowBanner } from '@/store/uiSlice'
import { selectWishlistItems } from '@/store/wishlistSlice'
import { fetchDataFromApi } from '@/utils/api'

import Additional from './Additional'
import Banner from '../Banner'
import LanguageSwitcher from '../lang/LanguageSwitcher'
import Menu from '../Menu'
import MenuMobile from '../MenuMobile'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const { scrollY } = useScroll()
  const [ hidden, setHidden ] = useState(false)
  const { isMobile, isTablet } = useWindowSize()

  const { cartItems } = useSelector((state: RootState) => state.cart)
  const wishlistItems = useAppSelector(selectWishlistItems)

  const [ mobileMenu, setMobileMenu ] = useState(false)
  const [ showCatMenu, setShowCatMenu ] = useState(false)
  const [ categories, setCategories ] = useState(null)

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi(
      `/api/categories?populate=*&locale=${locale}`
    )
    setCategories(data)
  }

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious()

    if ( current > 35 && !isTablet && !isMobile) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    fetchCategories()
  }, [ locale ])

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setShowBanner(true))
    }, 900000)

    return () => clearTimeout(timer)
  }, [])

  let variants: Record<string, { visible: Variant; hidden: Variant }> = {}

  if (!isMobile && !isTablet) {
    variants = {
      header: {
        visible: { height: 200, y: 0 },
        hidden: { height: 0, y: -400 }
      },
      upper: {
        visible: { y: 0, height: 130 },
        hidden: { height: 0, y: 0 }
      },
      lower: {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -200, opacity: 0 }
      },
      additional: {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -200, opacity: 0 }
      },
      lowerSides: {
        visible: { opacity: 0 },
        hidden: { opacity: 1 }
      }
    }
  }

  return (
    <div>
      <motion.header
        variants={variants.header}
        transition={{ duration: 0.35, ease: 'anticipate' }}
        className={`
        ${'bg-gradient-to-r from-[#0ba360] to-[#3cba92]'}
        w-full 
        pb-1
        flex 
        flex-col 
        items-center 
        justify-center 
        z-10
        fixed 
        top-0
        duration-300
        `}
      >
        <Banner />

        <motion.div
          animate={hidden ? 'hidden' : 'visible'}
          variants={variants.upper}
          transition={{ duration: 0.35, ease: 'anticipate' }}
          className="w-full  md:max-h-full max-h-12 z-12 bg-darkBlack"
        >
          <motion.div
            animate={hidden ? 'hidden' : 'visible'}
            variants={variants.lower}
            transition={{ duration: 0.35, ease: 'anticipate' }}
            className="flex justify-between items-center w-full px-4 "
          >
            <div className="flex gap-6 justify-between items-center">
              <Link href="/">
                <Image
                  width={600}
                  height={600}
                  className="md:w-12 w-6"
                  alt="image"
                  src="/logo-white.png"
                />
              </Link>
              <LanguageSwitcher isHeader />
            </div>

            <Image
              alt="image"
              width={600}
              height={600}
              className="md:w-56 w-20"
              src="/troyka_white.png"
            />

            {mobileMenu && (
              <MenuMobile
                showCatMenu={showCatMenu}
                setShowCatMenu={setShowCatMenu}
                setMobileMenu={setMobileMenu}
                categories={categories}
              />
            )}

            <div className="flex items-center">
              {/* Icon start */}
              <Additional
                animate={hidden ? 'hidden' : 'visible'}
                variants={variants.additional}
                transition={{ duration: 0.35, ease: 'anticipate' }}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
              />

              {/* Mobile icon start */}
              <div
                className="w-8 md:w-12 
              h-8 md:h-12 
              rounded-full 
              flex 
              md:hidden 
              justify-center 
              items-center 
              hover:bg-darkBlack[0.05] 
              transition 
              ease-in-out 
              duration-300  
              cursor-pointer relative -mr-2"
              >
                {mobileMenu ? (
                  <VscChromeClose
                    color="#EEEEEE"
                    className="text-[16px]"
                    onClick={() => setMobileMenu(false)}
                  />
                ) : (
                  <BiMenuAltRight
                    color="#EEEEEE"
                    className="text-[20px]"
                    onClick={() => setMobileMenu(true)}
                  />
                )}
              </div>
              {/* Mobile icon end */}
            </div>
          </motion.div>
        </motion.div>
        <div className="w-full flex flex-1 md:-mt-1 flex-row justify-between bg-darkBlack px-6">
          {!isMobile && !isTablet && <><motion.div
            animate={hidden ? 'hidden' : 'visible'}
            variants={variants.lowerSides}
            transition={{ duration: 0.35, ease: 'anticipate' }}
            className="flex gap-6 justify-between items-center"
          >
            <Link href="/">
              <Image
                width={200}
                height={200}
                className="w-6"
                alt="image"
                src="/logo-white.png"
              />
            </Link>
            <LanguageSwitcher isHeader />
          </motion.div>
          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}
          />
          <Additional
            animate={hidden ? 'hidden' : 'visible'}
            variants={variants.lowerSides}
            transition={{ duration: 0.35, ease: 'anticipate' }}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
          />
          </>}
        </div>
      </motion.header>
    </div>
  )
}

export default Navigation


import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { IoMdHeartEmpty } from 'react-icons/io'
import { VscChromeClose } from 'react-icons/vsc'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/helpers/store'
import { useAppSelector } from '@/store/hooks'
import { setShowBanner } from '@/store/uiSlice'
import { selectWishlistItems } from '@/store/wishlistSlice'
import { fetchDataFromApi } from '@/utils/api'

import Banner from './Banner'
import LanguageSwitcher from './lang/LanguageSwitcher'
import Menu from './Menu'
import MenuMobile from './MenuMobile'

const Header = () => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setShowBanner(true))
    }, 900000)

    return () => clearTimeout(timer)
  }, [])

  const [ mobileMenu, setMobileMenu ] = useState(false)
  const [ showCatMenu, setShowCatMenu ] = useState(false)
  const [ show, setShow ] = useState('translate-y-0')
  const [ lastScrollY, setLastScrollY ] = useState(0)
  const [ categories, setCategories ] = useState(null)

  const { cartItems } = useSelector((state) => state.cart)
  const wishlistItems = useAppSelector(selectWishlistItems)

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('-translate-y-[80px]')
      } else {
        setShow('shadow-sm')
      }
    } else {
      setShow('translate-y-0')
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [ lastScrollY ])

  useEffect(() => {
    fetchCategories()
  }, [ locale ])

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi(
      `/api/categories?populate=*&locale=${locale}`
    )
    setCategories(data)
  }

  return (
    <>
      <Banner />
      <header
        className={`
        bg-gradient-to-r 
        from-[#0ba360] 
        to-[#3cba92] 
        w-full 
        sm:h-[50px] 
        md:h-[170px] 
        bg-[#181516] 
        pb-1
        flex 
        flex-col 
        items-center 
        justify-center 
        z-10
        sticky 
        transition-transform 
        duration-300
        ${show}`}
      >
        <div className="w-full h-full z-12 bg-darkBlack">
          <div className="flex justify-between items-center w-full px-4">
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
              <Link href="/profile">
                <div className="
                text-offWhite
                border-offWhite
                  w-8 
                  md:w-12
                  h-8
                  md:h-12
                  rounded-full
                  flex 
                  justify-center 
                  items-center 
                  hover:bg-white/[0.05]
                  transition 
                  ease-in-out 
                  duration-300 
                  cursor-pointer 
                  relative">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </Link>
              <Link href="/wishlist">
                <div className="
                text-offWhite 
                border-[#D8E3E7] 
                w-8 
                md:w-12 
                h-8 
                md:h-12 
                rounded-full 
                flex 
                justify-center 
                items-center 
                hover:bg-offWhite/[0.05]
                transition 
                ease-in-out 
                duration-300  
                cursor-pointer 
                relative">
                  <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
                  {wishlistItems.length > 0 && (
                    <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-[#B22222] absolute top-1 left-5 md:left-7 text-offWhite text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                      {wishlistItems.length}
                    </div>
                  )}
                </div>
              </Link>
              {/* Icon end */}

              {/* Icon start */}
              <Link href="/cart">
                <div className="
                text-offWhite 
                border-[#D8E3E7] 
                w-8 
                md:w-12 
                h-8 
                md:h-12 
                rounded-full 
                flex 
                justify-center 
                items-center 
                hover:bg-offWhite/[0.05]              
                transition 
                ease-in-out 
                duration-300   
                cursor-pointer 
                relative">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {cartItems.length > 0 && (
                    <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-[#B22222] absolute top-1 left-5 md:left-7 text-offWhite text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                      {cartItems.length}
                    </div>
                  )}
                </div>
              </Link>
              {/* Icon end */}

              {/* Mobile icon start */}
              <div className="w-8 md:w-12 
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
              cursor-pointer relative -mr-2">
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
          </div>
        </div>
        <div className="w-full bg-darkBlack">
          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}
          />
        </div>
      </header>
    </>
  )
}

export default Header

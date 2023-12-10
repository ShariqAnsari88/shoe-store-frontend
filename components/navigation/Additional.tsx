import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MotionProps, motion } from 'framer-motion'
import Link from 'next/link'
import { IoMdHeartEmpty } from 'react-icons/io'

interface Props extends MotionProps {
  cartItems: unknown[];
  wishlistItems: unknown[];
}

function Additional({ cartItems, wishlistItems, ...props }: Props) {
  return (
    <motion.div {...props} className="flex items-center">
      <Link href="/profile">
        <div
          className="
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
      relative"
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Link>
      <Link href="/wishlist">
        <div
          className="
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
    relative"
        >
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
        <div
          className="
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
    relative"
        >
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItems.length > 0 && (
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-[#B22222] absolute top-1 left-5 md:left-7 text-offWhite text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              {cartItems.length}
            </div>
          )}
        </div>
      </Link>
      {/* Icon end */}
    </motion.div>
  )
}

export default Additional

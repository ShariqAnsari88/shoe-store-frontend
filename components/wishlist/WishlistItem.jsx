/* eslint-disable react/prop-types */
import { faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

import { useAppDispatch } from '@/helpers/store'
import useCurrency from '@/hooks/useCurrency'
import { removeFromWishlist } from '@/store/wishlistSlice'
import { getDiscountedPricePercentage } from '@/utils/helper'


export default function WishlistItem(props) {
	const dispatch = useAppDispatch()
	const { currency } = useCurrency()
	if (!props.wishlistItem) return null

	const discount = getDiscountedPricePercentage(
		props.wishlistItem.attributes.original_price,
		props.wishlistItem.attributes.price
	)

	const imageSrc =
    props.wishlistItem.attributes?.image?.data[0]?.attributes?.url
	return (
		<div
			className={'transform border-2 overflow-hidden duration-200 hover:scale-105 cursor-pointer flex flex-col justify-between'}
		>
			<div>
				<Link
					href={{ pathname: `/product/${props.wishlistItem.attributes.slug}`}}
					className="rounded-md"
				>
					<Image
						alt="img"
						width={1000}
						height={1000}
						className="object-contain"
						src={imageSrc}
					/>
				</Link>
				<button
					onClick={() =>
						dispatch(removeFromWishlist({ id: props.wishlistItem.id }))
					}
					className="bg-white px-1 rounded-md z-1 absolute top-2 right-2"
				>
					<FontAwesomeIcon
						icon={faHeartCircleMinus}
						color="#B22222"
					/>
				</button>
			</div>
			<div className="p-4 text-offWhite/[0.9]">
				<h2 className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92] font-bold">
					{props.wishlistItem.attributes.name}
				</h2>
				<div className="flex items-center text-black/[0.5]">
					<p className="mr-2 text-lg font-semibold">
						{props.wishlistItem.attributes.price} {currency}.
					</p>

					{props.wishlistItem.attributes.original_price && (
						<>
							{discount > 0 && (
								<>
									<p className="text-offWhite text-base  font-medium line-through">
										{props.wishlistItem.attributes.original_price} лв.
									</p>

									<p className="ml-auto text-base font-semibold bg-orange-400 rounded-md p-[5px]">
										{discount}% off
									</p>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

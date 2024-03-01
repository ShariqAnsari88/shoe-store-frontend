/* eslint-disable react/prop-types */
import 'react-toastify/dist/ReactToastify.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { ToastContainer, toast } from 'react-toastify'

import Container from '@/components/Container'
import Exclaimer from '@/components/Exclaimer'
import ImageSelector from '@/components/product/ImageSelector'
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RelatedProducts from '@/components/RelatedProducts'
import Wrapper from '@/components/Wrapper'
import { useAppDispatch } from '@/helpers/store'
import { addToCart } from '@/store/cartSlice'
import { useAppSelector } from '@/store/hooks'
import { selectIsWishlisted , addToWishlist } from '@/store/wishlistSlice'
import { fetchDataFromApi } from '@/utils/api'
import { getDiscountedPricePercentage } from '@/utils/helper'

const ProductDetails = ({ product, products }) => {
  const { t } = useTranslation([ 'product_details', 'buttons', 'common' ])
  const dispatch = useAppDispatch()
  const { productSlider, outOfStock, subtitle } =
    product.data[0].attributes

  const isAccessory = !subtitle.toLowerCase().includes('t-shirt') || !subtitle.toLowerCase().includes('hoodie')

  const [ selectedSize, setSelectedSize ] = useState(
    isAccessory ? 'M' : undefined
  )

  const [ showError, setShowError ] = useState(false)
  const [ selectedImage, setSelectedImage ] = useState(undefined)

  const hasSlider = productSlider && productSlider?.data?.length > 0
  const isWishlisted = useAppSelector((state) =>
    selectIsWishlisted(state, { ...product.data[0] })
  )
  const p = product?.data?.[0]?.attributes

  const description = product?.data?.[0]?.attributes.description

  const discount = Number(getDiscountedPricePercentage(p.original_price, p.price))

  const notify = (buttonName) => {
    toast.success(
      `${t('success', { ns: 'buttons' })} ${
        buttonName === 'wishlist'
          ? t('your_favourite_products', { ns: 'buttons' })
          : t('your_cart', { ns: 'buttons' })
      }!`,
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      }
    )
  }

  return (
    <Container>
      <div className="w-full py-12">
        <ToastContainer />
        <Wrapper>
          <div
            id="wrapperGrid"
            className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]"
          >
            {/* left column start */}
            <div className="flex gap-2 w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel
                selected={selectedImage}
                sliderImages={productSlider?.data}
                image={p.image.data[0]}
              />
              {hasSlider && (
                <ImageSelector
                  selected={selectedImage}
                  onSelect={setSelectedImage}
                  images={productSlider.data}
                />
              )}
            </div>
            {/* left column end */}

            {/* right column start */}
            <div className="flex-[1.1] py-3 ">
              {/* PRODUCT TITLE */}
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92] text-[34px] font-semibold mb-2 leading-tight">
                {p.name}
              </div>

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="text-[rgb(238,238,238)] mr-2 text-2xl font-semibold">
                  {t('price', { count: p.price })}
                </p>
                {p.original_price && (
                  <>
                    {discount > 0 && (
                      <>
                        <p className="text-offWhite text-base  font-medium line-through">
                          {t('price', { count: p.original_price })}
                        </p>

                        <p className="ml-auto text-base font-semibold bg-orange-400 rounded-md p-[5px]">
                          {t('off', { count: discount })}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="text-offWhite/[0.5] text-md font-medium mb-20">
                {t('taxes')}
              </div>

              {/* PRODUCT SIZE RANGE START */}
              {!isAccessory && (
                <div className="mb-10">
                  {/* HEADING START */}
                  <div className="flex justify-between mb-2">
                    <div className="text-offWhite text-md font-semibold">
                      {t('choose_size')}
                    </div>
                  </div>
                  {/* HEADING END */}

                  {/* SIZE START */}
                  <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                    {p.size.data.map((item, i) => (
                      <div
                        key={i}
                        className={`border-[2px] text-md border-offWhite transition ease-in-out rounded-md text-center py-3 font-medium ${
                          item.enabled
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed bg-#393646/[0.1] opacity-50'
                        } ${
                          selectedSize === item.size
                            ? 'border-[2px] bg-gradient-to-r from-[#0ba360] to-[#3cba92] text-darkBlack'
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedSize(item.size)
                          setShowError(false)
                        }}
                      >
                        {item.size}
                      </div>
                    ))}
                  </div>
                  {/* SIZE END */}

                  {/* SHOW ERROR START */}
                  {showError && (
                    <div className="text-errorYellow mt-1">{t('error')}</div>
                  )}
                  {/* SHOW ERROR END */}
                </div>
              )}
              {/* PRODUCT SIZE RANGE END */}

              {/* ADD TO CART BUTTON START */}
              <div className="flex flex-1 flex-col sm:flex-row gap-2 justify-around items-center mb-12">
                <div className="w-full">
                  <button
                    name="cart"
                    className={`
                  w-full
                  flex
                  flex-1
                  items-center 
                  justify-center 
                gap-2 
                p-4 
                text-md
                rounded-full 
                bg-gradient-to-r from-[#0ba360] to-[#3cba92]
                text-[#F1F0F1] 
                font-medium 
                transition 
                ease-in-out 
                active:scale-95 
                hover:opacity-75
                ${outOfStock && 'pointer-events-none'}
                `}
                    onClick={() => {
                      if (!selectedSize) {
                        setShowError(true)
                        document.getElementById('wrapperGrid').scrollIntoView({
                          block: 'center',
                          behavior: 'smooth'
                        })
                      } else {
                        dispatch(
                          addToCart({
                            ...product?.data?.[0],
                            selectedSize,
                            oneQuantityPrice: p.price
                          })
                        )
                        notify('cart')
                      }
                    }}
                  >
                    {t('add_cart', { ns: 'buttons' })}
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
                {/* ADD TO CART BUTTON END */}

                {/* WHISHLIST BUTTON START */}
                <div className="bg-offWhite w-full rounded-full">
                  <button
                    name="wishlist"
                    onClick={() => {
                      dispatch(
                        addToWishlist({
                          ...product?.data?.[0],
                          selectedSize,
                          oneQuantityPrice: p.price
                        })
                      )
                      notify('wishlist')
                    }}
                    className="bg-offWhite
                text-transparent bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92]
                flex
                flex-1
                w-full
                items-center 
                justify-center 
                transition 
                ease-in-out 
                p-4
                font-medium 
                active:scale-95 
                hover:opacity-75"
                  >
                    {isWishlisted ? (
                      <div className="flex flex-1 items-center justify-center gap-2">
                        {t('remove_wishlist', { ns: 'buttons' })}
                        <i className="fa-solid fa-heart-circle-minus" />
                      </div>
                    ) : (
                      <div className="flex flex-1 items-center justify-center gap-2">
                        {t('add_wishlist', { ns: 'buttons' })}
                        <i className="fa-solid fa-heart-circle-plus" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <Exclaimer />
              {/* WHISHLIST BUTTON END */}

              <div>
                <div className="text-offWhite text-lg font-bold mb-5">
                  {t('details')}
                </div>
                <div>
                  <Markdown>{description}</Markdown>
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>

          <RelatedProducts products={products} />
        </Wrapper>
      </div>
    </Container>
  )
}

export default ProductDetails

export async function getServerSideProps({ params: { slug }, locale }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}&locale=${locale}`
  )

  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}&locale=${locale}`
  )

  return {
    props: {
      product,
      products,
      ...(await serverSideTranslations(locale, [
        'product_details',
        'buttons',
        'footer',
        'nav',
        'common',
        'banner'
      ]))
    }
  }
}

/* eslint-disable react/prop-types */
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import Image from 'next/image'

const ProductDetailsCarousel = ({ image, sliderImages, selected }) => {
  const selectedImage = sliderImages
    ? sliderImages.find((a) => a.attributes.hash === selected)?.attributes
    : null

  return (
    <div className="text-[20px] text-neonGreenLighter w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Image
        className="rounded-md"
        width={800}
        height={600}
        key={selectedImage?.id ?? image.id}
        src={selectedImage?.url ?? image.attributes.url}
        alt={selectedImage?.name ?? image.attributes.name}
      />
    </div>
  )
}

export default ProductDetailsCarousel

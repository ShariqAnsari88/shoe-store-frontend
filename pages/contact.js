import React from 'react'
import { BsPhoneFill } from 'react-icons/bs'
import { VscLocation } from 'react-icons/vsc'

export default function contact() {
  return (
    <div class="container mx-auto p-4 grid grid-cols-2 gap-1">
    <div class="max-w-full bg-white rounded p-8 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
      <form action="#" method="POST">
        <div class="mb-4">
          <label for="name" class="block mb-2">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"/>
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"/>
        </div>
        <div class="mb-4">
          <label for="phone" class="block mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Your phone number"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"/>
        </div>
        <div class="mb-4">
          <label for="message" class="block mb-2">Message</label>
          <textarea id="message" name="message" rows="4" placeholder="Your message"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
    </div>
    <div className="mx-auto 2xl:container 2xl:mx-auto lg:px-10 md:py-6 md:px-6 py-9 px-4">
            <div className=" grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 ">
                {/* Safe Shopping Grid Card */}
                <div className="p-6 bg-gray-50">
                    <div className='flex flex-row items-center'>
                   <BsPhoneFill/>

                    <p className="text-xl text-gray-800 font-semibold leading-5 mt-6">Phone</p>
                    </div>
                    <p className="font-normal text-base leading-6 text-gray-600 my-4">+359893484851</p>
                </div>

                {/* Personal Shopping Grid Card */}
                <div className=" p-6 bg-gray-50">
                <div className='flex flex-row items-center'>
                   <VscLocation/>
                    <p className=" text-xl text-gray-800 font-semibold leading-5 mt-6">Address</p>
                  </div>
                    <p className=" font-normal text-base leading-6 text-gray-600 my-4">ul. "Bulgaria" 30</p>
                </div>

                {/* Free Shopping Grid Card */}
                <div className=" p-6 bg-gray-50">
                <div className='flex flex-row items-center'>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <path d="M18.4142 12.7573L21.2426 9.92886C21.6177 9.55378 22.1264 9.34307 22.6568 9.34307C23.1873 9.34307 23.696 9.55378 24.071 9.92886C24.4461 10.3039 24.6568 10.8126 24.6568 11.3431C24.6568 11.8735 24.4461 12.3822 24.071 12.7573L21.2426 15.5857L23.3639 23.3639L21.2426 25.4852L17.7071 19.1212L14.8786 21.9497V24.7781L12.7573 26.8994L11.3431 22.6568L7.10048 21.2426L9.2218 19.1212H12.0502L14.8786 16.2928L8.51469 12.7573L10.636 10.636L18.4142 12.7573Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="24" height="24" fill="white" transform="translate(0.0294189 17) rotate(-45)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p className=" text-xl text-gray-800 font-semibold leading-5 mt-6">Free Shipping</p>
                    </div>
                    <p className=" font-normal text-base leading-6 text-gray-600 my-4">Free shipping all over the world on orders above $100</p>
                    <a className=" cursor-pointer text-base leading-4 font-medium text-gray-800 border-b-2 border-gray-800 hover:text-gray-600 ">Learn More</a>
                </div>
            </div>
        </div>
  </div>
  )
}

import Wrapper from "@/components/Wrapper";
import React from "react";
import { BsPhoneFill } from "react-icons/bs";
import { FaLocationArrow, FaTruckMoving } from "react-icons/fa";

export default function contact() {
  return (
    <Wrapper>
      <div class="container mx-auto p-4 my-24 grid grid-cols-2 gap-1">
        <div class="max-w-full bg-[#EEEEEE] rounded p-8 shadow-md">
          <h2 class="text-center text-2xl font-bold mb-4 text-[#393646]">
            Get in touch
          </h2>
          <form action="#" method="POST">
            <div class="mb-4">
              <label
                for="name"
                className="text-[#393646] font-semibold block mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                className="text-[#393646] font-semibold block mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                for="phone"
                className="text-[#393646] font-semibold block mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                for="message"
                className="text-[#393646] font-semibold block mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your message"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#393646] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="h-full flex justify-between mx-auto 2xl:container 2xl:mx-auto lg:px-10 md:px-6 px-4">
          <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
            {/* Safe Shopping Grid Card */}
            <div className="rounded-md p-6 bg-[#EEEEEE]">
              <div className="flex flex-row items-center">
                <BsPhoneFill color="#181516" />
                <p className="text-xl text-gray-800 font-semibold leading-5 mt-6">
                  Phone
                </p>
              </div>
              <p className="font-normal text-base leading-6 text-gray-600 my-4">
                +359893484851
              </p>
            </div>

            {/* Personal Shopping Grid Card */}
            <div className="rounded-md p-6 bg-[#EEEEEE]">
              <div className="flex flex-row items-center">
                <FaLocationArrow color="#181516" />
                <p className=" text-xl text-gray-800 font-semibold leading-5 mt-6">
                  Address
                </p>
              </div>
              <p className="font-normal text-base leading-6 text-gray-600 my-4">
                ul. "Bulgaria" 30
              </p>
            </div>

            {/* Free Shopping Grid Card */}
            <div className="rounded-md p-6 bg-[#EEEEEE]">
              <div className="flex flex-row items-center">
                <FaTruckMoving color="#181516" />
                <p className=" text-xl text-gray-800 font-semibold leading-5 mt-6">
                  Free Shipping
                </p>
              </div>
              <p className=" font-normal text-base leading-6 text-gray-600 my-4">
                Free shipping all over the world on orders above $100
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

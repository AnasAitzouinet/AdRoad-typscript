"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CardsEarn from "@/components/Dashboard/CardsEarn";
import { GiSaveArrow } from "react-icons/gi";
import {AiFillInfoCircle } from "react-icons/ai";
export default function Example() {
  const value = 0.3;
  return (
    <div>
      <CardsEarn />
      <div className="mt-10 ">
        <div className="relative overflow-hidden rounded-lg text-white bg-gray-900 px-4 py-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 shadow-lg sm:px-6 sm:pt-6">
          <div className="flex  flex-col gap-2">
            <div>
              <p className=" truncate text-sm font-medium text-gray-400">
                Company Name :
              </p>
              <p className="text-2xl font-semibold text-white">Coca Cola</p>
            </div>
            <div>
              <p className=" truncate text-sm font-medium text-gray-400">
                Campaign Area :
              </p>
              <p className="text-2xl font-semibold text-white">Marrakech</p>
            </div>
            <div>
              <p className=" truncate text-sm font-medium text-gray-400">
                Car Type :
              </p>
              <p className="text-2xl font-semibold text-white">Dacia</p>
            </div>
            <div>
              <p className=" truncate text-sm font-medium text-gray-400">
                Road Show type :
              </p>
              <p className="text-2xl font-semibold text-white">Full Coverage</p>
            </div>
          </div>
          <div className="flex flex-row gap-9 justify-start">
            <div
              className="border-l-2 border-gray-300 h-[35vh] sm:block
            hidden"
            />
            <div className="lg:w-full  grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
              <div className="flex flex-col justify-center gap-5 ">
                <div>
                  <p className=" truncate text-sm font-medium text-gray-400">
                    Kilometer Required :
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    150 500 Km
                  </p>
                </div>
                <div>
                  <p className=" truncate text-sm font-medium text-gray-400">
                    Kilometer Reached :
                  </p>
                  <p className="text-2xl font-semibold text-white">45 500 Km</p>
                </div>
              </div>
              <CircularProgressbar
                value={value}
                styles={{
                  // Customize the root svg element
                  root: {},
                  path: {
                    stroke: "#22c55e",
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: "#fff",
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "round",
                    // Rotate the trail
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: "#fff",
                    // Text size
                    fontSize: "16px",
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: "#fff",
                  },
                }}
                maxValue={1}
                text={`${value * 100}%`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <button className="relative overflow-hidden rounded-lg bg-gray-900 px-4 py-2  shadow-lg sm:px-6 sm:pt-6 hover:bg-gray-700">
          <dt>
            <div className="absolute rounded-md  bg-slate-200 p-3"> <GiSaveArrow /> </div>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-xl font-semibold text-center pt-2 text-white">Get Authorization</p>

          </dd>
        </button>
        <button className="relative overflow-hidden rounded-lg bg-gray-900 px-4 py-2  shadow-lg sm:px-6 sm:pt-6 hover:bg-gray-700">
          <dt>
            <div className="absolute rounded-md text-bold bg-slate-200 p-3"> 10% </div>
          </dt>
          <dd className="ml-16 flex items-center pb-6 sm:pb-7">
            <p className="text-xl font-semibold pt-2 text-white">Files Uploaded</p>
          </dd>
        </button>
        <button className="relative overflow-hidden rounded-lg bg-gray-900 px-4 py-2  shadow-lg sm:px-6 sm:pt-6 hover:bg-gray-700">
          <dt>
            <div className="absolute rounded-md  bg-slate-200 p-3"> <AiFillInfoCircle size={30}/> </div>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-xl font-semibold text-center pt-2 text-white">All Your Campaign</p>

          </dd>
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import SignInPassModal from "@/components/modals/SignInPassModal";
import React from "react";
import SignInOTP from "@/components/modals/SignInOTP";

const Logi = () => {
  const [open, setOpen] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

  return (
    <div className="flex min-h-full flex-col justify-center gpa py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome to AdRoad
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <SignInPassModal openProp={open} onClose={setOpen}/>
      <SignInOTP openProp={openOTP} onClosed={setOpenOTP}/>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#2c2b2b] py-8 px-4 shadow-lg sm:rounded-lg sm:px-10  ">
          <form className="space-y-6">
            <div className="flex flex-col gap-6">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex w-full justify-center rounded-md border border-transparent bg-[#E44EC3] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#9d0b51]  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in With Password
              </button>
              <p className="text-white text-sm font-medium text-center">Or</p>
              <button
                onClick={() => setOpenOTP(true)}
                type="button"
                className="flex w-full justify-center rounded-md border border-transparent bg-[#E44EC3] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#9d0b51]  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in Using Magic Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Logi;

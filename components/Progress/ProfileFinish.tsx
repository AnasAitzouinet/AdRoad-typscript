"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const ProfileFinish = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const user = session?.user;
  const Router = useRouter();
  const [progress, setProgress] = useState(2);

  const handlePrevClick = () => {
    sessionStorage.setItem("progress", "1");
    setProgress(1);
    Router.refresh();
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const userInfo = sessionStorage.getItem("userInfo");
      const userInfoParsed = userInfo ? JSON.parse(userInfo) : {};
      const userInfUrl = sessionStorage.getItem("userInfUrl");
      const userInfUrlParsed = userInfUrl ? JSON.parse(userInfUrl) : {};
      const avatar = sessionStorage.getItem("avatar");
      const avatarParsed = avatar ? JSON.parse(avatar) : {};
      const urls: string[] = [];
      userInfUrlParsed.forEach((url: string) => {
        urls.push(url);
      });
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: userInfoParsed.full_name,
        avatar_url: avatarParsed,
      });
      if (error) throw error;
      const { error: error2 } = await supabase.from("Drivers").upsert({
        Adresse: userInfoParsed.Adresse,
        age: userInfoParsed.age,
        phone_number: userInfoParsed.phone_number,
        user_id: user?.id as string,
        image_path: urls,
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Your profile has been added successfully",
      }).then(() => {
        Router.push("/");
      });

      if (error2){
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
  
        Toast.fire({
          icon: "error",
          title:
            error2.message ==
            'duplicate key value violates unique constraint "Drivers_user_id_key"'
              ? "You already have a profile , please login to continue"
              : error2.message,
        }).then(() => {
          Router.refresh();
        });
      }
    
    
    } catch (error: any) {
      alert(error.message);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: error.message,
      })
    } finally {
      setLoading(false);
    }
  };
  async function updateProfile({ avatar_url }: { avatar_url: string | null }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white">
            You are almost done!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            by clicking on the button below you will be able to start using our
            app and enjoy our services.{" "}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <form action='/auth/signout' method="post">
              <button type="submit">test</button>
            </form>
            <button
              onClick={handlePrevClick}
              className="text-base font-semibold leading-7 flex gap-2 text-white"
            >
              {" "}
              <ArrowLeftIcon width={30} />
              Go Back
            </button>
            <button
              onClick={handleSave}
              className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </button>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                id="827591b1-ce8c-4110-b064-7cb85a0b1217"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
};

export default ProfileFinish;

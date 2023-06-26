"use client";
import {
  EnvelopeIcon,
  PhoneIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { MoonLoader, ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Avatar from "@/app/auth/account/avatar";

const ProfileAvatar = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;
  const Router = useRouter();
  const [progress, setProgress] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [IdFiles, setIdFiles] = useState<File[]>([]);

  const handlePrevClick = () => {
    sessionStorage.setItem("progress", "0");
    setProgress(0);
    Router.refresh();
  };

  const handleNextClick = () => {
    sessionStorage.setItem("progress", "2");
    setProgress(2);
    Router.refresh();
  };
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

const HandleUploadID = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    setIdFiles(files);
    const folderName = user?.id; // Specify the folder name
    const urls: string[] = [];
    const filePath = `${folderName}/${files[0].name}`;
    const { error: uploadError } = await supabase.storage
      .from("IdCards")
      .upload(filePath, files[0]);
    if (uploadError) {
      console.error("Error uploading file:", uploadError);
    } else {
      console.log("File uploaded successfully:", filePath);
      // Get the public URL of the uploaded file
      try {
        const { data } = await supabase.storage

          .from("IdCards")
          .getPublicUrl(filePath);
        if (data) {
          urls.push(data.publicUrl);
          const userInfoUrlId = sessionStorage.setItem("IdCardUrl", urls[0]);
        }
        console.log("File URL:", data.publicUrl);
      } catch (error) {
        console.error("Error getting file URL:", error);
      }
    }
  };


  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files!).slice(0, 4);
    setSelectedFiles(files);

    const folderName = user?.id; // Specify the folder name
    const urls: string[] = [];

    // Upload each file to the specified folder in Supabase Storage
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        console.error("File is too large:", file.name);
        continue;
      }
      const filePath = `${folderName}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("ImageCars")
        .upload(filePath, file);
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
      } else {
        console.log("File uploaded successfully:", filePath);
        // Get the public URL of the uploaded file
        try {
          const { data } = await supabase.storage
            .from("ImageCars")
            .getPublicUrl(filePath);
          console.log("File URL:", data.publicUrl);
          urls.push(data.publicUrl);
        } catch (error) {
          console.error("Error getting file URL:", error);
        }
      }
    }
    const userInfoUrl = sessionStorage.setItem(
      "userInfUrl",
      JSON.stringify(urls)
    );
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
      alert("Avatar Got Uploaded!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }
  if (!user) {
    return <div>Loading...</div>; // Or handle the case where the user is undefined/null
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:flex-row-reverse">
      {/* Contact information */}
      <div className="relative overflow-hidden bg-indigo-700 py-10 px-6 sm:px-10 xl:p-12">
        <div
          className="pointer-events-none absolute inset-0 sm:hidden"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            width={343}
            height={388}
            viewBox="0 0 343 388"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
              fill="url(#linear1)"
              fillOpacity=".1"
            />
            <defs>
              <linearGradient
                id="linear1"
                x1="254.553"
                y1="107.554"
                x2="961.66"
                y2="814.66"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" />
                <stop offset={1} stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            width={359}
            height={339}
            viewBox="0 0 359 339"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
              fill="url(#linear2)"
              fillOpacity=".1"
            />
            <defs>
              <linearGradient
                id="linear2"
                x1="192.553"
                y1="28.553"
                x2="899.66"
                y2="735.66"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" />
                <stop offset={1} stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            width={160}
            height={678}
            viewBox="0 0 160 678"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
              fill="url(#linear3)"
              fillOpacity=".1"
            />
            <defs>
              <linearGradient
                id="linear3"
                x1="192.553"
                y1="325.553"
                x2="899.66"
                y2="1032.66"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" />
                <stop offset={1} stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">Contact information</h3>
        <p className="mt-6 max-w-3xl text-base text-indigo-50">
          Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
          massa dictumst amet. Sapien tortor lacus arcu.
        </p>
        <dl className="mt-8 space-y-6">
          <dt>
            <span className="sr-only">Phone number</span>
          </dt>
          <dd className="flex text-base text-indigo-50">
            <PhoneIcon
              className="h-6 w-6 flex-shrink-0 text-indigo-200"
              aria-hidden="true"
            />
            <span className="ml-3">+1 (555) 123-4567</span>
          </dd>
          <dt>
            <span className="sr-only">Email</span>
          </dt>
          <dd className="flex text-base text-indigo-50">
            <EnvelopeIcon
              className="h-6 w-6 flex-shrink-0 text-indigo-200"
              aria-hidden="true"
            />
            <span className="ml-3">support@workcation.com</span>
          </dd>
        </dl>
        <ul role="list" className="mt-8 flex space-x-12">
          <li>
            <a className="text-indigo-200 hover:text-indigo-100" href="#">
              <span className="sr-only">Facebook</span>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M22.258 1H2.242C1.556 1 1 1.556 1 2.242v20.016c0 .686.556 1.242 1.242 1.242h10.776v-8.713h-2.932V11.39h2.932V8.887c0-2.906 1.775-4.489 4.367-4.489 1.242 0 2.31.093 2.62.134v3.037l-1.797.001c-1.41 0-1.683.67-1.683 1.653v2.168h3.362l-.438 3.396h-2.924V23.5h5.733c.686 0 1.242-.556 1.242-1.242V2.242C23.5 1.556 22.944 1 22.258 1"
                  fill="currentColor"
                />
              </svg>
            </a>
          </li>
          <li>
            <a className="text-indigo-200 hover:text-indigo-100" href="#">
              <span className="sr-only">GitHub</span>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M11.999 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.017-2.04-3.337.724-4.042-1.61-4.042-1.61-.545-1.386-1.332-1.755-1.332-1.755-1.09-.744.082-.73.082-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.493.996.109-.775.419-1.303.762-1.603C7.145 17 4.343 15.97 4.343 11.373c0-1.31.468-2.382 1.236-3.22-.124-.304-.536-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.956-.266 1.983-.4 3.003-.404 1.02.005 2.046.138 3.005.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.103.814 2.223 0 1.603-.015 2.898-.015 3.291 0 .321.217.695.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12.001-12"
                  fill="currentColor"
                />
              </svg>
            </a>
          </li>
          <li>
            <a className="text-indigo-200 hover:text-indigo-100" href="#">
              <span className="sr-only">Twitter</span>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M7.548 22.501c9.056 0 14.01-7.503 14.01-14.01 0-.213 0-.425-.015-.636A10.02 10.02 0 0024 5.305a9.828 9.828 0 01-2.828.776 4.94 4.94 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.929 4.929 0 00-8.391 4.491A13.98 13.98 0 011.67 3.9a4.928 4.928 0 001.525 6.573A4.887 4.887 0 01.96 9.855v.063a4.926 4.926 0 003.95 4.827 4.917 4.917 0 01-2.223.084 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 20.289a13.941 13.941 0 007.548 2.209"
                  fill="currentColor"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      {/* Contact form */}
      <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
        <h3 className="text-lg font-medium text-gray-900">Send us a message</h3>
        <form
          action="#"
          method="POST"
          className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
        >
          <div>
            <label
              htmlFor="Full-name"
              className="block text-sm font-medium text-gray-900"
            >
              Upload Your avatar:
            </label>
            <div className="mt-3 ">
              <Avatar
                uid={user.id}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                  setAvatarUrl(url);
                  updateProfile({ avatar_url: url });
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload files (Max 4)</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileUpload}
                      accept=".png, .jpg, .jpeg, .gif"
                      // You can adjust the accepted file types as needed
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-start w-full">
            <label
            className=" text-lg font-medium text-gray-900">
              Upload Your Identity Card:
            </label>
            <label
              htmlFor="file-uploadId"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? (
                <ScaleLoader height={20} width={3} color="white" />
              ) : (
                "ID Card"
              )}
            </label>
            <input
              type="file"
              id="file-uploadId"
              className="hidden"
              onChange={HandleUploadID}
            />
          </div>
          <div className=" lg:col-span-2  grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <button
              type="button"
              onClick={handlePrevClick}
              className={`mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto
            ${progress === 0 ? "hidden" : ""}`}
            >
              {loading ? (
                <ScaleLoader height={20} width={3} color="white" />
              ) : (
                "Previous"
              )}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleNextClick}
              className={`mt-2 inline-flex w-full items-center  justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto
            ${progress === 2 ? "hidden" : ""}`}
            >
              {loading ? (
                <ScaleLoader height={20} width={3} color="white" />
              ) : (
                "Next"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileAvatar;

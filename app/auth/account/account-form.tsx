"use client";
import { use, useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Avatar from "./avatar";
import Profile from "@/components/Progress/Profile";
import Loader from "@/components/Loader";
import ProfileAvatar from "@/components/Progress/ProfileAvatar ";
import { useRouter } from "next/navigation";
export default function AccountForm({ session }: { session: Session | null }) {
  const [loading, setLoading] = useState(false);
  const progresStorage = sessionStorage.getItem("progress");
  const [progress, setProgress] = useState(progresStorage ? parseInt(progresStorage) : 0);
  const router = useRouter();
  const [loadedComponent, setLoadedComponent] = useState(<></>);
  useEffect(() => {
    setProgress(progresStorage ? parseInt(progresStorage) : 0);
  }, [progresStorage]);
  const load = useCallback(() => {
    if (loading) {
      setLoadedComponent(<Loader />);
    } else if (progress === 0) {
      setLoadedComponent(<Profile session={session} />);
    } else if (progress === 1) {
      setLoadedComponent(<ProfileAvatar session={session} />);
    }
  }, [loading, progress, session]);

  useEffect(() => {
    load();
  }, [progress, router, load]);

  return (
    //   <div className="form-widget">
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input id="email" type="text" value={session?.user.email} disabled />
    //     </div>
    //     <div>
    //       <label htmlFor="fullName">Full Name</label>
    //       <input
    //         id="fullName"
    //         type="text"
    //         value={fullname || ''}
    //         onChange={(e) => setFullname(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">password</label>
    //       <input
    //         id="password"
    //         type="text"
    //         value={password || ''}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="username">Username</label>
    //       <input
    //         id="username"
    //         type="text"
    //         value={username || ''}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="website">Website</label>
    //       <input
    //         id="website"
    //         type="url"
    //         value={website || ''}
    //         onChange={(e) => setWebsite(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <button
    //         className="button primary block"
    //         onClick={() => updateProfile({ fullname, username, website, avatar_url })}
    //         disabled={loading}
    //       >
    //         {loading ? 'Loading ...' : 'Update'}
    //       </button>
    //     </div>
    //     <div className="form-widget">
    //   {/* Add to the body */}
    //   <Avatar
    //     uid={user.id}
    //     url={avatar_url}
    //     size={150}
    //     onUpload={(url) => {
    //       setAvatarUrl(url)
    //       updateProfile({ fullname, username, website, avatar_url: url })
    //     }}
    //   />
    //   {/* ... */}
    // </div>
    //     <div>
    //       <form action="/auth/signout" method="post">
    //         <button className="button block" type="submit">
    //           Sign out
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-20 lg:px-8">
        <div className="relative bg-white shadow-xl">
          <h2 className="sr-only">For Enterprise</h2>
          {loadedComponent}
        </div>
        {/* <div className="w-full flex flex-row justify-center my-3 gap-4">
          <button
            type="button"
            onClick={handlePrevClick}
            className={`mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto
            ${progress === 0 ? "hidden" : ""}`}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className={`mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto
            ${progress === 2 ? "hidden" : ""}`}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}

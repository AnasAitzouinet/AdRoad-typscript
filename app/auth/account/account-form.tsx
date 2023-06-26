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
import ProfileFinish from "@/components/Progress/ProfileFinish";
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
    } else if (progress === 2) {
      setLoadedComponent(<ProfileFinish session={session} />);
    } 
  }, [loading, progress, session]);

  useEffect(() => {
    load();
  }, [progress, router, load]);

  return (

    <div className="bg-gray-100">
      <div className={progress === 2 ? "mx-auto max-w-7xl py-10 px-6 sm:py-10 lg:px-4" : "mx-auto max-w-7xl py-16 px-6 sm:py-20 lg:px-8"}>
        <div className={progress === 2 ? "relative " : "relative bg-white shadow-lg"}>
          <h2 className="sr-only">For Enterprise</h2>
          {loadedComponent}
        </div>
      </div>
    </div>
  );
}

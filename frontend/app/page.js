"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/home");
  }, 2000);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl text-transparent bg-gradient-to-b from-primarylightblue to-primaryblue bg-clip-text">
        Welcome
      </h1>
      <h1 className="text-5xl text-primaryblue">to</h1>
      <h1 className="text-5xl text-transparent bg-gradient-to-b from-primaryblue to-primarydarkblue bg-clip-text">
        PANKH
      </h1>
    </div>
  );
};

export default page;

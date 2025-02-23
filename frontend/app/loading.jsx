"use client";

import Image from "next/image";
import React from "react";
import { TailSpin } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <TailSpin type="Tailspin" color="#00BFFF" height={150} width={150} />
      <div className="absolute">
        <Image src="/favicon_logo.ico" alt="loading" width={100} height={100} />
      </div>
    </div>
  );
};

export default loading;

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-white">
      {/* Centered Logo */}
      <Image
        src="/favicon_logo.ico"
        alt="Not Found Logo"
        width={160}
        height={160}
        className="mb-6"
      />

      {/* 404 Heading */}
      <h1 className="text-6xl font-bold text-blue-600">404</h1>

      {/* Subtext */}
      <p className="mt-4 text-lg text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>

      {/* Home Link */}
      <Link
        href="/"
        className="mt-6 text-base font-medium text-blue-500 hover:underline"
      >
        ← Go back home
      </Link>
    </div>
  );
}

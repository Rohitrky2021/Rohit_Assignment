"use client";

import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="bg-green-400 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Link href="/" className="text-white font-bold text-lg">
            Crypto Dashboard
          </Link>
          {/* <Link href="/dashboard" className="text-white font-bold ml-4 bg-black p-2 rounded-lg">
        Dashboard
        </Link> */}
          <Link
            href="/explorer"
            className="text-white font-bold ml-4 bg-sky-800 p-2 rounded-lg"
          >
            Explorer
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-lg shadow-inner"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

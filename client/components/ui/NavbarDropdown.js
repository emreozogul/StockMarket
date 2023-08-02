import React, { useState } from "react";
import Link from "next/link";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center justify-center rounded-lg gap-2 px-4 py-2 bg-blue-500 text-white shadow-md font-bold cursor-pointer"
        onClick={handleOpen}
      >
        <div
          className="inline-flex items-center justify-center w-full  rounded-md pointer focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          role="menuitem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={"w-5 h-5" + (isOpen ? " transform rotate-180" : "")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {isOpen ? (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 z-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
            <Link href="/" legacyBehavior>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Account settings
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Support
              </a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                License
              </a>
            </Link>
            <Link href="/register" legacyBehavior>
              <form method="POST" action="#">
                <button
                  type="submit"
                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Sign out
                </button>
              </form>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

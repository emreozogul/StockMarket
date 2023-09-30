import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const router = useRouter();

  React.useEffect(() => {
    const path = router.pathname;
    if (path === "/") {
      setActivePage("");
    } else {
      setActivePage(path.substring(1));
    }
  }, [router.pathname]);

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left z-50">
      <div
        className="flex items-center justify-center rounded-lg gap-2 px-4 py-2 bg-custom-secondary text-white shadow-md font-bold cursor-pointer"
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
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-custom-primary cursor-pointer active:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>

      {isOpen ? (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
            <Link href="/" legacyBehavior>
              <a
                className={
                  `text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ` +
                  (activePage === "" ? "bg-gray-100 text-gray-900" : "")
                }
                role="menuitem"
              >
                Home
              </a>
            </Link>
            <Link href="/profile" legacyBehavior>
              <a
                className={
                  `text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ` +
                  (activePage === "profile" ? "bg-gray-100 text-gray-900" : "")
                }
                role="menuitem"
              >
                Profile
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a
                className={
                  `text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ` +
                  (activePage === "about" ? "bg-gray-100 text-gray-900" : "")
                }
                role="menuitem"
              >
                About
              </a>
            </Link>

            <button
              type="submit"
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

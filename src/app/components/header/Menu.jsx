// components/Menu.js
"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import styles from "./menu.module.css";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  /*const { data: user } = useSWR("/auth/users/me", fetcher);*/

  const { getToken, logout, removeTokens } = AuthActions();

  console.log("Token:");
  console.log(getToken);

  const isAuthenticated = !!getToken;
  console.log(isAuthenticated)

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };


  

  const menuItems = isAuthenticated ? [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Activity", href: "/activity" },
    { label: "Analytics", href: "/analytics" },
  ] : [
    { label: "Profile", href: "/profile" },
    { label: "Sign Up", href: "/signup" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
       
        <div className={styles.navlinks}>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" passHref>
                Dashboard
              </Link>
              <Link href="/profile" passHref>
                Profile
              </Link>

              <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
            </>
          ) : (
            <>
              <Link href="/auth/register" passHref>
                Sign Up
              </Link>
              <Link href="/auth/login" passHref>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

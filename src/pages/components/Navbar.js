import Link from "next/link";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="Navbar">
        <div className="flexNavbar w-[80%] m-auto flex justify-between p-[30px]">
          <div className="left">
            <h2>GetLocation</h2>
          </div>
          <div className="right">
            <div className="menu">
              <ul className="flex gap-[20px]">
                <li>
                  <Link href="/">Home</Link>
                </li>

                <li>
                  <Link href="/Dashboard">Dashboard</Link>
                </li>

                {!session && (
                  <li>
                    <Link
                      href="/api/auth/signin"
                      onClick={(e) => {
                        e.preventDefault();
                        signIn();
                      }}
                    >
                      Sign In
                    </Link>
                  </li>
                )}

                {session && (
                  <li>
                    <Link
                      href="/api/auth/signout"
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Sign Out
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

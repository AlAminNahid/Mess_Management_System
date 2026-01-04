import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm flex justify-between">
        <div className="flex-1">
          <p className="text-xl font-bold whitespace-nowrap">
            Welcome to Mess Management System
          </p>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="" className="btn btn-outline mr-1.5">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="" className="btn btn-outline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 flex justify-end">
          <ul className="menu menu-horizontal px-1 mar">
            <li>
              <Link href="./auth/login" className="btn btn-neutral mr-1">
                Login
              </Link>
            </li>
            <li>
              <Link href="./auth/register" className="btn btn-neutral">
                Registration
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Image
          src="/background.png"
          alt="Background Image"
          fill
          priority
          className="object-cover"
        />
      </div>
    </>
  );
}

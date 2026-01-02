import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <nav>
        <h1>Welcome to Mess Management System</h1>
        <ul>
          <Link href="">Contact Us</Link>
          <Link href="">About Us</Link>
        </ul>
        <ul>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Registration</Link>
        </ul>
      </nav>

      <div>
        <Image
          src="/background.png"
          alt="Background Image"
          width={1615}
          height={750}
        />
      </div>
    </>
  );
}

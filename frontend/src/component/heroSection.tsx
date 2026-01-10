import Link from "next/link";

type HeroSectionProps = {
  showMenu?: boolean;
  isLanding?: boolean;
};

export default function HeroSection({
  showMenu = false,
  isLanding = false,
}: HeroSectionProps) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm flex justify-between">
        <div className="flex-1">
          <p className="text-xl font-bold whitespace-nowrap">
            <Link href="/">
              {isLanding ? "Welcome To MessMaster" : "MessMaster"}
            </Link>
          </p>
        </div>

        {showMenu && (
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/contact" className="btn btn-outline mr-1.5">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="btn btn-outline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

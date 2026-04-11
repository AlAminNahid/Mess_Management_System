import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us -MessMaster",
  description: "Learn more about MessMaster, our mission, features.",
  keywords: ["MessMaster", "mess management", "About Us"],
  authors: [{ name: "Al Amin Hossain Nahid" }],
};

export default function Login({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}

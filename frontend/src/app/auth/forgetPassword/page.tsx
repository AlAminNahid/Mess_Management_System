import ForgetPasswordForm from "@/components/auth/forgetPassFom";
import HeroSection from "@/components/heroSection";

export default function ForgetPasswordPage() {
  return (
    <>
      <HeroSection />
      <div className="min-h-screen flex items-center justify-center bg-white px-[8%] py-16">
        <ForgetPasswordForm />
      </div>
    </>
  );
}

import HeroSection from "@/component/heroSection";
import JoinMess from "@/component/messTable";
import { getAllMesses } from "@/services/user.allMesses";

export default async function Join() {
  const data = await getAllMesses();

  return (
    <>
      <HeroSection />
      <JoinMess messes={data.messes} />
    </>
  );
}

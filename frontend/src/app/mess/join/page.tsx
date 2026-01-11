import HeroSection from "@/component/heroSection";
import MessTable from "@/component/mess/messTable";
import { getAllMesses } from "@/services/user.allMesses";

export default async function Join() {
  const data = await getAllMesses();

  return (
    <>
      <HeroSection />
      <MessTable messes={data.messes} />
    </>
  );
}

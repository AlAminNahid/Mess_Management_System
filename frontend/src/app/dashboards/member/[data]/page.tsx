import Logout from "@/component/logout";

export default async function MemberDashboard({
  params,
}: {
  params: Promise<{ data: string }>;
}) {
  const userID = (await params).data;

  return (
    <>
      <Logout />

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome Member</h1>
            <h3 className="text-5xl font-bold">Your UserID: {userID}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

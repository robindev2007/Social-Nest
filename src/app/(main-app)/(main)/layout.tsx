import Header from "@/components/common/Header/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MainApplayout({
  leftbar,
  rightbar,
  children,
}: {
  children: React.ReactNode;
  leftbar: React.ReactNode;
  rightbar: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="relative flex flex-col gap-card">
      <Header />

      <div className="flex w-full justify-between gap-card px-2 pb-4">
        <div className="sticky top-14 hidden h-fit w-sidebar lg:flex">
          {leftbar}
        </div>

        <div className="h-full w-full md:max-w-2xl">{children}</div>

        <div className="sticky top-14 hidden h-fit w-sidebar md:flex">
          {rightbar}
        </div>
      </div>
    </div>
  );
}

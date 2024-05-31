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
    <div className="relative flex flex-col gap-card border">
      <Header />

      <div className="mx-auto flex gap-card">
        <div className="sticky top-12 hidden h-fit md:flex">{leftbar}</div>
        <div className="h-full">{children}</div>

        <div className="sticky top-12 hidden h-fit md:flex">{rightbar}</div>
      </div>
    </div>
  );
}

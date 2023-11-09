import SideNavbar from "@/components/SideNavbar";
import TopBar from "@/components/TopBar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative gap-5">
      <TopBar />
      <SideNavbar />
      <main className="grow">{children}</main>
    </div>
  );
}

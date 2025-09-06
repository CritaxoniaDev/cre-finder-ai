import { getSubscription, getUser } from "@v1/supabase/cached-queries";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cachedUser = await getUser();

  if (!cachedUser?.data) {
    redirect("/login");
  }

  // const subscription = await getSubscription();

  // if (!subscription) {
  //   redirect("/onboarding");
  // }

  return <>{children}</>;
}

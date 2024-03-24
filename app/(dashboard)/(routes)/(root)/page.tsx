import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info";

export default async function Home() {
  const { userId } = auth();



  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInprogress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInprogress.length}/>
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success"/>
      </div>
      <CoursesList items={[...coursesInprogress, ...completedCourses]} />
    </div>
  );
}

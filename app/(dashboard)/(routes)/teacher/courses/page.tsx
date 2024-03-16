import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";



const Courses = async () => {
  const {userId} = auth();
  console.log({userId})


  if(!userId) {
    return redirect("/");
  }

  const courses = await db.lMSCourse.findMany({
    where: {
      userId
    },
    include: {
      category: {
        select: {
          name: true
        },
      }
    },
    orderBy: {
      createdAt: "desc",
    }
  })

  console.log(courses)
  return (
    <div className="p-6">
     <DataTable columns={columns}  data={courses}/>
    </div>
  );
};

export default Courses;

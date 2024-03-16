import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const courseOwner = await db.lMSCourse.findUnique({
        where: { 
            id: params.courseId, 
            userId
         }
    })

    if(!courseOwner) {
        return new NextResponse("Unathorized", { status: 401 })
    }

    const attachment = await db.lMSAttachment.create({
        data: {
            url,
            name: url.split('/').pop(),
            courseId: params.courseId
        }
    })
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


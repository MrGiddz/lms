import { db } from "@/lib/db";
import { LMSAttachment, LMSChapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await db.lMSPurchase.findUnique({
      where: { 
        userId_courseId: {userId, courseId }
      },
    });

    const course = await db.lMSCourse.findUnique({
        where: {
            isPublished: true,
            id: courseId
        },
        select: {
            price: true
        }
    });


    const chapter = await db.lMSChapter.findUnique({
        where: {
            id: chapterId,
            isPublished: true
        }
    });


    if(!chapter || !course) {
        throw new Error("Chapter or course not found")
    }

    let muxData = null;
    let attachments: LMSAttachment[] = [];
    let nextChapter: LMSChapter | null = null;


    if(purchase) {
        attachments = await db.lMSAttachment.findMany({
            where: {
                courseId
            }
        })
    }

    if(chapter.isFree || purchase) {
      muxData = await db.lMSMuxData.findUnique({
        where: {
          chapterId
        }
      });

      nextChapter = await db.lMSChapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position
          }
        },
        orderBy: {
          position: "asc",
        }
      })
    }

    const userProgress = await db.lMSUserProgress.findUnique({
      where: {
        userId_chapterId: {
          userId, chapterId
        }
      }
    })

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase
    }

  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};

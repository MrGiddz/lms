import { db } from "@/lib/db";
import { LMSCategory, LMSChapter, LMSCourse } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = LMSCourse & {
    category: LMSCategory;
    chapters: LMSChapter[];
    progress: number | null;
}

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[]; 
    coursesInprogress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await db.lMSPurchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        });

        const courses = purchasedCourses.map(purchase => purchase.course) as CourseWithProgressWithCategory[];

        for(let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = courses.filter(course => course.progress === 100)
        const coursesInprogress = courses.filter(course => (course.progress ?? 0) < 100)

        return {
            completedCourses, coursesInprogress
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]", error);

        return {
            completedCourses: [],
            coursesInprogress: []
        }
    }
}
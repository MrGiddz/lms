const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function deleteExisting() {
    try {
        await database.category.deleteMany();
        console.log("All deleted");
    } catch (error) {
        console.log("Error deleting existing")
    }finally{
        seed();
    }
}

async function seed() {
    try {
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "Music"},
                {name: "Fitness"},
                {name: "Communications"},
                {name: "Chemistry"},
                {name: "Anatomy"},
                {name: "Psychology"},
                {name: "Photography"},
                {name: "Engineering"},
                {name: "Filming"},
            ]
        })
        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error)
    }finally{
        await database.$disconnect();
    }
}

deleteExisting();
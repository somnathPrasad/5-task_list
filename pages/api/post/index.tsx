import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const { newTask } = req.body;
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const fullDate = `${date}-${month}-${year}`;
    console.log(fullDate);

    const session = await getSession({ req });
    const result = await prisma.task.create({
      data: {
        task: newTask,
        author: { connect: { email: session?.user?.email } },
        year: year,
        month: month,
        date: date,
        fullDate: fullDate,
      },
    });
    res.json(result);
  }
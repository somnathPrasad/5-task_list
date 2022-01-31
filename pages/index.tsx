import Head from "next/head";
import TodayDate from "../components/todayDate";
import { tasks } from "../data/tasks";
import { useState } from "react";
import {
  GithubLoginButton,
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton,
  TelegramLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect } from "react";

const date = new Date().getDate();
const year = new Date().getFullYear();
const month = new Date().getMonth()+1;
const fullDate = `${date}-${month}-${year}`;
// console.log(fullDate);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { tasks: [] } };
  }
  const tasks = await prisma.task.findMany({
    where: {
      author: { email: session.user.email },
      fullDate: fullDate
    },
  });
  return {
    props: { tasks },
  };
};

interface tasks {
  id: string;
  task: string;
  year: number;
  month: number;
  date: number;
  fullDate: string;
}

export default function Home({ tasks }: { tasks: tasks[] }) {
  const [newTask, setNewTask] = useState("");
  const [allTask, setAllTasks] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    setAllTasks(tasks)
  }, [tasks]);

  function handleTaskOnClick(e: any) {
    e.target.classList.toggle("bg-green-200");
    e.target.classList.toggle("text-slate-600");
  }

  const getAllTask = allTask.map((task) => (
    <li 
    key={task.id} 
    className="py-2 my-1 px-3 rounded-md bg-green-300 font-semibold w-full"
    onClick={handleTaskOnClick}
    >
      {task.task}
    </li>
  ));

  const createTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { newTask };
      await fetch("api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  };

  if(!session){
    return (
      <div>
        <Head>
          <title>5 Task List</title>
          <meta name="description" content="5 Task List Main page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="center-v-h">
            <GithubLoginButton onClick={() => signIn("github")} />
            <FacebookLoginButton onClick={() => signIn("facebook")} />
            <GoogleLoginButton onClick={() => signIn("google")} />
            <TwitterLoginButton onClick={() => signIn("twitter")} />
            <LinkedInLoginButton onClick={() => signIn("linkedin")} />
            <TelegramLoginButton onClick={() => signIn("telegram")} />
            <InstagramLoginButton onClick={() => signIn("instagram")} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="5 Task List home page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center">
        <div className="flex flex-col">
          <div className="text-4xl mt-10 font-extrabold flex justify-center border-b-4 pb-2">
            <TodayDate />
          </div>
          <div className="text-center text-4xl list-none px-5 mt-5">
            {getAllTask}
          </div>
          <div className="absolute bottom-0 mb-5 border-t-4">

            <form className="w-full max-w-sm" onSubmit={createTask}>
              <div className="flex items-center py-2">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Type new task"
                />
                <input
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded ml-2 text-xl mb-3"
                  type="submit"
                  disabled={!newTask}
                  value="Create"
                />
                <button
                  className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 py-1 px-2 rounded text-xl mb-3"
                  type="button"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}

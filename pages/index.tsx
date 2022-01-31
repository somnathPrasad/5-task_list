import Head from "next/head";
import TodayDate from "../components/todayDate";
import { tasks } from "../data/tasks";
import { useState } from "react";

export default function Home() {
  const date = new Date().getDate() + 1;
  const year = new Date().getFullYear;
  const month = new Date().getMonth;
  const fullDate = `${date}-${month}-${year}`;
  const [newTask, setNewTask] = useState("");

  function handleTaskOnClick(e: any) {
    // e.target.classList.toggle("line-through");
    e.target.classList.toggle("bg-green-200");
    e.target.classList.toggle("text-slate-600");
  }

  const getAllTask = tasks.map((task) => (
    <li 
    key={task.id} 
    className="py-2 my-1 px-3 rounded-md bg-green-300 font-semibold w-full"
    onClick={handleTaskOnClick}
    >
      {task.task}
    </li>
  ));

  const createTask = async (e: React.SyntheticEvent) => {};

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

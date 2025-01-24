import { useEffect, useState } from "react";
import "./App.css";

type Thread = {
  id: string;
  title: string;
};

function App() {
  const [threads, setThreads] = useState<Thread[]>([]);
  useEffect(() => {
    const getThreadsData = async (): Promise<Thread[]> => {
      const result = await fetch(
        "https://railway.bulletinboard.techtrain.dev/threads?offset=10",
        { method: "GET" }
      );
      console.log(result);
      return await result.json();
    };
    getThreadsData().then((data) => setThreads(data));
  }, []);

  return (
    <>
      {threads.map((thread) => {
        return (
          <div key={thread.id} className="flex items-center justify-center">
            <p>{thread.id}</p>
            <p>{thread.title}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;

import { useEffect, useState } from "react"
import "./App.css"
import NewButton from "./components/new_button"

type Thread = {
  id: string
  title: string
}

function App() {
  const [threads, setThreads] = useState<Thread[]>([])
  useEffect(() => {
    const getThreadsData = async (): Promise<Thread[]> => {
      const result = await fetch(
        "https://railway.bulletinboard.techtrain.dev/threads?offset=0",
        { method: "GET" }
      )
      console.log(result)
      return await result.json()
    }
    try{    getThreadsData().then((data) => setThreads(data))
    }catch(e){
      console.log(e)
      return setThreads([{ id: "error", title: String(e) }])
    }
  }, [])

  return (
    <>
      {threads.map((thread) => {
        return (
          <div key={thread.id} className="flex items-center justify-center">
            <p>{thread.id}</p>
            <p>{thread.title}</p>
          </div>
        )
      })}
      <NewButton></NewButton>
    </>
  )
}

export default App

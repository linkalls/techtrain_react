import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useLocation,useNavigate } from "react-router-dom" //* 大事
import "./App.css"
import NewButton from "./components/new_button"

type Thread = {
  id: string
  title: string
}

interface ThreadCreateMessage {
  message: string
}

function App() {
  const [threads, setThreads] = useState<Thread[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const message = location.state
      ? (location.state as ThreadCreateMessage).message
      : undefined //* あったらmessageを取り出す

    const getThreadsData = async (): Promise<Thread[]> => {
      const result = await fetch(
        "https://railway.bulletinboard.techtrain.dev/threads?offset=0",
        { method: "GET" }
      )
      return await result.json()
    }
    try {
      getThreadsData().then((data) => setThreads(data))
      if (message) {
        console.log(message)
        toast.success(message)
        // 状態をリセットするために navigate を使用
        navigate("/", { replace: true, state: {} })
      }
    } catch (e) {
      console.log(e)
      return setThreads([{ id: "error", title: String(e) }])
    } finally {
      location.state.message = undefined
    }
  }, [location.state,navigate])

  return (
    <div className="flex flex-col min-h-screen justify-center items-center ">
      {threads.map((thread) => {
        return (
          <div key={thread.id} className="flex items-center justify-center">
            <p>{thread.id}</p>
            <p>{thread.title}</p>
          </div>
        )
      })}
      <NewButton></NewButton>
      <button
        onClick={() => {
          toast("wow")
          console.log("click")
        }}
      >
        feffwfwfw
      </button>
    </div>
  )
}

export default App

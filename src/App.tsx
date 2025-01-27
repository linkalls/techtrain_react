import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom" //* 大事
import "./App.css"
import { client } from "./client/client"
import Header from "./components/header"
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

    try {
      client
        .get<Thread[]>("/threads?offset=0")
        .then((result) => setThreads(result.data ? result.data : []))
      if (message) {
        console.log(message)

        // 状態をリセットするために navigate を使用
        navigate("/", { replace: true, state: {} })
        // strictModeだから2回目のrenderingが走る
        toast.success(message)
      }
    } catch (e) {
      console.log(e)
      return setThreads([{ id: "error", title: String(e) }])
    }
  }, [location.state, navigate])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-1 justify-center items-center">
        {threads.map((thread) => {
          return (
            <div key={thread.id} className="flex items-center justify-center">
              <Link
                to={`/threads/${thread.id}`}
                className=" text-amber-400 pr-2"
              >
                {thread.id}
              </Link>
              <p>{thread.title}</p>
            </div>
          )
        })}
      </div>
      <div className="fixed bottom-8 right-8">
        {/* fixedで固定 */}
        <NewButton></NewButton>
      </div>

      {/* <button
        onClick={() => {
          toast("wow")
          console.log("click")
        }}
      >
        feffwfwfw
      </button> */}
    </div>
  )
}

export default App

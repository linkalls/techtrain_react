import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { client } from "../client/client"
import Header from "../components/header"

interface PostData {
  thread_id: string
  posts: { id: string; post: string }[]
}

export default function Details() {
  const { thread_id } = useParams()
  const [posts, setPosts] = useState<PostData>({ thread_id: "", posts: [] }) //*名前変えないと
  useEffect(() => {
    console.log(thread_id)
    client
      .get<PostData>(`/threads/${thread_id}/posts`)
      .then((data) => setPosts(data))
  }, [thread_id])

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <h1 className="text-center">Thread ID: {thread_id}</h1>
      <div className="flex flex-1 flex-col text-center mt-2 justify-center items-center">
        {/* <h1>Thread ID: {thread_id}</h1> */}
        <div className="">
          {posts.posts.map((p) => {
            return <div key={p.id}>{p.post}</div>
          })}
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { client } from "../client/client"
import Header from "../components/header"

interface PostData {
  thread_id: string
  posts: { id: string; post: string }[]
}

interface userPost {
  postRequired: "string"
}

export default function Details() {
  const { thread_id } = useParams()
  const [posted, setPosted] = useState(false)

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<userPost>()

  const onSubmit: SubmitHandler<userPost> = (data) => {
    console.log(data)
    client
      .post(`/threads/${thread_id}/posts`, { post: data.postRequired })
      .then(() => {
        console.log("success")
        setPosted(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const [posts, setPosts] = useState<PostData>({ thread_id: "", posts: [] }) //*名前変えないと
  useEffect(() => {
    console.log(thread_id)
    client
      .get<PostData>(`/threads/${thread_id}/posts`)
      .then((result) =>
        setPosts(
          result.data?.posts.length
            ? { thread_id: result.data.thread_id, posts: result.data.posts }
            : { thread_id: result.data?.thread_id ?? "", posts: [] }
        )
      )
      .catch((e) => {
        console.log(e)
      })
    setPosted(false)
  }, [thread_id, posted])

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <h1 className="text-center">Thread ID: {thread_id}</h1>
      <div className="flex flex-1 flex-col text-center mt-2 justify-center items-center">
        {/* <h1>Thread ID: {thread_id}</h1> */}
        <div>
          {posts.posts.map((p) => {
            return <div key={p.id}>{p.post}</div>
          })}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col items-center justify-center w-full"
        >
          <label
            htmlFor="message"
            className="block my-2 text-sm font-medium text-gray-900 "
          >
            threadのタイトルを入力してね!
          </label>
          <textarea
            {...register("postRequired", { required: true })}
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="threadのタイトルを入力してね!"
            defaultValue={""}
          />
          {errors.postRequired && <span>内容 is required</span>}
          <input
            type="submit"
            className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          />
        </form>
      </div>
    </div>
  )
}

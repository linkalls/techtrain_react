import { SubmitHandler, useForm } from "react-hook-form"
import type { NavigateFunction } from "react-router"
import { useNavigate } from "react-router"
import { client } from "../client/client"
import Header from "../components/header"


interface PostResponse {
  id: string
  title: string
}

const postThreadsData = async (
  title: string,
  navigate: NavigateFunction
): Promise<undefined> => {
  try {
    const result = await client.post<PostResponse>("/threads", { title })
    console.log(result)
   navigate("/", { state: { message: "threadを新しく作りました！" } })
  } catch (e) {
    console.log(e)
  }
}

type Inputs = {
  titleRequired: string
}

export default function NewThread() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    postThreadsData(data.titleRequired, navigate)
  }

  // console.log(watch("titleRequired")) // watch input value by passing the name of it

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col items-center justify-center min-h-screen"
      // min-h-screen便利
    >
      <label
        htmlFor="message"
        className="block my-2 text-sm font-medium text-gray-900 "
      >
        threadのタイトルを入力してね!
      </label>
      <textarea
        {...register("titleRequired", { required: true })}
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="threadのタイトルを入力してね!"
        defaultValue={""}
      />
      {errors.titleRequired && <span>title is required</span>}
      <input
        type="submit"
        className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      />
    </form>
    </div>
  )
}

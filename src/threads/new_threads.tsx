import { SubmitHandler, useForm } from "react-hook-form"
import type { NavigateFunction } from "react-router"
import { useNavigate } from "react-router"

const postThreadsData = async (
  title: string,
  navigate: NavigateFunction
): Promise<boolean> => {
  try {
    const result = await fetch(
      "https://railway.bulletinboard.techtrain.dev/threads",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          body: JSON.stringify({ title }),
        },
      }
    )
    console.log(result)
    return true
    navigate("/")
  } catch (e) {
    console.log(e)
    return false
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center "
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
      <input type="submit" />
    </form>
  )
}

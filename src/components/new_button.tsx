import { NavLink } from "react-router"

export default function NewButton() {
  return (
    <div className="flex justify-center">
      <NavLink to="/threads/new" className="outline-indigo-100 text-center mt-4 bg-indigo-500 text-white font-bold py-2 px-4 rounded">
        threadを新しく作る !
      </NavLink>
      {/* https://csshtml.work/a-center/ */}
    </div>
  )
}

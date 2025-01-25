import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-indigo-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-xl font-bold hover:text-indigo-200"
        >
          ホーム
        </Link>
        <nav>
          <Link
            to="/threads/new"
            className="text-white hover:text-indigo-200 px-4 py-2 rounded-lg border border-white"
          >
            新規スレッド作成
          </Link>
        </nav>
      </div>
    </header>
  )
}

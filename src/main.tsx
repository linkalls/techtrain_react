import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router"
import "./App.css"
import App from "./App.tsx"
import NewThread from "./threads/new_threads.tsx"
import Details from "./threads/details.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/threads"> //* ネストされたルート
          <Route path="new" element={<NewThread />} />
          <Route path=":thread_id" element={<Details />} />
        </Route>
      </Routes>
    </StrictMode>
    ,
  </BrowserRouter>
)

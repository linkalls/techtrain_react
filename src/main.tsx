import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter,Routes ,Route} from "react-router"
import "./App.css"
import App from "./App.tsx"
import NewThread from "./threads/new_threads.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter >
    <StrictMode>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/threads/new" element={<NewThread />} />
      </Routes>
    </StrictMode>
    ,
  </BrowserRouter>
)

import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signup from "./component/Signup"
import Login from "./component/Login"
import Home  from "./component/Home"
import ForgotPassword from "./component/ForgotPassword"


function App() {
  
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path = "/signup" element={<Signup />}></Route>
      <Route path = "/login" element={<Login />}></Route>
      <Route path = "/forgotPassword" element={<ForgotPassword />}></Route>
     </Routes>
    
    </BrowserRouter>
  )
}

export default App

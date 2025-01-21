import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signup from "./component/Signup"
import Login from "./component/Login"
import Home  from "./component/Home"
import ForgotPassword from "./component/ForgotPassword"
import Professional from "../src/pages/Professional";
import Personal from "../src/pages/Personal";
import College from "../src/pages/College";
import Social from "../src/pages/Social";
import Community from "../src/pages/Community";
import Upload from "./File/upload";
import ResetPassword from "./component/ResetPassword";





function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path = "/signup" element={<Signup />}></Route>
      <Route path = "/" element={<Login />}></Route>
      <Route path = "/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path = "/personal" element={<Personal/>}></Route>
      <Route path = "/professional" element={<Professional />}></Route>
      <Route path = "/college" element={<College />}></Route>
      <Route path = "/social" element={<Social />}></Route>
      <Route path = "/community" element={<Community/>}></Route>
      <Route path = "/upload" element={<Upload/>}></Route>
      <Route path = "/resetpassword/:token" element={<ResetPassword/>}></Route>

     </Routes>

    </BrowserRouter>
  )
}

export default App

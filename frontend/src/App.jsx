import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ChooseUser from './Components/ChooseUser'
import Home from './Components/Home'
import AdminRegister from './Components/Adminregister'
import Adminsignin from './Components/Admisigin'
import Studentsignin from './Components/Studentsignin'
import Teachersignin from './Components/Teacherssignin'
import Dashboard from './pages/Admin/Dashboard'
import { AuthProvider } from '../../server/Authentication/authentication'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ChooseUser' element={<ChooseUser/>}/>
        <Route path='/AdminRegister' element={<AdminRegister/>}/>
        <Route path='/Adminsignin' element={<Adminsignin/>}/>
        <Route path='/Studentsignin' element={<Studentsignin/>}/>
        <Route path='/Teachersignin' element={<Teachersignin/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App

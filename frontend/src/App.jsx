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
import Sidebar from './pages/Admin/Sidebar'
import Classes from './pages/Admin/classes'
import Assignment from './pages/Admin/Assignment'
import Announcements from './pages/Admin/Announcements'
import Students from './pages/Admin/Students'
import Teachers from './pages/Admin/Teachers'
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
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/sidebar' element={<Sidebar/>}/>
        <Route path='/admin/classes' element={<Classes/>}/>
        <Route path='/admin/assignment' element={<Assignment/>}/>
        <Route path='/admin/students' element={<Students/>}/>
        <Route path='/admin/teachers' element={<Teachers/>}/>
        <Route path='/admin/announcements' element={<Announcements/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App

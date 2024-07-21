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
import StudentDashboard from './pages/Student/Dashboard'
import TeacherDashboard from './pages/Teacher/Dashboard'
import TeacherSidebar from './pages/Teacher/sidebar'
import TeacherStudents  from './pages/Teacher/Students'
import Teachersview  from './pages/Teacher/Teachers'
import TeacherAnnouncements  from './pages/Teacher/Announcements'
import TeacherAssignment  from './pages/Teacher/Assignments'
import Classesview  from './pages/Teacher/classes'
import EnterGrades  from './pages/Teacher/grades'
import StudentTeachersview  from './pages/Student/Teachers'

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
        <Route path='/student/dashboard' element={<StudentDashboard/>}/>
        <Route path='/teacher/dashboard' element={<TeacherDashboard/>}/>
        <Route path='/teacher/sidebar' element={<TeacherSidebar/>}/>
        <Route path='/teacher/students' element={<TeacherStudents/>}/>
        <Route path='/teacher/teachers' element={<Teachersview/>}/>
        <Route path='/teacher/announcements' element={<TeacherAnnouncements/>}/>
        <Route path='/teacher/assignment' element={<TeacherAssignment />}/>
        <Route path='/teacher/classes' element={<Classesview />}/>
        <Route path='/teacher/grades' element={<EnterGrades/>}/>
        <Route path='/student/teachers' element={<StudentTeachersview/>}/>


      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App

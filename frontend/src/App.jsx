import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ChooseUser from './Components/ChooseUser'
import Home from './Components/Home'
import AdminRegister from './Components/Adminregister'
import Adminsignin from './Components/Admisigin'
import Studentsignin from './Components/Studentsignin'
import Teachersignin from './Components/Teacherssignin'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ChooseUser' element={<ChooseUser/>}/>
        <Route path='/AdminRegister' element={<AdminRegister/>}/>
        <Route path='/Adminsignin' element={<Adminsignin/>}/>
        <Route path='/Studentsignin' element={<Studentsignin/>}/>
        <Route path='/Teachersignin' element={<Teachersignin/>}/>
      </Routes>
    </Router>
  )
}

export default App

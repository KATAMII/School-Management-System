import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ChooseUser from './Components/ChooseUser'
import Home from './Components/Home'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ChooseUser' element={<ChooseUser/>}/>
      </Routes>
    </Router>
  )
}

export default App

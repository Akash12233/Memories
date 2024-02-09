import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Fpage from './components/firstpage'
import LoginPage from './components/loginpage';
import Registerpage from './components/registerpage';
import Homepage from './components/homepage';
import Profile from './components/profie';
import CreateEvent from './components/createevent';
import Event from './components/event';
import Guests from './components/guest';
import Media from './components/media';
import Subevent from './components/subevent';
import General from './components/general';
import Whatsapp from './components/whatsapp';
import Sharing from './components/sharing';
const app :React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Fpage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/registerpage" element={<Registerpage />} />
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/createevent" element={<CreateEvent/>}/>
        <Route path ="/event" element={< Event/>}/>
        <Route path ="/guest" element={< Guests/>}/>
        <Route path="/media" element={<Media/>}/>
        <Route path="/subevent" element={<Subevent/>}/>
        <Route path="/general" element={<General />} />
        <Route path="/whatsapp" element={<Whatsapp />} />
        <Route path="/sharing" element={<Sharing />} />
      </Routes>
    </Router>
  )
}

export default app

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import Fpage from './components/firstpage';
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
import Eventhome from './components/eventhome';


const App: React.FC = () => {
  return (
    
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Fpage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/registerpage" element={<Registerpage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/event" element={<Event />} />
          <Route path="/guest/:id" element={<Guests />} />
          <Route path="/media/:id" element={<Media />} />
          <Route path="/subevent/:id" element={<Subevent />} />
          <Route path="/general/:id" element={<General />} />
          <Route path="/whatsapp/:id" element={<Whatsapp />} />
          <Route path="/sharing/:id" element={<Sharing />} />
          <Route path="/eventhome/:id" element={<Eventhome />} />
        </Routes>
      </Router>
    </AuthContextProvider>
    
  );
};

export default App;

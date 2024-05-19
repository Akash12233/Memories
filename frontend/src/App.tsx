import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import Fpage from './pages/firstpage';
import LoginPage from './pages/loginpage';
import Registerpage from './pages/registerpage';
import Homepage from './pages/homepage';
import Profile from './pages/profie';
import Event from './pages/event';
import Guests from './pages/guest';
import Media from './pages/media';
import Subevent from './pages/subevent';
import General from './pages/general';
import Whatsapp from './pages/whatsapp';
import Sharing from './pages/sharing';
import Eventhome from './pages/eventhome';
import Urlmediapage from './urlpages/mdeiaurl';
import PageLayout from './pages/cohostlayout';
import ErrorMessage from './pages/errorpage';


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
          <Route path="/event" element={<Event />} />
          <Route path="/general/:id" element={<General />} />
          <Route path="/whatsapp/:id" element={<Whatsapp />} />
          <Route path="/sharing/:id" element={<Sharing />} />
          <Route path="/errorpage" element={<ErrorMessage />} />
          <Route path="/urlmedia/:id" element={<Urlmediapage />} />
          <Route element={<PageLayout />}>
          <Route path="/guest/:id1/:id2" element={<Guests />} />
          <Route path="/media/:id1/:id2" element={<Media />} />
          <Route path="/subevent/:id1/:id2" element={<Subevent />} />
          <Route path="/eventhome/:id1/:id2" element={<Eventhome />} />
          </Route>
          
        </Routes>
      </Router>
    </AuthContextProvider>
    
  );
};

export default App;

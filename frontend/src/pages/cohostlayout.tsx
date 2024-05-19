import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavBot from "../components/NavBot";


const PageLayout: React.FC = () => {
    
    const user= localStorage.getItem("user");
    let settings = null;
    let profile = false;
    let memories = false;

    if (user) {
        settings = true;
        profile = true;
        memories = true;
    }
    localStorage.setItem("settings", settings);
    return (
      <>
          <NavBar {...{ profile, memories }} />
          <Outlet />
           <NavBot />
          
          
      </>
    )
  };

export default PageLayout
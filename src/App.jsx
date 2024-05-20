import AddRoom from './components/room/AddRoom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExistingRooms from "./components/room/ExistingRooms.jsx";
import EditRooms from "./components/room/EditRooms.jsx";
import Footer from "./components/layout/Footer.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import Home from "./components/home/Home.jsx";

function App() {

  return (
    <>
    <main>
          <BrowserRouter>
              <NavBar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/add-room" element={<AddRoom />} />
                <Route path="/existing-rooms/" element={<ExistingRooms />} />
                <Route path="/edit-rooms/:roomId" element={<EditRooms />} />
                <Route path="/add-room" element={<EditRooms />} />
            </Routes>
              <Footer />
          </BrowserRouter>
    </main>
    </>
  )
}

export default App

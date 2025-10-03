import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Report from './components/Report/Report';
import GalleryView from './components/GalleryView';
import DashBoard from './components/DashBoard';
import UserManagement from './components/UserManagement';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { PrivateRoute } from './utils/PrivateRoute';
import { Toaster } from 'sonner';
import FileAutoUpload from './components/FileAutoUpload';
import { setAuthToken } from './utils/setAuthtoken';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {

  const socket = useSelector((item:any) => item.socket.socket);
  useEffect(() => {
    socket.removeListener('lazy_person');
    socket.on('lazy_person', (data:any) => {
      toast.warning(<div className="text-red-500 font-bold">{data["user_id"] + " is resting over 5 minutes"}</div>)
    })
  }, [])

  return (
    <div className="flex flex-col w-full">

      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path='/fileautoupload' element={<FileAutoUpload />} />
          <Route path='/login' element={<Login />} />
          <Route path='/galleryView' element={<PrivateRoute element={<GalleryView />} />} />
          <Route path='/usermanagement' element={<PrivateRoute element={<UserManagement />} />} />
          <Route path='/report' element={<PrivateRoute element={<Report />} />} />
          <Route path='/dashboard' element={<PrivateRoute element={<DashBoard />} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App


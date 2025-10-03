import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { deleteUser } from '../redux/slices/user.slice'
import "./../App.css";

function Navbar() {

    const navigate = useNavigate();
    const isAuthenticated = useSelector((item:any) => item.user.authenticated);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(document.location.pathname === '/') navigate('/login');
    }, []);

    const logoutUser = (e?:any) => {
        e.preventDefault();
        dispatch(deleteUser());

    }
  
  return (
    <>
        {/* Navbar */}
        <div className="h-[12vh] bg-gray-900 flex flex-row justify-between items-center"> 
      
            <div className='ml-15 w-[15%] flex flex-row justify-center items-center max-xl:hidden'>
                <img className='h-8 w-8 logo' src='./assets/kms_img/react.svg'></img>
                <div className='ml-10 text-[white] font-bold text-[14pt]'>
                    Stealth Con
                </div>
            </div>
            
            <div>
                <button className='h-10 w-30 bg-blue-0 
                rounded m-4 text-[white]
                hover:text-blue-700 hover:none active:text-purple-700
                duration-100 text-[12pt] font-bold' onClick={()=> navigate("/dashboard")}>DashBoard</button>

                <button className='h-10 w-30 bg-blue-0 
                rounded m-4  text-[white]
                hover:text-blue-700 hover:outline-none active:text-purple-700
                duration-100 text-[12pt] font-bold' onClick={()=> navigate("/report")}>Report</button>
                
                <button className='h-10 w-30 bg-blue-0 
                rounded m-4 text-[white]
                hover:text-blue-700 hover:outline-none active:text-purple-700
                duration-100 text-[12pt] font-bold' onClick={()=> navigate("/usermanagement")}>User Manage</button>

                <button className='h-10 w-30 bg-blue-0 
                rounded m-4 text-[white]
                hover:text-blue-700 hover:outline-none active:text-purple-700
                duration-100 text-[12pt] font-bold' onClick={()=> navigate("/galleryView")}>Gallery View</button>
                {
                    isAuthenticated === false ?
                    (
                        <button className='h-10 w-25 bg-blue-0 
                            rounded m-4  text-[white]
                            hover:text-blue-700 hover:outline-none active:text-purple-700
                            duration-100 text-[12pt] font-bold' onClick={() =>navigate("/login")}>Log in</button>
                    )
                    :
                    (
                         <button className='h-10 w-25 bg-blue-0 
                            rounded m-4  text-[white]
                            hover:text-blue-700 hover:outline-none active:text-purple-700
                            duration-100 text-[12pt] font-bold' onClick={e => logoutUser(e)}>Log Off</button>   
                    )
                }
            </div>
        </div>
    </>
  )
}
export default Navbar
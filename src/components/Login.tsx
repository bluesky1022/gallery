import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { signin } from "../actions/auth";
import { setAuthToken } from "../utils/setAuthtoken";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user.slice";
import { useAppSelector } from "../redux/store";
import {toast} from "sonner"

function Login() { 
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin = useAppSelector(state => state.user);

  const keydownEvent = (e:any) => {
    if(e.key == "Enter"){
        loginData();
      }
  } 

  const loginData = ( ) =>{
    const logindata = {
      id:useremail,
      password:userpassword
    }

    
    signin(logindata).then(res => {
      localStorage.setItem('token', res.token);
      setAuthToken(res.token);

      dispatch(setUser())

      navigate('/dashboard');
      toast.success(<div className='text-[green] text-[11pt]'>Successfully Logged In!</div>);
    }).catch(err => {
    toast.error(<div className='text-[red] text-[11pt]'>Incorrect Input!</div>);  
  console.log(err)  })
  }

  useEffect(() => {
    if(admin.authenticated) navigate('/dashboard');    
    document.getElementById('input_pass')?.addEventListener('keydown', keydownEvent);
    document.getElementById('input_email')?.addEventListener('keydown', keydownEvent);
    

    return () => {
      document.getElementById("input_pass")?.removeEventListener("keydown", keydownEvent)
    }
  }, [useremail, userpassword]);



  return(
  <>
   
   <div className="flex flex-col h-[80vh] items-center justify-center">
      <h1 className='text-[35px] mt-10 font-bold h-[40vh] flex items-center'>Welcome To Our HomePage!</h1>
      <input type="text"  id = "input_email" required className="w-[25%] h-[4vh] border-b-2 mb-12 focus:outline-none border-b-[#112133] " placeholder='@Your Email' value={useremail} onChange={(e)=>setUseremail(e.target.value)}></input>
      <input type="password" id="input_pass" required className=" w-[25%] h-[4vh] border-b-2 mb-12 focus:outline-none border-b-[#112133]" placeholder='Your Password' value={userpassword} onChange={(e)=>setUserpassword(e.target.value)}></input>
      <button className='w-40 h-[12vh] bg-[#7B0099] rounded text-[white] 
                hover:bg-blue-700  active:text-purple-700
                duration-300 text-[12pt] font-bold' onClick={loginData}>Log in</button>
 
     <div className="h-[30vh]"></div>
     </div>

   </>
   )
}
export default Login
import { GET_GROUP_LOGO_URL, GET_USER_AVATAR_URL } from "../utils/constants";
import { toast } from 'sonner'
import "./css/Userbar.css"
function UserBar(props: any) {
  const showUserInfo = () => {
    if (props.group_data.name == null) {
      toast.success(<div>No Group Memeber.</div>)
    }
    else {
      toast.success(<div>{props.group_data.name + " member."}</div>)
    }

  }
  const current_date = Date.parse(Date());
  const time_difference = current_date - props.isLoggedin;
  console.log(time_difference)
  const left_slidebar = (
    <>
      <div className='h-12 w-[92%] rounded m-1 bg-[white] flex items-center justify-center shadow-[1px_1px_2px_1px_rgba(0,0,0,0.35)]'>
        <div className='w-8 flex justify-center  items-center'>
          {(time_difference) < props.group_data.time_interval * 1000 ? <div className='rounded-full bg-green-600 w-2 h-2 shadow-[0px_0px_0px_2px_rgba(0,255,0,0.5)]'></div> :
            <div className='rounded-full bg-red-600 w-2 h-2 shadow-[0px_0px_0px_2px_rgba(255,0,0,0.35)]'></div>}
        </div>

        <img className='h-8 w-8  rounded-full shadow-[1px_1px_2px_0px_rgba(0,0,0,0.5)]' src={GET_USER_AVATAR_URL + props.avatar_url} ></img>
        <div className='w-[45%] h-[100%] flex items-center justify-center '>
          <h1>{props.name}</h1>
        </div>

        <img className='h-7 w-7 rounded-full  shadow-[1px_1px_2px_0px_rgba(0,0,0,0.5)]' src={GET_GROUP_LOGO_URL + props.group_data.brand}></img>
        <button className="w-3 h-3 items-center bg-blue-400 rounded-full  text-[6pt] text-center font-bold shadow-[1px_1px_2px_1px_rgba(0,0,0,0.1)] text-[white] ml-2" onClick={showUserInfo}>i</button>
      </div></>
  )
  return (
    <>
      {left_slidebar}
    </>
  )
}
export default UserBar;
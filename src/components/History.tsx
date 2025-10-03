import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteHistory } from "../redux/slices/history.slice";
import { GET_USER_AVATAR_URL } from "../utils/constants";
import { toast } from 'sonner'
import "./css/Userbar.css"
import axios from "./../utils/request";

function History_bar(props: any) {
  const dispatch = useDispatch()

  const alert = () => {
    console.log(props.historydata.id);
    axios.delete(`http://localhost:5000/api/tracking/deleteuserhistory/${props.historydata.id}`)
      .then(res => {
        if (res.data) {
          dispatch(deleteHistory(props.historydata.id))
          return toast.success(<div>Delete Success</div>)
        }
      })
      .catch(err => console.log(err))
  }

  const history_cell = (
    <>
      <div className='h-9 w-[70%] rounded mt-2 bg-[white] flex items-center justify-center shadow-[1px_1px_2px_1px_rgba(0,0,0,0.35)]'>

        <div className='w-20 flex justify-center  items-center'>
          <img className='h-5 w-5  rounded-full shadow-[1px_1px_2px_0px_rgba(0,0,0,0.5)]' src={GET_USER_AVATAR_URL + props.historydata.user_avatar} ></img>

        </div>

        <div className='w-[40%] h-[100%] flex items-center justify-center '>
          <h1 className="text-[10pt] font-bold" >{props.historydata.user_name}</h1>
        </div>
        <div className='w-[30%] h-[100%] flex items-center justify-center'>
          {moment(props.historydata.input_time).format('YYYY.MM.DD. hh:mm:ss') == "Invalid date" ?
            <h1 className="text-[10pt]">Record Date</h1> :
            <h1 className="text-[10pt]">{moment(props.historydata.input_time).format('YYYY.MM.DD. hh:mm:ss')}</h1>}
        </div>

        <div className='w-[30%] h-[100%] flex items-center justify-center'>
          {props.historydata.type ? <h1 className="text-[10pt]">On Working...</h1>
            : <h1 className="text-[10pt]">On Resting...</h1>}
        </div>

        <div className='w-[25%] h-[100%] flex  items-center justify-center'>
          <div className='rounded-full mr-3 bg-red-600 w-3 h-3 shadow-[0px_0px_0px_2px_rgba(255,0,0,0.35)] flex items-center justify-center' >
            <button className="text-[6pt] font-bold text-[white] border-[yellow]" onClick={alert}>X</button>
          </div>
        </div>

      </div></>
  )
  return (
    <>
      {history_cell}
    </>
  )
}
export default History_bar;
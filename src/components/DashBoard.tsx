import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from './../utils/request';
import UserBar from './UserBar'
import History_bar from './History';
import { setHistory } from '../redux/slices/history.slice';

function DashBoard() {

  const date = new Date();

  const [input_data, setInputdata] = useState([]);
  const [logged_usernum, setLoggeduserNum] = useState(0);
  const [logedprogress, setLogedprogress] = useState(0);

  const histories = useSelector((state: any) => state.history.histories)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/getlogindata")
      .then(res => {
        let input_data = res.data;
        let cnt = 0;
        for (let i = 0; i < input_data.length; i++) {
          if ((Date.parse(Date()) - input_data[i].time.recv_time) < input_data[i].usergroup.time_interval * 1000) {
            cnt += 1;
          }
        }
        setInputdata(res.data);
        setLoggeduserNum(cnt);

        load_history_data()
        setLogedprogress(cnt / input_data.length * 100)
      })

  }, []);

  const load_history_data = () => {
    axios.get("http://localhost:5000/api/tracking/getuserhistory")
      .then(res => {
        console.log(res.data)
        dispatch(setHistory(res.data))

      })
  }

  return (
    <>
      {/* Land In */}

      <div className='h-full flex flex-row justify-around bg-gray-300'>

        <div className='h-[80vh] bg-[white] overflow-y-scroll rounded-xl smart-scroll overflow-x-hidden w-[25%] min-w-60 flex items-center ml-3 justify-top flex-col rounded mt-3 shadow-[0_2px_3px_0px_rgba(0,0,0,0.25)]'>
          <h1 className='text-[27px] font-bold mt-4 mb-1'>Current Users</h1>

          <div className='w-[90%] h-[10%] flex flex-col items-center'>

            <h1 className='text-[16px] font-bold mb-1 text-center'>Loged in Users &nbsp; {logged_usernum}/{input_data.length} ({(logged_usernum * 100 / input_data.length).toFixed(2)} %)</h1>
            <div className='w-[90%] h-1 rounded-full bg-gray-300 '>
              <div className={"rounded-full bg-green-600 h-full shadow-[0px_0px_1px_2px_rgba(0,255,0,0.5)]"} style={{ width: logedprogress + "%" }}>
              </div>
            </div>
          </div>

          {input_data.map((item: any, index: any) => <UserBar name={item.userdata.name} key={index} isLoggedin={item.time.recv_time} avatar_url={item.userdata.avatar} group_data={item.usergroup}></UserBar>)}

        </div>

        <div className='h-[80vh] bg-[white] rounded-xl overflow-y-scroll smart-scroll mb-3  overflow-x-hidden w-[74%] mr-3 min-w-60 flex items-center ml-2 justify-top flex-col rounded  mt-3 shadow-[0_2px_3px_0px_rgba(0,0,0,0.25)]'>
          <h1 className='text-[27px] font-bold mt-4 mb-1'>Current Status ({date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()})</h1>

          <div className='w-[100%] h-full'>
            <div className='w-[100%]  flex flex-col items-center justify-center'>
              {histories.map((item: any, index: any) => <History_bar key={index} historydata={item}></History_bar>)}
            </div>


          </div>

        </div>


      </div>
    </>
  )
}
export default DashBoard
import { useState, useEffect } from 'react';
import '../css/report.css';
import axios from './../../utils/request';
import { GET_USERS_URL, GET_PHOTO_DATA_URL, GET_AVATAR_URL } from '../../utils/urls';
import { useSelector } from 'react-redux';

type PDATA = {
  photo_array: Array<any>
}

type LINEINFO = {
  time: Number,
  stop: Boolean
}

const RightPanel = () => {
  const [users, setUsers] = useState<any>([]);
  const [work_hour, setWorkHour] = useState<any>([]);
  const [line_info, setLineInfo] = useState<any>([]);

  const dt = useSelector((item : any) => item.report.date);

  useEffect(() => {

  }, [dt])

  useEffect(() => {
    axios.get(GET_USERS_URL)
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.log(err.response))

    axios.post(GET_PHOTO_DATA_URL, { date: dt })
      .then(res => {
        const photoData = res.data;
        //calc work time
        let workHour: Number[] = [];
        let lineInfo: any[] = [];
        photoData.map((item: PDATA) => {
          let tempLineInfo: LINEINFO[] = [];
          let tempPeriod = 0;
          if (item.photo_array.length > 0)
            tempLineInfo.push({ time: item.photo_array[0].recv_time, stop: false })

          for (let i = 0; i < item.photo_array.length - 1; i++) {
            const gap = item.photo_array[i + 1].recv_time - item.photo_array[i].recv_time;
            const interval = item.photo_array[i].interval;
            if (gap / 1000 < interval + 2) {
              tempPeriod += interval;
            } else {
              //if(item.photo_array[i].recv_time !== tempLineInfo[tempLineInfo.length - 1].time)
              {
                const candPoint: LINEINFO = { time: item.photo_array[i].recv_time, stop: !tempLineInfo[tempLineInfo.length - 1].stop };
                tempLineInfo.push(candPoint);
              }
              const candPoint: LINEINFO = { time: item.photo_array[i + 1].recv_time, stop: !tempLineInfo[tempLineInfo.length - 1].stop };
              tempLineInfo.push(candPoint);
            }
          }
          if (item.photo_array.length > 1)
            tempLineInfo.push({ time: item.photo_array[item.photo_array.length - 1].recv_time, stop: !tempLineInfo[tempLineInfo.length - 1].stop });
          workHour.push(tempPeriod);
          lineInfo.push(tempLineInfo);
        })
        setWorkHour(workHour);
        //calc timeline information
        setLineInfo(lineInfo);
      })
  }, [dt])

  useEffect(() => {
  }, [line_info])

  return (
    <>
      <div className={"ml-2 w-full bg-white right-panel shadow-xl rounded-xl "}>
        <div className="flex flex-row gap-30">
          <h1 className="text-2xl ml-3 mt-2 text-gray-500">{dt} </h1>
          <div className="flex flex-row gap-1 mt-5">
            <div className="bg-red-500 mt-3 h-1 w-3"></div>work
            <div className="bg-gray-500 mt-3 h-1 w-3"></div>rest
          </div>
        </div>

        <div className="mt-2 bg-blue-200 h-[1px] w-[95%] ml-3 shadow-md"></div>
        <div className="flex flex-row gap-1 full mt-2 overflow-y-scroll smart-scroll">
          <div className="ml-2 w-[20%]">
            {users.map((user:any, index: Number) => (
              <div className="h-12 flex flex-row gap-2" key={index.toString()}>
                <img className="rounded-full shadow-sm w-10 h-10 mt-1 hover:shadow-pink-400 cursor-pointer" src={GET_AVATAR_URL + user.avatar} width="100%" height="100%"></img>
                <h2 className="mt-3">{user.name}</h2>
              </div>
            ))}
          </div>
          <div className="w-[80%]">
            {
              line_info.map((user:any, index:number) => {
                let start_time = Date.parse(`${dt} 00:00:00`);
                let end_time = Date.parse(`${dt} 24:00:00`);
                let temp_time = start_time;
                let prev_time = start_time;
                return (
                  <div className="h-12 flex flex-row" key={index}>
                    {
                      user.map((item:any, ind: Number) => {
                        prev_time = temp_time;
                        temp_time = item.time;
                        if (item.stop === true) {
                          return (
                            <div className="bg-red-500 h-1 mt-5 shadow-xl" style={{ width: `calc(95% / ${end_time - start_time} * ${item.time - prev_time})` }} key={ind.toString()}></div>
                          )
                        }
                        else return (
                          <div className="bg-gray-500 w-30 h-1 mt-5" style={{ width: `calc(95% / ${end_time - start_time} * ${item.time - prev_time})` }} key={ind.toString()}></div>
                        )
                      })
                    }
                    {
                      (
                        <div className="bg-gray-500 w-30 h-1 mt-5" style={{ width: `calc(95% / ${end_time - start_time} * ${end_time - temp_time})` }}></div>
                      )
                    }
                  </div>
                )
              }
              )
            }
          </div>
          <div className="w-[20%] ml-1">
            {work_hour.map((hour: number, index: Number) => (
              <div className="h-12" key={index.toString()}>
                <h3>Work: {(hour / 3600).toString().slice(0, 4)}hours</h3>
                <h3 className="italic">Rest: {(24 - hour / 3600).toString().slice(0, 4)}hours</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default RightPanel;
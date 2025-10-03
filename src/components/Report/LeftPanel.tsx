import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import '../css/report.css';
import 'react-calendar/dist/Calendar.css';
import { getCalendarDate } from '../../redux/slices/report.slice';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const LeftPanel = (props: any) => {
  const dispatch = useDispatch();
  const [value, onChange] = useState<Value>(new Date());

  useEffect(() => {
    dispatch(getCalendarDate({ date: moment(value?.toString()).format("YYYY-MM-DD") }));
  }, [value])

  return (
    <div className={"w-full w-[100%] bg-white left-panel flex flex-col items-center justify-start rounded-xl " + props.className}>
      {/* calendar */}
      <div className='w-full max-h-[100px] pt-5 pb-5 rounded-tl-xl rounded-tr-xl text-xl text-center font-semibold bg-gray-100 font-size-[30px]'>Date to view</div>
      <div className="w-full h-fit mb-[20px] pl-10 pr-10 after:content-[''] border-[1px] border-blue-300 border-[#000] " />
      <Calendar className="rounded-xl w-[100%] relative border-none" onChange={onChange} value={value} />

    </div>
  )
}

export default LeftPanel;
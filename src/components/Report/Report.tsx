import { useEffect } from 'react';
import '../css/report.css';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { toast } from 'sonner';

const Report = () => {
  useEffect(() => {
    toast.success(<div className='text-green-500 font-semibold'>Report</div>);
  }, [])
  return (
    <>
      <div className="background-div flex flex-row p-3">
        <LeftPanel />
        <RightPanel />
      </div>
    </>
  )
}

export default Report;
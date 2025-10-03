import { useEffect, useRef, useState } from "react";
import Axios from './../utils/request';
import { getUsers } from "../actions/gallery_view";
import { toast } from 'sonner';
import { IMG_SAVE_URL } from "../utils/urls";

type Event = {
    target: {
        files: Array<any>
    }
}

type Element = {
    current: any
}

function FileAutoUpload() {

    const [files, setFiles] = useState<Array<any>>([]);
    const [users, setUsers] = useState<Array<any>>([]);
    const [userId, setUserID] = useState<string>();

    const elementRef: null | Element = useRef(null);
    const getFileInfo = (e: Event) => {
        console.log(e.target.files[0]);
        setFiles(e.target.files)
    }

    const handleFileSelectClick = () => {
        elementRef.current.click();
    }

    const fileAutoUpload = () => {

        if (files && files.length) {
            let index = 0;

            const setIntervalId = setInterval(() => {
                let formData:any = new FormData();
                formData.append("file", files[index]);
                formData.append("user_id", userId);
                formData.append("imageName", files[index]["name"]);
                formData.append("interval", 6);

                Axios.post(IMG_SAVE_URL, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                    .then(() => { toast.success("A file uploaded.") })
                    .catch(err => console.log(err));
                index++;

                if (index === files.length) clearInterval(setIntervalId);
            }, 6000);

            setTimeout(() => {
                setFiles([]);
                toast.success('Upload finished.');
            }, 6000 * (files.length + 1));
        }
    }

    useEffect(() => {
        getUsers().then(res => {
            console.log(res.data);
            setUsers(res.data);
        }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        console.log(userId);
    }, [userId]);

    return (
        <div className="h-[80vh] w-full bg-gray-200 flex flex-col justify-center items-center">
            <div className="w-50 text-xl text-gray-500 text-center mb-5">{files.length} files loaded.</div>
            <button className="rounded-xl p-3 mb-5 bg-purple-300 hover:shadow-[0_0_5px_5px_rgba(0,0,255,0.3)]"
                disabled={files.length !== 0}
                onClick={handleFileSelectClick}
            >
                File Select.
            </button>
            <input id='auto-file-select' ref={elementRef} type='file' multiple onChange={(e?:any) => getFileInfo(e)} className="hidden w-30 h-5 mb-5 rounded-xl bg-rgba(255,255,0,0.6)" />
            <select name="users" id="users" value={userId} onChange={(e) => setUserID(e.target.value)} className='w-30 border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3'>
                <option value="">none</option>
                {
                    users.map(((user, index) => (
                        <option value={user._id} key={index}>{user.name}</option>
                    )))
                }
            </select>
            <button className="rounded-xl p-3 bg-blue-300 hover:shadow-[0_0_5px_5px_rgba(0,0,255,0.3)]"
                onClick={fileAutoUpload}
            >
                File Auto Upload.
            </button>
        </div>
    )
}

export default FileAutoUpload;
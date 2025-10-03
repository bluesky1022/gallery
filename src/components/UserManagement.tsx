import { useEffect, useState, useRef }  from 'react'
import { toast } from 'sonner';
import Axios from './../utils/request';
import { SquarePen } from 'lucide-react';
import { LucideTrash } from "lucide-react";
import { BookLock } from 'lucide-react';
import './css/UserManagement.css'

function UserManagement() {

  const userAvatarAddRef = useRef<HTMLInputElement | null>(null);
  const userAvatarEditRef = useRef<HTMLInputElement | null>(null);
  const groupBrandAddRef = useRef<HTMLInputElement | null>(null);
  const groupBrandEditRef = useRef<HTMLInputElement | null>(null);

  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [usergroupid, setUsergroupid] = useState("");
  const [useravatar, setUseravatar] = useState("");
  const [userpassword, setUserpassword] = useState("");

  const [groupid, setGroupid] = useState("");
  const [timeinterval, setTimeinterval] = useState("");
  const [groupbrand, setGroupbrand] = useState("");

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);

  let openAddUser = () => {
    setShowModal1(true);
    setUserid("");
    setUsername("");
    setUsergroupid("");
    setUseravatar("");
  }

  let openEditUser = (key: any) => {
    key = JSON.parse(key);
    setShowModal2(true);
    setUserid(key["id"])
    setUsername(key["name"]);
    setUsergroupid(key["group_id"]);
  }

  let openAddGroup = () => {
    setShowModal3(true);
    setGroupid("");
    setTimeinterval("");
  }

  let openEditGroup = (key: any) => {
    setShowModal4(true);
    setGroupid(key)
  }

  let openEditPassword = (key: any) => {
    setShowModal5(true);
    setUserid(key);

  }

  let openDeleteUsermodal = (key: any) => {
    setShowModal6(true);
    setUserid(key)
  }

  let openDeleteGroupmodal = (key: any) => {
    setShowModal7(true);
    setGroupid(key)
  }

  let showSuccessToast = () => {
    return toast.success(<div className='text-xl w-[100%] text-green-500 font-semibold'>Success</div>);
  }

  let showFailToast = () => {
    return toast.error(<div className='text-xl w-[100%] text-red-500 font-semibold'>Failed</div>)
  }

  let addUser = () => {
    if (userid && username) {
      let newUser: any = {}
      newUser["id"] = userid;
      newUser["name"] = username;

      newUser["avatar"] = useravatar;
      groups.map((group) => {
        if (group["name"] == usergroupid) {
          newUser["group_id"] = group["_id"];
        }
      })
      setUserid("");
      setUsername("");
      setUsergroupid("");
      setUseravatar("");
      setShowModal1(false);
      Axios.post('http://localhost:5000/api/user/addUser', newUser)
        .then(res => {
          if (res.data) {
            showSuccessToast();
          }
          getDatas();
        })
        .catch(() => showFailToast())
    }
  }

  let editUser = () => {
    let newUsers: any = {}
    newUsers["id"] = userid;
    if (username) newUsers["name"] = username;
    if (useravatar) newUsers["avatar"] = useravatar;
    if (usergroupid) newUsers["group_id"] = usergroupid;

    setUserid("");
    setUsername("");
    setUsergroupid("");
    setUseravatar("");
    setShowModal2(false);

    Axios.put("http://localhost:5000/api/user/editUser", newUsers)
      .then(res => {
        if (res.data) showSuccessToast();
        getDatas();
      })
      .catch(() => showFailToast())
  }

  let editUserpassword = () => {
    let newPassword: any = {}
    newPassword["id"] = userid;
    if (userpassword) newPassword["password"] = userpassword;
    setUserpassword("");
    Axios.post("http://localhost:5000/api/user/resetUserpassword", newPassword)
      .then(res => {
        if (res.data) showSuccessToast();
        setShowModal5(false);
        getDatas();
      })
      .catch(() => showFailToast())
  }

  let delUser = () => {
    Axios.delete(`http://localhost:5000/api/user/delUser/${userid}`)
      .then(res => {
        if (res.data) showSuccessToast();
        setUserid("");
        setShowModal6(false);
        getDatas();
      })
      .catch(() => showFailToast())
  }

  let addGroup = () => {
    if (groupid && timeinterval) {
      let newGroup: any = {}
      newGroup["name"] = groupid;
      newGroup["time_interval"] = timeinterval;
      newGroup["brand"] = groupbrand;

      setGroupid("");
      setTimeinterval("");
      setGroupbrand("");
      setShowModal3(false);

      Axios.post('http://localhost:5000/api/user/addGroup', newGroup)
        .then(res => {
          if (res.data) showSuccessToast();
          getDatas();
        })
        .catch(() => showFailToast())
    }
  }

  let editGroup = () => {
    let newGroup: any = {}
    newGroup["name"] = groupid;
    if (timeinterval) newGroup["time_interval"] = timeinterval;
    if (groupbrand) newGroup["brand"] = groupbrand;

    setGroupid("");
    setTimeinterval("");
    setGroupbrand("");
    setShowModal4(false);

    Axios.put("http://localhost:5000/api/user/editGroup", newGroup)
      .then(res => {
        if (res.data) showSuccessToast();
        getDatas();
      })
      .catch(() => showFailToast())
  }

  let delGroup = () => {
    Axios.delete(`http://localhost:5000/api/user/delGroup/${groupid}`)
      .then(() => {
        setShowModal7(false);
        setGroupid("");
        getDatas();
        showSuccessToast();
      })
      .catch(() => showFailToast())
  }

  let getDatas = () => {
    Axios.get('http://localhost:5000/api/user/getGroups')
      .then(res => {
        let res_groups = res.data;
        Axios.get('http://localhost:5000/api/user/getUsers')
          .then(res => {
            let res_users = res.data;
            res_users.map(((res_user: any) => {
              let flag = false;
              res_groups.map((res_group: any) => {

                if (res_group["_id"] == res_user["group_id"]) {
                  res_user["group_id"] = res_group["name"];
                  flag = true;
                }
              })
              if (flag == false) {
                res_user["group_id"] = "";
              }
            }))
            setUsers(res_users);
            setGroups(res_groups)
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  let uploadAvatar = (file: any) => {

    let formData = new FormData();
    formData.append("file", file);
    Axios.post("http://localhost:5000/api/user/uploadAvatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(res => console.log(res.data)
    );
  }

  let uploadBrand = (file: any) => {

    let formData = new FormData();
    formData.append("file", file);
    Axios.post("http://localhost:5000/api/user/uploadBrand", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(res => console.log(res.data)
    );
  }

  // let uploadPhoto = (file: any) => {
  //   let formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("user_id", "68bb330ef65870142ea0cb5b");
  //   formData.append("imageName", file["name"]);
  //   formData.append("interval", "50");

  //   Axios.post("http://localhost:5000/api/tracking/imgSave", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     }
  //   }).then(res => console.log(res.data)
  //   );
  // }


  setInterval(() => {
    // console.log('upload avatar');

    // console.log(file);

    // let formData = new FormData();
    // formData.append("file", file);
    // Axios.post("http://localhost:5000/api/user/uploadAvatar", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   }
    // }).then(res => console.log(res.data)
    // );
  }, 5000);

  useEffect(() => {
    toast.success(<div className='text-green-500 font-semibold'>User Management</div>);
    getDatas();
  }, [])

  return (
    <>
      <div className='bg-gray-300 w-full h-[85vh]'>
        <div className='flex h-[100%]'>
          <div className="basis-1/2 bg-white m-3 mr-1 rounded-xl shadow-lg">
            <div className="text-center text-3xl mt-3">Users Table</div>
            <div className='ml-3 mb-3'>
              <button className='pt-1 pb-1 pr-2 pl-2  bg-gray-100' onClick={() => { openAddUser() }}>Add User</button>
            </div>
            <div className='overflow-y-scroll overflow-x-hidden h-[80%] smart-scroll'>
              <table className='border-collapse ml-3 w-[100%]'>
                <thead className='sticky top-0 bg-[#bbb]'>
                  <tr >
                    <th>No</th>
                    <th>Avatar</th>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Group Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className='bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('http://localhost:5000/api/viewscreen/avatar/" + user["avatar"] + "')" }}></td>
                      <td>{user["id"]}</td>
                      <td>{user["name"]}</td>
                      <td>{user["group_id"]}</td>
                      <td>

                        <button value={`{"id":"${user["id"]}","name": "${user["name"]}","group_id": "${user["group_id"]}"}`} onClick={(e) => { openEditUser(e.currentTarget.value); }}><SquarePen /></button>
                        <button value={user["id"]} onClick={(e) => openEditPassword(e.currentTarget.value)}><BookLock /></button>
                        <button value={user["id"]} onClick={(e) => openDeleteUsermodal(e.currentTarget.value)}><LucideTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="basis-1/2 bg-white m-3 ml-1 rounded-xl shadow-lg">
            <div className="text-center text-3xl mt-3">Groups Table</div>
            <div className='ml-3 mb-3'>
              <button className='pt-1 pb-1 pr-2 pl-2  bg-gray-100' onClick={() => openAddGroup()}>Add Group</button>
            </div>
            <div className='overflow-y-scroll overflow-x-hidden h-[80%] smart-scroll'>
              <table className='border-collapse ml-3 w-[100%]'>
                <thead className='sticky top-0 bg-[#bbb]'>
                  <tr>
                    <th>No</th>
                    <th>Brand</th>
                    <th>Group Name</th>
                    <th>Time Interval</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className='bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('http://localhost:5000/api/viewscreen/brand/" + group["brand"] + "')" }}></td>
                      <td>{group["name"]}</td>
                      <td>{group["time_interval"]}</td>
                      <td>
                        <button value={group["name"]} onClick={(e) => openEditGroup(e.currentTarget.value)}><SquarePen /></button>
                        <button value={group["name"]} onClick={(e) => openDeleteGroupmodal(e.currentTarget.value)}><LucideTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showModal1 ?
          <div className='h-[100%] absolute top-[0%] left-[0%] w-[100%]'>
            <div className='h-[100%] opacity-50 bg-black' onClick={() => setShowModal1(false)}></div>
            <div className="absolute top-[28%] left-[35%] bg-white w-[30%] h-[44%] rounded-[3%]" id="myModal">
              <div className="flex justify-between modal-header">
                <div></div>
                <div className="text-xl pt-3">Add User</div>
                <button type="button" className="btn-close text-2xl p-2" data-bs-dismiss="modal" onClick={() => setShowModal1(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="ml-5">
                  <label htmlFor="user-id" className='ml-[10px]'>User Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" id='user-id' name='user-id' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={userid} placeholder='User Id' onChange={(e) => setUserid(e.target.value)} />
                  <br />
                  <label htmlFor="user-name" className='ml-[10px]'>User Name&nbsp;:&nbsp;</label>
                  <input type="text" id='user-name' name='user-name' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={username} placeholder='User Name' onChange={(e) => setUsername(e.target.value)} />
                  <br />
                  <label htmlFor="user-groupid" className='ml-[10px]'>Group Name&nbsp;:&nbsp;</label>
                  <select name="user-groupid" id="user-groupid" value={usergroupid} onChange={(e) => setUsergroupid(e.target.value)} className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3'>
                    <option value=""></option>
                    {
                      groups.map(((group, index) => (
                        <option value={group["name"]} key={index}>{group["name"]}</option>
                      )))
                    }
                  </select>
                  <div className=''>
                    <div>
                      <input type="file" name="useravatar" id="useravatar" className='ml-3 w-[90%]' ref={userAvatarAddRef} hidden onChange={(e?: any) => {

                        let path = e.target.value.toString().split("\\");
                        setUseravatar(path[path.length - 1]);
                        uploadAvatar(e.target.files[0])
                      }
                      }
                      />
                      <br />
                      <button className='ml-3 w-[90%]' onClick={() => userAvatarAddRef.current?.click()}>Choose File</button>
                    </div>
                    <div className='flex justify-end mt-3'>
                      <button className='bg-gray-200 mr-2 ml-2 pl-3 pr-3 pt-1 pb-1' onClick={addUser}>OK</button>
                      <button className='bg-gray-200 mr-10 pl-3 pr-3 pt-1 pb-1' onClick={() => setShowModal1(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}

        {showModal2 ?
          <div className='h-[100%] absolute top-[0%] left-[0%] w-[100%]'>
            <div className='h-[100%] opacity-50 bg-black' onClick={() => setShowModal2(false)}></div>
            <div className="absolute top-[30%] left-[35%] bg-white w-[30%] h-[40%] rounded-[3%]" id="myModal">
              <div className="flex justify-between modal-header">
                <div></div>
                <div className="text-xl pt-3">Edit User</div>
                <button type="button" className="btn-close text-2xl p-2" data-bs-dismiss="modal" onClick={() => setShowModal2(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="ml-5">
                  {/* <label htmlFor="user-id" className='ml-[10px]'>User Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" disabled id='user-id' name='user-id' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={userid} placeholder='User Id' onChange={(e) => setUserid(e.target.value)}/>
                  <br /> */}
                  <label htmlFor="user-name" className='ml-[10px]'>User Name&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" id='user-name' name='user-name' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={username} placeholder='User Name' onChange={(e) => setUsername(e.target.value)} />
                  <br />
                  {/* <label htmlFor="user-password" className='ml-[10px]'>Password&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" id='user-password' name='user-password' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={userpassword} placeholder='Password' onChange={(e) => setUserpassword(e.target.value)}/>
                  <br /> */}
                  <label htmlFor="user-groupid" className='ml-[10px]'>Group Name&nbsp;:&nbsp;</label>
                  <select name="user-groupid" id="user-groupid" value={usergroupid} onChange={(e) => setUsergroupid(e.target.value)} className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3'>
                    <option value=""></option>
                    {
                      groups.map(((group, index) => (
                        <option value={group["name"]} key={index}>{group["name"]}</option>
                      )))
                    }
                  </select>
                  {/* <input type="text" id='user-groupid' name='user-groupid' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={usergroupid} placeholder='Group Name' onChange={(e) => setUsergroupid(e.target.value)}/> */}
                  <br />
                  <div className=''>
                    <div>
                      {/* style={{backgroundImage: "url('/assets/faces/" + useravatar + "')", backgroundSize: "contain", backgroundRepeat: "no-repeat"}} */}
                      <input type="file" name="useravatar" id="useravatar" className='ml-3 w-[90%]' ref={userAvatarEditRef} hidden onChange={(e?: any) => {
                        let path = e.target.value.toString().split("\\");
                        setUseravatar(path[path.length - 1])
                        uploadAvatar(e.target.files[0])
                      }} />
                      <br />
                      <button className='ml-3 w-[90%]' onClick={() => {userAvatarEditRef.current?.click() }}>Choose File</button>
                    </div>
                    <div className='flex justify-end mt-3'>
                      <button className='bg-gray-200 mr-2 ml-2 pl-3 pr-3 pt-1 pb-1' onClick={editUser}>OK</button>
                      <button className='bg-gray-200 mr-10 pl-3 pr-3 pt-1 pb-1' onClick={() => setShowModal2(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}

        {showModal3 ?
          <div className='h-[100%] absolute top-[0%] left-[0%] w-[100%]'>
            <div className='h-[100%] opacity-50 bg-black' onClick={() => setShowModal3(false)}></div>
            <div className="absolute top-[30%] left-[35%] bg-white w-[30%] h-[40%] rounded-[3%]" id="myModal">
              <div className="flex justify-between modal-header">
                <div></div>
                <div className="text-xl pt-3">Add Group</div>
                <button type="button" className="btn-close text-2xl p-2" data-bs-dismiss="modal" onClick={() => setShowModal3(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="ml-5">
                  <label htmlFor="group-id" className='ml-[10px]'>Group Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" id='group-id' name='group-id' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={groupid} placeholder='Group Name' onChange={(e) => setGroupid(e.target.value)} />
                  <br />
                  <label htmlFor="time-interval" className='ml-[10px]'>Time Interval&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" id='time-interval' name='time-interval' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={timeinterval} placeholder='Time Interval' onChange={(e) => setTimeinterval(e.target.value)} />
                  <br />
                  <div className=''>
                    <div>
                      <input type="file" name="groupbrand" id="groupbrand" className='ml-3 w-[90%]' ref={groupBrandAddRef} hidden onChange={(e?: any) => {

                        let path = e.target.value.toString().split("\\");
                        setGroupbrand(path[path.length - 1]);
                        uploadBrand(e.target.files[0])
                      }
                      }
                      />
                      <br />
                      <button className='ml-3 w-[90%]' onClick={() => {groupBrandAddRef.current?.click() }}>Choose File</button>
                    </div>
                    <div className='flex justify-end mt-3'>
                      <button className='bg-gray-200 mr-2 ml-2 pl-3 pr-3 pt-1 pb-1' onClick={addGroup}>OK</button>
                      <button className='bg-gray-200 mr-10 pl-3 pr-3 pt-1 pb-1' onClick={() => setShowModal3(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}

        {showModal4 ?
          <div className='h-[100%] absolute top-[0%] left-[0%] w-[100%]'>
            <div className='h-[100%] opacity-50 bg-black' onClick={() => setShowModal4(false)}></div>
            <div className="absolute top-[35%] left-[35%] bg-white w-[30%] h-[30%] rounded-[3%]" id="myModal">
              <div className="flex justify-between modal-header">
                <div></div>
                <div className="text-xl pt-3">Edit Group</div>
                <button type="button" className="btn-close text-2xl p-2" data-bs-dismiss="modal" onClick={() => setShowModal4(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="ml-5">
                  <label htmlFor="time-interval" className='ml-[10px]'>Time Interval&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" id='time-interval' name='time-interval' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={timeinterval} placeholder='Time Interval' onChange={(e) => setTimeinterval(e.target.value)} />
                  <br />
                  <div className=''><div>
                    {/* style={{backgroundImage: "url('/assets/faces/" + useravatar + "')", backgroundSize: "contain", backgroundRepeat: "no-repeat"}} */}
                    <input type="file" name="groupbrand" id="groupbrand" className='ml-3 w-[90%]' hidden ref={groupBrandEditRef} onChange={(e?: any) => {
                      let path = e.target.value.toString().split("\\");
                      console.log(path);

                      setGroupbrand(path[path.length - 1])
                      uploadBrand(e.target.files[0])
                    }} />
                    <br />
                    <button className='ml-3 w-[90%]' onClick={() => {groupBrandEditRef.current?.click() }}>Choose File</button>
                  </div>
                    <div className='flex justify-end mt-3'>
                      <button className='bg-gray-200 mr-2 ml-2 pl-3 pr-3 pt-1 pb-1' onClick={editGroup}>OK</button>
                      <button className='bg-gray-200 mr-10 pl-3 pr-3 pt-1 pb-1' onClick={() => setShowModal4(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}
        {showModal5 ?
          <div className='h-[100%] absolute top-[0%] left-[0%] w-[100%]'>
            <div className='h-[100%] opacity-50 bg-black' onClick={() => setShowModal5(false)}></div>
            <div className="absolute top-[38%] left-[35%] bg-white w-[30%] h-[24%] rounded-[3%]" id="myModal">
              <div className="flex justify-between modal-header">
                <div></div>
                <div className="text-xl pt-3">Edit Password</div>
                <button type="button" className="btn-close text-2xl p-2" data-bs-dismiss="modal" onClick={() => setShowModal5(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="ml-5">
                  <label htmlFor="time-interval" className='ml-[10px]'>Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                  <input type="text" id='time-interval' name='time-interval' className='w-[60%] border-b-[1px] border-[#bbb] border-solid focus:outline-none mb-3' value={userpassword} placeholder='Password' onChange={(e) => setUserpassword(e.target.value)} />
                  <br />
                  <div className=''>
                    <div className='flex justify-end mt-3'>
                      <button className='bg-gray-200 mr-2 ml-2 pl-3 pr-3 pt-1 pb-1' onClick={editUserpassword}>OK</button>
                      <button className='bg-gray-200 mr-10 pl-3 pr-3 pt-1 pb-1' onClick={() => setShowModal5(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}
        {showModal6 ?
          <div className='h-[100%] absolute top-[0%] left-[0%] w-[100%]'>
            <div className='h-[100%] opacity-50 bg-black' onClick={() => setShowModal6(false)}></div>
            <div className="absolute top-[40%] left-[35%] bg-white w-[30%] h-[20%] rounded-[3%]" id="myModal">
              <div className="flex justify-between modal-header">
                <div></div>
                <div className="text-xl pt-3">Confirm Delete</div>
                <button type="button" className="btn-close text-2xl p-2" data-bs-dismiss="modal" onClick={() => setShowModal6(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="ml-5">
                  <div className=''>
                    <div className='flex justify-end mt-3'>
                      <button className='bg-gray-200 mr-2 ml-2 pl-3 pr-3 pt-1 pb-1' onClick={delUser}>OK</button>
                      <button className='bg-gray-200 mr-10 pl-3 pr-3 pt-1 pb-1' onClick={() => setShowModal6(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}
        {showModal7 ?
          <div className='h-[100%] absolute top-[0%] left-[0%] w-[100%]'>
            <div className='h-[100%] opacity-50 bg-black' onClick={() => setShowModal7(false)}></div>
            <div className="absolute top-[40%] left-[35%] bg-white w-[30%] h-[20%] rounded-[3%]" id="myModal">
              <div className="flex justify-between modal-header">
                <div></div>
                <div className="text-xl pt-3">Confirm Delete</div>
                <button type="button" className="btn-close text-2xl p-2" data-bs-dismiss="modal" onClick={() => setShowModal7(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="ml-5">
                  <div className=''>
                    <div className='flex justify-end mt-3'>
                      <button className='bg-gray-200 mr-2 ml-2 pl-3 pr-3 pt-1 pb-1' onClick={delGroup}>OK</button>
                      <button className='bg-gray-200 mr-10 pl-3 pr-3 pt-1 pb-1' onClick={() => setShowModal7(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}
      </div>
    </>
  )
}

export default UserManagement;
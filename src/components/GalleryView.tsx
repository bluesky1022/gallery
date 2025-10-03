import { useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Calendar from 'react-calendar';
import { GET_IMAGE_URL } from '../utils/urls';
import { getGroupLogoUrl, getGroups, getScreens, getUsers } from '../actions/gallery_view';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { rgetGroups, rgetScreens, rgetUsers, rsetSelectedGroup, rsetSelectedUser } from '../redux/slices/screens.slice';
import { GET_USER_AVATAR_URL } from '../utils/constants';
import { toast } from 'sonner';
import "./../App.css"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function GalleryView() {

  const dispatch = useAppDispatch();

  const [calendar_value, onChange] = useState<Value>(new Date());

  const screens: any = useAppSelector(state => state.screens.screens);
  const [viewScreens, setViewScreens] = useState<any>([[]]);

  const users: any = useAppSelector(state => state.screens.users.users);
  const [viewUsers, setViewUsers] = useState([]);
  const selectedUser: any = useAppSelector(state => state.screens.users.selectedUser);

  const groups = useAppSelector(state => state.screens.groups.groups);
  const selectedGroup: any = useAppSelector(state => state.screens.groups.selectedGroup);

  const [selectedImage, setSelectedImage] = useState<any>({});

  const calc_images = (user: any) => {
    const views = screens;
    let selectedUsersViews = [];
    for (let i = 0; i < views.length; i++) {
      if (views[i].userData.id === user.id) {
        selectedUsersViews = views[i].photo_array;
        break;
      }
    }

    if (selectedUsersViews.length) {
      let prev_recv_time = selectedUsersViews[0].recv_time;
      let temp_views = [];
      let result_views: any = [];
      temp_views.push(selectedUsersViews[0]);
      for (let i = 1; i < selectedUsersViews.length; i++) {
        if (selectedUsersViews[i].recv_time - prev_recv_time > (selectedUsersViews[i].interval * 1000)) {
          result_views.push(temp_views);
          temp_views = [];
        }
        prev_recv_time = selectedUsersViews[i].recv_time;
        temp_views.push(selectedUsersViews[i]);
      }
      result_views.push(temp_views);
      setViewScreens(result_views);
    }
    else {
      setViewScreens([]);
    }
  }

  const group_select = (group_index: number) => {
    dispatch(rsetSelectedGroup(groups[group_index]));
  }

  const user_select = (user_index: number) => {
    dispatch(rsetSelectedUser(viewUsers[user_index]));
    calc_images(users[user_index])
  }

  const initial_groups = () => {
    dispatch(rsetSelectedGroup({}));
    dispatch(rsetSelectedUser({}));
  }

  const initial_users = () => {
    dispatch(rsetSelectedUser({}));
  }

  const nextImageView = (e: any) => {
    if (e.key === "ArrowRight") {
      for (let i = 0; i < viewScreens.length; i++) {
        for (let j = 0; j < viewScreens[i].length - 1; j++) {
          if (viewScreens[i][j].imageName == selectedImage.imageName && viewScreens[i][j].recv_time === selectedImage.recv_time) {
            setSelectedImage(viewScreens[i][j + 1]);
            return;
          }
        }
      }
      if (Object.keys(selectedImage).length) toast.warning("Reached End.");
    }
    else if (e.key === "ArrowLeft") {
      for (let i = 0; i < viewScreens.length; i++) {
        for (let j = 1; j < viewScreens[i].length; j++) {
          if (viewScreens[i][j].imageName == selectedImage.imageName && viewScreens[i][j].recv_time === selectedImage.recv_time) {
            setSelectedImage(viewScreens[i][j - 1]);
            return;
          }
        }
      }
      if (Object.keys(selectedImage).length) toast.warning("Reached End.");
    }
    return;
  }

  useEffect(() => {

    toast.success(<div className='text-green-500 font-semibold'>Gallery View</div>);

    getUsers().then(res => {
      dispatch(rgetUsers(res.data))
    }).catch(err => console.log(err));
    getGroups().then(res => {
      dispatch(rgetGroups(res.data))
    }).catch(err => console.log(err));
    //getScreens part is in the following useEffect hook.

  }, [])


  useEffect(() => {
    window.addEventListener('keydown', nextImageView)

    return () => { window.removeEventListener('keydown', nextImageView) };
  }, [viewScreens, selectedImage]);

  useEffect(() => {
    getScreens({ date: calendar_value }).then(res => {
      dispatch(rgetScreens(res.data));
    })
      .catch(err => {
        console.log(err);
      })
  }, [calendar_value])

  useEffect(() => {
    calc_images(selectedUser);
  }, [calendar_value, screens, selectedUser])

  useEffect(() => {
    let users_for_view: any = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].group_id === selectedGroup._id) {
        users_for_view.push(users[i]);
      }
    }
    setViewUsers(users_for_view);
  }, [selectedGroup])

  return (
    <div className="flex flex-col bg-gray-300 w-full p-3">
      {/* body */}
      <div className="w-full h-[80vh] flex gap-x-2 justify-start items-start ">
        {/* breadcumbs for group/group1/user1/.. */}
        <div className="w-[25vw] h-full bg-[#fff] flex flex-col justify-start items-center rounded-xl">
          <div className='w-full max-h-[100px] pt-5 pb-5 rounded-tl-xl rounded-tr-xl text-xl text-center font-semibold bg-gray-100 font-size-[30px]'>Date to view</div>
          <div className="w-full h-fit mb-[20px] pl-10 pr-10 after:content-[''] border-[1px] border-blue-300 border-[#000] " />
          <Calendar
            onChange={onChange}
            value={calendar_value}
            calendarType='iso8601'
            className="w-full h-fit rounded-md bg-red-500"
          />
        </div>
        {/* <div className="w-[30vw] h-screen flex justfy-start items-center text-xl bg-gray-100">
        </div> */}
        {/* image views */}
        <div className="w-[75vw] h-full flex flex-col rounded-xl justify-start items-start  bg-[#fff]">
          <div className="w-full bg-gray-100 max-h-[100px] rounded-tl-xl rounded-tr-xl flex gap-x-3 pt-5 pl-10 pb-5 justfy-start items-center text-xl box-border">
            <li
              id='start_tab'
              className="w-fit list-none hover:text-blue-500 hover:font-semibold hover:cursor-pointer hover:ring-blue-500"
              onClick={initial_groups}
            >
              Groups
            </li>
            {Object.keys(selectedGroup).length !== 0 &&
              <li
                id='group_tab'
                className="w-fit list-none before:content-['>'] hover:text-blue-500 hover:font-semibold hover:cursor-pointer"
                onClick={initial_users}
              >
                &nbsp;&nbsp;{selectedGroup.name}
              </li>
            }
            {Object.keys(selectedUser).length !== 0 &&
              <li
                id='user_tab'
                className="w-fit list-none before:content-['>'] hover:text-blue-500 hover:font-semibold hover:cursor-pointer"
                onClick={() => calc_images(selectedUser)}
              >
                &nbsp;&nbsp;{selectedUser.name}
              </li>
            }
          </div>
          <div className="w-full h-fit pl-10 pr-10 after:content-[''] border-[1px] border-red-300 border-[#000] " />
          <div className="w-full h-fit flex justfy-start items-center text-xl box-border ">
            {/* the view of groups */}
            {
              Object.keys(selectedGroup).length === 0 && Object.keys(selectedUser).length === 0 &&
              <div id='groups' className="w-full h-full flex flex-wrap gap-5 pt-5 pl-10 pb-5 justfy-start items-center">
                {
                  groups.map((group: any, group_index) => {
                    return (
                      <div key={'group' + group_index} className="h-fit w-fit shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]
                              hover:opacity-75 hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.3)] rounded-xl"
                        style={{ transition: 'all ease-in-out 100ms' }}>
                        <img src={getGroupLogoUrl(group)} className='h-25 w-20' alt={group.name} onClick={() => group_select(group_index)} />
                      </div>
                    )
                  })
                }
              </div>
            }

            {/* the view of a group */}
            {
              Object.keys(selectedGroup).length !== 0 && Object.keys(selectedUser).length === 0 &&
              <div id='el_users' className="w-full h-full flex flex-wrap gap-5 pt-5 pl-10 pb-5 justfy-start items-center">
                {
                  viewUsers.map((user: any, user_index) => {
                    return (
                      <div key={'user' + user_index} className="h-25 rounded-xl p-1 w-20 bg-cover bg-no-repeat bg-center
                            hover:opacity-75 hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.3)] text-xl text-black text-semibold"
                        style={{ backgroundImage: "url('" + GET_USER_AVATAR_URL + user.avatar + "')", transition: 'all ease-in-out 100ms' }} onClick={() => user_select(user_index)}>
                        {user.name}
                      </div>
                    )
                  })
                }
              </div>
            }

            {/* a person's view */}
            {
              Object.keys(selectedUser).length !== 0 &&
              <div id='el_views' className="w-full max-h-[70vh] overflow-y-scroll flex flex-col gap-y-10 pt-5 pl-10 pb-5 justfy-start items-center">
                {
                  viewScreens.map((sub_images: any, sub_images_index: number) => (
                    <div key={'sub_images' + sub_images_index} className="w-full h-full flex flex-wrap gap-x-1.5 gap-y-3 justfy-start items-center">
                      <div className='w-full text-sm text-gray-500 font-semibold'>
                        time :  {sub_images[0] ? moment(sub_images[0].recv_time).format("YYYY/MM/DD hh:mm:ss") : '2000.1.1'} -
                        {sub_images[sub_images.length - 1] ? moment(sub_images[sub_images.length - 1].recv_time).format("YYYY/MM/DD hh:mm:ss") : '2000.1.1'} ,
                        interval :  {sub_images[0] ? sub_images[0].interval : '60'} s
                      </div>

                      {
                        sub_images.map((image: any, img_index: number) => {

                          return (
                            <div key={sub_images_index + '-image' + img_index}
                              className="h-15 rounded-t-3 w-12 bg-cover bg-no-repeat bg-center hover:opacity-75 hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.3)]"
                              style={{ backgroundImage: "url('" + GET_IMAGE_URL + image.imageName + "')", transition: 'all ease-in-out 100ms' }}
                              onMouseOver={() => {
                                document.getElementById("s_" + sub_images_index + "v_" + img_index)?.classList.remove("invisible")
                                document.getElementById("s_" + sub_images_index + "v_" + img_index)?.classList.add("visible")
                              }}
                              onMouseOut={() => {
                                document.getElementById("s_" + sub_images_index + "v_" + img_index)?.classList.remove("visible")
                                document.getElementById("s_" + sub_images_index + "v_" + img_index)?.classList.add("invisible")
                              }}
                              onClick={() => setSelectedImage(image)}
                            >
                              <div
                                id={"s_" + sub_images_index + "v_" + img_index}
                                className="invisible relative p-[1px] w-fit h-fit bg-[#fff] shadow-[0_0_2px_2px_rgba(0,0,0,0.7)] rounded-[5px] text-sm"
                              >
                                {moment(image.recv_time).format("mm:ss")}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  ))
                }
              </div>
            }
          </div>
        </div>
      </div>

      <div id="img_modal" hidden={!Object.keys(selectedImage).length} className={"fixed flex flex-col justify-center items-center z-1 pt-[100px] bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.9)] left-0 top-0 w-[100vw] h-[100vh] overflow-auto"}>
        <span onClick={() => setSelectedImage({})} className="absolute right-[50px] top-[20px] text-[50px] hover:text-[60px] hover:right-[45px] hover:top-[10px] hover:text-red-500 hover:top- text-[#fff] hover:cursor-pointer float-right">x</span>
        <img className="h-[80vh]" src={GET_IMAGE_URL + selectedImage.imageName} />
        <div className='text-[40px] font-semibold text-red-500'>{selectedImage.imageName} - {moment(selectedImage.recv_time).format("MM/DD hh:mm:ss")}</div>
      </div>
    </div>
  )
}

export default GalleryView
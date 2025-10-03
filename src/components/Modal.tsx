import {useState, useEffect} from "react";

function Modal(props: any){
    const {child, visible} = props;

    const [hide, setHide] = useState(true);

    useEffect(() => {
        setHide(visible)
    }, [visible]);

    const handleOnClick = () => {
        setHide(false);
    }

    return (
        hide && 
        <div>
            <div className="absolute z-10 inset-30 inset-x-60 bg-[#fff] shadow-[0_0_5px_5px_rgba(0,0,0,0.3)] rounded-xl">
                {child}
            </div>
            <div className="absolute z-0 inset-1 bg-[rgba(0,0,0,0.3)] shadow-[0_0_5px_5px_rgba(0,0,0,0.3)] rounded-xl" onClick={handleOnClick} />
        </div>
    )
}

export default Modal;
import React,{useContext} from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { MyContext } from '../../App';

function Alert({ alert }) {
  const {updateAlert} = useContext(MyContext)

  const {bg,content,display} = alert

  const styles = {
    "red":"bg-red-300",
    "green":"bg-green-300",
    "yellow":"bg-yellow-300",
    "hidden":"-top-10",
    "show":"top-5",
  }

  return (
    <div className={`flex  ${styles[bg]} ${styles[display]} w-1/2 h-10 absolute items-center justify-between left-1/2 right-1/2 -translate-x-1/2 transition-all duration-500 z-50 border-b-2 border-white p-2 `}>
      <p>{content}</p>
      <button onClick={()=>{updateAlert(prev=>{return {...prev,display:"hidden"}})}}><IoCloseSharp /></button>
    </div>
  );
}

export default Alert;

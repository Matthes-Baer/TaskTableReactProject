import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";

import homeworkIcon from '../images/homework icon.png'
import timeIcon from '../images/time icon.png'

import { changeColorTheme } from "../features/ColorSlice";
import { removeActiveTodo } from "../features/ActiveTodosSlice";
import { addDoneTodo } from "../features/DoneTodoSlice";

import winterLandscape from '../images/winterLandscape.jpg'


import "../CSS.css";
import { useCookies } from "react-cookie";

interface itemInterface {
    id: number,
    title: string,
    badges?: {name: string, checked: boolean}[],
    comment?: string,
    time: number,
}

const TodoTaskContainer = (): JSX.Element => {
    const todoState = useSelector((state: RootState) => state.activeTodos.value);
    const currentTime = useSelector((state: RootState) => state.currentTime.value);
    const dispatch = useDispatch();

    const [cookie, setCookie] = useCookies();

 

    

    const deleteFromActive = (item: itemInterface, index: number, callback: Function) => {
        callback(item, index, new Date().getTime() / 1000 / 60);
    }

    const dispatchCall = (item: itemInterface, index: number, time: number) => {
        dispatch(removeActiveTodo(index));
        dispatch(addDoneTodo({...item, completedTime: time}));

    }

    return (
        <Fragment>
            <div 
                className="container text-center mb-4" 
                style={{ border: '1px solid #ABC4FF', backgroundColor: '#E2EAFC', height: '300px', overflowY: 'scroll' }}
            >
                
                {todoState && todoState.map((item, idx) => {
                    return(
                        <div key={item.id} className="row d-flex align-items-start m-1 mt-4 rounded task position-relative" style={singleTodoTask}>
                            <div 
                                style={deleteStyle}
                                onClick={() => deleteFromActive(item, idx, dispatchCall)}
                                className="d-flex justify-content-center align-items-center position-absolute"
                                >
                                ❌
                            </div>
                            <div className="d-flex justify-content-evenly align-items-center mt-3">
                                <div className="col-xl-5 p-1" style={{borderRight: '1px solid green'}}>
                                    <span>{item.title}</span>
                                </div>
                            
                                <div className="col-xl-5 p-1">
                                    {item.comment ? <span>{item.comment}</span> : <span>Kein Kommentar hinzugefügt</span>}
                                </div>
                            </div>
                            <div className="d-flex justify-content-evenly align-items-center">
                                {item.badges?.map(element => {
                                    if (element.name === 'todo') {
                                        return <div><img src={homeworkIcon} style={iconStyle} /></div>
                                    }
                                    else if (element.name === 'feature') {
                                        return <div><img src={timeIcon} style={iconStyle} /></div>
                                    }
                                    else if (element.name === 'important'){
                                        return <div><img src={timeIcon} style={iconStyle} /></div>
                                    }})}
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                                    {(currentTime - item.time) > 60 
                                    ? `created ${Math.round((currentTime - item.time) / 60)} hour/s ago` 
                                    : `created ${Math.round(currentTime - item.time)} minute/s ago` 
                                    }
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )    
}

const singleTodoTask = {
    border: '1px solid #ABC4FF',
    backgroundColor: '#CCDBFD',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
}

const iconStyle = {
    transform: 'scale(0.35)',
}

const deleteStyle = {
    backgroundColor: 'transparent',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    top: '0',
    right: '0',
}




export default TodoTaskContainer;
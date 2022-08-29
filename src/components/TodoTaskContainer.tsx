import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";

import { removeActiveTodo } from "../features/ActiveTodosSlice";
import { addDoneTodo } from "../features/DoneTodoSlice";

import "../CSS.css";
import TodoBadgesComponent from "./TodoBadgesComponent";

interface itemInterface {
    id: string,
    title: string,
    badges?: {name: string, checked: boolean}[],
    comment?: string,
    time: number,
}

const TodoTaskContainer = (): JSX.Element => {
    const darkmode = useSelector((state: RootState) => state.colorTheme.value)
    const todoState = useSelector((state: RootState) => state.activeTodos.value);
    const currentTime = useSelector((state: RootState) => state.currentTime.value);
    const dispatch = useDispatch();

    const singleTodoTask = {
        backgroundColor: darkmode ? '#001233' : '#D7E3FC',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
        fontSize: '20px'
    }

    const deleteFromActive = (item: itemInterface, index: number, callback: Function) => {
        callback(item, index, new Date().getTime() / 1000 / 60);
    }

    const dispatchCall = (item: itemInterface, index: number, time: number) => {
        dispatch(removeActiveTodo(index));
        dispatch(addDoneTodo({...item, completedTime: time}));
    }

    return (
        <Fragment>
            <h2>Active Tasks</h2>
            <div 
                className="container text-center mb-4" 
                style={{ border: darkmode ? '1px solid #E2EAFC' : '1px solid black', backgroundColor: darkmode ? '#002855' : '#EDF2FB', height: '300px', overflowY: 'scroll' }}
            >
                {todoState && todoState.map((item, idx) => {
                    return(
                        <div key={item.id} className="row d-flex align-items-start m-2 rounded task position-relative justify-content-center" data-aos="fade-up" style={singleTodoTask}>
                            <div 
                                style={deleteStyle}
                                onClick={() => deleteFromActive(item, idx, dispatchCall)}
                                className="d-flex justify-content-center align-items-center position-absolute"
                                >
                                ❌
                            </div>
                            <div className="d-flex justify-content-evenly align-items-center mt-3">
                                <div className="col-xl-5 p-1">
                                    <h4>{item.title}</h4>
                                </div>
                            
                                <div className="col-xl-5 p-1">
                                    {item.comment ? <span>{item.comment}</span> : <span>Kein Kommentar hinzugefügt</span>}
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center align-items-center">
                                {item.badges?.map(element => {
                                    return <TodoBadgesComponent key={item.id + element.name} badge={element.name}/>
                                    })}
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

const deleteStyle = {
    backgroundColor: 'transparent',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    top: '0',
    right: '0',
}

export default TodoTaskContainer;
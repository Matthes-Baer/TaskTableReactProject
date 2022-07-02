import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";

import homeworkIcon from '../images/homework icon.png'
import timeIcon from '../images/time icon.png'

interface propsInterface {
    mainTime: number
}

const TodoTaskContainer = (props:propsInterface): JSX.Element => {
    const todoState = useSelector((state: RootState) => state.activeTodos.value);
    const dispatch = useDispatch();

    return (
        <>
            <div 
                className="container text-center mb-4" 
                style={{ border: '1px solid #ABC4FF', backgroundColor: '#E2EAFC', minHeight: '250px', maxHeight: '200px', overflowY: 'scroll' }}
            >
                {todoState && todoState.map((item, idx) => {
                    return(
                        <div key={item.id} className="row d-flex align-items-center p-2 m-1 mt-4 rounded" style={singleTodoTask}>
                            <div className="col-lg-4 p-1">
                                <h3>{item.title.toUpperCase()}</h3>
                            </div>
                           
                            <div className="col-lg-8 p-1">
                                {item.comment ? <span>{item.comment}</span> : <span>Kein Kommentar hinzugefügt</span>}
                            </div>
                                <div className="row d-flex justify-content-center">
                                    {item.badges?.map(element => {
                                        if (element.name === 'todo') {
                                            return <div className="col-sm-4"><img src={homeworkIcon} style={iconStyle} /></div>
                                        }
                                        else if (element.name === 'feature') {
                                            return <div className="col-sm-4"><img src={timeIcon} style={iconStyle} /></div>
                                        }
                                        else if (element.name === 'important'){
                                            return <div className="col-sm-4"><img src={timeIcon} style={iconStyle} /></div>
                                        }})}
                                </div>
                                <div className="container-fluid d-flex justify-content-end align-items-center">
                                       {(props.mainTime - item.time) > 60 
                                       ? `${Math.round((props.mainTime - item.time) / 60)} hour/s ago` 
                                       : `${Math.round(props.mainTime - item.time)} minute/s ago` 
                                       }
                                       
                                       
                                </div>
                            
                        </div>
                        
                    )
                })}
                
            </div>
        </>
    )    
}

const singleTodoTask = {
    border: '2px solid #ABC4FF',
    backgroundColor: '#CCDBFD',
}

const iconStyle = {
    transform: 'scale(0.5)',
}




export default TodoTaskContainer;
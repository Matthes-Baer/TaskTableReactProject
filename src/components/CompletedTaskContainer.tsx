import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";

import homeworkIcon from '../images/homework icon.png';
import timeIcon from '../images/time icon.png';

import summerWinter from '../images/summer-winter.png';

const CompletedTaskContainer = () => {
    const doneTodoState = useSelector((state: RootState) => state.doneTodos.value);
    const currentTime = useSelector((state: RootState) => state.currentTime.value);



    return (
        <Fragment>
            <h2>Finished Tasks</h2>
            <div 
                className="container text-center mb-4" 
                style={{ border: '1px solid #ABC4FF', backgroundColor: '#E2EAFC', height: '300px', overflowY: 'scroll' }}
            >
            {doneTodoState && doneTodoState.map((item, index) => {
                return (
                    <div key={item.id} className="row d-flex align-items-center p-2 m-1 mt-4 rounded task" style={singleTodoTask}>
                        <Link to={`/${item.id}`}>more info here</Link>
                        <div className="d-flex justify-content-evenly align-items-center">
                            <div className="col-lg-5 p-1">
                                <span>{item.title}</span>
                            </div>
                        
                            <div className="col-lg-5 p-1">
                                {item.comment ? <span>{item.comment}</span> : <span>Kein Kommentar hinzugefügt</span>}
                            </div>
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
                               {(currentTime - item.completedTime) > 60 
                               ? `finished ${Math.round((currentTime - item.completedTime) / 60)} hour/s ago` 
                               : `finished ${Math.max(0, Math.round(currentTime - item.completedTime))} minute/s ago` 
                               }


                               
                               
                        </div>
                        {/* <div 
                            style={{width: '50px', height: '50px', backgroundColor: 'red'}}
                            onClick={() => setCurrentTime(new Date().getTime() / 1000 / 60)}
                            >
                               Get current time
                        </div> */}
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
    transform: 'scale(0.5)',
}

export default CompletedTaskContainer;
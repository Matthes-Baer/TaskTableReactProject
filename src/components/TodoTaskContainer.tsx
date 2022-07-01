import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";

import homeworkIcon from '../images/homework icon.png'
import timeIcon from '../images/time icon.png'

const TodoTaskContainer = (): JSX.Element => {
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

                            <div className="col-lg-12 d-flex justify-content-center align-items-center">
                                {item.badges?.map(element => {
                                    if (element.name === 'todo') {
                                        return <><div style={{width: '15px', height: '15px', backgroundColor: 'red' }} className='rounded'></div><img src={homeworkIcon} style={iconStyle} /></>
                                    }
                                    else if (element.name === 'feature') {
                                        return <><div style={{width: '15px', height: '15px', backgroundColor: 'green'}} className='rounded'></div><img src={timeIcon} style={iconStyle} /></>
                                    }
                                    else if (element.name === 'important'){
                                        return <span className="p-2">Important-Eintrag</span>
                                    }})}
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
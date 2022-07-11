import { useDispatch } from 'react-redux';
import CompletedTaskContainer from '../components/CompletedTaskContainer';
import { Fragment } from 'react';

import { changeCurrentTime } from '../features/CurrentTimeSlice';


const TasksRightSide = () => {
    const dispatch = useDispatch();

    return (
        <Fragment> 
            <div className="row d-flex justify-content-center align-items-start rounded">
                <div className='col-lg-12 row text-center d-flex justify-content-center'>
                    <button onClick={() => dispatch(changeCurrentTime(new Date().getTime() / 1000 / 60))}>Timer update</button>
                    <div className='text-center'>
                        <CompletedTaskContainer />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default TasksRightSide;
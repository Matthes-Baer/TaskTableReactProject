import { useDispatch } from 'react-redux';
import CompletedTaskContainer from '../components/CompletedTaskContainer';

import { changeCurrentTime } from '../features/CurrentTimeSlice';


const TasksRightSide = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="row p-4 d-flex justify-content-center align-items-center">
                Test2
                <button onClick={() => dispatch(changeCurrentTime(new Date().getTime() / 1000 / 60))}>Timer update</button>
            </div>
            <div className='text-center'>
                <h2>Finished Tasks</h2>
                <CompletedTaskContainer />
            </div>
        </>
    )
}

export default TasksRightSide;
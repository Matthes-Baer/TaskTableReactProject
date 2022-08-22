import CompletedTaskContainer from '../components/CompletedTaskContainer';

const TasksRightSide = () => {
    return (
        <div className="row d-flex justify-content-center align-items-start rounded">
            <div className='col-lg-12 row text-center d-flex justify-content-center'>
                <div className='text-center'>
                    <CompletedTaskContainer />
                </div>
            </div>
        </div>
    )
}

export default TasksRightSide;
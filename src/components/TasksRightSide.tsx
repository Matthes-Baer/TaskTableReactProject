import CompletedTaskContainer from '../components/CompletedTaskContainer';



const TasksRightSide = () => {
    return (
        <>
            <div className="row p-4 d-flex justify-content-center align-items-center" style={{minHeight: '500px'}}>
                Test2
   
            </div>
            <div className='text-center'>
                <h2>Finished Tasks</h2>
                <CompletedTaskContainer />
            </div>
           
        </>
    )
}

export default TasksRightSide;
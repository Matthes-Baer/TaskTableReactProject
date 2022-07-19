import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import DetailViewActiveTaskComponent from "../components/DetailViewActiveTask";
import DetailViewFinishedTaskComponent from "../components/DetailViewFinishedTask";

function DetailView () {
    const { taskID } = useParams();
    const currentTasks = useSelector((state: RootState) => state.activeTodos.value);
    const finishedTasks = useSelector((state: RootState) => state.doneTodos.value);

    if (currentTasks.find(task => task.id === taskID)) {
        const detailedTask = currentTasks.find(task => task.id === taskID)!
        return (
            <div>
                <DetailViewActiveTaskComponent detailedTask={detailedTask}/>
            </div>
        )
    } else {
        const detailedTask = finishedTasks.find(task => task.id === taskID)!
        return (
            <div>
                <DetailViewFinishedTaskComponent detailedTask={detailedTask}/>
            </div>
        )
    }
}

export default DetailView
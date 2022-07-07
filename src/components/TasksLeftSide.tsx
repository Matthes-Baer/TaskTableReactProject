import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoTaskContainer from '../components/TodoTaskContainer';
import Checkbox from "../components/Checkbox";

import { addActiveTodo } from "../features/ActiveTodosSlice";

// interfaces:
interface propsInterface {
    mainTime: number
    setMainTime: Function
}

interface badgeInterface {
    singleBadge: {
        name: string,
        checked: boolean
    }[]
}

// component:
const TasksLeftSide = (props: propsInterface) => {
    const [title, setTitle] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const dispatch = useDispatch();
    const [badges, setBadges] = useState<badgeInterface["singleBadge"]>([
        { name: "todo", checked: false },
        { name: "important", checked: false },
        { name: "short-term", checked: false },
        { name: "long-term", checked: false },
    ]);

    const updateCheckStatus = (index: number) => {
        setBadges(
            badges.map((badge, currentIndex) =>
            currentIndex === index
              ? { ...badge, checked: !badge.checked }
              : badge
          )
        )
      }

      const dispatchAddFunction = () => {
        if (title && comment.length < 50) {
        props.setMainTime(new Date().getTime() / 1000 / 60)
        setId(prevState => prevState + 1);
        setTitle("");
        setComment("")
        setBadges(
            badges.map(badge => {
                return { ...badge , checked: false }
            }));
            dispatch(addActiveTodo({ id: id, title: title, badges: badges.filter(item => item.checked), comment: comment, time: new Date().getTime() / 1000 / 60}));
        }
        else {
            alert('Fehler: Titel fehlt, oder Kommentar übersteigt 50 Zeichen.')
        }
      };

    return (
        <Fragment> 
            <div className="row p-4 d-flex justify-content-center align-items-center" style={{minHeight: '500px'}}>
                <h2 className='text-center'>Task Configuration</h2>
                <div className='text-center'>maximum of 50 characters for comments</div>
                <input className="p-1 m-1 col-lg-5" type="text" placeholder="title for task" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className="p-1 m-1 col-lg-5" type="text" placeholder="comment for task" value={comment} onChange={(e) => setComment(e.target.value)} />
                <div className="col-lg-12 row d-flex justify-content-center align-items-center">
                        {badges.map((badge, idx) => {
                            return ( 
                                <Checkbox
                                    key={badge.name}
                                    isChecked={badge.checked}
                                    label={badge.name}
                                    checkHandler={() => updateCheckStatus(idx)}
                                    index={idx}
                                />
                            )  
                        })}
                </div>
                <button onClick={dispatchAddFunction}>Add task</button>
                <button onClick={() => props.setMainTime(new Date().getTime() / 1000 / 60)}>Timer update</button>  
            </div>
            <div className='text-center'>
                <h2>Active Tasks</h2>
                <TodoTaskContainer mainTime={props.mainTime} setMainTime={props.setMainTime}/>
            </div>
            
        </Fragment>
    )
}

export default TasksLeftSide;
import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoTaskContainer from '../components/TodoTaskContainer';
import Checkbox from "../components/Checkbox";

import { addActiveTodo } from "../features/ActiveTodosSlice";

import summerWinter from '../images/summer-winter.png';
import { RootState } from '../app/store';
import { changeCurrentTime } from '../features/CurrentTimeSlice';
import { useCookies } from 'react-cookie';


interface badgeInterface {
    singleBadge: {
        name: string,
        checked: boolean
    }[]
}

const TasksLeftSide = () => {
    const [title, setTitle] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const [badges, setBadges] = useState<badgeInterface["singleBadge"]>([
        { name: "todo", checked: false },
        { name: "important", checked: false },
        { name: "short-term", checked: false },
        { name: "long-term", checked: false },
    ]);

    const currentTime = useSelector((state: RootState) => state.currentTime.value);
    const dispatch = useDispatch();

    const updateCheckStatus = (index: number) => {
        setBadges(
            badges.map((badge, currentIndex) =>
            currentIndex === index
              ? { ...badge, checked: !badge.checked }
              : badge
          )
        )
      }

      const dispatchAddFunction = (callback: Function) => {
        if (title && comment.length < 50) {
        dispatch(changeCurrentTime(new Date().getTime() / 1000 / 60));
        callback();
        }
        else {
            alert('Fehler: Titel fehlt, oder Kommentar übersteigt 50 Zeichen.')
        }
      };

      const callbackForDispatchAdd = () => {
        setId(prevState => prevState + 1);
        dispatch(addActiveTodo({ id: id, title: title, badges: badges.filter(item => item.checked), comment: comment, time: new Date().getTime() / 1000 / 60 }));

        setTitle("");
        setComment("");
        setBadges(
            badges.map(badge => {
                return { ...badge , checked: false }
            }));
      }

    return (
        <Fragment> 
            <div className="row p-4 d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
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
                <button onClick={() => dispatchAddFunction(callbackForDispatchAdd)}>Add task</button>
                <button onClick={() => dispatch(changeCurrentTime(new Date().getTime() / 1000 / 60))}>Timer update</button>  
            </div>
            <div className='text-center'>
                <h2>Active Tasks</h2>
                <TodoTaskContainer />
            </div>
        </Fragment>
    )
}

export default TasksLeftSide;
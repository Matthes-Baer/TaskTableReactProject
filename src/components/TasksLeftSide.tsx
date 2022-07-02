import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoTaskContainer from '../components/TodoTaskContainer';
import Checkbox from "../components/Checkbox";

import { addActiveTodo } from "../features/ActiveTodosSlice";

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

const TasksLeftSide = (props: propsInterface) => {
    const [title, setTitle] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [id, setId] = useState<number>(0);

    const dispatch = useDispatch();

    const [badges, setBadges] = useState<badgeInterface["singleBadge"]>([
        { name: "todo", checked: false },
        { name: "feature", checked: false },
        { name: "important", checked: false },
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
        <>
            <div className="row p-4 d-flex justify-content-center align-items-center" style={{height: '275px'}}>
                <input className="p-1 m-1 col-lg-5" type="text" placeholder="title for todo" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className="p-1 m-1 col-lg-5" type="text" placeholder="comment for todo" value={comment} onChange={(e) => setComment(e.target.value)} />
                {comment.length}
                <div className="col-lg-12 row d-flex justify-content-center align-items-center">
                    <div style={{maxWidth: '200px', border: '1px solid black'}}>
                        <h4>Badges:</h4>
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
                </div>
            </div>
            <div>
                <TodoTaskContainer mainTime={props.mainTime} setMainTime={props.setMainTime}/>
                <button onClick={() => props.setMainTime(new Date().getTime() / 1000 / 60)}>UPDATE ALL TIMER</button>         
            </div>
            <button className="mt-5" onClick={dispatchAddFunction}>CLICK HERE HEY</button>
        </>
    )
}

export default TasksLeftSide;
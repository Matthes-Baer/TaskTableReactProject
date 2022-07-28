import { Fragment, useRef, useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoTaskContainer from '../components/TodoTaskContainer';
import Checkbox from "../components/Checkbox";

import { addActiveTodo } from "../features/ActiveTodosSlice";

import { RootState } from '../app/store';
import { changeCurrentTime } from '../features/CurrentTimeSlice';
import { gsap } from 'gsap';
import { useId } from "react-id-generator";



interface badgeInterface {
    singleBadge: {
        name: string,
        checked: boolean
    }[]
}

const TasksLeftSide = () => {
    const [htmlId] = useId();

    const [title, setTitle] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [badges, setBadges] = useState<badgeInterface["singleBadge"]>([
        { name: "todo", checked: false },
        { name: "important", checked: false },
        { name: "short-term", checked: false },
        { name: "long-term", checked: false },
    ]);
    const [addedBoolean, setAddedBoolean] = useState<boolean>(false)
    const colorTheme = useSelector((state: RootState) => state.colorTheme.value);
    const dispatch = useDispatch();
    const horizontalLineRef = useRef(null)
    const [isPending, startTransition] = useTransition();


   const buttonStyle = {
    border: colorTheme ? '1px solid #E2EAFC' : '1px solid black',
    boxShadow: '4px 4px 0px 0px #023E7D',
    backgroundColor: colorTheme ? '#001233' : '#ABC4FF',
    fontSize: '25px',
    color: colorTheme ? 'white' : 'black',
   }

   const horizontalLine = {
    width: '100%',
    height: '5px',
    backgroundImage: 'linear-gradient(to Right, #ABC4FF, #0466C8)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
   }

    const updateCheckStatus = (index: number) => {
        setBadges(
            badges.map((badge, currentIndex) =>
            currentIndex === index
              ? { ...badge, checked: !badge.checked }
              : badge
          )
        )
      }

      const updateInput = (event: React.ChangeEvent<HTMLInputElement>, setter: Function) => {
        startTransition(() => {
            setter(event.target.value);
        });
      }

      const dispatchAddFunction = (callback: Function, { currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (title && comment.length < 50) {
        dispatch(changeCurrentTime(new Date().getTime() / 1000 / 60));

        // GSAP
        const buttonPushTL = gsap.timeline({});
        buttonPushTL.to(currentTarget, { duration: 0.25 ,y: 10, boxShadow: '4px -16px 0px 0px #023E7D' });
        buttonPushTL.to(currentTarget, { duration: 0.25, y: 0, boxShadow: '4px 4px 0px 0px #023E7D' });

        const linePushTL = gsap.timeline();
        linePushTL.to(horizontalLineRef.current, { duration: 0.25, backgroundImage: `linear-gradient(to Right, ${addedBoolean ? '#ABC4FF, #0466C8' : '#ABC4FF, #EC214E'}`, ease: 'linear' });
        setAddedBoolean(!addedBoolean);

        callback();
        }
        else {
            alert('Fehler: Titel fehlt, oder Kommentar übersteigt 50 Zeichen.');
            
        }
      };

      const callbackForDispatchAdd = () => {
        dispatch(addActiveTodo({ id: htmlId, title: title, badges: badges.filter(item => item.checked), comment: comment, time: new Date().getTime() / 1000 / 60 }));
        

        setTitle("");
        setComment("");
        setBadges(
            badges.map(badge => {
                return { ...badge , checked: false }
            }));
      }

    return (
        <Fragment> 
            <div className="row d-flex justify-content-center align-items-start rounded">
                <div className='col-lg-12 row text-center d-flex justify-content-center'>
                    <h2 className='col-lg-12 text-center'>Task Configuration</h2>
                    <div className='col-lg-12 text-center'><i>maximum of 50 characters for comments</i></div>
                    <input className="p-1 m-1 col-lg-5" type="text" placeholder="title for task" value={title} onChange={(event) => updateInput(event, setTitle)} />
                    <input className="p-1 m-1 col-lg-5" type="text" placeholder="comment for task" value={comment} onChange={(event) => updateInput(event, setComment)} />
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
                    <button className="col-lg-6 mt-3 mb-3" style={buttonStyle} onClick={(current) => dispatchAddFunction(callbackForDispatchAdd, current)}>Add task</button>
                    <span ref={horizontalLineRef} style={horizontalLine} className="rounded"></span>
                    <div className='text-center'>
                        <TodoTaskContainer />
                    </div>
                </div>
            </div>
        </Fragment>      
    )
}

export default TasksLeftSide;
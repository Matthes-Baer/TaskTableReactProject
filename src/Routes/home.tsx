import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActiveTodo } from "../features/ActiveTodosSlice";

import { RootState } from "../app/store";

import Checkbox from "../components/Checkbox";

interface badgeInterface {
    singleBadge: {
        name: string,
        checked: boolean
    }[]
}

const HomeRoute = () => {
    const todoState = useSelector((state: RootState) => state.activeTodos.value)
    const dispatch = useDispatch();

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [comment, setComment] = useState<string>("");

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
        dispatch(addActiveTodo({ id: id, title: title, badges: badges.filter(item => item.checked), comment: comment}));
        setId(prevState => prevState + 1);
        setTitle("");
        setComment("")
        setBadges(
            badges.map(badge => {
                return { ...badge , checked: false }
            }));
      };


    return (
        <div className="homePageMainContainer">
            <div>
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
            <div>
                <input type="text" placeholder="title for todo" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <input type="textarea" placeholder="comment for todo" value={comment} onChange={(e) => setComment(e.target.value)}/>
            </div>
            <div className="container text-center" style={{width: '500px'}}>
                {todoState && todoState.map((item, idx) => {
                    return(
                        <div key={item.id} className="row bg-primary p-2">
                            <div className="col-lg-12 p-1">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="col-lg-12 p-1">
                                {item.comment ? <span>{item.comment}</span> : <span>Kein Kommentar hinzugefügt</span>}
                            </div>
                            <div className="col-lg-12 p-1">
                                {item.badges?.map(element => {
                                    if (element.name === 'todo') {
                                        return <span className="p-2">Todo-Eintrag</span>
                                    }
                                    else if (element.name === 'feature') {
                                        return <span className="p-2">Feature-Eintrag</span>
                                    }
                                    else if (element.name === 'important'){
                                        return <span className="p-2">Important-Eintrag</span>
                                    }})}
                            </div>
                        </div>
                    )
                })}
            </div>

                <button onClick={dispatchAddFunction}>CLICK HERE HEY</button>
            {/* <DoughnutChartComp /> */}

            
        </div>
    )
}

export default HomeRoute;
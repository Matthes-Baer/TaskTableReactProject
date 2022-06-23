import React, { useEffect, useState } from "react";
// import { DoughnutChartComp } from "../charts/doughnutChart";
import { useDispatch, useSelector } from "react-redux";
import { addActiveTodo } from "../features/ActiveTodosSlice";

import ReactMarkdown from 'react-markdown'

// import { useGet5DayForecastQuery } from '../APIs/WeatherApi';
import { RootState } from "../app/store";

import Checkbox from "../components/Checkbox";
import { iteratorSymbol } from "immer/dist/internal";

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

    // const {data, error, isFetching} = useGet5DayForecastQuery(null);

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
        <div style={{backgroundColor: 'black'}}>
            {/* {error ? (
                <>Error</>
            ) : isFetching ? (
                <>Loading</>
            ) : data ? (
                <div>{specific(1)} +++++++ {showAllDataFrom('rh')}</div>

            ) : null} */}

            <div style={{color: 'black'}}>
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

            <p>
                <pre>{JSON.stringify(badges, null, 2)}</pre>
            </p>
            <div>
                {todoState && todoState.map((item, idx) => {
                    return(
                        <div key={idx}>
                            {`id: ${item.id}, title: ${item.title}, ${item.badges?.map(item => `${item.name} ${item.checked}`)}, comment: ${item.comment} `}
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
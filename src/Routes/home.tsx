import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActiveTodo } from "../features/ActiveTodosSlice";
import { RootState } from "../app/store";
import { gsap } from "gsap";


import { changeColorTheme } from "../features/ColorSlice";

// Components:
import Checkbox from "../components/Checkbox";
import SideBar from '../components/SideBar';
import HeaderElement from '../components/HeaderElement';
import TodoTaskContainer from '../components/TodoTaskContainer'
import CompletedTaskContainer from '../components/CompletedTaskContainer';
import TasksLeftSide from '../components/TasksLeftSide';
import TasksRightSide from '../components/TasksRightSide';



// COLORS:
// https://coolors.co/palette/edf2fb-e2eafc-d7e3fc-ccdbfd-c1d3fe-b6ccfe-abc4ff
// green: #7bf1a8
// red: #ee6055
// akzent: #ff7070

const HomeRoute = () => {
    const colorTheme = useSelector((state: RootState) => state.colorTheme.value);
    const dispatch = useDispatch();
    const refTest = useRef(null)
  
    const changer = () => {
        if (colorTheme) {
            localStorage.setItem('darkmode', JSON.stringify(false));
        }
        else {
            localStorage.setItem('darkmode', JSON.stringify(true))
        }
        dispatch(changeColorTheme(JSON.parse(localStorage.getItem('darkmode') || "{}")))

        // localStorage.clear();
    }
    
    const mainContainer = {
        backgroundColor: colorTheme ? '#001233' : '#EDF2FB',
        minHeight: '100vh'
    };

    const innerContainer = {
        backgroundColor: colorTheme ? '#023E7D' : '#D7E3FC',
        minHeight: '90vh',
        width: '75vw',
        outline: colorTheme ? '40px solid #002855' : '40px solid #E2EAFC',
        borderRadius: '20px'
    };

    const sideBar = {
        height: '500px',
        backgroundColor: '#B6CCFE'
    };

    const [todoId, setTodoId] = useState(1);
    const [todo, setTodo] = useState("");
    const [loading, setLoading] = useState(false);
    const [mainTime, setMainTime] = useState<number>(new Date().getTime() / 1000 / 60);
  
    function getNewTodo() {
      setTodoId((todoId) => (todoId === 20 ? 1 : todoId + 1));
    }
  
    useEffect(() => {
      async function fetchTodo() {
        const url = `/.netlify/functions/todo`;
        try {
          setLoading(true);
          const response = await fetch(url).then((res) => res.json());
          console.log(response)
    
        } catch (err) {
          console.log("something");
        } 
      }
      console.log(todo)
      console.log(loading)
      fetchTodo();
    }, []);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={mainContainer}>
            <div style={innerContainer} className="d-flex justify-content-evenly row">
                <HeaderElement />
                <div className="row col-lg-12 d-flex align-items-center justify-content-evenly mt-5 mb-5">
                    <div className="col-lg-4 rounded" style={{backgroundColor: '#B6CCFE', height: '500px'}}>
                        <TasksLeftSide mainTime={mainTime} setMainTime={setMainTime}/>
                    </div>

                    <div className="col-lg-4 rounded" style={{backgroundColor: '#B6CCFE', height: '500px'}}>
                        <TasksRightSide />
                    </div>

                    <div className="col-lg-2 mt-5 mb-5" style={sideBar}>
                        <SideBar />
                    </div>
                    <button onClick={() => localStorage.clear}>CLEAR HERE</button>
                    <button onClick={changer}>CHANGER HERE</button>
                </div> 
            </div>
        </div>
    )
}

export default HomeRoute;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActiveTodo } from "../features/ActiveTodosSlice";
import { RootState } from "../app/store";

// Components:
import Checkbox from "../components/Checkbox";
import SideBar from '../components/SideBar';
import HeaderElement from '../components/HeaderElement';

interface badgeInterface {
    singleBadge: {
        name: string,
        checked: boolean
    }[]
}

const HomeRoute = () => {

    const [todoId, setTodoId] = useState(1);
    const [todo, setTodo] = useState("");
    const [loading, setLoading] = useState(false);
  
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
        <div className="container-fluid d-flex justify-content-center align-items-center" style={mainContainer}>
            <div style={innerContainer} className="d-flex justify-content-center row">
                
            
            <div style={headerElement} className="col-lg-12 d-flex align-items-center">
                <HeaderElement />
            </div>

  

            <div className="col-lg-8 d-flex align-items-center row">
                <div className="col-lg-6 bg-primary">
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

                </div>





                <div className="col-lg-6 bg-secondary">
                    Test
                </div>

          

                <button onClick={dispatchAddFunction}>CLICK HERE HEY</button>

            </div>

            <div className="col-lg-4" style={sideBar}>
                <SideBar />
            </div>
        
            </div>
            
        </div>
    )
}

const mainContainer = {
    backgroundColor: '#757a79',
    height: '100vh'
}

const innerContainer = {
    backgroundColor: '#aeccc6',
    height: '75vh',
    width: '75vw',
    outline: '40px solid #9ba6a5',
    borderRadius: '10px'
}

const headerElement = {
    backgroundColor: '#757a79',
    height: '100px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
}



const sideBar = {
    height: '500px',
    backgroundColor: 'green'
}

export default HomeRoute;
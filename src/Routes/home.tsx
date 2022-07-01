import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActiveTodo } from "../features/ActiveTodosSlice";
import { RootState } from "../app/store";

// Components:
import Checkbox from "../components/Checkbox";
import SideBar from '../components/SideBar';
import HeaderElement from '../components/HeaderElement';
import TodoTaskContainer from '../components/TodoTaskContainer'

interface badgeInterface {
    singleBadge: {
        name: string,
        checked: boolean
    }[]
}

const HomeRoute = () => {
    const dispatch = useDispatch();
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
            <div style={innerContainer} className="d-flex justify-content-evenly row">
                
            
            <div style={headerElement} className="col-lg-12 d-flex align-items-center">
                <HeaderElement />
            </div>

  

            <div className="container row col-lg-8 d-flex align-items-center justify-content-center mt-5 mb-5">
                <div className="col-lg-6 rounded" style={{backgroundColor: '#B6CCFE'}}>

                <div className="row p-4 d-flex justify-content-center align-items-center">
                    <input className="p-1 m-1 col-lg-5" type="text" placeholder="title for todo" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input className="p-1 m-1 col-lg-5" type="textarea" placeholder="comment for todo" value={comment} onChange={(e) => setComment(e.target.value)} />
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
                   <TodoTaskContainer />

                </div>

                


            


          


          

                </div>





                <div className="col-lg-6 bg-secondary">
                    Test
                </div>

          

                <button className="mt-5" onClick={dispatchAddFunction}>CLICK HERE HEY</button>

            </div>

            <div className="col-lg-2 mt-5 mb-5" style={sideBar}>
                <SideBar />
            </div>
        
            </div>
            
        </div>
    )
}

const mainContainer = {
    backgroundColor: '#EDF2FB',
    minHeight: '100vh'
}

const innerContainer = {
    backgroundColor: '#D7E3FC',
    maxHeight: '90vh',
    width: '75vw',
    outline: '40px solid #E2EAFC',
    borderRadius: '20px'
}

const headerElement = {
    backgroundColor: '#B6CCFE',
    height: '100px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}

const sideBar = {
    height: '500px',
    backgroundColor: '#B6CCFE'
}



export default HomeRoute;
import { Fragment } from "react";
import { removeActiveTodo } from "../features/ActiveTodosSlice";
import { addDoneTodo } from "../features/DoneTodoSlice";
import { useAppSelector } from "../hooks/ReduxHooks";
import { useAppDispatch } from "../hooks/ReduxHooks";

import "../CSS.css";
import TodoBadgesComponent from "./TodoBadgesComponent";

interface itemInterface {
  id: string;
  title: string;
  badges?: { name: string; checked: boolean }[];
  comment?: string;
  time: number;
}

const TodoTaskContainer = (): JSX.Element => {
  const darkmode = useAppSelector((state) => state.colorTheme.value);
  const todoState = useAppSelector((state) => state.activeTodos.value);
  const currentTime = useAppSelector((state) => state.currentTime.value);
  const dispatch = useAppDispatch();

  const singleTodoTask = {
    backgroundColor: darkmode ? "#001233" : "#D7E3FC",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
    fontSize: "20px",
    transition: "all .5s",
  };

  const deleteFromActive = (
    item: itemInterface,
    index: number,
    callback: Function
  ) => {
    callback(item, index, new Date().getTime() / 1000 / 60);
  };

  const dispatchCall = (item: itemInterface, index: number, time: number) => {
    dispatch(removeActiveTodo(index));
    dispatch(addDoneTodo({ ...item, completedTime: time }));
  };

  return (
    <Fragment>
      <h2 className="p-3">Active Tasks</h2>
      <div
        className="container text-center mb-4"
        style={{
          border: darkmode ? "1px solid #E2EAFC" : "1px solid black",
          backgroundColor: darkmode ? "#002855" : "#EDF2FB",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {todoState &&
          todoState.map((item, idx) => {
            return (
              <div
                key={item.id}
                className="row d-flex align-items-start p-2 m-1 mt-4 rounded task position-relative justify-content-center"
                style={singleTodoTask}
                data-testid="to-do-task"
              >
                <div
                  style={deleteStyle}
                  onClick={() => deleteFromActive(item, idx, dispatchCall)}
                  className="d-flex justify-content-center align-items-center position-absolute"
                >
                  ❌
                </div>
                <div
                  className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center mt-3"
                  style={{
                    borderBottomStyle: "solid",
                    borderBottomColor: darkmode ? "#E2EAFC" : "black",
                    borderBottomWidth: "1px",
                  }}
                >
                  <div className="col-xl-5 p-1">
                    <h4>{item.title}</h4>
                  </div>

                  <div className="col-xl-5 p-1">
                    {item.comment ? (
                      <span>{item.comment}</span>
                    ) : (
                      <span>No comment added</span>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                  {item.badges?.map((element) => {
                    return (
                      <TodoBadgesComponent
                        key={item.id + element.name}
                        badge={element.name}
                      />
                    );
                  })}
                </div>

                <div
                  className="d-flex justify-content-center justify-content-sm-end align-items-center mt-sm-3 mb-sm-2"
                  style={{ fontWeight: "bold", fontSize: "13.5px" }}
                >
                  {currentTime - item.time > 60
                    ? `created ${Math.round(
                        (currentTime - item.time) / 60
                      )} hour/s ago`
                    : `created ${Math.round(
                        currentTime - item.time
                      )} minute/s ago`}
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

const deleteStyle = {
  backgroundColor: "transparent",
  width: "25px",
  height: "25px",
  cursor: "pointer",
  top: "0",
  right: "0",
};

export default TodoTaskContainer;

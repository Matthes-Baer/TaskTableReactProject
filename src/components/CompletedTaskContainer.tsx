import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import TodoBadgesComponent from "./TodoBadgesComponent";

const CompletedTaskContainer = () => {
  const darkmode = useSelector((state: RootState) => state.colorTheme.value);
  const doneTodoState = useSelector(
    (state: RootState) => state.doneTodos.value
  );
  const currentTime = useSelector(
    (state: RootState) => state.currentTime.value
  );

  const singleTodoTask = {
    backgroundColor: darkmode ? "#001233" : "#D7E3FC",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
    fontSize: "20px",
    transition: "all .5s",
  };

  return (
    <Fragment>
      <h2 className="p-3">Finished Tasks</h2>
      <div
        className="container text-center mb-4"
        style={{
          border: darkmode ? "1px solid #E2EAFC" : "1px solid black",
          backgroundColor: darkmode ? "#002855" : "#EDF2FB",
          height: "500px",
          overflowY: "scroll",
        }}
      >
        {doneTodoState &&
          doneTodoState.map((item, index) => {
            return (
              <div
                key={item.id}
                className="row d-flex align-items-center p-2 m-1 mt-4 rounded task"
                style={singleTodoTask}
              >
                <div className="d-flex justify-content-evenly align-items-center">
                  <div className="col-lg-5 p-1">
                    <h5>{item.title}</h5>
                  </div>

                  <div className="col-lg-5 p-1">
                    {item.comment ? (
                      <span>{item.comment}</span>
                    ) : (
                      <span>Kein Kommentar hinzugefügt</span>
                    )}
                  </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
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
                  className="container-fluid d-flex justify-content-end align-items-center"
                  style={{ fontWeight: "bold" }}
                >
                  {currentTime - item.completedTime > 60
                    ? `finished ${Math.round(
                        (currentTime - item.completedTime) / 60
                      )} hour/s ago`
                    : `finished ${Math.max(
                        0,
                        Math.round(currentTime - item.completedTime)
                      )} minute/s ago`}
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default CompletedTaskContainer;

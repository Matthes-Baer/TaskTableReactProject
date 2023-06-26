import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "./HeaderElement.module.css";
import { changeColorTheme } from "../features/ColorSlice";
import logo from "../images/logo.webp";
import EarthPNG from "../images/space/EarthPNG.webp";
import MoonPNG from "../images/space/MoonPNG.webp";

const HeaderElement = (): JSX.Element => {
  const [today, setToday] = useState(
    new Date().toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
  const darkmode = useSelector((state: RootState) => state.colorTheme.value);
  const dispatch = useDispatch();

  const changer = (): void => {
    if (darkmode) {
      localStorage.setItem("darkmode", JSON.stringify(false));
    } else {
      localStorage.setItem("darkmode", JSON.stringify(true));
    }
    dispatch(
      changeColorTheme(JSON.parse(localStorage.getItem("darkmode") || "{}"))
    );
  };

  const headerElement = {
    backgroundImage: darkmode
      ? "linear-gradient(to right, #002855, #0353A4, #0353A4, #002855)"
      : "linear-gradient(to right, #E2EAFC, #B6CCFE, #B6CCFE, #E2EAFC)",
    color: darkmode ? "white" : "black",
    minHeight: "100px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    zIndex: 5,
  };

  const darkmodeSwitcherStyle = {
    transform: darkmode ? "rotate(-90deg)" : "rotate(90deg)",
    width: "50px",
    height: "50px",
    transition: "all .5s",
  };

  return (
    <div
      style={headerElement}
      className={
        styles.containerResponsive +
        " " +
        `d-flex align-items-center justify-content-between p-2`
      }
    >
      <div className={"d-flex" + " " + styles.firstGroupResponsive}>
        <div className="me-2" style={backgroundLogoStyle}></div>
        <div className="" style={sideEffect}></div>
        <h1 className="align-self-center">Task Tour</h1>
      </div>
      <div className="d-flex">
        <div
          onClick={changer}
          className="me-2 align-self-center"
          style={darkmodeSwitcherStyle}
        >
          <img
            src={darkmode ? MoonPNG : EarthPNG}
            style={{ borderRadius: "50%", height: "50px" }}
            alt=""
          />
        </div>
        <div style={sideEffect}></div>
        <div style={timeStyle} className="align-self-center">
          {today}
        </div>
      </div>
    </div>
  );
};

const sideEffect = {
  width: "5px",
  height: "auto",
  backgroundColor: "#EC214E",
  borderRadius: "10px 0 0 10px",
  marginRight: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
};

const timeStyle = {
  fontSize: "25px",
  fontWeight: "bold",
};

const backgroundLogoStyle = {
  backgroundImage: `url(${logo})`,
  backgroundPosition: "center",
  backgroundSize: "100% 100%",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundRepeat: "no-repeat",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
};

export default HeaderElement;

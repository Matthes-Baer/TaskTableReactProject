import { Fragment } from "react";
import classes from './TodoBadgesComponent.module.css';

export default function TodoBadgesComponent(props: { badge: string }) {
    const defaultBoxStyle = {
        minWidth: '12.5px',
        minHeight: '12.5px',
    }

    if (props.badge === 'todo') {
        return (
        <div className="d-flex align-items-center justify-content-center m-2 col-sm-5">
            <div className={classes.red + " " + "me-1"} style={defaultBoxStyle}></div>
            todo
        </div>
        )
    } else if (props.badge === 'important') {
        return (
            <div className="d-flex align-items-center justify-content-center m-2 col-sm-5">
                <div className={classes.green + " " + "me-1"} style={defaultBoxStyle}></div>
                important
            </div>
            )
    } else if (props.badge === 'short-term') {
        return (
            <div className="d-flex align-items-center justify-content-center m-2 col-sm-5">
                <div className={classes.orange + " " + "me-1"} style={defaultBoxStyle}></div>
                short-term
            </div>
            )
    } else if (props.badge === 'long-term') {
        return (
            <div className="d-flex align-items-center justify-content-center m-2 col-sm-5">
                <div className={classes.purple + " " + "me-1"} style={defaultBoxStyle}></div>
                long-term
            </div>
            )
    } else {
        return <div>no badge</div>
    }
}
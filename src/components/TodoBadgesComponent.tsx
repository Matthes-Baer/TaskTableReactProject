import { Fragment } from "react";

export default function TodoBadgesComponent(props: { badge: string }) {
    if (props.badge === 'todo') {
        return <div>todo</div>
    } else if (props.badge === 'important') {
        return <div>important</div>
    } else if (props.badge === 'short-term') {
        return <div>short-term</div>
    } else if (props.badge === 'long-term') {
        return <div>long-term</div>
    } else {
        return <div>no badge</div>
    }
}
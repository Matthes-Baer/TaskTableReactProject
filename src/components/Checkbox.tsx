import { useSelector } from "react-redux"
import { RootState } from "../app/store"

interface CheckboxInterface {
    isChecked: boolean
    index: number
    label: string
    checkHandler: Function
}

const Checkbox = ({ isChecked, index, label, checkHandler }: CheckboxInterface):JSX.Element => {
    const colorState = useSelector((state: RootState) => state.colorTheme.value);

    const containerStyle = {
        border: colorState ? '1px solid #E2EAFC' : '1px solid black',
        boxShadow: isChecked ? '4px 4px 0px 0px #023E7D' : '3px 3px 0px 0px #023E7D',
        backgroundColor: colorState ? '#001233' : '#ABC4FF',
        transition: 'all .5s',
    }

    const labelStyle = {
        color: colorState ? "white" : "black",
        fontSize: isChecked ? '22.5px' : '20px',
        transition: 'all .5s',
    }

    return (
        <div style={containerStyle} className="col-xl-5 m-2 p-2 d-flex flex-column justify-content-center align-items-center text-center">
            <label style={labelStyle} htmlFor={`checkbox-${index}`}>{label}</label>
            <input 
            type="checkbox"
            id={`checkbox-${index}`}
            checked={isChecked}
            onChange={()=>checkHandler()}
            />
        </div>
    )
}





export default Checkbox;
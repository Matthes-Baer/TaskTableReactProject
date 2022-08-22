import { useSelector } from "react-redux"
import { RootState } from "../app/store"

interface CheckboxInterface {
    isChecked: boolean
    index: number
    label: string
    checkHandler: Function
}

const Checkbox = ({ isChecked, index, label, checkHandler }: CheckboxInterface):JSX.Element => {
    const darkmode = useSelector((state: RootState) => state.colorTheme.value);
    const labelStyle = {
        color: darkmode ? 'white' : isChecked ? 'white' : 'black',
        transition: 'all .5s',
        backgroundColor: isChecked ? 'rgb(133,44,141)' : darkmode ? '#001233' : '#ABC4FF',
        width: '100%',
        height: '50px',
        boxShadow: '4px 4px 0px 0px #023E7D',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
    }
    return (
        <div className="col-xl-6 p-2 d-flex flex-column justify-content-center align-items-center text-center">
            <label className="d-flex justify-content-center align-items-center" style={labelStyle} htmlFor={`checkbox-${index}`}>{label}</label>
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
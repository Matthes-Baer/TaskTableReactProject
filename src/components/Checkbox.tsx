interface CheckboxInterface {
    isChecked: boolean
    index: number
    label: string
    checkHandler: Function
}

const Checkbox = ({ isChecked, index, label, checkHandler }: CheckboxInterface):JSX.Element => {
    return (
        <div className="p-2 col-lg-12">
            <input 
            type="checkbox"
            id={`checkbox-${index}`}
            checked={isChecked}
            onChange={()=>checkHandler()}
            />
            <label style={labelStyle} htmlFor={`checkbox-${index}`}>{label}</label>
        </div>
    )
}

const labelStyle = {
    color: 'white',
    fontSize: '20px',
}

export default Checkbox;
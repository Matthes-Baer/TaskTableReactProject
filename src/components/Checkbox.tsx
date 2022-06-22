

interface CheckboxInterface {
    isChecked: boolean
    index: number
    label: string
    checkHandler: Function
}

const Checkbox = ({ isChecked, index, label, checkHandler }: CheckboxInterface):JSX.Element => {
    return (
        <div>
            <input
            type="checkbox"
            id={`checkbox-${index}`}
            checked={isChecked}
            onChange={()=>checkHandler()}
            />
            <label htmlFor={`checkbox-${index}`}>{label}</label>
      </div>
    )
}

export default Checkbox;
const Input = (props) => {
  return (<div>
    {props.inputTitle}: <input
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={() => props.onChange(props.value)}/>
  </div>)
}

export default Input
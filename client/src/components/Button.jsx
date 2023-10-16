const Button = (props) => {
  return (
    <button type={props.type} class={`${props.width} rounded-[10px] text-text md:py-3 md:px-6 py-1 px-2 ${props.styles}`} onClick={props.onClick}>{props.text}</button>
  )
};

export default Button
const Message = (props) => {

  console.log("Inside message: ", props.sender, props.chat);

  return (
    <div class='flex flex-col border-b border-text pb-2 w-11/12'>
      <h4 class='font-bold'>{props.sender}</h4>
      <h5 class='text-sm'>{props.chat}</h5>
    </div>
  )
};

export default Message
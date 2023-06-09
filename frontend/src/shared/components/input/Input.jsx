
import React, {forwardRef}from "react";
import './Input.css';
const Input = forwardRef((props, ref) => {
  
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={ref} id={props.id} type={props.type} onChange={props.onChange} placeholder={props.placeholder} maxLength={props.maxLength} />
    </div>
  )
});
export default Input;

import React, {forwardRef}from "react";
import './Select.css';
const Select = forwardRef((props, ref) => {
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <select ref={ref} id={props.id} type={props.type} placeholder={props.placeholder} >
        <option value="100">KESKO</option>
        <option value="200">S-RYHMÄ</option>
      </select>
    </div>
  )
});
export default Select;
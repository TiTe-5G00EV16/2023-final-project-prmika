
import React, {forwardRef, useRef, useState}from "react";
import './Select.css';
import { getUsers } from "../../../../users/api/users";
import { useQuery } from "react-query";
const Select = forwardRef((props, ref) => {
  let [owner, setOwner] = useState("");
  let ownerRef = useRef();
    const { isLoading, error, data } = useQuery(
      "UsersData", 
      getUsers
    );
      if (isLoading) return console.log("lataa");
    if(error) return console.log("voi vittu");
    let handleOwnerChange = (e) => {
     owner = e.target.value;
     console.log(owner);
    };

  return (
    <div className="form-control">
      <label>Käyttäjä</label>
      <select ref={ref.current.value} id={props.id} type={props.type} placeholder={props.placeholder} onChange={handleOwnerChange}>
      <option value=""></option>
      {data.map((owner) => (
          <option value={owner.id}>{owner.name}</option>
        ))}
      </select>
    </div>
  )
});
export default Select;
import React from "react";

const Person = props => {
  return (
    <div>
      {props.name} &nbsp; {props.number}
      <button onClick={() => props.handleDelete(props.personId)}>delete</button>
    </div>
  );
};

export default Person;

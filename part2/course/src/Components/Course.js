import React from "react";

const Course = props => {
  return (
    <>
      <h2>
        {" "}
        <Header course={props.course.name} />{" "}
      </h2>
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  );
};

const Header = props => {
  return <>{props.course}</>;
};

const Content = props => {
  return props.parts.map(element => {
    return (
      <Part
        key={element.id}
        name={element.name}
        exercises={element.exercises}
      />
    );
  });
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {" "}
      {name} {exercises}
    </p>
  );
};

const Total = (props, totalNumber) => {
  props.parts.reduce((sum, total) => {
    return (totalNumber = sum + total.exercises);
  }, 0);
  return <h4>total of {totalNumber} exercises</h4>;
};

export default Course;

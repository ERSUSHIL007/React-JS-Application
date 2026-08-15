import PropTypes from 'prop-types';

function Student(props) {
  return (
    <div>
      <h1>Student Component</h1>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Grade: {props.grade}</p>
      <p>Student: {props.isStudent ? "Yes" : "No"}</p>
    </div>
  );
}

Student.PropTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  grade: PropTypes.string,
  isStudent: PropTypes.bool
}

Student.defaultProps = {
  name: "Default Name",
  age: 0,
  grade: "Default Grade",
  isStudent: false
}

export default Student
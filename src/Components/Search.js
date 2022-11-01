import React, { useState } from "react";
import { STUDENTS } from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

function Search({ setErrorMsg, setStudentNames, studentNames }) {
  const [studentName, setStudentName] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const handleAddStudent = () => {
    if (!studentName || !joiningDate) return null;

    //  Clear input fields and previous error message
    setStudentName("");
    setJoiningDate("");
    setErrorMsg("");

    // check for the student's name
    let student = STUDENTS.find(
      (student) => student.name.toLowerCase() == studentName.toLowerCase()
    );

    if (!student) {
      // If student does not exist
      setErrorMsg(`Sorry, ${studentName} is not a verified student!`);
    } else {
      // Check student's validity
      let isValid = checkValidity(joiningDate, student?.validityDate);
      if (!isValid) {
        setErrorMsg(`Sorry, ${studentName}'s validity has Expired!`);
      } else {
        let studentArray = [...studentNames];
        studentArray.push(student?.name);
        setStudentNames(studentArray);
      }
    }
  };

  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
            onChange={(e) => setStudentName(e.target.value)}
            value={studentName}
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
            onChange={(e) => setJoiningDate(e.target.value)}
            value={joiningDate}
          />
        </div>
      </label>
      <button
        type="button"
        data-testid="addBtn"
        className="small mb-0"
        onClick={handleAddStudent}
      >
        Add
      </button>
    </div>
  );
}

export default Search;

import React from "react";

const Employee = () => {
  const name = localStorage.getItem("name");
  const unit = localStorage.getItem("unit");

  return (
    <div>
      <h1>
        Hello, {name} - {unit}
      </h1>
    </div>
  );
};

export default Employee;

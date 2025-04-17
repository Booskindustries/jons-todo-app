import React from 'react';

const Homepage = () => {
  return (
    <div>
        <h1 style={{fontSize:20}}>Welcome to Jon's Todo App</h1>
        <button onClick={() => alert('Button clicked!')}>Click Me!</button>
        <p>This is a simple todo app built with Electron and React.</p>
        <input type="text" placeholder="Add a new task" />
        <input type="radio">Add Task</input>
    </div>
  );
};

export default Homepage;
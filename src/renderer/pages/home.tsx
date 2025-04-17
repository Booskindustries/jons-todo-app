import React from 'react';

const Homepage = () => {
  return (
    <div>
        <h1>Welcome to Jon's Todo App</h1>
        <button onClick={() => alert('Button clicked!')}>Click Me!</button>
        <p>This is a simple todo app built with Electron and React.</p>
        <input type="text" placeholder="Add a new task" />
    </div>
  );
};

export default Homepage;
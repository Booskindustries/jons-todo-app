/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Homepage = () => {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Welcome to Jon's Todo App</h2>
        <Button onClick={() => alert('Button clicked!')}>Click Me!</Button>
        <p>This is a simple todo app built with Electron and React.</p>

        <Input placeholder="Add a new task"/>
        <Button variant='outline'>Add Task</Button>
        <Button variant='outline' onClick={() => alert('Task completed!')}>Complete Task</Button>
    </div>
  );
};

export default Homepage;
import React from 'react';
import Homepage from './pages/home';
import Layout from './layout';
import { Toaster } from "@/components/ui/sonner"

const App = () => {
  return (
    <>
      <Layout>
        <Homepage />
      </Layout>
      <Toaster />
    </>
  );
};

export default App;
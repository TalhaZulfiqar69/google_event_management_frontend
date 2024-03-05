import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/commons/Navbar";
import routes from "./routes/index";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box p={4}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
        <Toaster />
      </Box>
    </>
  );
};

export default App;

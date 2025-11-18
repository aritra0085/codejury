import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
const App = () => {
  return (
    <>
      <Navbar />
      <div
        className="main flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[80%] w-[50%]">
          <Editor
            height="100%"
            language="javascript"
            value="// some comment"
            theme="vs-dark"
          />
        </div>
      </div>
    </>
  );
};

export default App;

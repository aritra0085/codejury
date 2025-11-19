import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import CircleLoader from "react-spinners/CircleLoader";
const App = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "typescript", label: "TypeScript" },
    { value: "rust", label: "Rust" },
    { value: "dart", label: "Dart" },
    { value: "scala", label: "Scala" },
    { value: "perl", label: "Perl" },
    { value: "haskell", label: "Haskell" },
    { value: "elixir", label: "Elixir" },
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "bash", label: "Bash" },
  ];

  const [selectedOption, setselectedOption] = useState(options[0]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#18181b", // dark background (similar to bg-zinc-900)
      borderColor: "#3f3f46",
      color: "#fff",
      width: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#18181b", // dropdown bg
      color: "#fff",
      width: "100%",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // selected option text
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#27272a" : "#18181b", // hover effect
      color: "#fff",
      cursor: "pointer",
      // width: "30%"
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
      width: "100%",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#a1a1aa", // placeholder text color
      width: "100%",
    }),
  };

  const [code, setCode] = useState("");

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({ apiKey: "AIzaSyCQQzAbno_BvA5xs3fkipTfw9wdmiV9MUE" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function reviewCode() {
    setResponse("");
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

Code: ${code}
`,
    });
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div
        className="main flex justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[87%] w-[50%]">
          <div className="tabs mt-5! px-5! mb-3! w-full flex items-center gap-2.5">
            <Select
              value={selectedOption}
              onChange={(e) => {
                setselectedOption(e);
              }}
              options={options}
              styles={customStyles}
            />
            <button className="btnNormal bg-purple-900 min-w-[120px] transition-all hover:bg-purple-800">
              Fix Code
            </button>
            <button onClick={() => {
              if (code === "") {
                alert("Please enter code first")
              }
              else {
                reviewCode()
              }
            }} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Review</button>
          </div>
          <Editor
            height="100%"
            language={selectedOption.value}
            value={code}
            onChange={(e) => {
              setCode(e);
            }}
            theme="vs-dark"
          />
        </div>
        <div className="right p-2.5! bg-zinc-900 w-[50%] h-full">
          <div className="topTab border-b border-t border-[#27272a] flex items-center justify-between h-[60px]">
            <p className="font-bold text-[17px]">Response</p>
          </div>
          {loading && <CircleLoader color="#9333ea" />}
          <Markdown>{response}</Markdown>
        </div>
      </div>
    </>
  );
};

export default App;

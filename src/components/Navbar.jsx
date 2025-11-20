import React from "react";
import { BrainCircuit } from "lucide-react";
import { ExternalLink } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      <div
        className="nav flex items-center justify-between h-[90px] bg-zinc-900"
        style={{ padding: "0px 150px" }}
      >
        <div className="logo flex items-center gap-2.5">
          <BrainCircuit size={30} color="#9333ea" />
          <span className="text-2xl font-bold text-white ml-2">CodeJury</span>
        </div>
        <div className="icons flex items-center gap-2.5">
          <a 
  href="https://github.com/aritra0085" 
  target="_blank" 
  rel="noopener noreferrer"
  className="cursor-pointer transition-all hover:text-[#9333ea]"
>
  <ExternalLink />
</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

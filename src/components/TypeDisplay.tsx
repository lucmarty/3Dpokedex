import React from "react";
import types from "../types.json";

const TypeDisplay: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {types.map((type) => (
        <div key={type.name} className="">
          <img
            src={`/types/${type.name.toLowerCase()}.png`}
            alt={type.name}
            className=""
          />
          
         
          
        </div>
      ))}
    </div>
  );
};

export default TypeDisplay;

import React from "react";

interface DividerProps {
  color?: string
}

function Divider({ color }: DividerProps) {
  return <div className={`w-[90%] h-[1px] bg-${color ?? "offWhite"} my-5`} />;
}

export default Divider;

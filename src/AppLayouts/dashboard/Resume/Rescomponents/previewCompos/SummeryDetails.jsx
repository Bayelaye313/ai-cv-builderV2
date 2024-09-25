import React, { useContext } from "react";
import { InfosContext } from "@/HandleContext/InfosContext";

function SummeryDisplay() {
  const { resumeInfos } = useContext(InfosContext);

  return (
    <p className="text-xs">{resumeInfos?.summery || "No summary available"}</p>
  );
}

export default SummeryDisplay;

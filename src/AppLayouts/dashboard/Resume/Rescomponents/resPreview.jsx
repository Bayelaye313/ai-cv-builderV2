import React, { useContext, useEffect } from "react";
import PersoDetails from "./previewCompos/PersoDetails";
import ProfExpDetails from "./previewCompos/ProfExpDetails";
import EducationnalDetails from "./previewCompos/EducationnalDetails";
import SkillsDetails from "./previewCompos/SkillsDetails";
import { InfosContext } from "@/HandleContext/InfosContext";
import SummeryDisplay from "./previewCompos/SummeryDetails";

function ResPreview() {
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  // console.log("resumeInfosprev:", resumeInfos);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // console.log("Loaded data from localStorage:", parsedData);
      setResumeInfos(parsedData);
    }
  }, [setResumeInfos]);

  if (!Object.keys(resumeInfos).length) {
    return <div>Loading data...</div>;
  }
  // console.log("Current resumeInfos in ResPreview:", resumeInfos);
  return (
    <div
      className="shadow-lg h-full mt-20 p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfos?.themeColor,
      }}
    >
      <PersoDetails resumeInfos={resumeInfos} />
      <SummeryDisplay resumeInfos={resumeInfos} />
      <ProfExpDetails resumeInfos={resumeInfos} />
      <EducationnalDetails resumeInfos={resumeInfos} />
      <SkillsDetails resumeInfos={resumeInfos} />
    </div>
  );
}

export default ResPreview;

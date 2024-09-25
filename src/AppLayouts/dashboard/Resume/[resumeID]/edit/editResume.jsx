import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../Rescomponents/formSection";
import ResPreview from "../../Rescomponents/resPreview";
import GlobalApi from "./../../../../../../services/GlobalApi";
import { InfosProvider } from "@/HandleContext/InfosContext";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfos, setResumeInfos] = useState(null);

  useEffect(() => {
    const storedResumeInfos = JSON.parse(localStorage.getItem("resumeInfos"));
    if (storedResumeInfos) {
      setResumeInfos(storedResumeInfos);
    } else {
      fetchResumeInfos();
    }
  }, []);

  const fetchResumeInfos = async () => {
    try {
      const response = await GlobalApi.GetResumeById(resumeId);
      const fetchedData = response.data.data;

      setResumeInfos(fetchedData);
      localStorage.setItem("resumeInfos", JSON.stringify(fetchedData));
    } catch (error) {
      console.error("Failed to fetch resume info:", error);
    }
  };

  return (
    <InfosProvider value={{ resumeInfos, setResumeInfos }}>
      <div className="grid grid-cols-2 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResPreview />
      </div>
    </InfosProvider>
  );
}

export default EditResume;

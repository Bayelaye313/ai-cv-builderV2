import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InfosContext } from "@/HandleContext/InfosContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../services/GlobalApi";
import { LoaderCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import { AiChatSession } from "../../../../../../services/geminiModal";

const summeryPrompt =
  "Job Title: {jobTitle}, Based on this job title, provide a list of summary options for 3 experience levels: Senior, Mid Level, and Junior, formatted as an array with fields 'summary' and 'experience_level' in JSON format.";

function SummeryDetails({ ActiveNext }) {
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  const [summeryData, setSummeryData] = useState("");
  const [aiSummeryList, setAiSummeryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (resumeInfos) {
      setSummeryData(resumeInfos.summery || "");
    }
  }, [resumeInfos]);

  useEffect(() => {
    // Check if the change is meaningful before updating the state
    if (resumeInfos?.summery !== summeryData && summeryData !== "") {
      const updatedResumeInfos = { ...resumeInfos, summery: summeryData };
      setResumeInfos(updatedResumeInfos);
      localStorage.setItem("resumeInfos", JSON.stringify(updatedResumeInfos));
    }
    // Add resumeInfos to the dependency array to avoid stale values
  }, [summeryData, resumeInfos]);

  const generateSummeryFromAI = async () => {
    setAiLoading(true);
    ActiveNext(false);
    const prompt = summeryPrompt.replace(
      "{jobTitle}",
      resumeInfos?.jobTitle || "your position"
    );

    try {
      const result = await AiChatSession.sendMessage(prompt);
      const parsedResult = JSON.parse(result.response.text());
      setAiSummeryList(parsedResult);
    } catch (error) {
      toast.error("Failed to generate AI summary");
    } finally {
      setAiLoading(false);
    }
  };

  const saveSummery = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Récupérer l'ID à partir du resumeId
      const response = await GlobalApi.GetResumeByResumeId(params?.resumeId);
      const resumeId = response?.data?.data[0]?.id; // Assure-toi qu'il y a une donnée retournée

      if (resumeId) {
        const data = { data: { summery: summeryData } };
        await GlobalApi.UpdateResumeDetail(resumeId, data);
        toast.success("Summary updated successfully");
        setResumeInfos({ ...resumeInfos, summery: summeryData });
        localStorage.setItem(
          "resumeInfos",
          JSON.stringify({ ...resumeInfos, summery: summeryData })
        );
        ActiveNext(true);
      } else {
        toast.error("Resume not found");
      }
    } catch (error) {
      toast.error("Failed to update summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p className="text-sm text-gray-600">
        Add a professional summary to enhance your resume.
      </p>

      <form className="mt-6" onSubmit={saveSummery}>
        <div className="flex justify-between items-center mb-4">
          <label className="font-semibold text-sm">Your Summary</label>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-primary"
            onClick={generateSummeryFromAI}
            disabled={aiLoading}
          >
            {aiLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Zap color="#0000ff" className="w-4 h-4" />
            )}
            {aiLoading ? "Generating..." : "AI Generate Summary"}
          </Button>
        </div>

        <Textarea
          value={summeryData}
          onChange={(e) => setSummeryData(e.target.value)}
          placeholder="Enter your resume summary..."
          className="mt-2"
        />

        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {aiSummeryList.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg">AI Suggestions</h3>
          {aiSummeryList.map((summary, index) => (
            <div
              key={index}
              className="p-4 shadow-md rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer mt-3"
              onClick={() => setSummeryData(summary?.summary)}
            >
              <h4 className="font-semibold text-primary mb-1">
                Experience Level: {summary?.experience_level}
              </h4>
              <p className="text-sm">{summary?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SummeryDetails;

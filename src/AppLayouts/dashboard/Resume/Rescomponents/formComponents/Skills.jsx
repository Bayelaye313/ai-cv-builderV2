import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "./../../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { InfosContext } from "@/HandleContext/InfosContext";

function Skills({ ActiveNext }) {
  const { resumeId } = useParams();
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);

  // Récupérer les compétences à partir du localStorage si elles existent
  const initialSkills = JSON.parse(localStorage.getItem("skillsList")) ||
    resumeInfos?.skills || [
      {
        name: "",
        rating: 0,
      },
    ];

  const [skillsList, setSkillsList] = useState(initialSkills);
  const [loading, setLoading] = useState(false);

  // Synchroniser les compétences avec le localStorage
  useEffect(() => {
    if (skillsList && skillsList.length > 0) {
      localStorage.setItem("skillsList", JSON.stringify(skillsList));
    }
  }, [skillsList]);

  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem("skillsList"));

    if (savedSkills && savedSkills.length > 0) {
      setSkillsList(savedSkills);
    } else if (resumeInfos?.skills && resumeInfos.skills.length > 0) {
      setSkillsList(resumeInfos.skills);
    }
  }, [resumeInfos]);

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList((skillsList) => skillsList.slice(0, -1));
    } else {
      toast("At least one skill must be present.");
    }
  };

  const onSave = async () => {
    setLoading(true);

    try {
      // Récupérer l'ID à partir du resumeId
      const response = await GlobalApi.GetResumeByResumeId(resumeId);
      const resumeIdInternal = response?.data?.data[0]?.id;

      if (resumeIdInternal) {
        const data = {
          data: {
            skills: skillsList.map(({ id, ...rest }) => rest),
          },
        };

        await GlobalApi.UpdateResumeDetail(resumeIdInternal, data);
        setLoading(false);
        ActiveNext(true);
        localStorage.setItem("skillsList", JSON.stringify(skillsList));
        toast.success("Skills updated!");

        setResumeInfos((prev) => ({
          ...prev,
          skills: skillsList,
        }));
      } else {
        toast.error("Resume not found");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to update skills", error);
      toast.error("Failed to update skills");
    }
  };

  useEffect(() => {
    // Ne mettre à jour le contexte que si les compétences sont différentes
    if (JSON.stringify(resumeInfos?.skills) !== JSON.stringify(skillsList)) {
      setResumeInfos((prevInfos) => ({
        ...prevInfos,
        skills: skillsList,
      }));
    }
  }, [skillsList, resumeInfos, setResumeInfos]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between mb-2 border rounded-lg p-3 "
          >
            <div>
              <label className="text-xs">Name</label>
              <input
                className="w-full"
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;

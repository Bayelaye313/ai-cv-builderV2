import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { InfosContext } from "@/HandleContext/InfosContext";
import PersonalDetails from "./formComponents/PersonalDetails";
import SummeryDetails from "./formComponents/SummeryDetails";
import Education from "./formComponents/Education";
import Skills from "./formComponents/Skills";
import Experience from "./formComponents/ExperienceDetails";
import ProgressTracker from "@/components/customs/ProgressTracker";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeColor from "./ThemeColor";
import HomePage from "@/AppLayouts/home/homePage";

function FormSection() {
  const { resumeId } = useParams();
  const navigation = useNavigate();

  const { resumeInfos } = useContext(InfosContext);
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("resumeStep");
    return savedStep ? JSON.parse(savedStep) : 1;
  });
  const [ActiveNext, setActiveNext] = useState(false);

  const steps = [
    "Contact",
    "Summary",
    "Experience",
    "Education",
    "Skills",
    "Preview",
  ];

  useEffect(() => {
    localStorage.setItem("resumeStep", JSON.stringify(step));
  }, [step]);

  return (
    <div>
      <ProgressTracker steps={steps} currentStep={step} />
      <div className="flex mb-4 my-4 justify-between ">
        <div className="flex gap-5 ">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex justify-end gap-2 ">
          {step > 1 && (
            <Button
              className="flex gap-2"
              size="sm"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft /> Prev
            </Button>
          )}
          <Button
            disabled={!ActiveNext}
            size="sm"
            onClick={() => setStep(step + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {step === 1 && <PersonalDetails ActiveNext={(e) => setActiveNext(e)} />}
      {step === 2 && <SummeryDetails ActiveNext={(e) => setActiveNext(e)} />}
      {step === 3 && <Experience ActiveNext={(e) => setActiveNext(e)} />}
      {step === 4 && <Education ActiveNext={(e) => setActiveNext(e)} />}
      {step === 5 && <Skills ActiveNext={(e) => setActiveNext(e)} />}
      {step === 6 && (
        <div>
          <Button
            size="sm"
            onClick={() => navigation(`/viewMyResume/${resumeId}/viewResume`)}
          >
            Finish and View Resume
          </Button>
        </div>
      )}{" "}
    </div>
  );
}

export default FormSection;

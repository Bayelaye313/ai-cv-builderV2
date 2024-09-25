import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/addResume";
import { useEffect, useState } from "react";
import GlobalApi from "../../../services/GlobalApi";
import ResumeCards from "./components/ResumeCards";
import { LoaderCircle } from "lucide-react";

function DashboardPage() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress; // Destructure for clarity
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (userEmail) {
      fetchResumes(); // Separate function to avoid side effects in useEffect
    }
  }, [userEmail]);

  const fetchResumes = async () => {
    setLoading(true); // Start loading
    try {
      const resp = await GlobalApi.GetUserResumes(userEmail);
      setResumeList(resp.data.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-8 md:px-20 lg:px-32">
      <h1 className="font-bold text-lg">Your Resumes</h1>
      <p className="text-sm text-muted-foreground">
        Tailor your resume for every job application to increase your chances of
        success.
      </p>

      <div
        className="grid grid-cols-1 
                      md:grid-cols-2 
                      lg:grid-cols-3 
                      mt-10 gap-4"
      >
        <AddResume />
        {loading ? (
          <div className="flex justify-center items-center col-span-full">
            <LoaderCircle className="animate-spin w-10 h-10 text-primary" />
          </div>
        ) : resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCards
              resume={resume}
              key={index}
              refreshData={fetchResumes}
            />
          ))
        ) : (
          [1, 2, 3, 4].map((item, index) => (
            <div className="h-[280px] rounded-lg bg-slate-200 animate-pulse"></div>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

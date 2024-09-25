import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResPreview from "@/AppLayouts/dashboard/Resume/Rescomponents/resPreview";
import Header from "@/components/customs/header";
import { Button } from "@/components/ui/button";
import { RWebShare } from "react-web-share";
import { InfosContext } from "@/HandleContext/InfosContext"; // Importer InfosContext

function ViewResume() {
  const { resumeInfos } = useContext(InfosContext); // Récupérer les données du contexte
  const { resumeId } = useParams();

  // Si tu as besoin de récupérer des données supplémentaires par l'ID, tu peux garder cette partie, sinon tu peux l'ignorer
  useEffect(() => {
    // Si tu veux éventuellement récupérer d'autres infos en fonction de l'ID
  }, [resumeId]);

  const HandleDownload = () => {
    window.print();
  };

  // Assurez-vous que `resumeInfos` est disponible
  if (!resumeInfos || !resumeInfos.firstName || !resumeInfos.lastName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="no-printed">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your AI-generated resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you can download your resume or share the URL with friends and
            family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Everyone, this is my resume. Please open the URL to view it.",
                url: `${
                  import.meta.env.VITE_API_BASE_URL
                }/viewMyResume/${resumeId}/viewResume`,
                title: `${resumeInfos.firstName} ${resumeInfos.lastName}'s resume`, // Utiliser les données du contexte
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="printed">
          <ResPreview />
        </div>
      </div>
    </div>
  );
}

export default ViewResume;

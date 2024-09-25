import React from "react";

function PersoDetails({ resumeInfos }) {
  return (
    <div>
      <h2
        className="text-center text-xl font-bold"
        style={{
          color: resumeInfos?.themeColor,
        }}
      >
        {resumeInfos?.firstName || "First Name"}{" "}
        {resumeInfos?.lastName || "Last Name"}
      </h2>
      <h2 className="text-center text-xs font-medium">
        {resumeInfos?.jobTitle || "Job Title"}
      </h2>
      <h2
        className="text-center text-xs font-normal"
        style={{
          color: resumeInfos?.themeColor,
        }}
      >
        {resumeInfos?.address || "Address"}
      </h2>
      <div className="flex justify-between">
        <h2
          className="text-xs font-normal"
          style={{
            color: resumeInfos?.themeColor,
          }}
        >
          {resumeInfos?.phone || "Phone"}
        </h2>
        <h2
          className="text-xs font-normal"
          style={{
            color: resumeInfos?.themeColor,
          }}
        >
          {resumeInfos?.email || "Email"}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfos?.themeColor,
        }}
      />
    </div>
  );
}

export default PersoDetails;

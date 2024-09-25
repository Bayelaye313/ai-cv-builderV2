import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import GlobalApi from "./../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { InfosContext } from "@/HandleContext/InfosContext";

function ThemeColor() {
  // Define the available theme colors
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  // Get the resume information and the method to update it
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  const [selectedColor, setSelectedColor] = useState(
    resumeInfos?.themeColor || ""
  );
  const { resumeId } = useParams();

  // Handle color selection and update resumeInfos and backend
  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfos({
      ...resumeInfos,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };
    // Call backend API to update the theme color for the resume
    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        console.log(resp);
        toast("Theme Color Updated");
      },
      (error) => {
        console.error("Failed to update theme color", error);
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        {/* Render the color selection grid */}
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
                 hover:border-black border
                 ${selectedColor === item ? "border border-black" : ""}
              `}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;

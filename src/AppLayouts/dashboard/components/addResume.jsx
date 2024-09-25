import { Loader2, PlusSquare, X } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../../services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then(
      (resp) => {
        if (resp) {
          setLoading(false);
          setOpenDialog(false); // Close dialog after creation
          navigation("/dashboard/resume/" + uuid + "/edit");
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div
        className="p-14 py-24 border border-blue-600
        items-center flex flex-col
        justify-center bg-secondary
        rounded-lg h-[300px] w-[250px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed "
        onClick={() => setOpenDialog(true)}
      >
        <div className="p-2">
          <PlusSquare color="#fff" className="bg-primary w-8 h-8 rounded-sm" />
        </div>
        <div className="py-2">
          <h2 className="font-bold text-lg mb-2">Create a New Resume</h2>
          <p>
            It's recommended to customize a resume for each job application.
          </p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Resume</DialogTitle>
            <DialogClose asChild>
              {/* <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                <X className="w-6 h-6" />
              </Button> */}
            </DialogClose>
            <DialogDescription>
              <p>Please provide a title for your new resume to get started.</p>
              <Input
                className="my-2"
                placeholder="e.g., Frontend Developer Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5 mt-4">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;

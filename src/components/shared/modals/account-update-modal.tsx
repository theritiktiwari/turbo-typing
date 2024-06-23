"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface DataProps {
  instagramUsername: string;
  linkedinUsername: string;
  twitterUsername: string;
  website: string;
}

interface UpdateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: DataProps;
  setData: React.Dispatch<React.SetStateAction<DataProps>>;
}

export const UpdateAccountModal: React.FC<UpdateAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data,
  setData,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={"Update Account"}
      description={`Make changes for your account here.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid gap-4 py-4">

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="instagram-username" className="w-full">Instagram Username</Label>
            <Input
              id="instagram-username"
              defaultValue={data?.instagramUsername}
              className="col-span-3"
              onChange={(e) => setData({ ...data, instagramUsername: e.target.value })}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="linkedin-username" className="w-full">LinkedIn Username</Label>
            <Input
              id="linkedin-username"
              defaultValue={data?.linkedinUsername}
              className="col-span-3"
              onChange={(e) => setData({ ...data, linkedinUsername: e.target.value })}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="twitter-username" className="w-full">Twitter Username</Label>
            <Input
              id="twitter-username"
              defaultValue={data?.twitterUsername}
              className="col-span-3"
              onChange={(e) => setData({ ...data, twitterUsername: e.target.value })}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="website" className="w-full">Website Link</Label>
            <Input
              id="website"
              defaultValue={data?.website}
              className="col-span-3"
              onChange={(e) => setData({ ...data, website: e.target.value })}
            />
          </div>

        </div>
      </div>
      <DialogFooter>
        <Button disabled={loading} type="submit" onClick={onConfirm}>
          {loading ? "Processing..." : "Update Account"}
        </Button>
      </DialogFooter>
    </Modal >
  );
};
"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  type: string;
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  usernameError: string | null;
  usernameDescription: string | null;
  handleUsernameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  type,
  data,
  setData,
  usernameError,
  usernameDescription,
  handleUsernameChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  let title, description, action;
  if (type === "IMPORT_SETTINGS") {
    title = "Import Settings";
    description = "Paste the JSON settings here to import.";
    action = "Import Settings";
  }

  if (type === "USERNAME") {
    title = "Edit Username";
    description = "Change your username here.";
    action = "Save Username";
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // regex with alphanumeric characters and underscore only to validate username
    if (!/^[a-zA-Z0-9_]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Modal
      title={title ?? ""}
      description={`${description ?? "Make changes for your settings here."} Click save when you're done.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid gap-4 py-4">

        {type === "USERNAME" && <div className="flex flex-col gap-2">
          <Input
            id="username"
            defaultValue={data}
            className="col-span-3"
            onChange={handleUsernameChange}
            onKeyDown={handleKeyPress}
          />
          {usernameDescription && <p className="text-sm text-success">{usernameDescription}</p>}
          {usernameError && <p className="text-sm text-destructive">{usernameError}</p>}
        </div>}

        {type === "IMPORT_SETTINGS" && <div className="flex-between gap-4">
          <Input
            id="import-settings"
            className="col-span-3"
            onChange={(e) => setData(e.target.value)}
          />
        </div>}

      </div>
      <DialogFooter>
        <Button disabled={loading} type="submit" onClick={onConfirm}>
          {loading ? "Processing..." : action}
        </Button>
      </DialogFooter>
    </Modal >
  );
};
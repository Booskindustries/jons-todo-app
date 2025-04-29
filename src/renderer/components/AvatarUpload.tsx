import React, { useState } from "react";
import { accountService } from "@/services/account.renderer.service";
import { Button } from '@/components/ui/button'

const AvatarUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  const handleSelectAndUpload = async () => {
    setUploading(true);

    try {
      // Open the file picker dialog
      const filePath = await accountService.selectFile();
      console.log("Selected file path:", filePath);

      // Upload the selected file
      const savedPath = await accountService.uploadAvatar(filePath);
      setAvatarPath(savedPath); // Update the avatar path in the state
      console.log("Avatar uploaded to:", savedPath);
    } catch (error) {
      console.error("Error selecting or uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {avatarPath && (
        <img
          src={`file://${avatarPath}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
      )}
      <Button
        onClick={handleSelectAndUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Select and Upload"}
      </Button>
    </div>
  );
};

export default AvatarUpload;
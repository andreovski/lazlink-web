import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { FaCamera } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const AvatarUpload = ({
  className = "",
  name,
}: {
  className?: string;
  name: string;
}) => {
  const form = useFormContext();
  const { avatarUrl } = form.getValues();

  const [avatar, setAvatar] = useState<string | null>(avatarUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (form) {
        form.setValue(name, file);
      }
    }
  };

  return (
    <div className="avatar-upload">
      <label htmlFor="avatar-input">
        <Avatar className={className}>
          <AvatarImage
            className="cursor-pointer"
            src={avatar || ""}
            alt="User Avatar"
          />
          <AvatarFallback className="cursor-pointer bg-primary">
            <FaCamera className="text-white" />
          </AvatarFallback>
        </Avatar>
      </label>
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AvatarUpload;

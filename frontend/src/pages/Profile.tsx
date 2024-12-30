import React from "react";
import { ProfilePictureCard } from "../components/profile/ProfilePictureCard";
import { ProfileInfoCard } from "../components/profile/ProfileInfoCard";
import { ReportAnalytics } from "../components/profile/ReportAnalytics";

export const Profile = () => {
  return (
    <div className="mt-10 flex justify-center gap-4">
      <ProfilePictureCard />
      <ProfileInfoCard />
      <ReportAnalytics />
    </div>
  );
};

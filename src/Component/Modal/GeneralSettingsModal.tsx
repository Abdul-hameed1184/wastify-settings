import React from "react";
import { PiBuildingsLight, PiEnvelopeSimpleLight, PiDeviceMobileLight, PiMapPinLight } from "react-icons/pi";
import { Modal } from "./Modal";

type GeneralSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onEdit: () => void;
  onResetPassword: () => void;
};

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value?: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="flex items-center gap-2 text-gray-500">
      {icon}
      {label}
    </span>
    <span className="text-gray-900 font-medium">{value || "-"}</span>
  </div>
);

export const GeneralSettingsModal: React.FC<GeneralSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onEdit,
  onResetPassword,
}) => {
  const address =
    profile?.address ||
    [profile?.wardName, profile?.lgaName, profile?.stateName].filter(Boolean).join(", ");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      drawer
      title="General Settings"
      footer={
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg bg-green px-6 py-3 text-black hover:opacity-90"
          >
            Edit Details
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-5 py-2">
        <div className="h-20 w-20 overflow-hidden rounded-xl border border-gray-200">
          {profile?.imgUrl && (
            <img src={profile.imgUrl} alt="Logo" className="h-full w-full object-cover" />
          )}
        </div>

        <DetailItem icon={<PiBuildingsLight />} label="Business Name" value={profile?.businessName} />
        <DetailItem icon={<PiEnvelopeSimpleLight />} label="Email" value={profile?.email} />
        <DetailItem icon={<PiDeviceMobileLight />} label="Phone" value={profile?.phone} />
        <DetailItem icon={<PiMapPinLight />} label="Address" value={address} />

        <button
          type="button"
          onClick={onResetPassword}
          className="w-full rounded-lg border border-green py-3 text-gray-900 hover:bg-green/10"
        >
          Reset Password
        </button>
      </div>
    </Modal>
  );
};

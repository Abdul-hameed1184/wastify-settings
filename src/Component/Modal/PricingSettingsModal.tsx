import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "./Modal";

type PricingSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Mode = "automatic" | "manual";

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (val: boolean) => void }> = ({
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-900">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition-colors ${checked ? "bg-green" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  </div>
);

const ModeSelect: React.FC<{ label: string; value: Mode; onChange: (val: Mode) => void }> = ({
  label,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-900">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Mode)}
      className="h-14 w-full rounded-lg border border-gray-300 bg-white px-4 focus:border-green focus:outline-none focus:ring-1 focus:ring-green/50"
    >
      <option value="automatic">Automatically</option>
      <option value="manual">Manually</option>
    </select>
  </div>
);

export const PricingSettingsModal: React.FC<PricingSettingsModalProps> = ({ isOpen, onClose }) => {
  const [paymentReminderSms, setPaymentReminderSms] = useState(true);
  const [overdueAlertSms, setOverdueAlertSms] = useState(true);
  const [paymentReminderMode, setPaymentReminderMode] = useState<Mode>("automatic");
  const [overdueAlertMode, setOverdueAlertMode] = useState<Mode>("automatic");

  const handleSave = () => {
    // TODO: persist { paymentReminderSms, overdueAlertSms, paymentReminderMode, overdueAlertMode } once the API endpoint exists
    toast.success("Pricing settings updated");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      drawer
      title="Pricing Settings"
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
            onClick={handleSave}
            className="rounded-lg bg-green px-6 py-3 text-black hover:opacity-90"
          >
            Update Details
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pt-2">
        <Toggle label="Payment Reminder SMS" checked={paymentReminderSms} onChange={setPaymentReminderSms} />
        <Toggle label="Overdue Alert SMS" checked={overdueAlertSms} onChange={setOverdueAlertSms} />
        <ModeSelect label="Payment Reminder Mode" value={paymentReminderMode} onChange={setPaymentReminderMode} />
        <ModeSelect label="Overdue Alert Mode" value={overdueAlertMode} onChange={setOverdueAlertMode} />
      </div>
    </Modal>
  );
};

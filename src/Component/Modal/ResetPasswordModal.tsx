import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Modal } from "./Modal";
import Input from "../InputField";
import { changeOperatorPassword } from "../../api/auth.service";
import { logout } from "../../Features/authSlice";

type ResetPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FieldName = "oldPassword" | "password" | "password_confirmation";

const fields: { name: FieldName; label: string; placeholder: string }[] = [
  { name: "oldPassword", label: "Current Password", placeholder: "Enter current password" },
  { name: "password", label: "New Password", placeholder: "Input new password" },
  { name: "password_confirmation", label: "Confirm New Password", placeholder: "Input new password" },
];

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, userId }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<Record<FieldName, boolean>>({
    oldPassword: false,
    password: false,
    password_confirmation: false,
  });

  const handleLogout = () => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      sessionStorage.removeItem("AUTH_ADMIN_DETAILS");
      sessionStorage.removeItem("SESSION_AUTH_TOKEN");
      navigate("/operator-login");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      drawer
      title="Reset Password"
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
            type="submit"
            form="reset-password-form"
            className="rounded-lg bg-green px-6 py-3 text-black hover:opacity-90"
          >
            Update Password
          </button>
        </div>
      }
    >
      <Formik
        initialValues={{ userId, oldPassword: "", password: "", password_confirmation: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await changeOperatorPassword(values);
            resetForm();
            handleLogout();
            toast.success("Password successfully changed");
          } catch (e: any) {
            console.log(e);
            toast.error(e?.response?.data?.error || "Error changing password");
          }
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form id="reset-password-form" className="flex flex-col gap-1">
            {fields.map(({ name, label, placeholder }) => (
              <div key={name} className="flex flex-col gap-2">
                <label htmlFor={name} className="text-gray-900">{label}</label>
                <div className="relative">
                  <Input
                    id={name}
                    name={name}
                    type={visible[name] ? "text" : "password"}
                    placeholder={placeholder}
                    value={values[name]}
                    onChange={handleChange}
                    error={touched[name] && errors[name]}
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setVisible((v) => ({ ...v, [name]: !v[name] }))}
                    aria-label={visible[name] ? `Hide ${label}` : `Show ${label}`}
                    className="absolute right-4 top-7 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {visible[name] ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
            ))}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};


import { useCallback, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "./Modal";
import Input from "../InputField";
import { Button } from "../Button";
import { ICustomer } from "../../models/customer.interface";
import { changeCustomerPassword } from "../../api/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Features/authSlice";

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  customer: ICustomer
};

const validationSchema = Yup.object().shape({
    confirmationId: Yup.string(),
  oldPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const ChangePasswordModal = ({ isOpen, onClose,  customer }: ChangePasswordModalProps) => {
  // per-field visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // master toggle
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate()
    const handleLogout = useCallback(() => {
      const isLoggedOut = logout();
      if (isLoggedOut) {
        sessionStorage.removeItem("AUTH_USERDETAILS");
        sessionStorage.removeItem("SESSION_AUTH_TOKEN");
        navigate("/login");
      }
    }, [navigate]);

  const toggleAll = (val: boolean) => {
    setShowAll(val);
    setShowCurrent(val);
    setShowNew(val);
    setShowConfirm(val);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <div className="w-full max-w-md">
        <Formik
          initialValues={{ customerId: customer.customerId,oldPassword: "", password: "", password_confirmation: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try{
            await changeCustomerPassword(values)
            resetForm();

            handleLogout();
            toast.success("Password successfully change");

            }catch(e){
              console.log(e)
              toast.error(e.response.data.error)
            }
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col gap-4">
              {/* Master show toggle */}
              <div className="flex items-center justify-end gap-2">
                <label className="inline-flex items-center text-sm text-gray-600 select-none">
                  <input
                    type="checkbox"
                    checked={showAll}
                    onChange={(e) => toggleAll(e.target.checked)}
                    className="mr-2 h-4 w-4 rounded border-gray-300"
                    aria-label="Show all passwords"
                  />
                  Show passwords
                </label>
              </div>

              {/* Current Password */}
              <div className="relative">
                <label htmlFor="current" className="text-gray-700 font-semibold text-sm">
                  Current Password
                </label>
                <Input
                  name="oldPassword"
                  type={showCurrent ? "text" : "password"}
                  value={values.oldPassword}
                  onChange={handleChange}
                  className="pr-10" // reserve space for the eye button
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((s) => !s)}
                  aria-label={showCurrent ? "Hide current password" : "Show current password"}
                  className="absolute right-2 top-8 h-8 w-8 rounded-md grid place-items-center text-gray-600 hover:bg-gray-100"
                >
                  {showCurrent ? (
                    // eye-off icon
                    <FaRegEyeSlash />
                  ) : (
                    // eye icon
                    <FaRegEye />
                  )}
                </button>

                <ErrorMessage
                  name="oldPssword"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* New Password */}
              <div className="relative">
                <label htmlFor="password" className="text-gray-700 font-semibold text-sm">
                  New Password
                </label>
                <Input
                  name="password"
                  type={showNew ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((s) => !s)}
                  aria-label={showNew ? "Hide new password" : "Show new password"}
                  className="absolute right-2 top-8 h-8 w-8 rounded-md grid place-items-center text-gray-600 hover:bg-gray-100"
                >
                  {showNew ? (
                   <FaRegEyeSlash />
                  ) : (
                   <FaRegEye />
                  )}
                </button>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="password_confirmation" className="text-gray-700 font-semibold text-sm">
                  Confirm Password
                </label>
                <Input

                  name="password_confirmation"
                  type={showConfirm ? "text" : "password"}
                  value={values.password_confirmation}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  className="absolute right-2 top-8 h-8 w-8 rounded-md grid place-items-center text-gray-600 hover:bg-gray-100"
                >
                  {showConfirm ? (
                   <FaRegEyeSlash />
                  ) : (
                   <FaRegEye />
                  )}
                </button>

                <ErrorMessage
                  name="password_confirmation"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-between gap-3">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="danger"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="rounded-lg bg-green px-4 py-2 text-sm text-white px-12 hover:bg-green-200"
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

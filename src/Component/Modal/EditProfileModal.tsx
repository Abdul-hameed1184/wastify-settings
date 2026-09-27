import React, { useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Modal } from "./Modal";
import Input from "../InputField";
import { updateProfile } from "../../api/psp-operator/psp-operator.service";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  userId: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, profile, userId }) => {
  const queryClient = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);

  const [firstName, ...rest] = (profile?.businessName || "").split(" ");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      drawer
      title="Edit Profile"
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
            form="edit-profile-form"
            className="rounded-lg bg-green px-6 py-3 text-black hover:opacity-90"
          >
            Update Details
          </button>
        </div>
      }
    >
      <Formik
        enableReinitialize
        initialValues={{
          firstName: firstName || "",
          lastName: rest.join(" "),
          email: profile?.email || "",
          phone: profile?.phone || "",
          imgUrl: null as File | null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const formData = new FormData();
          formData.append("businessName", `${values.firstName} ${values.lastName}`.trim());
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          if (values.imgUrl) formData.append("imgUrl", values.imgUrl);
          try {
            await updateProfile(userId, formData);
            toast.success("Profile Updated successfully");
            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            onClose();
          } catch (e) {
            console.log(e);
            toast.error("Error updating profile");
          }
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form id="edit-profile-form" className="flex flex-col gap-1">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-2xl text-gray-500">
                {values.imgUrl ? (
                  <img src={URL.createObjectURL(values.imgUrl)} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <MdOutlineCloudUpload />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Upload your picture</p>
                <p className="text-sm text-gray-500">
                  {values.imgUrl ? values.imgUrl.name : "Jpg, Png, Jpeg format • Max. 5MB"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                aria-label="Upload picture"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-green text-2xl text-black hover:opacity-90"
              >
                <MdOutlineCloudUpload />
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (!file) return;
                  if (file.size > MAX_FILE_SIZE) {
                    toast.error("Image must be 5MB or less");
                    return;
                  }
                  setFieldValue("imgUrl", file);
                }}
              />
            </div>

            <Input
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && errors.lastName}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && errors.email}
            />
            <Input
              label="Phone Number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              error={touched.phone && errors.phone}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

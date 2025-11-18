import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import  Input  from "./InputField";
import { ICustomer } from "../models/customer.interface";
import { Button } from "./Button";
import { MdCancel, MdOutlineCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { IOperator } from "../models/operator.interface";

type ProfileFormProps = {
  submitProfile: (data: FormData) => Promise<void>;
  user: IOperator;
  handleEdit: () => void;
};

export const OperatorProfileForm: React.FC<ProfileFormProps> = ({

  submitProfile,
  user,
  handleEdit,
}) => {
  const initialValues = {
    imgUrl: null as File | null,
    phone: user?.phone || "",
    businessName: user.businessName || "",
    email: user?.email || "",
  };

  const validationSchema = Yup.object({
    businessName: Yup.string().required("Business name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone must be 11 digits")
      .required("Phone is required"),
    email: Yup.string().email("Invalid email").nullable(),
  });

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
        <MdCancel
          className="text-red-600 text-2xl cursor-pointer hover:text-red-800 transition"
          onClick={handleEdit}
          title="Cancel edit"
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append("businessName", values.businessName);
            formData.append("phone", values.phone);
            formData.append("email", values.email);
            formData.append("_method", "PUT");
            if (values.imgUrl) formData.append("imgUrl", values.imgUrl);

            submitProfile(formData).then(x =>     toast.success("Profile updated successfully"))
            .catch(e => toast.error("Error updating your profile"));
        
            handleEdit();
          } catch (e) {
            console.error(e);
            toast.error("Error updating your profile");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="space-y-5">
            {/* Upload Box */}
            <div className="relative flex flex-col items-center">
              <label
                htmlFor="photo"
                aria-label="Upload profile photo"
                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                {values.imgUrl ? (
                  <img
                    src={URL.createObjectURL(values.imgUrl)}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full shadow-sm"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <MdOutlineCloudUpload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (max. 5MB)</p>
                  </div>
                )}

                <input
                  id="photo"
                  type="file"
                  name="imgUrl"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("imgUrl", e.currentTarget.files?.[0] || null)
                  }
                  className="hidden"
                />
              </label>
            </div>


            <div>
              <label htmlFor="businessName" className="text-gray-700 font-medium">
                Firstname
              </label>
              <Input
                type="text"
                name="businessName"
                value={values.businessName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Business Name"
                error={touched.businessName && errors.businessName}
              />
            </div>


            <div>
              <label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </label>
              <Input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Phone Number"
                error={touched.phone && errors.phone}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email (Optional)"
                error={touched.email && errors.email}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              loading={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

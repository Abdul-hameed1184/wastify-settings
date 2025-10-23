import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "./InputField";
import { ICustomer } from "../models/customer.interface";
import { Button } from "./Button";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Profile from "../Pages/UserProfile/Profile";

type ProfileFormProps = {
  submitProfile: (data: any) => Promise<void>;
  user: ICustomer;
  profileX: { totalBills: number, totalApartment: number, customerFullname: string}
  handleEdit: () => void;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({profileX, submitProfile, user, handleEdit }) => {
  const names = profileX.customerFullname.split(' ');
  console.log(names)
  const initialValues = {
    phone: user?.phone || "",
    lastname: names[1] || "",
    firstname: names[0] || "",
    email: user?.email || "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone must be 11 digits")
      .required("Phone is required"),
    email: Yup.string().email("Invalid email").nullable(),
  });

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex justify-between items-center">
        <span>Update Profile</span>
        <MdCancel className="text-red-800 cursor-pointer" onClick={handleEdit} />
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await submitProfile(values);
            // toast.success("Profile updated successfully");
            handleEdit();
          } catch (e) {
            console.error(e);
            toast.error("Error updating your profile");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="firstname" className="text-gray font-semibold">Firstname</label>
              <Input
                type="text"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                error={touched.firstname && errors.firstname}
              />
            </div>

            <div>
              <label htmlFor="lastname" className="text-gray font-semibold">Lastname</label>
              <Input
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
                error={touched.lastname && errors.lastname}
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-gray font-semibold">Phone number</label>
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
              <label className="text-gray font-semibold" htmlFor="email">Email</label>
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

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              loading={isSubmitting}
              className="w-full"
            >
              Update Profile
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

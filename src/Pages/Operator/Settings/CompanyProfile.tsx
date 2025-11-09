import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../../Component/Button";
import { IOperator } from "../../../models/operator.interface";
import { getProfile } from "../../../api/psp-operator/psp-operator.service";
import { Input } from "../../../Component/InputField";
import { FaBusinessTime } from "react-icons/fa";
import Loader from "../../../Component/Loader";


const updateProfile = async (formData: FormData) => {
  const { data } = await axios.put("/api/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Validation schema
const validationSchema = Yup.object({
  businessName: Yup.string().required("Business name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});

const CompanyProfile: React.FC = () => {
      const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  const queryClient = useQueryClient();

  // ✅ Fetch user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
        const xy  = await getProfile(operator.userId);
        console.log(xy);
        return xy?.data.data;
    }
  });

  // ✅ Update mutation
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      businessName: profile?.firstName || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      imgUrl: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("businessName", values.businessName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (values.imgUrl) formData.append("imgUrl", values.imgUrl);

      await mutation.mutateAsync(formData);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-md mx-auto p-4 ">
      <h2 className="text-xl font-semibold mb-3">Update Photo and Personal Details</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="photo">Profile Photo</label>
          <input
          id="photo"
            type="file"
            name="imgUrl"
            accept="image/*"
            onChange={(e) => formik.setFieldValue("imgUrl", e.currentTarget.files?.[0])}
            className="block mt-1 bg-primary p-2 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="businessName">Business Name</label>
          <Input
            id="businessName"
            type="text"
            name="businessName"
            value={formik.values.businessName}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full"
            error={formik.touched.businessName && Boolean(formik.errors.businessName)}
          />
        </div>


        <div>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <Input
            id="phone"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            className="border p-2 rounded w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {mutation.isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default CompanyProfile;

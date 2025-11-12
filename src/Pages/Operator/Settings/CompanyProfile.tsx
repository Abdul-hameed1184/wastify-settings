import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../../Component/Button";
import { IOperator } from "../../../models/operator.interface";
import { getProfile } from "../../../api/psp-operator/psp-operator.service";
import  Input from "../../../Component/InputField";
import Loader from "../../../Component/Loader";
import { MdOutlineCloudUpload } from "react-icons/md";


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
      businessName: profile?.businessName || "",
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
        <div className="flex flex-col space-y-2">
  <label
    htmlFor="photo"
    className="text-sm font-medium text-gray-700"
  >
    Profile Photo
  </label>

  <div className="relative flex items-center justify-center w-full">
    <label
      htmlFor="photo"
        aria-label="Upload profile photo"
      className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
    >
      <div className="flex flex-col items-center justify-center py-4">
        <MdOutlineCloudUpload className="text-2xl"/>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (max. 5MB)</p>
      </div>
      <input
        id="photo"
        type="file"
        name="imgUrl"
        accept="image/*"
        onChange={(e) => formik.setFieldValue("imgUrl", e.currentTarget.files?.[0])}
        className="hidden"
      />
    </label>
  </div>
  <div>
    {formik.values.imgUrl && (
      <div className="mt-2 text-sm bg-green rounded-md p-2 w-full text-white">
            {formik.values.imgUrl?.name} - {formik.values.imgUrl?.size} bytes
      </div>
    )}
  </div>
  <div>
    {formik.touched.imgUrl && formik.errors.imgUrl && (
      <div className="text-red-600 text-sm mt-1">{formik.errors.imgUrl}</div>
    )}
  </div>
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
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {mutation.isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default CompanyProfile;

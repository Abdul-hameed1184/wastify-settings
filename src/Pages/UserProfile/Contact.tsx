import React, { useEffect, useState } from "react";
import { IoChevronBack, IoLogoFacebook } from "react-icons/io5";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiCustomerServiceFill, RiTwitterXLine } from "react-icons/ri";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { getCustomerReportPaginatedByCustomer, sendMessage } from "../../api/customer/customer.service";
import Input  from "../../Component/InputField";
import { customerReportSchema } from "../../utils/validators/CustomerReportSchema";
import CustomerReports from "./CustomerReports";
import { IApartment } from "../../models/apartment.interface";
import { ButtonsPrimaryBlack, ButtonsWhite } from "../../Component/Buttons";

// 🔹 Combined Page
const ContactUs: React.FC = () => {
  const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");
  const apartments: IApartment[] = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]") || [];

  const [loading, setLoading] = useState(false);
  const [viewForm, setViewform] = useState(false);
  const [apartmentId, setApartmentId] = useState<number>(apartments[0]?.id || 0);

  useEffect(() => {
    (async () => {
      const data = await getCustomerReportPaginatedByCustomer(customer.customerId);
      console.log("Reports: ", data.data.data);
    })();
  }, [customer.customerId]);

  const handleSendMessage = async (message: any) => {
    try {
      const res = await sendMessage(message);
      console.log(res);
      toast.success(`Report Sent`);
      setViewform(false);
    } catch (error) {
      console.log(error);
      toast.error("Error sending report");
    }
  };

  const formik = useFormik({
    initialValues: {
      customerId: customer.customerId,
      apartmentId: apartmentId,
      subject: "",
      message: "",
    },
    validationSchema: customerReportSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      await handleSendMessage(values);
      setLoading(false);
      resetForm();
    },
  });

  return (
    <div className="min-h-screen p-4">
          <h2>Contact Us  </h2>
    </div>
  );
};

export default ContactUs;

import * as Yup from "yup";

export const customerReportSchema = Yup.object().shape({
  customerId: Yup.string(),
  subject: Yup.string()
    .required("Help us with a subject for the message")
    .min(3, "Subject must be at least 3 characters long"),
  message: Yup.string()
    .required("Kindly type in a message")
    .min(10, "Message must be at least 10 characters long"),
});

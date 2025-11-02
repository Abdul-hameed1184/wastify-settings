import React from "react";
import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import { IApartment } from "../../models/apartment.interface";
import { IOperator } from "../../models/operator.interface";
import { toast } from "react-toastify";
import { createApartmentBill } from "../../api/psp-operator/psp-operator.service";
import { useFormik } from "formik";
import { Modal } from "./Modal";
import { Button } from "../Button";
type Props = {
  openModal: boolean;
  setOpenModal: (x) => void;
  apartmentBill: string;
  apartment: IApartment;
  setRefresh: () => void;
};
const CreateApartmentBill: React.FC<Props> = ({
  openModal,
  setOpenModal,
  apartmentBill,
  apartment,
  setRefresh,
}) => {
  console.log(apartmentBill);
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );

  const months = [
    { id: "01", name: "January" },
    { id: "02", name: "February" },
    { id: "03", name: "March" },
    { id: "04", name: "April" },
    { id: "05", name: "May" },
    { id: "06", name: "June" },
    { id: "07", name: "July" },
    { id: "08", name: "August" },
    { id: "09", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];
  // const [discount, setDiscount] = useState<number>(0);
  // const [ month, setMonth] = useState<{ id: string, name: string }>({} as { id: string, name: string });
  // const [ year, setYear] = useState<string>();

  // function getMonthById(id: string): { id: string, name: string } {
  //   const month = months.find((month) => month.id === id);
  //   return month ? month : months[0];
  // }

  let Naira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const years = Array.from({ length: 2 }, (_, i) =>
    (new Date().getFullYear() - 1 + i).toString()
  );

  const handleMonthlyBill = (e: { target: { value: string } }) => {
    const monthValue = e.target.value.padStart(2, "0"); // Ensure two digits
    createFormikBill.setFieldValue("month", monthValue);
  };

  const handleDiscount = (e: { target: { value: string } }) => {
    const dx = parseInt(e.target.value);
    createFormikBill.setFieldValue("discount", dx);
  };
  const createFormikBill = useFormik({
    initialValues: {
      month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
      year: new Date().getFullYear().toString(),
      discount: 0,
    },
    onSubmit: (values) => {
      if (values.discount < 0 || values.discount > 100) {
        toast.error("Discount must be between 0 and 100%");
        return;
      }
      const billData: ICreateApartmentBill = {
        pspOperatorId: operator.id,
        billPeriod: `${values.month}-${values.year}`,
        billingData: [
          {
            apartmentId: apartment.id,
            billAmount: parseFloat(apartmentBill),
            discountPercentage: values.discount,
            discountAmount: (values.discount * parseFloat(apartmentBill)) / 100,
            totalAmount:
              parseFloat(apartmentBill) -
              (values.discount * parseFloat(apartmentBill)) / 100,
          },
        ],
      };

      createApartmentBill(billData)
        .then(() => {
          toast.success(
            `${
              months.find((m) => m.id === values.month)?.name
            }, ${values.year} bill was created successfully`,
            { autoClose: 3000 }
          );
          setRefresh();
          setOpenModal(false);
        })
        .catch((error) => {
          toast.error("Failed to create bill");
          console.error(error);
        });
    },
  });

  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      size={"lg"}
      title="Create Monthly Bill"
    >
      <form onSubmit={createFormikBill.handleSubmit} className="p-4">
        <div className="flex gap-4 w-full"></div>

        <div>
          <p className="text-xl font-semibold mb-2">
            Apartment: {apartment.apartmentTypeName}
          </p>
          <p className="text-lg mb-2">
            Apartment Type: {apartment.customerFullname}
          </p>

          <div className="flex flex-col ">
            <p className="m-0 p-0 font-bold">Month</p>
            <select
              onChange={handleMonthlyBill}
              name="month"
              defaultValue={createFormikBill.values.month}
              className="p-2 border text-xl mb-4 rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((z, index) => (
                <option key={index} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>

            <p className="m-0 p-0 font-bold">Year</p>
            <select
              name="year"
              defaultValue={createFormikBill.values.year}
              onChange={(e) => {
                createFormikBill.setFieldValue("year", e.target.value);
              }}
              className="p-2 border text-xl rounded-md  mb-4 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <p className="m-0 p-0 font-bold">Discount(Percentage)</p>
            <input
              type="number"
              id="quantity"
              min="0"
              max="100"
              step="1"
              className="w-full text-xl border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a discount in percentage"
              onChange={handleDiscount}
            />
          </div>
          <div></div>
        </div>
        {
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Apartment Bill: {Naira.format(parseFloat(apartmentBill))}
            </p>
            {createFormikBill.values.discount > 0 && (
              <p className="text-xl font-semibold">
                Discount Amount:{" "}
                {Naira.format(
                  (createFormikBill.values.discount *
                    parseFloat(apartmentBill)) /
                    100
                )}
              </p>
            )}
            {
              <p className="text-lg font-semibold">
                Bill :{" "}
                {Naira.format(
                  parseFloat(apartmentBill) -
                    (createFormikBill.values.discount *
                      parseFloat(apartmentBill)) /
                      100
                )}
              </p>
            }
          </div>
        }

        <div className="w-full flex justify-between mt-4">
          <Button
            type="submit"
            className="w-full"
            // disabled={apartmentBill <= 0 || discount <= 0 || discount > 100}
          >
            Create Bill
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateApartmentBill;

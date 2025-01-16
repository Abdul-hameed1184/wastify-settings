import React, { useEffect, useState } from "react";
import { ButtonsPrimaryBlack } from "../../../Component/Buttons";
import { IApartment } from "../../../models/apartment.interface";
import { getPspOperatorBill } from "../../../api/bill/psp-operator-pricing";
import { IOperator } from "../../../models/operator.interface";
import { useLocation } from "react-router-dom";
import { IBills } from "../../../models/bills.interface";
import { getBillingsByApartmentId } from "../../../api/property/apartment.service";
import { IBillData } from "../../../models/billdata.interface";
import Loader from "../../../Component/Loader";
import CreateApartmentBill from "../../../Component/Modal/CreateApartmentBill";
import { toast } from "react-toastify";

const ApartmentBill: React.FC = () => {
  const [bills, setBills] = useState<IBills[]>([]);
  const [billHistory, setBillHistory] = useState<IBillData[]>();
  const [openCreateBillModal, setOpenCreateBillModal] =
    useState<boolean>(false);
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const location = useLocation();
  const { state } = location;
  const apartment: IApartment = state.apartment;
  console.log(apartment);

  const [apartmentBill, setApartmentBill] = useState<number>(0);
  const [ loader, setLoader ] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);
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

  useEffect(() => {
    (async () => {
      try{
      const data = await getPspOperatorBill(operator.id);
      setBills(data.data.data.data);
      const dx = await getBillingsByApartmentId(apartment.id);
      console.log(dx.data.data.data);
      setBillHistory(dx.data.data.data);
      console.log(data.data.data.data)
      const dy:IBills|undefined = data.data.data.data.find((dx) => dx.apartmentTypeId == apartment.apartmentTypeId);
      console.log(bills)
      if (dy) {
        setApartmentBill(parseInt(dy.amount));
      } else {
        toast.error("No matching bill found for the specified apartment type.");
        // Optionally set a default value or handle the error
        setApartmentBill(0); // Default value if no match is found
      }
      setLoader(false);
    }catch(e){
      console.log(e)
      toast.error("Internal Server Error")
    }
    })();
    console.log(apartmentBill)
  }, []);



  let Naira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
});


  function formatDate(dx:string): string {
    const splitted = dx.split("-");
    return getMonthById(splitted[0]).name+", "+splitted[1];
  }

  function getMonthById(id: string): { id: string, name: string } {
    const month = months.find((month) => month.id === id);
    return month ? month : months[0];
  }

  if(loader){
    return <Loader color="black"/>
  }

  return (
    <main className="mb-10">
      {<div>
      <div className="w-full h-full shadow-2xl py-8 rounded-lg">
        <div className="px-4">
          {/* <img src="/Images/billing-user" alt="user" /> */}
          <h2 className="text-3xl font-bold">Apartment Details</h2>
        </div>
        <div className="flex lg:flex-row md:justify-between p-4 flex-wrap">
          <div className="lg:w-2/5 m-4 w-full">
            <fieldset className="border border-2 border-gray rounded-md p-4">
              <legend className="text-2xl font-semibold text-gray px-2">
                Apartment
              </legend>
              <div>
                <span className="block text-xl font-medium text-gray">
                  Apartment Type
                </span>
                <span className="block text-2xl">
                  {apartment.apartmentTypeName}
                </span>
              </div>
              <div>
                <span className="block text-xl font-medium text-gray">
                  Property Address
                </span>
                <span className="block text-2xl">
                  {apartment.propertyAddress}
                </span>
              </div>
              {/* <div>
        <span className="block text-sm font-medium text-gray-500">Property Apartments</span>
        <span className="block text-lg">{apartment.noOfDistinctApartment}</span>
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-500">Property Code</span>
        <span className="block text-lg">{apartment.propertyCode}</span>
      </div> */}
            </fieldset>
          </div>
          <div className="lg:w-2/5 m-4 w-full">
            <fieldset className="border border-2 border-gray rounded-md p-4">
              <legend className="text-2xl font-semibold text-gray px-2">
                Occupant Information
              </legend>
              <div>
                <span className="block text-xl font-medium text-gray-700">
                  Customer Name
                </span>
                <span className="block text-2xl">
                  {apartment.customerFullname}
                </span>
              </div>
              <div>
                <span className="block text-xl font-medium text-gray-700">
                  Customer Name
                </span>
                <span className="block text-2xl">
                  {apartment.customerPhone}
                </span>
              </div>
            </fieldset>
          </div>
        </div>


        <div className="flex justify-end mt-5">
          <div className="w-40 pr-4">
            <ButtonsPrimaryBlack
              name="Create Bill"
              onClick={() => setOpenCreateBillModal(true)}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-full mt-16 shadow-2xl border-black">
        {billHistory ? (
          <table className="table-auto p-4 w-full text-sm">
            <caption>
            <h3 className="text-gray-600 text-3xl font-medium mb-2">Bill History</h3>
            </caption>

            <thead>
              <tr className="text-white bg-black  rounded-t-xl ">
                <td className="px-4 py-2 text-left text-xl font-semibold text-white">
                  Date
                </td>
                <td className=" px-4 py-2 text-left text-xl font-semibold text-white">
                  Bill
                </td>
                <td className=" px-4 py-2 text-left text-xl font-semibold text-white">
                  Discount Percent
                </td>
                <td className=" px-4 py-2 text-left text-xl font-semibold text-white">
                  Discount Amount
                </td>
                <td className=" px-4 py-2 text-left text-xl font-semibold text-white">
                  Amount
                </td>

              </tr>
            </thead>
            {billHistory &&
              billHistory.map((x: IBillData, index) => {
                return (
                  <tbody className="" key={index}>
                    <tr>
                      <td className="px-4 py-2 text-2xl text-black">
                        {formatDate(x.billPeriod)}
                      </td>
                      <td className="px-4 py-2 text-2xl text-black">
                        {Naira.format(Number(x.billAmount))}
                      </td>
                      <td className="px-4 py-2 text-2xl text-black">
                        {parseInt(x.discountPercentage)+"%"}
                      </td>
                      <td className="px-4 py-2 text-2xl text-black">
                        {Naira.format(Number(x.discountAmount))}
                      </td>
                      <td className="px-4 py-2 text-2xl text-black">
                        {Naira.format(Number(x.billAmount) - Number(x.discountAmount))}
                      </td>

                    </tr>
                  </tbody>
                );
              })}
          </table>
          
        ) : (
          <div>
              <h2  className="w-full text-3xl font-bold text-gray text-center">No Bill History</h2>
          </div>

        )}
      </div>
      </div>}



      
      {openCreateBillModal && (
        <CreateApartmentBill
          apartment={apartment}
          apartmentBill={apartmentBill}
          openModal={openCreateBillModal}
          setOpenModal={setOpenCreateBillModal}
        />
      )}
    </main>
  );
};

export default ApartmentBill;

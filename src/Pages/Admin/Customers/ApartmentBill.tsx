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


  useEffect(() => {
    (async () => {
      const data = await getPspOperatorBill(operator.id);
      setBills(data.data.data.data);
      const dx = await getBillingsByApartmentId(apartment.id);
      console.log(dx.data.data.data);
      setBillHistory(dx.data.data.data);
      const dy: IBills[] = bills.filter((dx) => dx.apartmentTypeId);
      setApartmentBill(parseInt(dy[0].amount));
    })();
  }, []);

  return (
    <main className="mb-10">
      <div className="w-full h-full shadow-2xl py-8 rounded-lg">
        <div className="px-4">
          {/* <img src="/Images/billing-user" alt="user" /> */}
          <h2>Apartment Details</h2>
        </div>
        <div className="w-full flex md:flex-column md:justify-between p-4">
          <div className="lg:w-2/5">
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
          <div className="lg:w-2/5">
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
            <caption className=" text-left text-2xl font-bold p-4">
              Bill History
            </caption>

            <thead>
              <tr className="text-white bg-black  rounded-t-xl ">
                <td className="px-4 py-2 text-left font-semibold text-white">
                  Date & Time
                </td>
                <td className=" px-4 py-2 text-left font-semibold text-white">
                  Amount
                </td>
                <td className=" px-4 py-2 text-left font-semibold text-white">
                  Mode Of Payment
                </td>
                <td className=" px-4 py-2 text-left font-semibold text-white">
                  Status
                </td>
              </tr>
            </thead>
            {billHistory &&
              billHistory.map((x: IBillData, index) => {
                return (
                  <tbody className="" key={index}>
                    <tr>
                      <td className="px-4 py-2 text-xl text-black">
                        {x.billPeriod}
                      </td>
                      <td className="px-4 py-2 text-xl text-black">
                        {x.billAmount}
                      </td>
                      <td className="px-4 py-2 text-xl text-black">
                        {x.discountAmount}
                      </td>
                      <td className="px-4 py-2 text-xl text-black">
                        {x.discountPercentage}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
          
        ) : (
          <Loader color="black" />
        )}
      </div>



      
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

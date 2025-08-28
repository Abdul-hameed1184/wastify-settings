import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { MdDeleteForever } from "react-icons/md";
import InfoModal from "../../../Component/Modal/InfoModal";
import PaymentStatusBadge from "../../../utils/PaymentStatusBadge";
import { Naira } from "../../../utils/format";

const ApartmentBill: React.FC = () => {
  const [bills, setBills] = useState<IBills[]>([]);
  const [ refresh, setRefresh ] = useState<boolean>(false);
  const [billHistory, setBillHistory] = useState<IBillData[]>([]);
  const [openCreateBillModal, setOpenCreateBillModal] =
    useState<boolean>(false);
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const location = useLocation();
  const { state } = location;
  const apartment: IApartment = state.apartment;
  const [loader, setLoader] = useState<boolean>(true);
  const [viewDelete, setViewDelete] = useState<boolean>(false);
  const [ currentBill, setCurrentBill ] = useState<string>("0")
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
const fetchBills = useCallback(async () => {
    try {
      setLoader(true);
      const data = await getPspOperatorBill(operator.id);
      console.log(data.data)
      const billData: IBills[] = data.data.data.data;
      console.log(billData)
      setBills(billData);
      const xy = bills.find((b) => b.apartmentTypeId === apartment.apartmentTypeId)?.amount || "0";
      setCurrentBill(xy)
      const history = await getBillingsByApartmentId(apartment.id);
      console.log(history.data.data.data);
      setBillHistory(history.data.data.data);


    } catch (e) {
      console.error(e);
      toast.error("No bill for this customer");
    } finally {
      setLoader(false);
    }
  },[apartment.id, operator.id]);
 useEffect(() => {
  

  fetchBills();
}, [fetchBills, refresh]);


if(loader){
  return <Loader />;
}


  function formatDate(dx: string): string {
    const splitted = dx.split("-");
    return getMonthById(splitted[0]).name + ", " + splitted[1];
  }

  function getMonthById(id: string): { id: string; name: string } {
    const month = months.find((month) => month.id === id);
    return month ? month : months[0];
  }

  const handleDeleteApartment = () => {

  }

  return (
    <main className="mb-10">
      {
        <div>
          <div className="">
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
                      {apartment.customerFullname.toUpperCase()}
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
{billHistory?.length === 0 && (
  <div className="text-center mt-4 text-xl text-gray-500">
    <h2>No bills found</h2>
  </div>
)}
            <div className="flex justify-end mt-5">
              <div className="w-40 pr-4">
                <ButtonsPrimaryBlack
                  name="Create Bill"
                  onClick={() => setOpenCreateBillModal(true)}
                />
              </div>
            </div>
          </div>

          <div className="w-full h-full border-black">
            {billHistory && billHistory.length > 0 && !loader && (
              <table className="table-auto p-4 w-full text-sm md:text-base">
                <caption>
                  <h3 className="text-gray-600 text-3xl font-medium mb-2">
                    Bill History
                  </h3>
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
                                <td className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Status
                    </td>
                    <td className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Actions
                    </td>
                  </tr>
                </thead>
                <tbody >
                {billHistory &&
                
                  billHistory.map((x: IBillData, index) => {
                    return (
                      <>
           
                        <tr key={index}>
                          <td className="px-4 py-2 text-2xl text-black">
                            {formatDate(x.billPeriod)}
                          </td>
                          <td className="px-4 py-2 text-2xl text-black">
                            {Naira.format(Number(x.billAmount))}
                          </td>
                          <td className="px-4 py-2 text-2xl text-black">
                            {parseInt(x.discountPercentage) + "%"}
                          </td>
                          <td className="px-4 py-2 text-2xl text-black">
                            {Naira.format(Number(x.discountAmount))}
                          </td>
                          <td className="px-4 py-2 text-2xl text-black">
                            {Naira.format(
                              Number(x.billAmount) - Number(x.discountAmount)
                            )}
                          </td>
                                    <td className="px-4 py-2 text-2xl text-black">
                            <PaymentStatusBadge status={x.paymentStatus} />
                          </td>
                          <td className="px-4 py-2 text-2xl text-center">
                            <span
                           
                              className="text-red-600"
                            
                            >
                              <MdDeleteForever    onClick={() => setViewDelete(!viewDelete)}/>
                            </span>
                          </td>
                        </tr>
                        </>
                    );
                  
                  })}
                  </tbody>
              </table>
            )}
          </div>
        </div>
      }

      {
        viewDelete && <InfoModal openModal={viewDelete} 
        setOpenModal={setViewDelete} 
        header={"Delete Apartment"} 
        content={"Do you really want to delete this property or apartment? Once deleted, it cannot be recovered."} buttonName={"Delete Apartment"} handleConfirm={handleDeleteApartment} />

      }

      {openCreateBillModal && (
        <CreateApartmentBill
          apartment={apartment}
          apartmentBill={currentBill}
          openModal={openCreateBillModal}
          setOpenModal={setOpenCreateBillModal}
          setRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
    </main>
  );
};

export default ApartmentBill;

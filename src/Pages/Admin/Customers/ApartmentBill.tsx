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
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Button } from "../../../Component/Button";
import OccupancyStatusBadge from "../../../utils/OccupyStatusBadge";
import DataCard from "../../../Component/DataCard";
import { UpdateApartmentModal } from "../../../Component/Modal/UpdateApartmentModal";

const ApartmentBill: React.FC = () => {
  const [bills, setBills] = useState<IBills[]>([]);
  const [ updateModal, setUpdateModal ] = useState<boolean>(false)
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
      const data = await getPspOperatorBill(apartment.apartmentTypeId);
      console.log(data.data.data)
      const billData: IBills[] = data.data.data.data;
      console.log(billData)
      setBills(data.data.data[0]);
      setCurrentBill(data.data.data[0].amount)
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

const apartmentField = [
  { key: "apartmentTypeName", label: "Apartment Type"},
  {key: "propertyAddress", label:"Property Address"},
  { key: "propertyCode", label: "Property Code"},
  { key:"customerFullname", label:"Customer Name"},
  { key: "customerPhone", label: "Customer Phone"}
]


  function formatDate(dx: string): string {
    const splitted = dx.split("-");
    return getMonthById(splitted[0]).name + ", " + splitted[1];
  }

  function getMonthById(id: string): { id: string; name: string } {
    const month = months.find((month) => month.id === id);
    return month ? month : months[0];
  }



  return (
    <main className="mb-10">
      {
        <div>
          <div className="">
            <div className="px-4">

              <h2 className="text-3xl font-bold flex">Apartment Details        
                 <span className="block text-2xl mx-4">
                      {<OccupancyStatusBadge status={apartment.status} />}
                    </span></h2>
            </div>
            <div className="flex lg:flex-row md:justify-between p-4 flex-wrap">

                                <DataCard title={"Apartment Details"} data={apartment} fields={apartmentField}  />
                  <div className="flex flex-col justify-between">                 
                     <Button variant="black" onClick={()=>setUpdateModal(!updateModal)}>Edit Apartment</Button>
                    <span></span>
                  </div>

            
            </div>
{billHistory?.length === 0 && (
  <div className="text-center mt-4 text-xl text-gray-500">
    <h2>No bills found</h2>
  </div>
)}
            <div className="flex justify-between my-4 items-center ">
              <h3 className="text-2xl font-bold text-slate-900">Apartment Bill</h3>
              <div className=" pr-4">
                <Button
                  variant="black"
                  onClick={() => setOpenCreateBillModal(true)}
                >CreateBill</Button>
              </div>
            </div>
          </div>

          <div className="w-full h-full border-black">
            {billHistory && billHistory.length > 0  && (
                  <Table striped>
                    <TableHead className="font-Poppins text-xl capitalize text-white bg-slate-900 dark:text-white">

                  {/* <TableRow className="text-white bg-black  rounded-t-xl "> */}
                    <TableHeadCell className="px-4 py-2 text-left text-xl font-semibold text-white">
                      Date
                    </TableHeadCell>
                    <TableHeadCell className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Bill
                    </TableHeadCell>
                    <TableHeadCell className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Discount Percent
                    </TableHeadCell>
                    <TableHeadCell className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Discount Amount
                    </TableHeadCell>
                    <TableHeadCell className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Amount
                    </TableHeadCell>
                                <TableHeadCell className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Status
                    </TableHeadCell>
                    <TableHeadCell className=" px-4 py-2 text-left text-xl font-semibold text-white">
                      Actions
                    </TableHeadCell>
                  {/* </TableRow> */}
                </TableHead>
                <TableBody >
                {billHistory &&
                
                  billHistory.map((x: IBillData, index) => {
                    return (
               
           
                        <TableRow key={index} className={
                  index % 2 === 0
                    ? "odd:bg-tableBackground"
                    : "bg-white dark:border-gray-700 dark:bg-gray-800"
                }>
                          <TableCell className="px-4 py-2 text-2xl text-black" key={index}>
                            {formatDate(x.billPeriod)}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-2xl text-black">
                            {Naira.format(Number(x.billAmount))}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-2xl text-black">
                            {parseInt(x.discountPercentage) + "%"}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-2xl text-black">
                            {Naira.format(Number(x.discountAmount))}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-2xl text-black">
                            {Naira.format(
                              Number(x.billAmount) - Number(x.discountAmount)
                            )}
                          </TableCell>
                                    <TableCell className="px-4 py-2 text-2xl text-black">
                            <PaymentStatusBadge status={x.paymentStatus} />
                          </TableCell>
                          <TableCell className="px-4 py-2 text-2xl text-center">
                            <span
                           
                              className="text-red-600"
                            
                            >
                              <MdDeleteForever    onClick={() => setViewDelete(!viewDelete)}/>
                            </span>
                          </TableCell>
                        </TableRow>
         
                    )
                  
                  })}
                  </TableBody>
              </Table>
            )}
          </div>
        </div>
      }

      {/* {
        viewDelete && <InfoModal openModal={viewDelete} 
        setOpenModal={setViewDelete} 
        header={"Delete Apartment"} 
        content={"Do you really want to delete this property or apartment? Once deleted, it cannot be recovered."} buttonName={"Delete Apartment"} handleConfirm={handleDeleteApartment} />

      } */}

      {openCreateBillModal && (
        <CreateApartmentBill
          apartment={apartment}
          apartmentBill={currentBill}
          openModal={openCreateBillModal}
          setOpenModal={setOpenCreateBillModal}
          setRefresh={() => setRefresh((prev) => !prev)}
        />
      )}

      {
        updateModal && <UpdateApartmentModal apartment={apartment} openModal={updateModal} handleUpdateModal={()=>setUpdateModal(!updateModal)} />
      }
      
    </main>
  );
};

export default ApartmentBill;

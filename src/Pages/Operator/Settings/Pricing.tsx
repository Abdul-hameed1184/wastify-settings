import React, { useEffect, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { IPropertyType } from "../../../models/propertType.interface";
import { IOperator } from "../../../models/operator.interface";
import { IApartmentTypeBill } from "../../../models/apartmentTypeBill.interface";
import { IApartmentType } from "../../../models/apartmentType.interface";
import Loader from "../../../Component/Loader";
import { Naira } from "../../../utils/format";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { CreatePricing } from "../../../Component/CreatePricing";
import { InputField } from "../../../Component/InputField";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPropertyTypes } from "../../../api/property/property.service";
import { getApartmentTypeList } from "../../../api/property/apartment.service";
import { getBillSetupByPspOperatorBill, updateBillSetup } from "../../../api/bill/psp-operator-pricing";
import { IUpdateBill } from "../../../models/update.bill.interface";
import { Button } from "../../../Component/Button";
import DropdownMenu from "../../../Component/DropdownMenu";

const Pricing: React.FC = () => {
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "{}"
  );
  const [editingRowId, setEditingRowId] = useState<number | null>(null); // Track row being edited
  const [amount, setAmount] = useState<number | null>(null); // Amount for the edited row
  const [showCreatePricing, setShowCreatePricing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

 const { data: propertyType  } = useQuery({
    queryKey: [ "propertyTypes"],
    queryFn:  async () =>{ 
      const x = await getPropertyTypes();
      return x.data.data;
    }
  });


   const { data: apartmentType  } = useQuery({
    queryKey: [ "apartmentTypes"],
    queryFn: async () =>{
    const x =   await getApartmentTypeList();
    return x.data.data;
    }
  });

const { data: apartmentTypeBill , isLoading } = useQuery({
  queryKey: ["billsetup", page, operator.id],
  queryFn: async () => {
    const pspBill = await getBillSetupByPspOperatorBill(page, operator.id);
    return pspBill.data.data;
  },
});


  // Handle update bill
  const handleUpdateBill = async ( x: IUpdateBill) => {
    try {
      await updateBillSetup(x.id, x);
      toast.success("Bill updated successfully");
      setEditingRowId(null);
      setAmount(null); 
      queryClient.invalidateQueries({ queryKey: ["billsetup"] })
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to update bill");
      console.error("Update error:", error);
    }
  };


  // Toggle create pricing modal
  const handleOpenModal = () => {
    setShowCreatePricing(!showCreatePricing);
    queryClient.invalidateQueries({ queryKey: ["billsetup"] })
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <div className="overflow-x-auto font-Poppins mt-4 mx-4">
 
                <div className="flex justify-between mx-4">
             <h2 className="font-Poppins text-2xl font-semibold">Pricing Bill Setup</h2>
    
              <Button
                onClick={() => setShowCreatePricing(!showCreatePricing)}
              >
                Create Bill
              </Button>

        </div>

        <div className="overflow-x-auto font-Poppins mt-4 mx-4">
          {apartmentTypeBill && (
            <Table striped>
              <TableHead className="font-Poppins text-lg capitalize text-white bg-green dark:text-white">
                <TableHeadCell>S/N</TableHeadCell>
                <TableHeadCell>Property Type</TableHeadCell>
                <TableHeadCell>Apartment Type</TableHeadCell>
                <TableHeadCell>Amount</TableHeadCell>
                <TableHeadCell>View More</TableHeadCell>
              </TableHead>
              <TableBody className="font-Poppins">
                {apartmentTypeBill.data.map((x: IApartmentTypeBill, index: number) => (
                  <TableRow
                    key={x.id} // Use x.id for unique key
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 text-lg"
                  >
                    <TableCell>{apartmentTypeBill.per_page * (page - 1) + index + 1}</TableCell>
                    <TableCell>{x.propertyTypeName}</TableCell>
                    <TableCell>{x.apartmentTypeName}</TableCell>
                    <TableCell>
                      {editingRowId === x.id ? (
                        <input type="number"
                      
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAmount(parseFloat(e.target.value) || 0)
                          }
                          defaultValue={x.amount}
                          className="p-2 w-auto border border-2 border-gray-500 rounded-lg"
                        />
                      ) : (
                        Naira.format(parseFloat(x.amount))
                      )}
                    </TableCell>
                    <TableCell className="flex items-center space-x-4">
                      {editingRowId === x.id ? (
                        <Button
                   
                          onClick={() =>
                            handleUpdateBill({
                              id: x.id,
                              pspOperatorId: operator.id,
                              propertyTypeId: x.propertyTypeId,
                              apartmentTypeId: x.apartmentTypeId,
                              amount: amount || parseFloat(x.amount),
                            })
                          }
                        >Update</Button>
                      ) : (
                        <>
                        <DropdownMenu>
                          <div className="flex flex-col  rounded-lg divide-y divide-gray-200 shadow-sm">
                          <div   className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof x.id === "number") {
                                setEditingRowId(x.id);
                              } else {
                                setEditingRowId(null);
                              }
                              setAmount(parseFloat(x.amount));
                            }}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
        
                            aria-label={`Edit bill for ${x.propertyTypeName} - ${x.apartmentTypeName}`}
                          >
                            <MdEdit
                              className="text-blue-500 text-xl cursor-pointer"
                            />
                            Edit
                          </button>
                          </div>
                          <span   className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                          <MdDeleteForever
                            className="text-red-500 text-xl cursor-pointer"

                          /> Delete
                          </span>
                          </div>
                        </DropdownMenu>
                         
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {/* Pagination */}

          <div className="flex justify-center items-center h-20 my-10 w-full ">
            <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
              <button
                className={`text-green font-weight-bold`}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <div className="mx-8 h-full">
    {Array.from({
  length: Math.ceil(apartmentTypeBill.total / apartmentTypeBill?.per_page),
}).map((_, index) => (
  <button
    key={index}
    onClick={() => setPage(index + 1)} // ✅ correct
    className={`w-8 h-full rounded ${
      page === index + 1 ? "bg-green text-white" : "bg-gray-200"
    } mr-2`}
  >
    {index + 1}
  </button>
))}

              </div>
              <button
                className={`text-green font-weight-bold`}
                onClick={() =>setPage(page+1)}
                disabled={page >= Math.ceil(
    apartmentTypeBill.total / apartmentTypeBill.per_page
  )}
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

      {showCreatePricing && (
        <CreatePricing
          openModal={showCreatePricing}
          handleModal={handleOpenModal}
          propertyType={propertyType}
          apartmentType={apartmentType}
        />
      )}
    </>
  );
};

export default Pricing;
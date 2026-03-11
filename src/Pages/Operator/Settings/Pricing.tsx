import React, { useState } from "react";
import { toast } from "react-toastify";
import { IOperator } from "../../../models/operator.interface";
import { IApartmentTypeBill } from "../../../models/apartmentTypeBill.interface";
import Loader from "../../../Component/Loader";
import { Naira } from "../../../utils/format";
import { MdDeleteForever, MdEdit, MdOutlineArrowBackIosNew } from "react-icons/md";
import { CreatePricing } from "../../../Component/CreatePricing";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPropertyTypes } from "../../../api/property/property.service";
import { getApartmentTypeList } from "../../../api/property/apartment.service";
import { getBillSetupByPspOperatorBill, updateBillSetup } from "../../../api/bill/psp-operator-pricing";
import { IUpdateBill } from "../../../models/update.bill.interface";
import { Button } from "../../../Component/Button";
import DropdownMenu from "../../../Component/DropdownMenu";
import { useNavigate } from "react-router-dom";

const Pricing: React.FC = () => {
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "{}"
  );
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [showCreatePricing, setShowCreatePricing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: propertyType } = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: async () => {
      const x = await getPropertyTypes();
      return x.data.data;
    },
  });

  const { data: apartmentType } = useQuery({
    queryKey: ["apartmentTypes"],
    queryFn: async () => {
      const x = await getApartmentTypeList();
      return x.data.data;
    },
  });

  const { data: apartmentTypeBill, isLoading } = useQuery({
    queryKey: ["billsetup", page, operator.id],
    queryFn: async () => {
      const pspBill = await getBillSetupByPspOperatorBill(page, operator.id);
      return pspBill.data.data;
    },
  });

  const handleUpdateBill = async (x: IUpdateBill) => {
    try {
      await updateBillSetup(x.id, x);
      toast.success("Bill updated successfully");
      setEditingRowId(null);
      setAmount(null);
      queryClient.invalidateQueries({ queryKey: ["billsetup"] });
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to update bill");
      console.error("Update error:", error);
    }
  };

  const handleOpenModal = () => {
    setShowCreatePricing(!showCreatePricing);
    queryClient.invalidateQueries({ queryKey: ["billsetup"] });
  };

  if (isLoading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(
    (apartmentTypeBill?.total || 1) / (apartmentTypeBill?.per_page || 10)
  );

  return (
    <>
      <div className="mb-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">



        {/* Header Card */}
              <div className="flex flex-row items-center gap-3 mb-8">
                <div 
                  onClick={()=> navigate("/properties")}
                  className="flex items-center justify-center border border-gray-200 text-gray-500 rounded-xl cursor-pointer w-10 h-10 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
                >
                  <MdOutlineArrowBackIosNew className="text-lg" />
                </div>
                <h2 className="text-sm font-medium tracking-wide flex flex-col">
                  <span className="text-black font-bold text-xl">Pricing</span>
                  <span className="text-gray-900">setup property price</span>
                </h2>
              </div>


        {/* Table Card */}
        <div className="border border-gray-300 rounded-xl p-4">
                
        <div className="bg-white border border-gray-300 rounded-2xl mb-6 overflow-hidden shadow-sm">
          <div className="px-6 py-5 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight font-Poppins">
                Pricing Bill Setup
              </h2>
              {apartmentTypeBill?.total !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                  {apartmentTypeBill.total} bill{apartmentTypeBill.total !== 1 ? "s" : ""} configured
                </p>
              )}
            </div>
            <Button onClick={() => setShowCreatePricing(!showCreatePricing)}>
              Create Bill
            </Button>
          </div>
        </div>
          {/* Empty state */}
          {(!apartmentTypeBill?.data || apartmentTypeBill.data.length === 0) && (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 border-dashed mb-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 14l2 2 4-4M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1 font-Poppins">No Bills Found</h2>
              <p className="text-gray-500 text-center max-w-sm font-Poppins">
                There are currently no pricing bills configured. Click "Create Bill" to get started.
              </p>
            </div>
          )}

          {/* Table */}
          {apartmentTypeBill?.data?.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white mb-6">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-Poppins">
                      S/N
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-Poppins">
                      Property Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-Poppins">
                      Apartment Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-Poppins">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-Poppins">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {apartmentTypeBill.data.map((x: IApartmentTypeBill, index: number) => (
                    <tr
                      key={x.id}
                      className="hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-Poppins">
                        {apartmentTypeBill.per_page * (page - 1) + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium font-Poppins">
                        {x.propertyTypeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-Poppins">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {x.apartmentTypeName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium font-Poppins">
                        {editingRowId === x.id ? (
                          <input
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setAmount(parseFloat(e.target.value) || 0)
                            }
                            defaultValue={x.amount}
                            className="p-2 w-36 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 transition-colors"
                          />
                        ) : (
                          <span className="font-semibold text-gray-700">
                            {Naira.format(parseFloat(x.amount))}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingRowId === x.id ? (
                          <div className="flex items-center gap-2">
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
                            >
                              Update
                            </Button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingRowId(null);
                                setAmount(null);
                              }}
                              className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <DropdownMenu>
                            <h2 className="px-4 py-2 font-semibold text-gray-700 font-Poppins">
                              Take Action
                            </h2>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingRowId(typeof x.id === "number" ? x.id : null);
                                setAmount(parseFloat(x.amount));
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left font-Poppins"
                              aria-label={`Edit bill for ${x.propertyTypeName} - ${x.apartmentTypeName}`}
                            >
                              <MdEdit className="text-blue-500 text-lg" />
                              <span>Edit Bill</span>
                            </button>
                            <button
                              type="button"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left font-Poppins"
                            >
                              <MdDeleteForever className="text-red-500 text-lg" />
                              <span>Delete</span>
                            </button>
                          </DropdownMenu>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 font-Poppins">
                  Page {page} of {totalPages}
                  <span className="ml-2 text-gray-400">
                    ({apartmentTypeBill.total} total)
                  </span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-Poppins"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-green text-white hover:bg-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-Poppins"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
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
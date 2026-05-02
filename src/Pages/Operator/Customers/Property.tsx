import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getPropertyApartments } from "../../../api/property/apartment.service";
import CreateApartmentModal from "../../../Component/Modal/CreateApartmentModal";
import Loader from "../../../Component/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../Component/Button";
import DataCard from "../../../Component/DataCard";
import UpdatePropertyModal from "../../../Component/Modal/UpdatePropertyModal";
import { getPropertyById } from "../../../api/property/property.service";
import { toast } from "react-toastify";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { LuGlasses } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import DropdownMenu from "../../../Component/DropdownMenu";
import OccupancyStatusBadge from "../../../utils/OccupyStatusBadge";
import { IApartment } from "../../../models/apartment.interface";


const Property: React.FC = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [ page,setPage ] = useState<number>(1);
  const operator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  const [ updateModal, setUpdateModal ] = useState<boolean>(false)
  const [openCreateApartmentModal, setOpenCreateApartmentModal] =
    useState<boolean>(false);
    const queryClient = useQueryClient();
    const { data:property } = useQuery({
      queryKey: ['property', propertyId],
      queryFn: async () => {
              const property =await getPropertyById(propertyId);
              console.log(property)
              return property?.data.data;
      }
      });

    const { data:apartments, isLoading } = useQuery({
      queryKey: ['apartments', propertyId],
      queryFn: async () => {
             const id = parseInt(propertyId || "");
      const data = await getPropertyApartments(id);
      console.log(data);
       return data;
      }
    });

    const handleCreateApartmentModal = () => {

      setOpenCreateApartmentModal(!openCreateApartmentModal);
     queryClient.invalidateQueries({
    queryKey: ["property", propertyId],
  });

    };


  if (isLoading) {
    return <Loader />;
  }


  const propertyField = [
    {
      key: "ownerFullname",
      label: 'Property Owner'
    },
    {
      key: "propertyAddress",
      label: "Property Address"
    },
    {
      key:"wardName",
      label:"Property Ward"
    },
    {
      key:"propertyCode",
      label:"Property Code"
    },{
      key: "noOfDistinctApartment",
      label:"No. of Apartments"
    }
  ]


  return (
    <main className="mb-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-row items-center gap-3 mb-8">
        <button 
          onClick={()=> navigate("/operator/properties")}
          className="flex items-center justify-center border border-gray-200 text-gray-500 rounded-xl cursor-pointer w-10 h-10 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
        >
          <MdOutlineArrowBackIosNew className="text-lg" />
        </button>
        <h2 className="text-sm font-medium tracking-wide">
          <span className="text-gray-400">Properties / </span>
          <span className="text-gray-900">Apartments</span>
        </h2>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl mb-10 overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Property Information</h2>
          <Button 
            onClick={() => setUpdateModal(!updateModal)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <MdEdit className="text-black" />
            Edit Property
          </Button>
        </div>

        <div className="p-6 border-b border-gray-100">
          { property &&  <DataCard data={property} fields={propertyField}  />}
        </div>
      </div>
<div className=" border border-gray-300 rounded-xl p-4">
      <div className="flex justify-between items-center mb-6  border border-gray-300 rounded-xl p-4 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Apartments</h2>
          {property?.created_at && (
            <p className="text-sm text-gray-500 mt-1">Registered: {property.created_at}</p>
          )}
        </div>
        <Button
          variant="primary"
          onClick={() => {
            console.log(apartments?.data);
            console.log(property)
            if(apartments?.data.data.data.length == property.noOfDistinctApartment){
              toast.error("Apartments Completed for Property")
            } else {
              setOpenCreateApartmentModal(true);
            } 
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-green rounded-lg hover:bg-green/90 transition-all shadow-sm hover:shadow-md whitespace-nowrap"
        >
          Add Apartment
        </Button>
      </div>

      { (!apartments?.data || apartments?.data?.data?.data?.length === 0) && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 border-dashed mb-10">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">No Apartments Found</h2>
          <p className="text-gray-500 text-center max-w-sm">There are currently no apartments registered to this property.</p>
        </div>
      )}
{ apartments?.data?.data?.data?.length > 0 && 
  <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white mb-6">
    <table className="table-auto min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">S/N</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Apartment Type</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>    
      <tbody className="divide-y divide-gray-100 bg-white">
        {apartments?.data?.data?.data?.map((apartment: IApartment, index: number) => (
          <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {(page - 1) * (apartments?.data?.data?.per_page || 10) + index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{apartment.customerFullname?.toUpperCase()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {apartment.apartmentTypeName}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{apartment.customerPhone}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <OccupancyStatusBadge status={apartment.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <DropdownMenu>
                <h2 className=" px-4 py-2 font-semibold">Take Action</h2>
                <Link
                  to={`apartments/${apartment.id}`}
                  state={{ property: property }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LuGlasses className="text-green" />
                  <span>View Apartment</span>
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <MdEdit className="text-blue-500" />
                  <span>Edit Apartment</span>
                </button>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Pagination */}
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <p className="text-sm text-gray-500">
        Page {page} of {Math.ceil((apartments?.data?.data?.total || 1) / (apartments?.data?.data?.per_page || 10))}
        <span className="ml-2 text-gray-400">({apartments?.data?.data?.total} total)</span>
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= Math.ceil((apartments?.data?.data?.total || 1) / (apartments?.data?.data?.per_page || 10))}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-green text-white hover:bg-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>


}
</div>
{
  property && <UpdatePropertyModal 
  openModal={updateModal} 
  handleOpenModal={()=>setUpdateModal(!updateModal)} 
        operator={operator} 
        property={property} /> 
}

      {property && (
        <CreateApartmentModal
          openModal={openCreateApartmentModal}
          setOpenModal={handleCreateApartmentModal}
          property={property}
        />
      )}
    </main>
  );
};

export default Property;

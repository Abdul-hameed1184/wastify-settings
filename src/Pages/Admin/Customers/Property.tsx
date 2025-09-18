import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPropertyApartments } from "../../../api/property/apartment.service";
import CreateApartmentModal from "../../../Component/Modal/CreateApartmentModal";
import { IProperty } from "../../../models/property.interface";
import Loader from "../../../Component/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ApartmentList from "../../../Component/ApartmentList";
import { Button } from "../../../Component/Button";
import DataCard from "../../../Component/DataCard";
import UpdatePropertyModal from "../../../Component/Modal/UpdatePropertyModal";


const Property: React.FC = () => {
  const { propertyId } = useParams();
  const location = useLocation();
  const { state } = location;
  const property: IProperty = state.property;
  const [ page,setPage ] = useState<number>(1);
  const operator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  const [ updateModal, setUpdateModal ] = useState<boolean>(false)
  const [openCreateApartmentModal, setOpenCreateApartmentModal] =
    useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data:apartments, isLoading, isError } = useQuery({
      queryKey: ['properties', propertyId],
      queryFn: async () => {
             const id = parseInt(propertyId || "");
      const data = await getPropertyApartments(id);
       return data;
      }
    });

    const handleCreateApartmentModal = () => {
      setOpenCreateApartmentModal(!openCreateApartmentModal);
     queryClient.invalidateQueries({
    queryKey: ["properties", propertyId],
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
    <div className="p-4 ">
     
        {/* {property && <fieldset className="border border-2 border-gray rounded-md p-4">
          <legend className="text-2xl font-semibold text-gray px-2">
            Property Information
          </legend>
           <div className="flex md:flex-row justify-between">
            <div className="flex flex-col justify-start">
          <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Owner
            </span>
            <span className="block text-2xl">
              {property?.ownerFullname?.toUpperCase() || "No Name"}
            </span>
          </div>
          <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Address
            </span>
            <span className="block text-2xl">{property.propertyAddress}</span>
          </div>
                    <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Ward
            </span>
            <span className="block text-2xl">{property.wardName}</span>
          </div>
          </div>

                    <div className="flex flex-col">
                    <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Code
            </span>
            <span className="block text-2xl">{property.propertyCode}</span>
          </div>
                    <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Apartments
            </span>
            <span className="block text-2xl">{property.noOfDistinctApartment}</span>
          </div>
                    <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Registered
            </span>
            <span className="block text-2xl">{property?.created_at}</span>
          </div>
          </div>
          </div>
        </fieldset>} */}
        <div className="flex justify-between flex-row">
          <DataCard title={"Property Information"} data={property} fields={propertyField}  />
         
            <div className="flex flex-col justify-between">
              <Button variant="black" onClick={()=>setUpdateModal(!updateModal)}>Edit Property</Button>
              <span className="">Registered: {property.created_at} </span>
   
          </div>
      
        </div>
  
      <div className="flex flex-row justify-between my-4">
          <h2 className="text-2xl font-semibold">Apartments</h2>

                    <Button
            variant="black"
              onClick={() => {
                setOpenCreateApartmentModal(true);
              } }

              type={"button"}>Add Apartment</Button>
      </div>

{     <ApartmentList apartments={apartments?.data} page={page} setPage={setPage} />}

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
    </div>
  );
};

export default Property;

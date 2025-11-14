import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPropertyApartments } from "../../../api/property/apartment.service";
import CreateApartmentModal from "../../../Component/Modal/CreateApartmentModal";
import Loader from "../../../Component/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {ApartmentList} from "../../../Component/ApartmentList";
import { Button } from "../../../Component/Button";
import DataCard from "../../../Component/DataCard";
import UpdatePropertyModal from "../../../Component/Modal/UpdatePropertyModal";
import { getPropertyById } from "../../../api/property/property.service";


const Property: React.FC = () => {
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
    <div className="p-4 ">
        <div className="flex justify-between flex-row">
       { property &&  <DataCard title={"Property Information"} data={property} fields={propertyField}  />}
         
            <div className="flex flex-col justify-between">
              <Button variant="black" onClick={()=>setUpdateModal(!updateModal)}>Edit Property</Button>
              <span className="">Registered: {property?.created_at} </span>
   
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

{  (property && apartments?.data) &&   <ApartmentList property={property} apartments={apartments?.data} page={page} setPage={setPage} />}

{  !apartments?.data &&   <h2 className="text-2xl text-center text-gray-600">No Apartments</h2>}
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

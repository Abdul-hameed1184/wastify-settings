import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPropertyApartments } from "../../../api/property/apartment.service";
import CreateApartmentModal from "../../../Component/Modal/CreateApartmentModal";
import { IProperty } from "../../../models/property.interface";
import Loader from "../../../Component/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ApartmentList from "../../../Component/ApartmentList";
import { Button } from "../../../Component/Button";


const Property: React.FC = () => {
  const { propertyId } = useParams();
  const location = useLocation();
  const { state } = location;
  const property: IProperty = state.property;
  const [ page,setPage ] = useState<number>(1);

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


  return (
    <div className="p-4 ">
     
        {property && <fieldset className="border border-2 border-gray rounded-md p-4">
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
        </fieldset>}
  
      <div className="flex flex-row justify-between my-4">
          <h2 className="text-2xl font-semibold">Apartments</h2>

                    <Button
            variant="black"
              onClick={() => {
                setOpenCreateApartmentModal(true);
              } }

              type={"button"}>Add Apartment</Button>
      </div>

      {/* <div className="space-y-6">
        <Table striped>
          <TableHead className=" font-Poppins text-xl capitalize text-white bg-slate-900 dark:text-white">
            <TableHeadCell>Property Code</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Apartment Type</TableHeadCell>
            <TableHeadCell>Phone number</TableHeadCell>
                   <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y font-Poppins text-xl">
            {apartments?.data.data.data.length > 0 ?  
              (apartments?.data.data.data.map((item: IApartment, index) => (
                <TableRow
                  className={
                    index % 2 === 0
                      ? "odd:bg-tableBackground"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                  }
                  key={index}
                >
                  <TableCell>{item.propertyCode} </TableCell>
                  <TableCell>{item?.customerFullname?.toUpperCase()} </TableCell>
                  <TableCell>{item.apartmentTypeName} </TableCell>
                  <TableCell>{item.customerPhone} </TableCell>
                                    <TableCell><OccupancyStatusBadge status={item.status} /> </TableCell>
                  <TableCell>
          
                                   <Link        to={`apartments/${item.id}`}
                      state={{ apartment: item }}><LuGlasses className="text-green-100" /></Link>

         
                  </TableCell>
                </TableRow>))) : (
                  <TableRow>
                    <TableCell colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                     <h2 className="text-lg font-semibold">No apartments found.</h2>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
                {
                  Array.from({
                    length: Math.ceil(
                      (apartments?.data.data.total/apartments?.data.data.per_page)
                    ),
                  }).map((_, index) => (
                    <button
                      className={`w-8 h-full  ${
                        page === index + 1 ? "bg-green text-white " : ""
                      } mr-2`}
                      key={index}
                      onClick={() => setPage(page + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
              <button
                className={`text-green font-weight-bold`}
                onClick={() => setPage(page + 1)}
                disabled={Math.ceil(apartments?.data.data.total/apartments?.data.data.per_page) <= page + 1}
              >
                Next
              </button>
            </div>
          </div>
      </div> */}
{     <ApartmentList apartments={apartments?.data} page={page} setPage={setPage} />}

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

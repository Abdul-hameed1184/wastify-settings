import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Paragraph2XlGreenMargin } from "../../../Component/Paragraph";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { IProperty } from "../../../models/property.interface";
import { IOperator } from "../../../models/operator.interface";
import { getPropertyByOperator } from "../../../api/psp-operator/psp-operator.service";
import { IPaginatedProperty } from "../../../models/paginatedPropertyByOperator.interface";
import Loader from "../../../Component/Loader";
import Searchbar from "../../../Component/Searchbar";
import PropertyApartment from "./PropertyApartment";

const Property:React.FC = () => {
  const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");


  const [ page, setPage] = useState<number>(1);


  const [ properties, setProperties ] = useState<IPaginatedProperty>();
  const [ viewApartment, setViewApartment ] = useState<boolean>(true);
  const [ propertylist, setPropertyList ] = useState<IProperty[]>([])
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>();
  const [selectedProperty, setSelectedProperty] = useState<IProperty>();
  const [ loading, setLoading ] = useState<boolean>(true)


  const getProperties = async () => {
    const data = await getPropertyByOperator(operator.id, page);
  setProperties(data.data.data);
  setPropertyList(data.data.data.data);
   console.log(data);

  }

  const handleSearchResults = (filteredResult) => {
    setPropertyList(filteredResult)
  }
    

  useEffect(() => {
    try{
    getProperties();
    }catch(e){
      console.log(e)
    }
    setLoading(false)
  }, []);



  if(loading){
    return <Loader  />
  }

  return (
    <main className="px-4">
      <div className="flex flex-col lg:flex-row justify-between my-10">

      </div>
   <div className="bg-lightBackground py-5 rounded-3xl shadow-2xl">
        <Paragraph2XlGreenMargin content={"Property Records"} />
        <div>
       
        <Searchbar data={propertylist} searchFields={['ownerFullName', 'wardName', 'propertyAddress']} onSearch={handleSearchResults}  />


        </div>
{  properties  &&      <div className="overflow-x-auto font-Poppins mt-3">
          <Table striped>
            <TableHead className=" font-Poppins text-xl capitalize text-white bg-green dark:text-white">
              {/* <TableHeadCell>Property ID</TableHeadCell> */}
              <TableHeadCell>Property address</TableHeadCell>
              <TableHeadCell>LGA</TableHeadCell>
              <TableHeadCell>Ward</TableHeadCell>
              <TableHeadCell>Property code</TableHeadCell>
              <TableHeadCell>Number of Distinct Apartment</TableHeadCell>{" "}
              {/* <TableHeadCell>Add/View Apartment</TableHeadCell>{" "} */}
              {/*Number of Customers Changed*/}
              {/* <TableHeadCell>Customer details</TableHeadCell> */}
              <TableHeadCell>Add/View Apartment</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y font-Poppins text-xl ">
              {propertylist && propertylist.map((item:IProperty, index) => (
                <TableRow
                  className={
                    index % 2 === 0
                      ? "odd:bg-tableBackground"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                  }
                  key={index}
                >
                  {/* <TableCell>{item.id}</TableCell> */}
                  <TableCell>{item.propertyAddress} </TableCell>
                  <TableCell>{item.lgaName} </TableCell>
                  <TableCell>{item.wardName}</TableCell>
                  <TableCell>{item.propertyCode}</TableCell>
                  <TableCell>{item.noOfDistinctApartment}</TableCell>
                  {/* <TableCell>{<FaCirclePlus className="text-green w-10 h-6 mt-1"  onClick={()=> handleCreateApartmentModal(item)}/>}</TableCell> */}
                  <TableCell>
                    <ButtonsPrimary
                      name={"+ / View More"}
                     type={"button"} loading={undefined} />
                  </TableCell>
                  {/* <TableCell> ... </TableCell> */}
                </TableRow>
              ))}


            </TableBody>
          </Table>
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
                {
                  Array.from({
                    length: Math.ceil(
                      (properties.total/properties.per_page)
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
                disabled={Math.ceil(properties.total/properties.per_page) <= page + 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>}
      </div>

     </main>
  );
};

export default Property;

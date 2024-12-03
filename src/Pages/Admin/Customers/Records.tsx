import React, { useEffect, useState } from "react";
import { FaCirclePlus, FaHouse } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import AdminCard from "../../../Component/Card/AdminCard";
import { Paragraph2XlGreenMargin } from "../../../Component/Paragraph";
import axios from "axios";
import baseURL from "../../../utils/apiConfig";
import { Button, ButtonsPrimary } from "../../../Component/Buttons";
import CustomerModal from "../../../Component/Modal/CustomerModal";
import CreatePropertyModal from "../../../Component/Modal/CreatePropertyModal";
import { IProperty } from "../../../models/property.interface";
import CreateApartmentModal from "../../../Component/Modal/CreateApartmentModal";
import { IOperator } from "../../../models/operator.interface";
import { IPropertyType } from "../../../models/propertType.interface";

const Records:React.FC = () => {
  const [AllPropertyRecords, setAllPropertyRecords] = useState([]);
  const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  // console.log(operator);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false)

  const [allProperties, setAllProperties] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>();
  const [selectedProperty, setSelectedProperty] = useState<IProperty>()
  
  const [ openCreateApartmentModal, setOpenCreateApartmentModal ] = useState<boolean>(false);
  const handleToggleOpen = (propertyId: number) => {
    setOpenModal(true);
    setSelectedPropertyId(propertyId);
  };

  //this functions gets the total number of properties
  const HandleTotalProperties = () => {
    axios
      .get(baseURL + "dashboard/psp-operator/" + operator.id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const responseData = res.data?.data;
        // console.log(responseData);
        setAllProperties(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //this function takes care of all property records that is displayed on the table
  const HandleAllProperties = () => {
    axios
      .get(baseURL + "property/list", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const responseData = res.data?.data;
        // console.log("pr", responseData.length);
        setAllPropertyRecords(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };


    

  useEffect(() => {
    HandleTotalProperties();
    HandleAllProperties();
  }, []);

  // console.log("all property records", AllPropertyRecords);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions =
    AllPropertyRecords && AllPropertyRecords?.length
      ? AllPropertyRecords.slice(
          indexOfFirstTransaction,
          indexOfLastTransaction
        )
      : [];

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (
      pageNumber > Math.ceil(AllPropertyRecords?.length / transactionsPerPage)
    ) {
      setCurrentPage(
        Math.ceil(AllPropertyRecords?.length / transactionsPerPage)
      );
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handleCreateApartmentModal = (item:IProperty) => {
      setOpenCreateApartmentModal(!openCreateApartmentModal);
      setSelectedProperty(item);
  }

  return (
    <main className="px-4">
      <div className="flex flex-col lg:flex-row justify-between my-10">
        {/* <div className="w-full lg:w-[45%]">
                    <AdminCard heading={"Total Customers"} amount={"300"} icon={<IoPeople className='text-green w-10 h-8' />} />
                </div> */}
        <div className="w-full mt-5 lg:mt-0 ">
          <AdminCard
            heading={"Total Property"}
            amount={AllPropertyRecords?.length}
            icon={<FaHouse className="text-green w-10 h-6 mt-1" />}
          />
        </div>
      </div>
      <div className="grid justify-items-end mb-4">
          <div className="w-1/3">
      <ButtonsPrimary type="button" name="Add Property" onClick={() => { setOpenCreateProperty(!openCreateProperty) } } loading={false}/>
      </div>
      </div>
      <div className="bg-lightBackground py-5 rounded-3xl shadow-2xl">
        <Paragraph2XlGreenMargin content={"Property Records"} />
        <div>
          
        </div>
        <div className="overflow-x-auto font-Poppins mt-3">
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
              {currentTransactions?.map((item:IProperty, index) => (
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
                      onClick={() => handleToggleOpen(item.id)} type={"button"} loading={undefined} />
                  </TableCell>
                  {/* <TableCell> ... </TableCell> */}
                </TableRow>
              ))}

       { selectedPropertyId &&      
       
       <CustomerModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                propertyId={selectedPropertyId}
                setOpenCreateApartmentModal={setOpenCreateApartmentModal}
              />}
                { selectedProperty &&  <CreateApartmentModal openModal={openCreateApartmentModal} setOpenModal={setOpenCreateApartmentModal} property={selectedProperty}  />
              }
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="flex justify-center items-center h-20 my-10 w-full ">
            <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
              <button
                className={`text-green font-weight-bold`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="mx-8 h-full">
                {AllPropertyRecords &&
                  AllPropertyRecords.length &&
                  Array.from({
                    length: Math.ceil(
                      AllPropertyRecords.length / transactionsPerPage
                    ),
                  }).map((_, index) => (
                    <button
                      className={`w-8 h-full  ${
                        currentPage === index + 1 ? "bg-green text-white " : ""
                      } mr-2`}
                      key={index}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
              <button
                className={`text-green font-weight-bold`}
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  !AllPropertyRecords ||
                  currentPage ===
                    Math.ceil(
                      (AllPropertyRecords?.length || 0) / transactionsPerPage
                    )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} />
     </main>
  );
};

export default Records;

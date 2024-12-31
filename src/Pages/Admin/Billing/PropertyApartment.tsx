import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import React, { useEffect } from 'react';
import { ButtonsPrimary } from '../../../Component/Buttons';
import { IProperty } from '../../../models/property.interface';

const PropertyApartment:React.FC = () => {

    useEffect(()=> {
        (async () => {
            
        })()
    })
    return (
        <section>
            {  property &&      <div className="overflow-x-auto font-Poppins mt-3">
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
                    <ButtonsPrimary onClick={handleApartmentBill()}
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
        </section>
    )
}

export default PropertyApartment;
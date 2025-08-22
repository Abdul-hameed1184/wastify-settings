import React, { useEffect, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import {
  Paragraph2XlGreen,
  Paragraph2XlGreenMargin,
  ParagraphTextSettings,
  ParagraphXl,
} from "../../../Component/Paragraph";

import { Button, ButtonsPrimary } from "../../../Component/Buttons";
import { getPropertyTypes } from "../../../api/property/property.service";
import { IPropertyType } from "../../../models/propertType.interface";
import {
  createBillSetup,
  getPspOperatorBill,
  updateBillSetup,
} from "../../../api/bill/psp-operator-pricing";
import { IOperator } from "../../../models/operator.interface";
import { IApartmentTypeBill } from "../../../models/apartmentTypeBill.interface";

import Loader from "../../../Component/Loader";
import {
  getApartmentTypeList,
} from "../../../api/property/apartment.service";
import { IApartmentType } from "../../../models/apartmentType.interface";
import { Naira } from "../../../utils/format";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const Pricing: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [propertyType, setPropertyType] = useState<IPropertyType[]>([]);
  const [selectPropertyType, setSelectedPropertyType] = useState<IPropertyType>();
  const [selectpropertyAmount, setSelectedPropertyAmount] = useState(0);
  const [apartmentType, setApartmentType] = useState<IApartmentType[]>([]);
  const [apartmentTypeBill, setApartmentTypeBill] = useState<
    IApartmentTypeBill[]
  >([]);
  const [selectedApartmentTypeId, setSelectedApartmentTypeId] =
    useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const [selectedApartmentTypeBill, setSelectedApartmentTypeBill] =
    useState<IApartmentTypeBill>();
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const [editBill, setEditBill] = useState<boolean>(false);
  // Fetch property data


  const getAparmentTypeBill = async () => {
    try {
      const prop = await getPropertyTypes();
      console.log(prop.data.data);
      setPropertyType(prop.data.data);

      const apartmentTypes = await getApartmentTypeList();
      setApartmentType(apartmentTypes.data.data);
      console.log(apartmentTypes.data.data);
      const pspBill = await getPspOperatorBill(operator.id);
      console.log(pspBill.data.data);
      setApartmentTypeBill(pspBill.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      (async () => getAparmentTypeBill())();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateBill = async () => {
    try {
      if (selectedApartmentTypeBill) {
        
        const data = await updateBillSetup(selectedApartmentTypeBill.apartmentTypeId, {
          propertyTypeId:selectedApartmentTypeBill?.propertyTypeId || 0,
          pspOperatorId: operator.id,
          amount: selectpropertyAmount,
          apartmentTypeId: selectedApartmentTypeBill?.apartmentTypeId,
        });
        toast.success(data.data.message);
        getAparmentTypeBill();

        setSelectedApartmentTypeBill(data.data.data);
        setEditBill(!editBill);
      }
    } catch (e) {
      toast.error("Unable to update bill");
      console.log(e);
    }
  };

  const handleCreateBill = async () => {
    try {
      if (selectedApartmentTypeBill) {
        const data = await createBillSetup({
          propertyTypeId: selectPropertyType?.id || 0,
          pspOperatorId: operator.id,
          amount: selectpropertyAmount,
          apartmentTypeId: selectedApartmentTypeBill?.apartmentTypeId,
        });
        console.log({
          pspOperatorId: operator.id,
          amount: selectpropertyAmount,
          apartmentTypeId: selectedApartmentTypeBill?.apartmentTypeId,
        })
        toast.success(data.data.message);
        getAparmentTypeBill();

        setSelectedApartmentTypeBill(data.data.data);
        setEditBill(!editBill);
      }
    } catch (e) {
      toast.error("Unable to Create bill");
      console.log(e);
    }

  }

  const handlePriceChange = (e) => {
    setSelectedPropertyAmount(parseInt(e.target.value));
    console.log(e.target.value);
    console.log(selectedApartmentTypeBill)
  };

  const handlePropertyTypeChange = (e: { target: { value: string } }) => {
    const propertyTypeId = parseInt(e.target.value);
    const selectedPropertyType = propertyType.find(
      (x) => x.id === propertyTypeId
    );
    if (selectedPropertyType) {
      setSelectedPropertyType(selectedPropertyType);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div>
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

        <div className="w-full vh-100 border border-transparent rounded-lg ring-2 ring-transparent shadow px-5 py-14">
          <Paragraph2XlGreenMargin content={"Pricing"} />
          <ParagraphTextSettings content={"Setup property price"} />
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mt-8 mb-8">
              <ParagraphXl content={"Property Type"} />
              <div className="flex flex-row w-full items-center">
                <select
                  className="form-select form-select-xl mb-3 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                  aria-label=".form-select-lg example"
                  onChange={handlePropertyTypeChange}
                >
                  {propertyType &&
                    propertyType.map((x: IPropertyType, y: number) => {
                      return (
                        <option key={y} value={x.id}>
                          {" "}
                          {x.name}{" "}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div>
              {!update && (
                <div>
                  <ParagraphXl content={"Apartment Type"} />

                  <div className=" flex flex-row">
                    <div className="w-3/5">
                      <select
                        className="form-select form-select mb-3 w-3/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                        aria-label=".form-select-lg example"
                        onChange={(e) => {
                          console.log(apartmentType);
                          setSelectedApartmentTypeId(parseInt(e.target.value));
                          const data:IApartmentType|undefined = apartmentType.find(x => x.id === parseInt(e.target.value));
                          const selectedObject:IApartmentTypeBill|undefined = apartmentTypeBill.find(
                            (x: IApartmentTypeBill) =>
                              x.apartmentTypeId === parseInt(e.target.value)
                          );
                          console.log(selectedObject);
                          console.log(data);
                          console.log(apartmentTypeBill)
                          
                          
                          if (selectedObject) {
                            setSelectedApartmentTypeBill(selectedObject);
                           }else{
                            setSelectedApartmentTypeBill(
                              {
                                                            
                                    amount: "0.00",
                                    apartmentTypeId: data?.id||0,
                                    propertyTypeId: selectPropertyType?.id || 0,
                                    apartmentTypeName: data?.name||"No Name", 
                                    pspOperatorBusinessname: operator.businessName,
                                    pspOperatorEmail: operator.email,
                                    pspOperatorId: operator.id,
                                    pspOperatorPhone: operator.phone,
                                    pspOperatorUserId: operator.userId
                              })
                            setEditBill(false);
                          }
                       
                        }}
                        defaultValue={"default"}
                      >
                        <option disabled value={"default"}>
                          Select Apartment Type
                        </option>
                        {apartmentType.length &&
                          apartmentType.map(
                            (x: IApartmentType, index: number) => {
                              return (
                                <option key={index} value={x.id}>
                                  {" "}
                                  {x.name}{" "}
                                </option>
                              );
                            }
                          )}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* {selectedApartmentTypeBill && (
                
      
                    <div className="mt-8 flex flex-row  align-items-center justify-content-center">
                      {!editBill ? (
                        <div className="flex flex-row">
                          <p className="text-4xl m-2 font-inter font-bold not-italic text-green leading-6" >   <span className="font-bold">₦{selectedApartmentTypeBill.amount}</span></p>

                          <div className="w-2/5 mx-4 mb-3">
                            <ButtonsPrimary
                              name={"Edit Bill"}
                              onClick={() => setEditBill(true)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row align-items-center  gap-4 justify-items-center">
                          <input
                            className="form-control form-control-xl w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                            placeholder={"New Bill"}
                            type={"number"}
                            name={"amount"}
                            onChange={handlePriceChange}
                            defaultValue={selectedApartmentTypeBill?.amount}
                          />
                          <div className="w-2/5">
                            <ButtonsPrimary
                              name={"Update Bill"}
                              onClick={
                                handleUpdateBill
                              }
                            />
                          </div>
                        </div>
                      )}
    
                  
                </div>
              )} */}

              {selectedApartmentTypeBill && (
                <div className="mt-8 flex flex-row  align-items-center justify-content-center">
                  {!editBill ? (
                    <div className="flex flex-row">
                      <Paragraph2XlGreen
                        content={Naira.format(
                          parseFloat(selectedApartmentTypeBill.amount)
                        )}
                      />
                      <div className="mx-4 mb-3">
                        <ButtonsPrimary
                          name={"Edit"}
                          onClick={() => setEditBill(true)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-row">
                        <input
                          className="form-control form-control-xl mb-3 w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                          type={"number"}
                          name={"amount"}
                          onChange={handlePriceChange}
                          defaultValue={selectedApartmentTypeBill?.amount}
                        />
                        <div className="mx-4 mb-3">
                          <ButtonsPrimary
                            name={!selectedApartmentTypeBill ? "Create Bill" : "Update Bill" }
                            onClick={!selectedApartmentTypeBill  ? handleCreateBill : handleUpdateBill}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {
              <div>
              <div>
                <h2 className="font-Poppins text-lg font-semibold">Billing Information</h2>
               <div className="flex justify-between"> <div></div><Button onClick={handleCreateBill} name={"Create Bill"} /></div>
              </div>
                                  <div className="overflow-x-auto font-Poppins mt-3">
                              {  apartmentTypeBill &&      <Table striped >
                                          <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                                              <TableHeadCell>S/N</TableHeadCell>
                                              <TableHeadCell>Property Type</TableHeadCell>
                                              <TableHeadCell>Apartment Type</TableHeadCell>
                                              <TableHeadCell>Amount</TableHeadCell>

                                              <TableHeadCell> View More </TableHeadCell>
                                          </TableHead>
                                   <TableBody className="font-Poppins">
  {apartmentTypeBill.map((x: IApartmentTypeBill, index: number) => {
    return (
      <TableRow
        key={x.id} // always add a unique key
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <TableCell>{index+1}</TableCell>
        <TableCell>{x.propertyTypeName}</TableCell>
        <TableCell>{x.apartmentTypeName}</TableCell>
        <TableCell>{Naira.format(parseFloat(x.amount))}</TableCell>
        <TableCell className="flex items-center space-x-4">
                       <MdEdit className="text-blue-500" />
                             <MdDeleteForever className="text-red-500" />
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

                                      </Table>
}
                                  </div>
                                  </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;

// type CreateApartmentTypeProps = {
//   setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
//   update: boolean;
// };
// export const CreateApartmentType:React.FC<CreateApartmentTypeProps> = ({ setUpdate, update }) => {
//   const [description, setDescription] = useState<string>("");
//   const [apartmentType, setApartmentType] = useState<string>("");

//   const handleCreateBill = async () => {
//     try {
//       const data = await createApartmentType({
//         name: apartmentType,
//         description,
//       });
//       console.log(data);
//       toast.success("Apartment Type created");
//       setUpdate(!update);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (

//           <Modal show={update} onClose={() => setUpdate(update)} size={'md'} position={'top-right'}>
//             <Modal.Header><Paragraph2XlGreen content="Create Apartment Type"/> </Modal.Header>
//                <Modal.Body>
//             <div className="w-full h-full flex flex-col">
//       <div className="flex flex-row w-100">
//         <input
//           className="form-control form-control-xl mb-3 w-full border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
//           placeholder={"Apartment Type"}
//           type={"text"}
//           name={"apartmentType"}
//           onChange={(e) => setApartmentType(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col w-100">
//         <div className="w-100">
//           <textarea
//             className="form-control form-control-xl mb-3 w-full border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-50 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
//             placeholder={"Aparment type description"}
//             onChange={(e) => setDescription(e.target.value)}
//             name={"description"}
//           />
//         </div>

//       </div>
//       </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <div className="my-2 flex gap-2 justify-space-between md:flex-row flex-col">
//           <div className="w-full">
//             <ButtonsSecondary
//               name={"Cancel"}
//               onClick={() => setUpdate(!update)}
//             />
//           </div>
//           <div className="w-full">
//             <ButtonsPrimary
//               name={"Create Bill"}
//               onClick={() => handleCreateBill()}
//             />
//           </div>
//         </div>
//         </Modal.Footer>
//         </Modal>
//   );
// };

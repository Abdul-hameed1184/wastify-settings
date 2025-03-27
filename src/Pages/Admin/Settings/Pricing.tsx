import React, { useEffect, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import {

  Paragraph2XlGreenMargin,
  ParagraphTextSettings,
  ParagraphXl,
} from "../../../Component/Paragraph";

import {
  ButtonsPrimary,

} from "../../../Component/Buttons";
import { getPropertyTypes } from "../../../api/property/property.service";
import {
  IPropertyType,
} from "../../../models/propertType.interface";
import {
  getPspOperatorBill,
  updateBillSetup,
} from "../../../api/bill/psp-operator-pricing";
import { IOperator } from "../../../models/operator.interface";
import { IApartmentTypeBill } from "../../../models/apartmentTypeBill.interface";

import Loader from "../../../Component/Loader";




const Pricing: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [propertyType, setPropertyType] = useState<IPropertyType[]>([]);
  const [selectpropertyAmount, setSelectedPropertyAmount] = useState(0);
  // const [apartmentType, setApartmentType] = useState<IApartmentType[]>([]);
  const [apartmentTypeBill, setApartmentTypeBill] = useState<
    IApartmentTypeBill[]
  >([]);
  const [selectedApartmentTypeBill, setSelectedApartmentTypeBill] =
    useState<IApartmentTypeBill>();
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const [editBill, setEditBill] = useState<boolean>(false);
  // Fetch property data


  const getAparmentTypeBill =async () => {
    const prop = await getPropertyTypes();
    setPropertyType(prop.data.data);
    const pspBill = await getPspOperatorBill(operator.id);
    setApartmentTypeBill(pspBill.data.data.data);
  }

  useEffect(() => {
    try{
    (async () => getAparmentTypeBill())();
    }catch(error){ console.log(error)}
    finally{
      setLoading(false)
    }
  }, []);

  const handleUpdateBill = async () => {
    try {
      if (selectedApartmentTypeBill) {
        const data = await updateBillSetup(selectedApartmentTypeBill.id, {
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

  const handlePriceChange = (e) => {
    setSelectedPropertyAmount(parseInt(e.target.value));
  };

  if(loading){
    return <Loader />
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
            <div className="">
              <div className="mt-8 mb-8">
                <ParagraphXl content={"Property Type"} />
                <select
                  className="form-select form-select-xl mb-3 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                  aria-label=".form-select-lg example"
                >
                  {propertyType &&
                    propertyType.map((x: IPropertyType, y:number) => {
                      return <option key={y} value={x.id}> {x.name} </option>;
                    })}
                </select>
              </div>
              <ParagraphXl content={"Apartment Type"} />

                <div className=" flex flex-row align-items-center justify-content-center">
                  <select
                    className="form-select form-select-xl mb-3 w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                    aria-label=".form-select-lg example"
                    onChange={(e) => {
                      const selectedId = parseInt(e.target.value); // Get the selected id
                      const selectedObject = apartmentTypeBill.find(
                        (x: IApartmentTypeBill) => x.id === selectedId
                      ); // Find the matching object
                      setSelectedApartmentTypeBill(selectedObject);
                    }}
                    defaultValue={"default"}
                  >
                    <option disabled value={'default'}>
                    Select Apartment Type
                    </option>
                    {apartmentTypeBill &&
                      apartmentTypeBill.map((x: IApartmentTypeBill, index:number ) => {
                        return (
                          <option key={index} value={x.id}> {x.apartmentTypeName} </option>
                        );
                      })}
                  </select>
                  <div className="w-1/5 mx-4 mb-3">
                    {/* <ButtonsPrimary name={"Add Apartment Type"} onClick={()=>
                  setUpdate(!update)
                  }/> */}
                  </div>
                </div>
              

              {selectedApartmentTypeBill && (
                
      
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
              )}

              {/* { selectedApartmentTypeBill &&  
      
      <div className="mt-8 flex flex-row  align-items-center justify-content-center">
        
               { !editBill ? 
              <div className="flex flex-row">
                <Paragraph2XlGreen content={selectedApartmentTypeBill.amount} />
                <div className="w-1/5 mx-4 mb-3">
                <ButtonsPrimary name={"       Edit  "} onClick={() => setEditBill(true)} />
                  </div>
                  </div> 
                  : 
                  <div>
               <div className="flex flex-row">
                
               <input
                className="form-control form-control-xl mb-3 w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                placeholder={"New Bill"}
                  type={"number"}
                  name={"amount"}
                  onChange={handlePriceChange}
                  
                />
                         <div className="w-1/5 mx-4 mb-3">
                <ButtonsPrimary name={"Update Bill"} onClick={handleUpdateBill}/>
                </div>
                </div>
            
               </div>
               
}
              </div>} */}
            </div>
          </div>
      
      </div>
    </>
  );
};

export default Pricing;
// export const CreateApartmentType = ({ setUpdate, update }) => {
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
//     <div>
//       <div className="flex flex-row">
//         <input
//           className="form-control form-control-xl mb-3 w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
//           placeholder={"Apartment Type"}
//           type={"text"}
//           name={"apartmentType"}
//           onChange={(e) => setApartmentType(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <div className="w-100">
//           <textarea
//             className="form-control form-control-xl mb-3 w-100 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-50 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
//             placeholder={"Aparment type description"}
//             onChange={(e) => setDescription(e.target.value)}
//             name={"description"}
//           />
//         </div>
//         <div className="my-2 flex gap-2 justify-space-between">
//           <div className="w-1/5">
//             <ButtonsSecondary
//               name={"Cancel"}
//               onClick={() => setUpdate(!update)}
//             />
//           </div>
//           <div className="w-1/5">
//             <ButtonsPrimary
//               name={"Create Bill"}
//               onClick={() => handleCreateBill()}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

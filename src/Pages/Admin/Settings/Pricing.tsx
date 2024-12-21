import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {

  Paragraph2Xl,
  Paragraph2XlGreenMargin,
  ParagraphTextSettings,
  ParagraphXl,
} from "../../../Component/Paragraph";
import baseURL from "../../../utils/apiConfig";

import {
  ButtonsPrimary,
  ButtonsSecondary,

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
import {
  createApartmentType,
  getApartmentType,
} from "../../../api/property/apartment.service";
import { IApartmentTypeBill } from "../../../models/apartmentTypeBill.interface";
import Loader from "../../../Component/Loader";
import { IApartmentType } from "../../../models/apartmentType.interface";




const Pricing: React.FC = () => {
  const [residentials, setResidentials] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const [mixedProperties, setMixedProperties] = useState([]);
  const [governmentReserved, setGovernmentReserved] = useState([]);
  const [selectPropertyTypeId, setSelectPropertyTypeId] = useState("");
  const [propertyType, setPropertyType] = useState<IPropertyType[]>([]);
  const [errors, setErrors] = useState({});

  const [bills, setBills] = useState([]);
  const [selectpropertyAmount, setSelectedPropertyAmount] = useState(0);
  const [apartmentType, setApartmentType] = useState<IApartmentType[]>([]);
  const [apartmentTypeBill, setApartmentTypeBill] = useState<
    IApartmentTypeBill[]
  >([]);
  const [selectedApartmentTypeBill, setSelectedApartmentTypeBill] =
    useState<IApartmentTypeBill>();
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const [loader, setLoader] = useState<boolean>(true);
  const [editBill, setEditBill] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(true);
  // Fetch property data
  const HandleFetchProperty = () => {
    axios
      .get(baseURL + "propertyType/list", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const responseData = res.data?.data;

        // Filter objects based on type
        const residentialProperties = responseData.filter(
          (item: any) => item.name === "Residential"
        );
        const commercialProperties = responseData.filter(
          (item: any) => item.name === "Commercial"
        );
        const mixedProperties = responseData.filter(
          (item: any) => item.name === "Mixed Property"
        );
        const governmentReservedProperties = responseData.filter(
          (item: any) => item.name === "Goverment Reserved Areas"
        );

        // Sort arrays based on id
        residentialProperties.sort((a: any, b: any) => a.id - b.id);
        commercialProperties.sort((a: any, b: any) => a.id - b.id);
        mixedProperties.sort((a: any, b: any) => a.id - b.id);
        governmentReservedProperties.sort((a: any, b: any) => a.id - b.id);

        setResidentials(residentialProperties);
        setCommercials(commercialProperties);
        setMixedProperties(mixedProperties);
        setGovernmentReserved(governmentReservedProperties);

        console.log("residential", residentials);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      const prop = await getPropertyTypes();
      setPropertyType(prop.data.data);
      const pspBill = await getPspOperatorBill(operator.id);
      setApartmentTypeBill(pspBill.data.data.data);
      const apartType = await getApartmentType();
      console.log(apartType);
      setApartmentType(apartType.data.data);
    })();
    setLoader(false);
  }, []);


  useEffect(() => {
    HandleFetchProperty();
  }, []);

  // Set selectPropertyTypeId based on the default tab (Residential) after data is loaded
  useEffect(() => {
    if (residentials.length > 0) {
      setSelectPropertyTypeId(residentials[0].id); // Set ID of the first residential property by default
    }
  }, [residentials]);



  const handleUpdateBill = async () => {
    try {
      if (selectedApartmentTypeBill) {
        const data = await updateBillSetup(selectedApartmentTypeBill.id, {
          pspOperatorId: operator.id,
          amount: selectpropertyAmount,
          apartmentTypeId: selectedApartmentTypeBill?.apartmentTypeId,
        });

        console.log(data);
        toast.success(data.data.data);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const handlePriceChange = (e) => {
    setSelectedPropertyAmount(parseInt(e.target.value));
    setErrors("");
  };



  const FetchAllBills = () => {
    axios
      .get(baseURL + "billSetup/bill-setup-by-psp-operator/" + operator.id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("ills fetched property", res);
        const data = res.data.data;
        console.log("Bills", data);
        setBills(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    FetchAllBills();
  }, []);

  return (
    <>
      <div>
        {loader ? (
          <Loader />
        ) : (
          <div className="w-full vh-100 border border-transparent rounded-lg ring-2 ring-transparent shadow px-5 py-14">
            <ToastContainer />

            <Paragraph2XlGreenMargin content={"Pricing"} />
            <ParagraphTextSettings content={"Setup property price"} />
            <div className="">
              <div className="mt-8 mb-8">
                <ParagraphXl content={"Property Type"} />
                <select
                  className="form-select form-select-xl mb-3 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                  aria-label=".form-select-lg example"
                  onChange={(e) => setSelectPropertyTypeId(e.target.value)}
                >
                  {propertyType &&
                    propertyType.map((x: IPropertyType, y:number) => {
                      return <option key={y} value={x.id}> {x.name} </option>;
                    })}
                </select>
              </div>
              <ParagraphXl content={"Apartment Type"} />
              {update ? (
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
                  >
                    <option disabled selected>
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
              ) : (
                <CreateApartmentType setUpdate={setUpdate} update={update} />
              )}

              {selectedApartmentTypeBill && (
                <div>
                  {update && (
                    <div className="mt-8 flex flex-row  align-items-center justify-content-center">
                      {editBill ? (
                        <div className="flex flex-row">
                          <Paragraph2Xl
                            content={selectedApartmentTypeBill.amount}
                          />
                          <div className="w-2/5 mx-4 mb-3">
                            <ButtonsPrimary
                              name={"Edit Bill"}
                              onClick={() => setEditBill(true)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row">
                          <input
                            className="form-control form-control-xl mb-3 w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                            placeholder={"New Bill"}
                            type={"number"}
                            name={"amount"}
                            onChange={handlePriceChange}
                            defaultValue={selectedApartmentTypeBill.amount}
                          />
                          <div className="w-1/5 my-4">
                            <ButtonsPrimary
                              name={"Update Bill"}
                              onClick={() => {
                                handleUpdateBill();
                              }}
                            />
                          </div>
                        </div>
                      )}
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
        )}
      </div>
    </>
  );
};

export default Pricing;
type CreateApartmentProps = {
  setUpdate: (x:boolean) => void;
  update: boolean;
}
export const CreateApartmentType = ({ setUpdate, update }) => {
  const [description, setDescription] = useState<string>("");
  const [apartmentType, setApartmentType] = useState<string>("");

  const handleCreateBill = async () => {
    try {
      const data = await createApartmentType({
        name: apartmentType,
        description,
      });
      console.log(data);
      toast.success("Apartment Type created");
      setUpdate(!update);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <input
          className="form-control form-control-xl mb-3 w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
          placeholder={"Apartment Type"}
          type={"text"}
          name={"apartmentType"}
          onChange={(e) => setApartmentType(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <div className="w-100">
          <textarea
            className="form-control form-control-xl mb-3 w-100 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-50 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
            placeholder={"Aparment type description"}
            onChange={(e) => setDescription(e.target.value)}
            name={"description"}
          />
        </div>
        <div className="my-2 flex gap-2 justify-space-between">
          <div className="w-1/5">
            <ButtonsSecondary
              name={"Cancel"}
              onClick={() => setUpdate(!update)}
            />
          </div>
          <div className="w-1/5">
            <ButtonsPrimary
              name={"Create Bill"}
              onClick={() => handleCreateBill()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

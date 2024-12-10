import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { FormikValues, useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Paragraph2Green,
  Paragraph2XlGreen,
  Paragraph2XlGreenMargin,
  ParagraphExtraSmallError,
  ParagraphLarge,
  ParagraphSmall2,
  ParagraphTextSettings,
  ParagraphXl,
} from "../../../Component/Paragraph";
import baseURL from "../../../utils/apiConfig";
import { InputFieldSecondaryGreen } from "../../../Component/InputField";
import { ButtonsPrimary, ButtonsSecondaryIcon } from "../../../Component/Buttons";
import { getPropertyTypes } from "../../../api/property/property.service";
import { IApartmentType, IPropertyType } from "../../../models/propertType.interface";
import { createBillSetup, getPspOperatorBill, updateBillSetup } from "../../../api/bill/psp-operator-pricing";
import { IOperator } from "../../../models/operator.interface";
import { getApartmentType } from "../../../api/property/apartment.service";
import { IApartmentTypeBill } from "../../../models/apartmentTypeBill.interface";
import Loader from "../../../Component/Loader";
import { ICreateBill } from "../../../models/createbill.interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const validate = (values: FormikValues) => {
  const errors: FormikValues = {};
  // if (!values.propertyTypeId) {
  //     errors.propertyTypeId = 'Property Type is Required';
  // }

  // if (!values.amount) {
  //     errors.amount = 'Amount is Required';
  // }

  return errors;
};

const Pricing:React.FC = () => {
  const [residentials, setResidentials] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const [mixedProperties, setMixedProperties] = useState([]);
  const [governmentReserved, setGovernmentReserved] = useState([]);
  const [selectProperty, setSelectProperty] = useState("");
  const [selectPropertyTypeId, setSelectPropertyTypeId] = useState("");
  const [ propertyType, setPropertyType ] = useState<IPropertyType[]>([])
  const [errors, setErrors] = useState({});

  const [loading, SetLoading] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectproperty, setSelectedProperty] = useState("");
  const [selectpropertyAmount, setSelectedPropertyAmount] = useState(0);
  const [billsID, setBillID] = useState("");
  const [apartmentType, setApartmentType ] = useState<IApartmentType[]>([]);
  const [ apartmentTypeBill, setApartmentTypeBill ] = useState<IApartmentTypeBill[]>([]);
  const [ selectedApartmentTypeBill, setSelectedApartmentTypeBill ] = useState<IApartmentTypeBill>();
  const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "");
  const [ loader, setLoader ]= useState<boolean>(true);
  const [ editBill, setEditBill ] =useState<boolean>(false);
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
        residentialProperties.sort((a:any, b:any) => a.id - b.id);
        commercialProperties.sort((a:any, b:any) => a.id - b.id);
        mixedProperties.sort((a:any, b:any) => a.id - b.id);
        governmentReservedProperties.sort((a:any, b:any) => a.id - b.id);

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

  useEffect(()=>{

    (async () => {
      const prop = await getPropertyTypes();
      setPropertyType(prop.data.data);
      const pspBill = await getPspOperatorBill(3);
      setApartmentTypeBill(pspBill.data.data.data);
      const apartType = await getApartmentType();
      setApartmentType(apartType.data.data);
    })();
    setLoader(false);
  },[]) 

  // Handle property type change - SHOULD BE APARTMENT TYPE
  const handlePropertyTypeChange = (e) => {
    setSelectProperty(e.target.value);
    console.log("selectProperty", selectProperty);
    setErrors("");
  };

  const handleTabChange = (tabIndex:number) => {
    // When a tab is changed, set the selectPropertyTypeId based on the tab and the respective property's ID
    // console.log("tabIndex", tabIndex);

    switch (tabIndex) {
      case 0:
        // When Residential tab is selected, set the first residential property's ID
        // console.log("ressssss", residentials.length);
        if (residentials.length > 0) {
          setSelectPropertyTypeId(residentials[0].id);
        }
        break;
      case 1:
        // When Commercial tab is selected, set the first commercial property's ID
        // console.log("commercials", commercials.length);

        if (commercials.length > 0) {
          setSelectPropertyTypeId(commercials[0].id);
        }
        break;
      case 2:
        // When Mixed Property tab is selected, set the first mixed property's ID
        if (mixedProperties.length > 0) {
          setSelectPropertyTypeId(mixedProperties[0].id);
        }
        break;
      case 3:
        // When Government Reserved Areas tab is selected, set the first government reserved property's ID
        if (governmentReserved.length > 0) {
          setSelectPropertyTypeId(governmentReserved[0].id);
        }
        break;
      default:
        setSelectPropertyTypeId("");
        break;
    }
  };

  console.log("selectPropertyTypeId", selectPropertyTypeId); //CONSIDER IMPORTANT,SHOULD BE SENT TO THE BACKEND

  useEffect(() => {
    HandleFetchProperty();
  }, []);

  // Set selectPropertyTypeId based on the default tab (Residential) after data is loaded
  useEffect(() => {
    if (residentials.length > 0) {
      setSelectPropertyTypeId(residentials[0].id); // Set ID of the first residential property by default
    }
  }, [residentials]);

  const someValues = {
    propertyTypeId: selectproperty,
    amount: selectpropertyAmount,
  };

  const handleCreateBill = async () => {
    try{
      if(selectedApartmentTypeBill){
    const data = await createBillSetup({
      pspOperatorId: operator.id,
      amount: selectpropertyAmount,
      apartmentTypeId: selectedApartmentTypeBill?.apartmentTypeId,
    });
    console.log(data);
  //  toast.success(data.message)
  }

   
  }catch(e){
    console.log(e);
   // toast.error(e)
  }
}
  const handleUpdateBill = async () => {
    try{
      if(selectedApartmentTypeBill){
    const data = await updateBillSetup({
      pspOperatorId: operator.id,
      amount: selectpropertyAmount,
      apartmentTypeId: selectedApartmentTypeBill?.apartmentTypeId,
      id: selectedApartmentTypeBill.id
    });
    console.log(data);
  //  toast.success(data.message)
  }

   
  }catch(e){
    console.log(e);
   // toast.error(e)
  }

  }


  const handlePriceChange = (e) => {
    setSelectedPropertyAmount(parseInt(e.target.value));
    setErrors("");
  };

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validate,
    onSubmit: (values) => {
      try {
        const data = {
          ...values,
          pspOperatorId: operator.id,
          ...someValues,
        };

        if (selectproperty == "") {
          setErrors({
            propertyTypeId: "Property is required",
          });
          return;
        }
        if (selectpropertyAmount == "") {
          setErrors({
            amount: "Amount is required",
          });
          return;
        }

        if (billsID == "") {
          axios
            .post(baseURL + "billSetup", data, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              console.log(res);
              SetLoading(false);
              const message = res.data?.message;
              const errorState = res.data?.errorState;
              if (!errorState) {
                toast.success(message, { autoClose: 5000 });
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              } else {
                toast.error(message, { autoClose: 5000 });
              }
            })
            .catch((err) => {
              console.log(err);
              SetLoading(false);
              const message = err.response.data?.message;
              toast.error(message, { autoClose: 7000 });
            });
        } else {
          axios
            .put(baseURL + "billSetup/" + billsID, data, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              console.log(res);
              SetLoading(false);
              const message = res.data?.message;
              const errorState = res.data?.errorState;
              if (!errorState) {
                toast.success(message, { autoClose: 5000 });
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              } else {
                toast.error(message, { autoClose: 5000 });
              }
            })
            .catch((err) => {
              console.log(err);
              SetLoading(false);
              const message = err.response.data?.message;
              toast.error(message, { autoClose: 7000 });
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

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
{ loader ? <Loader /> :
        <div className="w-full border border-transparent rounded-lg ring-2 ring-transparent shadow-2xl px-5 py-14">
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
             { propertyType && propertyType.map((x:IPropertyType) => {
              return (<option value={x.id}> {x.name} </option>)
             }) }
                </select>
              </div>
              <ParagraphXl content={"Apartment Type"} />
              <div className=" flex flex-row align-items-center justify-content-center">

              <select
              className="form-select form-select-xl mb-3 w-2/5 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
               aria-label=".form-select-lg example"
               onChange={(e) =>{
                const selectedId = parseInt(e.target.value); // Get the selected id
                const selectedObject = apartmentTypeBill.find(
                  (x: IApartmentTypeBill) => x.id === selectedId
                ); // Find the matching object
                setSelectedApartmentTypeBill(selectedObject); 
              }
               }
               >
                     <option disabled selected>Select Apartment Type</option>
             { apartmentTypeBill && apartmentTypeBill.map((x:IApartmentTypeBill) => {
               
              return (<option value={x.id}> {x.apartmentTypeName} </option>)
             }) }
                </select> 
                <div className="w-1/5 mx-4 mb-3">
                <ButtonsPrimary name={"Add Apartment"}/>
                </div>

              </div>
              
     { selectedApartmentTypeBill &&  
      
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
              </div>}
              
            </div>
          </div>
          }
          <form onSubmit={formik.handleSubmit}>
          <div className="w-full border border-transparent rounded-lg ring-2 ring-transparent shadow-2xl px-5 py-14">
            <ToastContainer />
            <Paragraph2XlGreenMargin content={"Pricing"} />
            <ParagraphTextSettings content={"Setup property price"} />
            <div className="">
              <div className="mt-8">
                <Tab.Group onChange={handleTabChange}>
                  <Tab.List className="flex space-x-1 rounded-full bg-lightgrayer">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-full py-2.5 text-base font-medium leading-5 font-sans",
                          "focus:outline-none focus:ring-0",
                          selected ? "bg-green shadow text-white" : "text-white"
                        )
                      }
                    >
                      Residential
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-full py-2.5 text-base font-medium leading-5 font-sans",
                          "focus:outline-none focus:ring-0",
                          selected ? "bg-green shadow text-white" : "text-white"
                        )
                      }
                    >
                      Commercial
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-full py-2.5 text-base font-medium leading-5 font-sans",
                          "focus:outline-none focus:ring-0",
                          selected ? "bg-green shadow text-white" : "text-white"
                        )
                      }
                    >
                      Mixed Property
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-full py-2.5 text-base font-medium leading-5 font-sans",
                          "focus:outline-none focus:ring-0",
                          selected ? "bg-green shadow text-white" : "text-white"
                        )
                      }
                    >
                      Government Reserved Areas
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <div className="mt-10 mx-4">
                        <select
                          id="residential"
                          className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                          name="propertyTypeId"
                          onChange={handlePropertyTypeChange}
                          value={selectProperty}
                        >
                          <option value="">Select Residential Type</option>
                          {residentials?.map((res) => (
                            <option key={res.id} value={res.id}>
                              {res.name}
                            </option>
                          ))}
                        </select>
                        {errors.propertyTypeId && (
                          <ParagraphExtraSmallError
                            content={errors.propertyTypeId}
                          />
                        )}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="mt-10 mx-4">
                        <select
                          id="commercial"
                          className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                          name="propertyTypeId"
                          onChange={handlePropertyTypeChange}
                          value={selectProperty}
                        >
                          <option value="">Select Commercial Type</option>
                          {commercials?.map((com) => (
                            <option key={com.id} value={com.id}>
                              {com.name}
                            </option>
                          ))}
                        </select>
                        {errors.propertyTypeId && (
                          <ParagraphExtraSmallError
                            content={errors.propertyTypeId}
                          />
                        )}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="mt-10 mx-4">
                        <select
                          id="mixedProperty"
                          className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                          name="propertyTypeId"
                          onChange={handlePropertyTypeChange}
                          value={selectProperty}
                        >
                          <option value="">Select Mixed Property Type</option>
                          {mixedProperties?.map((mix) => (
                            <option key={mix.id} value={mix.id}>
                              {mix.name}
                            </option>
                          ))}
                        </select>
                        {errors.propertyTypeId && (
                          <ParagraphExtraSmallError
                            content={errors.propertyTypeId}
                          />
                        )}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="mt-10 mx-4">
                        <select
                          id="governmentReserved"
                          className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                          name="propertyTypeId"
                          onChange={handlePropertyTypeChange}
                          value={selectProperty}
                        >
                          <option value="">
                            Select Government Reserved Areas
                          </option>
                          {governmentReserved?.map((gov) => (
                            <option key={gov.id} value={gov.id}>
                              {gov.name}
                            </option>
                          ))}
                        </select>
                        {errors.propertyTypeId && (
                          <ParagraphExtraSmallError
                            content={errors.propertyTypeId}
                          />
                        )}
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
              <div className="mt-8 px-4">
                <InputFieldSecondaryGreen
                  placeholder={"Amount (000,000.00)"}
                  type={"number"}
                  name={"amount"}
                  onChange={handlePriceChange}
                  value={selectpropertyAmount}
                />
                {errors.amount ? (
                  <ParagraphExtraSmallError content={errors.amount} />
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-8 flex w-1/6">
            <ButtonsPrimary
              name={billsID ? "Update Bill" : "Save"}
              type={"submit"}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Pricing;

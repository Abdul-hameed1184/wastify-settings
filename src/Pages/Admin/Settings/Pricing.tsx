import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Paragraph2Green,
  Paragraph2XlGreenMargin,
  ParagraphExtraSmallError,
  ParagraphTextSettings,
} from "../../../Component/Paragraph";
import baseURL from "../../../utils/apiConfig";
import { InputFieldSecondaryGreen } from "../../../Component/InputField";
import { ButtonsPrimary } from "../../../Component/Buttons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const validate = (values) => {
  const errors = {};
  // if (!values.propertyTypeId) {
  //     errors.propertyTypeId = 'Property Type is Required';
  // }

  // if (!values.amount) {
  //     errors.amount = 'Amount is Required';
  // }

  return errors;
};

const Pricing = () => {
  const [residentials, setResidentials] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const [mixedProperties, setMixedProperties] = useState([]);
  const [governmentReserved, setGovernmentReserved] = useState([]);
  const [selectProperty, setSelectProperty] = useState("");
  const [selectPropertyTypeId, setSelectPropertyTypeId] = useState("");
  const [errors, setErrors] = useState({});

  const [loading, SetLoading] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectproperty, setSelectedProperty] = useState("");
  const [selectpropertyAmount, setSelectedPropertyAmount] = useState("");
  const [billsID, setBillID] = useState("");
  const operator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS"));

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
          (item) => item.name === "Residential"
        );
        const commercialProperties = responseData.filter(
          (item) => item.name === "Commercial"
        );
        const mixedProperties = responseData.filter(
          (item) => item.name === "Mixed Property"
        );
        const governmentReservedProperties = responseData.filter(
          (item) => item.name === "Goverment Reserved Areas"
        );

        // Sort arrays based on id
        residentialProperties.sort((a, b) => a.id - b.id);
        commercialProperties.sort((a, b) => a.id - b.id);
        mixedProperties.sort((a, b) => a.id - b.id);
        governmentReservedProperties.sort((a, b) => a.id - b.id);

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

  // Handle property type change - SHOULD BE APARTMENT TYPE
  const handlePropertyTypeChange = (e) => {
    setSelectProperty(e.target.value);
    console.log("selectProperty", selectProperty);
    setErrors("");
  };

  const handleTabChange = (tabIndex) => {
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

  const handlePriceChange = (e) => {
    setSelectedPropertyAmount(e.target.value);
    setErrors("");
  };

  const formik = useFormik({
    initialValues: {
      // amount: selectpropertyAmount,
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

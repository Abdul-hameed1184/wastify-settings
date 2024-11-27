import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Paragraph2Xl,
  ParagraphExtraSmallError,
  ParagraphLargeWhite,
  ParagraphSmall,
} from "../../Component/Paragraph";
import { ButtonsPrimary } from "../../Component/Buttons";
import baseURL from "../../utils/apiConfig";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const validate = (values) => {
  const errors = {};
  if (!values.propertyTypeId) {
    errors.propertyTypeId = "Property Type is Required";
  }

  if (!values.noOfFlats) {
    errors.noOfFlats = "Number of Unit is Required";
  }

  return errors;
};

const PropertyUnit = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("residential");
  const [residentials, setResidentials] = useState([]);
  const [commercial, setCommercials] = useState([]);

  const HandleCreate = () => {
    navigate("/propertyaccount");
  };

  const formik = useFormik({
    initialValues: {
      propertyTypeId: "",
      noOfFlats: "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // pass the value gotten here to the next page
      navigate("/propertyaccount", { state: { data: values } });
    },
  });

  //fetching the property types
  //function to fetch all state
  const HandleFetchPropety = () => {
    axios
      .get(baseURL + "propertyType", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const responseData = res.data?.data;
        // Filter objects based on isResidential property
        const residentialProperties = responseData.filter(
          (item) => item.isResidential === 1
        );
        const commercialProperties = responseData.filter(
          (item) => item.isResidential === 0
        );

        // Sort arrays based on id
        residentialProperties.sort((a, b) => a.id - b.id);
        commercialProperties.sort((a, b) => a.id - b.id);

        setResidentials(residentialProperties);
        setCommercials(commercialProperties);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    HandleFetchPropety();
  }, []);

  return (
    <main className="mt-4 mx-4 md:m-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover">
      <div className="md:mt-0 md:py-5 md:px-10 md:flex md:justify-between">
        <div className="hidden md:block md:p-10">
          <ParagraphLargeWhite content={"Sign Up"} />
        </div>
        <div className="md:mt-1 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-start mt-6 ml-6">
              <Link to="/createaccount" smooth="true" duration={500}>
                <IoChevronBack
                  size={28}
                  className="bg-green text-white rounded-2xl"
                />
              </Link>
            </div>
            <div className="mt-4">
              <Paragraph2Xl content={"Set Up Your Property Account"} />
              <ParagraphSmall
                content={"what type of property do you want to register?"}
              />
            </div>
            <div className="mt-8">
              <Tab.Group>
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
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel>
                    {/* <p>this part A</p> */}
                    <div className="mt-10 mx-4">
                      <select
                        id="residential"
                        className="border-2 px-2 py-3 pl-5  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green    text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                        name={"propertyTypeId"}
                        onChange={formik.handleChange}
                        value={formik.values.propertyTypeId}
                      >
                        <option value="">Residential Type</option>
                        {residentials?.map((res) => (
                          <option key={res.id} value={res.id}>
                            {res.name}
                          </option>
                        ))}
                      </select>
                      {formik.errors.propertyTypeId ? (
                        <ParagraphExtraSmallError
                          content={formik.errors.propertyTypeId}
                        />
                      ) : null}
                    </div>
                  </Tab.Panel>

                  <Tab.Panel>
                    <div className="mt-10 mx-4">
                      <select
                        id="commecial"
                        className="border-2 px-2 py-3 pl-5  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green    text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                        name={"propertyTypeId"}
                        onChange={formik.handleChange}
                        value={formik.values.propertyTypeId}
                      >
                        <option value="">Commercial Type</option>
                        {commercial?.map((com) => (
                          <option key={com.id} value={com.id}>
                            {com.name}
                          </option>
                        ))}
                      </select>
                      {formik.errors.propertyTypeId ? (
                        <ParagraphExtraSmallError
                          content={formik.errors.propertyTypeId}
                        />
                      ) : null}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="mt-10 mx-4">
              <select
                id="untis"
                className="border-2 px-2 py-3 pl-5  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green    text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                name={"noOfFlats"}
                onChange={formik.handleChange}
                value={formik.values.noOfFlats}
              >
                <option value="">How many Units?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {formik.errors.noOfFlats ? (
                <ParagraphExtraSmallError content={formik.errors.noOfFlats} />
              ) : null}
            </div>
            <div className="mt-52 mx-4">
              <ButtonsPrimary name={"Continue"} type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PropertyUnit;

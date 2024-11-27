import React, { useState, useEffect, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Paragraph2Xl,
  ParagraphExtraSmallError,
  ParagraphLargeWhite,
  ParagraphSmall,
} from "../../Component/Paragraph";
import { ButtonsPrimary } from "../../Component/Buttons";
import { InputFieldSecondaryGreen } from "../../Component/InputField";
import baseURL from "../../utils/apiConfig";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { IoClose } from "react-icons/io5";

const LIBRARIES = ["places"];

const validate = (values) => {
  const errors = {};
  if (!values.pspOperatorId) {
    errors.pspOperatorId = "PSP Operator is Required";
  }
  return errors;
};

const initialAddress = {
  propertyAddress: "",
  propertylatitude: "",
  propertylongitude: "",
};

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBa4LW09x1ihbXwp-l5XQtvYWXPolOPdqM",
    libraries: LIBRARIES,
  });

  if (!isLoaded) return <div>Loading</div>;
  return <PropertyAccount />;
}

const PropertyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);
  const [allState, setAllState] = useState([]);
  const [StateSelectedID, setStateSelectedID] = useState();
  const [LgaSelectedID, setLgaSelectedID] = useState();
  const [WardSelectedID, setWardSelectedID] = useState();
  const [PspOperatorList, setPspOperatorList] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [loadingPSP, SetLoadingPSP] = useState(false);
  const [addressValues, SetAddressValues] = useState(initialAddress);
  const [selected, setSelected] = useState(null);
  const [formValuess, setFormValuess] = useState({
    propertyAddress: "",
    pLatitude: "",
    pLongitude: "",
  });

  const propertyState = location.state && location.state.data;

  const someValues = {
    ...propertyState,
    stateId: StateSelectedID,
    lgaId: LgaSelectedID,
    wardId: WardSelectedID,
    phone: localStorage.getItem("phone"),
    propertyAddress: formValuess.propertyAddress,
    pLatitude: formValuess.pLatitude,
    pLongitude: formValuess.pLongitude,
  };

  const formik = useFormik({
    initialValues: {
      pspOperatorId: "",
    },
    validate,
    onSubmit: (values) => {
      SetLoading(true);
      const data = {
        ...values,
        ...someValues,
      };

      axios
        .post(baseURL + "auth/customer/signup/create-property", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          SetLoading(false);
          const message = res.data?.message;
          const errorState = res.data?.errorState;
          const result = res.data?.data;
          if (!errorState) {
            toast.success(message, { autoClose: 5000 });
            setTimeout(() => {
              navigate("/propertyreview", { state: { data: result } });
            }, 3000);
          } else {
            toast.error(message, { autoClose: 5000 });
          }
        })
        .catch((err) => {
          SetLoading(false);
          const message = err.response.data?.message;
          toast.error(message, { autoClose: 7000 });
        });
    },
  });

  // Fetching all states
  const HandleFetchState = () => {
    axios
      .get(baseURL + "state/state-lga-ward", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handling state, LGA, and Ward selection changes
  const handleStateChange = (e) => {
    const stateId = parseInt(e.target.value, 10);
    setStateSelectedID(stateId);
    const selectedState = allState.find((state) => state.id === stateId);
    setSelectedState(selectedState);
    setSelectedLGA(null);
  };

  const handleLGAChange = (e) => {
    const lgaId = parseInt(e.target.value, 10);
    setLgaSelectedID(lgaId);
    const selectedLGA = selectedState.lgas.find((lga) => lga.id === lgaId);
    setSelectedLGA(selectedLGA);
  };

  const handleWardChange = (e) => {
    const wardId = parseInt(e.target.value, 10);
    setWardSelectedID(wardId);
    SetLoadingPSP(true);
    axios
      .get(baseURL + "pspOperator/operator-ward/" + wardId, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPspOperatorList(res.data?.data);
        SetLoadingPSP(false);
      })
      .catch((err) => {
        SetLoadingPSP(true);
        console.log(err);
      });
  };

  // Fetch states on component mount
  useEffect(() => {
    HandleFetchState();
  }, []);

  // useEffect(() => {
  //   if (formValuess.propertyAddress) {
  //     // console.log("Updated Address Input:", addressInput);
  //     console.log("form values", formValuess);
  //     console.log("add", someValues);
  //     // Any other operations based on the updated `addressInput` state
  //   }
  // }, [formValuess]);

  const PlacesAutocomplete = ({ setSelected, setFormValuess }) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutoComplete({
      componentRestrictions: { country: "ng" },
    });

    const addressRef = useRef(value);

    const handleSelect = async (address) => {
      try {
        addressRef.current = address;

        // Get geocode and lat/lng
        const results = await getGeocode({ address });
        const { lat, lng } = getLatLng(results[0]);

        // Directly update form values state
        setFormValuess((prevState) => ({
          ...prevState,
          propertyAddress: address,
          pLatitude: lat.toString(),
          pLongitude: lng.toString(),
        }));

        // Update selected location
        setSelected({ lat, lng });

        setValue(address, false);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        clearSuggestions(); // Clear suggestions regardless of success or failure
      }
    };

    const clearInput = () => {
      setValue(""); // Clear the input value
      setFormValuess((prevState) => ({
        ...prevState,
        propertyAddress: "",
        pLatitude: "",
        pLongitude: "",
      }));
      clearSuggestions(); // Clear any remaining suggestions
    };

    return (
      <div className="relative">
        <Combobox onSelect={(address) => handleSelect(address)}>
          <div className="relative">
            <ComboboxInput
              value={value || formValuess.propertyAddress} // Controlled input value
              onChange={(e) => setValue(e.target.value)} // Update value with input changes
              disabled={!ready}
              placeholder="Search an address"
              className="border-2 px-2.5 py-3.5 pl-8 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
            />
            {/* Clear Icon */}
            {value && (
              <IoClose
                onClick={clearInput}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
                size={22}
              />
            )}
          </div>
          <ComboboxPopover>
            {status === "OK" && (
              <ComboboxList>
                {data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
              </ComboboxList>
            )}
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  };

  return (
    <main className="mt-4 mx-4 md:m-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover">
      <div className="md:mt-0 md:py-5 md:px-10 md:flex md:justify-between">
        <ToastContainer />
        <div className="hidden md:block md:p-10">
          <ParagraphLargeWhite content={"Sign Up"} />
        </div>

        <div className="md:mt-1 md:mb-10 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
          <div className="flex justify-start mt-6 ml-6 md:mt-2">
            <Link to="/propertyunit" smooth="true" duration={500}>
              <IoChevronBack
                size={28}
                className="bg-green text-white rounded-2xl"
              />
            </Link>
          </div>

          <div className="mt-4 mx-4 md:mt-2 md:text-center">
            <Paragraph2Xl content={"Set Up Your Property Account"} />
            <ParagraphSmall
              content={
                "Select your property address info to set up your account"
              }
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-6 mx-4 md:mt-2">
              <select
                id=""
                className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                onChange={handleStateChange}
              >
                <option>Select your state</option>
                {allState.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 mx-4 md:mt-2">
              <select
                id=""
                className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                onChange={handleLGAChange}
                disabled={!selectedState}
              >
                <option>Select your LGA</option>
                {selectedState &&
                  selectedState.lgas.map((lga) => (
                    <option key={lga.id} value={lga.id}>
                      {lga.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-6 mx-4 md:mt-2">
              <select
                id=""
                className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                onChange={handleWardChange}
                disabled={!selectedLGA}
              >
                <option>Select your ward</option>
                {selectedLGA &&
                  selectedLGA.wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-6 mx-4 md:mt-2">
              <PlacesAutocomplete
                setSelected={setSelected}
                setFormValuess={setFormValuess}
              />
            </div>

            <div className="mt-6 mx-4 md:mt-2">
              <select
                id="pspOperatorId"
                className="border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                onChange={formik.handleChange}
                value={formik.values.pspOperatorId}
                disabled={loadingPSP}
              >
                <option value="">Select PSP Operator</option>
                {PspOperatorList.map((operator) => (
                  <option key={operator.id} value={operator.id}>
                    {operator.operatorName}
                  </option>
                ))}
              </select>
              {formik.errors.pspOperatorId && (
                <ParagraphExtraSmallError
                  content={formik.errors.pspOperatorId}
                />
              )}
            </div>

            <div className="mt-6 mx-4 md:mt-2">
              <ButtonsPrimary
                name={"Continue"}
                isLoading={loading}
                isDisabled={loading}
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

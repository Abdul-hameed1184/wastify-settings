import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Radio,
  TextInput,
} from "flowbite-react";
import { ButtonsPrimary, ButtonsPrimaryBlack } from "../Buttons";
import { Paragraph2, ParagraphSmall, ParagraphSmall2, ParagraphXl } from "../Paragraph";
import { InputField, InputFieldSecondaryGreen } from "../InputField";
import { Formik, useFormik } from "formik";
import { getLGA, getState, getWard } from "../../api/extras/location.service";
import { ILga, IState } from "../../models/location.interface";
import { AxiosResponse } from "axios";
import { IProperty } from "../../models/property.interface";

type Props = {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  operator: IProperty;
};
const CreatePropertyModal: React.FC<Props> = ({ openModal, setOpenModal, operator }) => {
  const [states, setStates] = useState<IState[]>([]);
  const [lgas, setLgas] = useState<ILga[]>([]);
  const [wards, setWards] = useState<IState[]>([]);
  const [selectedState, setSelectedState] = useState<number>(0);
  const [selectedLga, setSelectedLga] = useState<number>(0);
  const [selectedWard, setSelectedWard] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const states: AxiosResponse = await getState();
      console.log(states.data.data);
      setStates(states.data.data);
    })();
  }, []);

  const getStateLGA = async (stateId: number) => {
    const lgas = await getLGA(stateId);
    console.log(lgas.data.data);
    setLgas(lgas.data.data);
  };

  const getLGAWard = async (lgaId: number) => {
    const wards = await getWard(lgaId);
    setWards(wards.data.data);
  };

  const selectLGA = async () => {};

  const selectWard = async () => {};

  const formik = useFormik({
    initialValues: {
      pLatitude: "",
      pLongitude: "",
      propertyAddress: "",
      propertyDescription: "",
      noOfDistinctApartment: 0,
      stateId: 0,
      lgaId: 0,
      wardId: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCreatePropertyForm = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Modal
      show={openModal}
      onClose={() => setOpenModal(false)}
      size={"md"}
      position={"top-right"}
    >
      <Modal.Header>Create Property </Modal.Header>
      <Formik
        initialValues={{
          pLatitude: "",
          pLongitude: "",
          propertyAddress: "",
          propertyDescription: "",
          noOfDistinctApartment: 0,
          stateId: 0,
          lgaId: 0,
          wardId: 0,
        }}
        onSubmit={(values) => {
          setOpenModal(!openModal);
          console.log(values);

          }}
      >
        {({ errors, touched, validateField, validateForm }) => (
          <div>
            <Modal.Body>
              <div className="space-y-6">
                {/* <Paragraph2 content={"Check if you want to bill or customers or selected customers"} /> */}
                <div>
                  <div className="">
                    <ParagraphSmall2 content={"Property Address"} />
                    <InputField
                      type="text"
                      placeholder="Property Address"
                      name="propertyAddress"
                      required
                      value={formik.values.propertyAddress}
                      onChange={formik.handleChange}
                      error={""}
     
                    />
                  </div>
                  <div className="">
                    <ParagraphSmall2 content={"Property Description"} />
                    <textarea
                      name="propertyDescription"
                      value={formik.values.propertyDescription}
                      id=""
                      cols={30}
                      rows={5}
                      onChange={formik.handleChange}
                      className="border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full text-black text-base mt-1 ring-gray  placeholder:text-gray focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                      placeholder="Property Description"
                    ></textarea>
                  </div>
                  <div>
                  <div className="w-full lg:w-4/5">
                    <ParagraphSmall content={"State:"+operator.stateName} />
                  </div>
                  <div className="w-full lg:w-4/5 flex gap-10">
                    <div className="w-3/6">
                      <ParagraphSmall content={"LGA/LCDA"+operator.lgaName} />
                      {/* <select
                        name="lga"
                        id="lga"
                        className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                        onChange={(e) => {
                          const id = parseInt(e.target.value, 10);
                          getLGAWard(id);
                          formik.setFieldValue("lgaId", id);
                          setSelectedLga(id);
                        }} // Manually set LGA field value
                        value={formik.values.lgaId} // Bind LGA to formik values
                        // disabled={} // Disable if no state is selected
                      >
                        <option value="" disabled selected>
                          Select LGA/LCDA
                        </option>
                        {lgas &&
                          lgas.map((lga: ILga) => (
                            <option key={lga.id} value={lga.id}>
                              {lga.name}
                            </option>
                          ))}
                      </select> */}
                      {/* {formik.errors.lga && (
                    <ParagraphExtraSmallError content={formik.errors.lga} />
                  )} */}
                    </div>

                    {/* Ward Selection */}
                    <div className="w-3/6">
                      <ParagraphSmall content={"Ward: "+operator.wardName} />
                      {/* <select
                        name="ward"
                        id="ward"
                        className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                        onChange={(e) => {
                          const id = parseInt(e.target.value, 10);
                          formik.setFieldValue("wardId", id);
                          setSelectedWard(id);
                        }} // Manually set Ward field value
                        value={formik.values.wardId} // Bind Ward to formik values
                        // disabled={} // Disable if no LGA is selected
                      >
                        <option value="" disabled selected>
                          Select Ward
                        </option>
                        {wards &&
                          wards.map((ward) => (
                            <option key={ward.id} value={ward.id}>
                              {ward.name}
                            </option>
                          ))}
                      </select> */}

                      {/* {formik.errors.ward && (
                    <ParagraphExtraSmallError content={formik.errors.ward} />
                  )} */}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className=" w-full">
                <ButtonsPrimary
                //  onClick={() => setOpenModal(false)}
                  name={"Create Property"}
                  type={"submit"}
                  loading={undefined}
                />
              </div>
            </Modal.Footer>
          </div>
        )}
      </Formik>
      <form onSubmit={handleCreatePropertyForm}></form>
    </Modal>
  );
};

export default CreatePropertyModal;

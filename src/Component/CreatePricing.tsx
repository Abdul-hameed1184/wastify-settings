import React from "react";
import { IApartmentType } from "../models/apartmentType.interface"
import { IPropertyType } from "../models/propertType.interface"
import {  useFormik } from "formik"
import { ParagraphSmall2, ParagraphXl } from "./Paragraph";
import { ButtonsPrimary } from "./Buttons";
import { IOperator } from "../models/operator.interface";
import { InputField } from "./InputField";
import { toast } from "react-toastify";
import { createBillSetup } from "../api/bill/psp-operator-pricing";
import { ICreateBill } from "../models/createbill.interface";
import { AxiosError } from "axios";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button";


type PricingProps = {
    openModal: boolean,
    handleModal: () => void,
    propertyType:  IPropertyType[],
    apartmentType: IApartmentType[]
}
export const CreatePricing:React.FC<PricingProps> =  ({openModal, handleModal, propertyType, apartmentType,}) =>{
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );


    const createPricingBill = useFormik({
        initialValues: {
            pspOperatorId: operator.id,
            propertyTypeId: propertyType[0].id,
            apartmentTypeId: apartmentType[0].id,
            amount: 0
        },
        onSubmit: async(values: ICreateBill) => {
            try{
            console.log(values);
            if(values.amount<= 0){
                      toast.error("Amount should be greater than 0")
                throw new Error("Amount should be greater than 0");
          
            }
            const data = await createBillSetup(values as ICreateBill);
            toast.success(data.data.message);
            }catch(e:unknown){
          const error = e as AxiosError<{ error: string }>;

    toast.error(error.response?.data?.error || "Unable to update bill");            }
            handleModal();
        }
    }) 

    return (
    <Modal isOpen={openModal} onClose={handleModal} size={"lg"} title="Create Price Setup">

            <form onSubmit={createPricingBill.handleSubmit}></form>
        <div className="flex gap-4 w-full">
        </div>
        <form onSubmit={createPricingBill.handleSubmit} >
            <div>
                          <ParagraphSmall2 content={"Property Type"} />
                          <div className="flex flex-row w-full items-center">
                            <select
                              className="form-select form-select-xl w-full mb-3 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base mt-1 ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                              aria-label=".form-select-lg example"
                              name="propertyTypeId"
                              onChange={(e) => {
                                                    createPricingBill.setFieldValue("propertyTypeId", parseInt(e.target.value))
                              }}
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
                  <ParagraphSmall2 content={"Apartment Type"} />

                  <div className="flex flex-row w-full items-center">

                      <select
                        className="form-select form-select-xl w-full mb-3 border-2 px-2 py-3 pl-5 bg-white shadow-sm rounded-lg block font-Poppins h-14 text-green text-base  ring-gray placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                        aria-label=".form-select-lg example"
                        name="apartmentTypeId"
                        onChange={(e) => {
                            createPricingBill.setFieldValue("apartmentTypeId", parseInt(e.target.value))
                        }}
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
                <div className="flex flex-row w-full items-center">
                    <InputField type="text" placeholder="Amount" name="amount" 
                           required
                  
                  onChange={(e) => {
                    createPricingBill.setFieldValue("amount", parseInt(e.target.value))
                  }}
                    />
                </div>
                                      <div className="mt-4">
                                        <Button
                                        type="submit"
                                        className="w-full"
                                        >Create Bill </Button>
                                      </div>
        </form>

    </Modal>
    )
} 
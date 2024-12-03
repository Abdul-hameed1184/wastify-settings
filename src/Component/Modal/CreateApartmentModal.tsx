import { Modal } from "flowbite-react";
import { Paragraph, Paragraph2Green, ParagraphError, ParagraphSmall2 } from "../Paragraph"
import { IProperty } from "../../models/property.interface"
import { useEffect, useState } from "react"
import { getCustomers } from "../../api/customer/customer.service";
import { createApartment, getApartmentType } from "../../api/property/apartment.service";
import { IApartmentType } from "../../models/propertType.interface";
import { ICustomer } from "../../models/customer.interface";
import { AxiosResponse } from "axios";
import { FormikValues, useFormik } from "formik";
import { toast } from "react-toastify";

type Props = {
    openModal: boolean;
    setOpenModal : (x:boolean)=>void;
    property: IProperty
}
const CreateApartmentModal:React.FC<Props> = ({ openModal, setOpenModal, property}) =>{

  const [ apartmentTypes, setApartmentTypes ] = useState<IApartmentType[]>();
  const [ customers, setCustomers ] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>()
  const [apartmentTypeId, setApartmentTypeId] = useState<number>();
  const [ errorMessage, setErrorMessage ] = useState<string>();

  useEffect(() => {

    (async()=> {
      const apartments = await getApartmentType();
      setApartmentTypes(apartments.data.data)
      const data:AxiosResponse = await getCustomers();
      setCustomers(data.data.data);
    })();
  },[])
    
  const handleSearchChange = (search:string) => { 
    const customer = customers.find((c) => c.phone === search);
    setSelectedCustomer(customer);
  }

  const handleCreateApartment = async (xapartment:FormikValues) => {
    try{
      const newApartment = await createApartment({propertyId: xapartment.propertyId, apartmentData: [{ customerId: selectedCustomer?.customerId, apartmentTypeId: xapartment.apartmentTypeId, description: "xxxx"}]})
      setOpenModal(!openModal)
      toast.success("Apartment successfully created")
    }catch(e:unknown){
      toast.error("No apartment created!!!");
      setErrorMessage("No apartment created!!!")
    }
  }
  const formik = useFormik<FormikValues>({
    initialValues: {
      propertyId: null,
        customerId: null,
        apartmentTypeId: null,
        description : ""
    },
    onSubmit: (values) => {
      console.log(selectedCustomer);
      handleCreateApartment(values);
    },
  });
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size={'md'} position={'top-right'}>
                    <form onSubmit={formik.handleSubmit}>
        <Modal.Header>Create Apartment </Modal.Header>
        <Modal.Body>
        { errorMessage && <ParagraphError content={errorMessage} />}
            <div className="space-y-6">
                {/* <Paragraph2 content={"Check if you want to bill or customers or selected customers"} /> */}
                <div>
                <div className="w-full lg:w-4/5">
              <Paragraph content={property.ownerFullName +", " + property.propertyTypeName }/>
             
              </div>
                <div className="w-full lg:w-4/5">
              <Paragraph content={property.propertyAddress +", " + property.wardName + " , " + property.lgaName +", "+property.stateName}/>
             
              </div>
                <div>
                  <ParagraphSmall2 content={"Apartment Type"}/>
                  <select 

                   className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                   onChange={(e) => {
                    const id = parseInt(e.target.value, 10);
                    setApartmentTypeId(id)
                    formik.setFieldValue("apartmentTypeId", id);
                    formik.setFieldValue("propertyId", property.id);
                  }} 
                  >
                  <option value="Apartment Type" disabled selected></option>
                  {
                      apartmentTypes && apartmentTypes.map((apartmentType:IApartmentType) => {
                      return ( <option key={apartmentType.id} value={apartmentType.id}>
                            {apartmentType.name}
                        </option>
                      )
                      })
                  }
                  </select>

                </div>
                <div>
                  <ParagraphSmall2 content={"Customer Name"}/>
                  <input list="customers"  
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                    formik.setFieldValue("customerId", selectedCustomer?.customerId);
                  }}
                  className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                  />
                  <datalist id="customers">
                                  {    
                                    customers && customers.map((customer) => {

                                     return  (
                                      <option key={customer.customerId} value={customer.phone}>
                        {customer.phone}
                      </option>)
                                    })
                                    

                  }

                    </datalist>
                    {selectedCustomer && <Paragraph2Green content={ selectedCustomer.firstname.toUpperCase() + " " + selectedCustomer.lastname.toUpperCase()} />}


                </div>
                </div>


            </div>
       
        </Modal.Body>
        <Modal.Footer>
            <div className=" w-full">
                <button
                  type="submit"
              className={`text-white bg-green  w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border 'bg-green'`}
>Create Apartment</button>
            </div>
        </Modal.Footer>
        </form>
    </Modal>
    )
}

export default CreateApartmentModal;
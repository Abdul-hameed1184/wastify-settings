import React, { useEffect, useState } from "react"
import { getPropertyByOperator } from "../../../api/psp-operator/psp-operator.service"
import { IOperator } from "../../../models/operator.interface"
import { IProperty } from "../../../models/property.interface";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { InputFieldSecondaryGreen } from "../../../Component/InputField";
import { Paragraph2Xl } from "../../../Component/Paragraph";
import { useFormik } from "formik";
import { IApartment } from "../../../models/apartment.interface";
import { getPropertyApartments } from "../../../api/property/apartment.service";

const CreateApartmentBill:React.FC = () => {
    const operator:IOperator =  JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
    const [ property, setProperty ] = useState<IProperty[]>([])
    const [ selectedProperty, setSelectedProperty ] = useState<IProperty>()
    const [ apartment, setApartment ] = useState<IApartment[]>([])
    useEffect(() => {
        (async() => {
            const data = await getPropertyByOperator(operator.id)
            console.log(data.data.data.data)
               setProperty(data.data.data.data);
        })()
    },[])



    const handlePropertySelected = (e) => {
        console.log(e.target.value);
        console.log(property)
        const data:IProperty[] = property.filter((x:IProperty )=> x.id === e.target.value)
        setSelectedProperty(data[0]);
        console.log(data)
        getApartments(data[0].id)
    }    

    const getApartments = async (id:number) => {
        const apartments = await getPropertyApartments(id);
        console.log(apartments)
    }



    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: ''
        },
        onSubmit: () => {
          //  SetLoading(true);
            // console.log(data);

            
        },
    });
  
    return (

                    <main className='md:m-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover'>
            <div className="md:mt-0 md:py-5 md:px-10 md:flex md:justify-between">
   


                <div className="md:mt-1 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
                    <div className="mt-4 md:mt-2 ">
                        <Paragraph2Xl content={"Create Apartment Bill"} />
    
                    </div>
                    <div className="mx-4 mt-8 md:mt-4">
                        <form onSubmit={formik.handleSubmit}>
                            {property && property.map((dy, index)=> <p key={index}>{dy.ownerId}</p>)}
                            <div className="mt-4">
                                <input placeholder={"Property List"} onChange={handlePropertySelected} list="propertylist" name={''} className="border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray  ${ error ? 'focus:ring-error' : 'focus:ring-gray"/>
                                <datalist id="propertylist">
                    {
                        property && property.map((dx:IProperty, index) => 
                            <option key={index} value={dx.id}>{dx.propertyAddress}</option>
   )
                        
                    }
                </datalist>
                               </div>
                 
                            {/* <div className="mt-4">
                                <InputFieldSecondaryGreen placeholder={"Last Name"} type={"text"} name={"lastname"} onChange={formik.handleChange} value={formik.values.lastname} />

                                {formik.errors.lastname ? <ParagraphExtraSmallError content={formik.errors.lastname} /> : null}
                            </div>
                            <div className="mt-4">
                                <InputFieldSecondaryGreen placeholder={"Email"} type={"email"} name={"email"} onChange={formik.handleChange} value={formik.values.email} />
                                {formik.errors.email ? <ParagraphExtraSmallError content={formik.errors.email} /> : null}
                            </div>
                            <div className="mt-4">
                                <InputFieldSecondaryGreen placeholder={"Phone number"} type={"text"} name={"phone"} onChange={formik.handleChange} value={formik.values.phone} />

                                {formik.errors.phone ? <ParagraphExtraSmallError content={formik.errors.phone} /> : null}
                            </div> */}
                            <div className="my-6">
                                <ButtonsPrimary name={"Create Apartment Bill"} type={"submit"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>


    )
}

export default CreateApartmentBill;
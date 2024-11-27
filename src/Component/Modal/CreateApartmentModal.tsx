import { Modal } from "flowbite-react";
import { ButtonsPrimary } from "../Buttons";
import { Paragraph, ParagraphSmall2 } from "../Paragraph"
import { IProperty } from "../../models/property.interface"
import { useEffect } from "react"

type Props = {
    openModal: boolean;
    setOpenModal : (x:boolean)=>void;
    property: IProperty
}
const CreateApartmentModal:React.FC<Props> = ({ openModal, setOpenModal, property}) =>{

  useEffect(() => {
    console.log(property);
  },[property])
    
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size={'md'} position={'top-right'}>
        <Modal.Header>Create Apartment </Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
                {/* <Paragraph2 content={"Check if you want to bill or customers or selected customers"} /> */}
                <div>
                <div className="w-full lg:w-4/5">
              <Paragraph content={property.propertyAddress +", " + property.wardName + " , " + property.lgaName +", "+property.stateName}/>
             
            </div>
            <div>
                {/* <div className="w-full lg:w-4/5">
              <Paragraph content={property.lgaName} />

              </div> */}
              {/* <div className="w-full lg:w-4/5">
              <ParagraphSmall2 content={property.wardName} />
              </div> */}
            </div>
              {/* <div className="">
                        <ParagraphSmall2 content={property.propertyDescription}/>                 </div> */}

                </div>


            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className=" w-full">
                <ButtonsPrimary onClick={() => setOpenModal(false)} name={"Create Apartment"} type={"button"} loading={undefined} />
            </div>
        </Modal.Footer>
    </Modal>
    )
}

export default CreateApartmentModal;
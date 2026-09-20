// import { Modal } from "flowbite-react";
// import React from "react";
// import { ButtonsPrimaryBlack, ButtonsWhite } from "../Buttons";

// type Props = {
//     openModal: boolean;
//     setOpenModal: (_x:boolean) => void;
//     header: string;
//     content: string | React.ReactNode;
//     buttonName: string;
//     handleConfirm: () => void;
// }

// const InfoModal:React.FC<Props> = ({openModal, setOpenModal, header, content, buttonName, handleConfirm }) => {
//     return (
//         <Modal show={openModal} onClose={() => setOpenModal(false)} size={'md'} popup>
//              <Modal.Header><span className="text-xl text-black">{header}</span></Modal.Header>
//              <Modal.Body>
//                 {content}
//              </Modal.Body>
//                          <Modal.Footer>
//                              <div className=" w-full flex flex-row gap-2 text-lg">
//                                 <ButtonsWhite onClick={() => setOpenModal(false)} name={"Cancel"}/>
//                                  <ButtonsPrimaryBlack onClick={() => {
//                                     setOpenModal(false);
//                                     handleConfirm();
//                                  }} name={buttonName} />
//                              </div>
//                          </Modal.Footer>
            
//         </Modal>
//     )
// }


// export default InfoModal;
import { Modal } from "flowbite-react"
import React, { useState } from "react"
import { IApartment } from "../../models/apartment.interface"


type Props = {
    apartment:IApartment
    openModal: boolean;
    setUpdateModal: (x:boolean)=>void
}
export const UpdateApartmentModal:React.FC<Props> = ({apartment, openModal, setUpdateModal}) => {
    return (
                <Modal show={openModal} onClose={() => setUpdateModal(!openModal)} size={'md'} position={'top-right'}>
                    <Modal.Header>Update Apartment </Modal.Header>
                    <Modal.Body>
                            <p>Update Apartment</p>
                    </Modal.Body>
                </Modal>
    )
}
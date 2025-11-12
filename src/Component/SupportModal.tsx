import React from 'react'
import { Button, Modal } from 'flowbite-react';
import Input from './InputField';
const SupportModal = ({ openModal, setOpenModal }) => {
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size={'md'} position={'center-right'}>
            <div className="border rounded-lg">

                <Modal.Header>Support Message</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="">
                            <label htmlFor="fullname">Full Name</label>
                            <Input name={'fullname'} placeholder={'my name'}  />
                        </div>
                        <div className="">
                            <label htmlFor="email">Email</label>
                            <Input name={'email'} placeholder={'myname@yahoo.com'} type={'email'}  />
                        </div>
                        <div className="">
                            <label htmlFor="message">Message</label>
                        <textarea id="message" name="messages" cols="30" rows="5" className='border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full text-black text-base mt-1 ring-gray  placeholder:text-gray focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray'></textarea>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='w-full'>
                    <Button onClick={() => setOpenModal(false)} className=' bg-green w-full'>Send</Button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default SupportModal
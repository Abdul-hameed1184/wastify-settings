import React from 'react'
import Input from './InputField';
import { Modal } from './Modal/Modal';
import { Button } from './Button';

interface SupportModalProps {
    openModal: boolean;
    setOpenModal: () => void;
}

export const SupportModal:React.FC<SupportModalProps> = ({ openModal, setOpenModal }: SupportModalProps) => {
    return (
        <Modal className="glass" position="bottom-right" title="Support Message" isOpen={openModal} onClose={() => setOpenModal()} size={'md'} >
            <div>



                    <div className="space-y-6">
                        <div className="mt-2">
                            <label htmlFor="fullname">Full Name</label>
                            <Input name={'fullname'} placeholder={'Jamiu Richards'}  />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="email">Email</label>
                            <Input name={'email'} placeholder={'email@email.com'} type={'email'}  />
                        </div>
                        <div className="mt-2 mb-4">
                            <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Enter your message here" 
                        cols={30} rows={5} 
                        className='border-2 px-2.5 py-3.5 pl-8 bg-white shadow-sm rounded-lg block font-Poppins w-full text-black text-base mt-1 placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent'></textarea>

                        </div>
                    </div>  
           
   
                    <Button onClick={() => setOpenModal()} className=' bg-green w-full mt-4'>Send Mail</Button>
           
            </div>
        </Modal>
    )
}

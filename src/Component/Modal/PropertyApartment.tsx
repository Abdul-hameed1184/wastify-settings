import React from 'react'
import { IApartment } from '../../models/apartment.interface'

type Props = {
    apartment:IApartment
}
const PropertyApartment:React.FC<Props> = ({apartment}) => {
  return (
    <div className='border border-2 border-gray-200 p-2 m-2 shadow-md hover:shadow-lg transition-shadow duration-300 cursor- rounded-md'>
        <h3 className='font-semibold text-lg'>{apartment.propertyAddress}</h3>
        <p className='text-sm text-gray-600'>{apartment.apartmentTypeName}: {apartment.status}</p>
    </div>
  )
}

export default PropertyApartment
import React from 'react'
type Props = {
  content: string
}

export const ParagraphSmall :React.FC<Props>= ({content}) => {
  return (
    <p className='text-sm font-Poppins font-medium not-italic text-gray leading-6 m-4'>{content}</p>
  )
}
export const ParagraphSmallBlack :React.FC<Props>= ({content}) => {
  return (
    <p className='text-sm font-Poppins font-normal not-italic text-black leading-6 m-4'>{content}</p>
  )
}
export const ParagraphSmall2 :React.FC<Props>= ({content}) => {
  return (
    <p className='text-sm m-2 font-Poppins font-light not-italic text-gray leading-6 '>{content}</p>
  )
}
export const ParagraphSmall2White :React.FC<Props>= ({content}) => {
  return (
    <p className='text-sm m-2 font-Poppins font-light not-italic text-white leading-6 '>{content}</p>
  )
}
export const Paragraphbase2White :React.FC<Props>= ({content}) => {
  return (
    <p className='text-base my-2 font-Poppins font-light italic text-white leading-6 '>{content}</p>
  )
}
export const ParagraphExtraSmall :React.FC<Props>= ({content}) => {
  return (
    <p className='text-xxs font-Poppins font-thin not-italic text-white leading-2'>{content}</p>
  )
}
export const ParagraphExtraSmallError :React.FC<Props>= ({content}) => {
  return (
    <p className='text-sm font-Poppins font-thin not-italic text-error text-center leading-2 m-1'>{content}</p>
  )
}

export const Paragraph :React.FC<Props>= ({content}) => {
  return (
    <p className='text-base font-inter font-medium not-italic text-gray leading-6 m-4'>{content}</p>
  )
}
export const ParagraphTextSettings :React.FC<Props>= ({content}) => {
  return (
    <p className='text-base font-inter font-thin not-italic text-gray leading-6 m-4'>{content}</p>
  )
}

export const ParagraphSettings :React.FC<Props>= ({content}) => {
  return (
    <p className='text-2xl font-inter font-medium not-italic text-gray leading-6 m-4'>{content}</p>
  )
}
export const ParagraphBlack :React.FC<Props>= ({content}) => {
  return (
    <p className='text-base font-inter font-medium not-italic text-black leading-6 m-4'>{content}</p>
  )
}

export const ParagraphNoMargin :React.FC<Props>= ({content}) => {
  return (
    <p className='text-base font-inter font-medium not-italic text-gray leading-6'>{content}</p>
  )
}

export const Paragraph2 :React.FC<Props>= ({content}) => {
  return (
    <p className='text-base m-2 font-inter font-bold not-italic text-gray leading-6'>{content}</p>
  )
}

export const Paragraph2Green :React.FC<Props>= ({content}) => {
  return (
    <p className='text-base m-2 font-inter font-bold not-italic text-green leading-6'>{content}</p>
  )
}
export const ParagraphXl :React.FC<Props>= ({content}) => {
  return (
    <p className='text-xl font-inter font-semibold not-italic text-gray leading-6 m-4'>{content}</p>
  )
}
export const ParagraphXlWhite :React.FC<Props>= ({content}) => {
  return (
    <p className='text-xl font-inter font-semibold not-italic text-white leading-6'>{content}</p>
  )
}

export const ParagraphXlGreenNoMargin :React.FC<Props>= ({content}) => {
  return (
    <p className='text-xl font-inter font-semibold not-italic text-green leading-6 m-1'>{content}</p>
  )
}

export const Paragraph2Xl :React.FC<Props>= ({content}) => {
  return (
    <p className='text-2xl font-Poppins font-bold not-italic text-black leading-8 m-4'>{content}</p>
  )
}
export const Paragraph2XlWhite :React.FC<Props>= ({content}) => {
  return (
    <p className='text-2xl font-Poppins font-semibold not-italic text-white leading-8 m-4'>{content}</p>
  )
}
export const Paragraph2XlGreen :React.FC<Props>= ({content}) => {
  return (
    <p className='text-2xl font-Poppins font-semibold not-italic text-green leading-6'>{content}</p>
  )
}
export const Paragraph2XlGreenMargin :React.FC<Props>= ({content}) => {
  return (
    <p className='text-2xl font-Poppins font-semibold not-italic text-green leading-6 m-4'>{content}</p>
  )
}

export const ParagraphLarge :React.FC<Props>= ({content}) => {
  return (
    <p className='text-3xl font-Poppins font-semibold not-italic text-black leading-8 m-4'>{content}</p>
  )
}
export const ParagraphLargeHome :React.FC<Props>= ({content, name}) => {
  return (
    <p className='text-3xl font-Poppins font-normal not-italic text-black leading-15 m-4'>{content} <span className='font-bold text-green'>{name}</span></p>
  )
}
export const ParagraphLargeGreen :React.FC<Props>= ({content}) => {
  return (
    <p className='text-3xl font-Poppins font-semibold not-italic text-green leading-8 m-4'>{content}</p>
  )
}
export const ParagraphLargeNoMargin :React.FC<Props>= ({content}) => {
  return (
    <p className='text-3xl font-Poppins font-semibold not-italic text-black leading-8'>{content}</p>
  )
}
export const ParagraphLargeMarginItalic :React.FC<Props>= ({content}) => {
  return (
    <p className='text-3xl font-Poppins font-thin italic text-black leading-8 m-4'>{content}</p>
  )
}

export const ParagraphLargeWhite :React.FC<Props>= ({content}) => {
  return (
    <p className='text-3xl font-Poppins font-semibold not-italic text-white leading-8 m-4'>{content}</p>
  )
}
export const ParagraphLargeWhite4xl :React.FC<Props>= ({content}) => {
  return (
    <p className='text-4xl font-Poppins font-bold not-italic text-black leading-8 m-4'>{content}</p>
  )
}
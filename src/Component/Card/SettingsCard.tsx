import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ParagraphSettings, ParagraphTextSettings } from '../Paragraph'


type SettingProps = {
  icon: ReactNode,
  title: string,
  text: string,
  path: string
}
const SettingsCard:React.FC<SettingProps> = ({icon, title, text, path}) => {
  return (
    <Link to={path} className='h-40 my-2 mx-2 inline-block border border-Oldgreen rounded-lg ring-2 ring-transparent shadow p-4 w-full md:w-[45%] '>
        <div className="flex gap-10 items-center">
            <div className="h-8 w-8 ">
                {icon}
            </div>
            <div className="">
                <ParagraphSettings content={title} />
                <ParagraphTextSettings content={text} />
            </div>

        </div>

    </Link>
  )
}

export default SettingsCard
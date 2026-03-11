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
    <Link to={path} className='bg-white group block border border-gray-300 rounded-2xl shadow-sm hover:shadow-md  hover:bg-gray-50 transition-all p-6'>
        <div className="flex gap-4 items-start">
            <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center p-3 rounded-xl bg-gray-50 text-gray-500 group-hover:bg-green/10 group-hover:text-green transition-colors">
                {icon}
            </div>
            <div className="flex flex-col pt-1">
                <h3 className="font-bold text-gray-900 text-lg tracking-tight mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
            </div>
        </div>
    </Link>
  )
}

export default SettingsCard
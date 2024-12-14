import React from 'react'
import { Link } from 'react-router-dom'
import { ParagraphSettings, ParagraphTextSettings } from '../Paragraph'

const SettingsCard = ({icon, title, text, path}) => {
  return (
    <Link to={path} className='w-full h-40 inline-block border border-Oldgreen rounded-lg ring-2 ring-transparent shadow p-5 '>
        <div className="flex gap-10 items-center">
            <div className="h-10 w-10 ">
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
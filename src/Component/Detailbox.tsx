import React from "react"

interface DetailItem {
  label: string
  value: string | number
}

interface DetailBoxProps {
  title: string
  items: DetailItem[]
  className?: string
}

const DetailBox: React.FC<DetailBoxProps> = ({ title, items, className }) => {
  return (
    <div className={`lg:w-2/5 m-4 w-full ${className} shadow-lg border rounded-2xl  p-6 bg-white}`}>
  
        <h2 className="text-2xl font-semibold text-gray-700 px-3">
          {title}
        </h2>

        <div className="space-y-4 mt-2">
          {items.map((item, index) => (
            <div key={index}>
              <span className="block text-sm font-medium text-gray-500">
                {item.label}
              </span>
              <span className="block text-lg font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
    </div>
  )
}

export default DetailBox

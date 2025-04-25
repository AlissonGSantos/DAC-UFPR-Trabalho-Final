import React from 'react'
import CheckinTable from './components/CheckinTable/CheckinTable'

function page() {
  return (
    <div className="flex justify-center w-full mt-16">
      <div className="w-3/4">
        <CheckinTable />
      </div>
    </div>
  )
}

export default page
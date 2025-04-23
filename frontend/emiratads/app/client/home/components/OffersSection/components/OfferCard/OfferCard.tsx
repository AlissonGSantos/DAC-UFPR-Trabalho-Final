import React from 'react'

export interface OfferCardProps {
    title: string;
    description: string;
    image?: string;
    price: string;
}

const OfferCard = () => {
  return (
    <div className='bg-slate-600 border-2 border-y-indigo-950'>OfferCard</div>
  )
}

export default OfferCard
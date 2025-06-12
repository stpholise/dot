import React from 'react'
interface PageTitleProp {
    MainTitle?: string;
    SubTitle?: string;
    Text?: string;
}
const PageTitle = ({MainTitle, SubTitle, Text} :PageTitleProp) => {
  return (
    <div>
        <h1 className='font-medium text-3xl text-black'>{MainTitle}</h1>
        <p className='font-medium text-sm text-[#454547]'>{Text}</p>
        <h1 className='font-medium text-2xl text-black'>{SubTitle}</h1>
    </div>
  )
}

export default PageTitle
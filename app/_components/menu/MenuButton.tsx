import Image from 'next/image'

const MenuButton = () => {
  return (
    <div>
        <div className="">
           <Image
              src={"/icons/dot_log.svg"}
              alt='logo'
              width={40} 
              height={40}
              className=''
              />
            

        </div>
    </div>
  )
}

export default MenuButton
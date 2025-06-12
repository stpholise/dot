import clsx from 'clsx'
import Image from 'next/image';
interface Step {
  id:  number;
  title: string;
  image?: string;
  style?: string;
  length: number;
}
const StepCard = ({id, title, image, style, length}: Step) => {
  return (
    <div>
         <div className="flex gap-2">
              {[...Array(length)].map((_,index) => (
                <div
                  key={index}
                  className={clsx("w-12 h-1 rounded-sm  ", {
                    'bg-gray-300': id !== index,
                    'bg-gray-400' : id === index
                  })}
                ></div>
              ))}
            </div>
            <div className="">
              <div className="">step {id} of {length}</div>
              <h3>{title}</h3>
              <Image 
                alt={title}
                src={image? image : ''}
                height={90}
                width={200}
                className={clsx('', {style})}
              />
            </div>
    </div>
  )
}

export default StepCard
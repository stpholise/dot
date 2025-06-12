import StepCard from "../cards/StepCard"
interface Step {
  id:  number;
  title: string;
  image?: string;
  style?: string;
}
const steps: Step[] = [
  {
    id: 0,
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 1,
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 2,
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 3,
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 4,
    title: "Who is this account being created for?",
    image: "",
    style: "",
  },
];

const AccountCreation = () => {
  return (
    <div>
         <div className="">
          <div className="">
            <p className="text-sm text-[#454547]">
              Dot MFB Account Opening \ Create Account
            </p>
            <h3 className="">Create a Dot MFB Account</h3>
          </div>
          <div className="w-96 h-80 border-4 border-amber-500">
          {
            steps.map((item) =>(
                <StepCard   key={item.id} id={item.id} title={item.title} image={item.image} style={item.style} length={steps.length} />
            ))
          }
          </div>
        </div>
        <div className=""></div>
    </div>
  )
}

export default AccountCreation
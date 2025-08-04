import { faker } from "@faker-js/faker";

export type DummyRemittance = {
  sn: number;
  remittanceName: string;
  remittanceAmount: string;
  remittanceDate: string;
  remittanceTime: string;
  remittanceStatus: "Submitted" | "Pending";
};

const generateDummyRemittance = (count: number): DummyRemittance[] => {
  const remittance: DummyRemittance[] = [];
  for (let i = 1; i < count; i++) {
    const remittanceStatus = faker.helpers.arrayElement([
      "Submitted",
      "Pending",
    ]);
    const remittanceAmount = faker.commerce.price({
      min: 1000,
      max: 5000,
      dec: 2, 
    });
    const remittanceDate = faker.date.between({
      from: "2020-01-01T00:00:00.000Z",
      to: new Date(),
    });

    remittance.push({
      sn: i,
      remittanceName: " DLTE-" + faker.string.numeric(10),
      remittanceDate: remittanceDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      remittanceTime: remittanceDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      remittanceAmount,
      remittanceStatus,
    });
  }

  return remittance;
};

export const dummyRemittance: DummyRemittance[] = generateDummyRemittance(40);


export interface DummyLoanData {
  customerName: string;
  loanedAmount: string;
  repaidAmount: string;
  tenure: string;
  instalment: string;
  overdue: string;
  repayment: string;
}

const GenerateDummyRepaymentData = (count: number) => {
  const  loanData :DummyLoanData[] = []
  
  for(let i = 1 ; i <= count; i++) { 

    const loanedAmount = Number(faker.commerce.price({
      min: 1000,
      max:20000,
      dec: 2,
    }))
    const repaidAmount = faker.commerce.price({
      min: 500, 
      max: loanedAmount,
      dec:2,
    }) 
    const tenure = faker.number.int({min:6, max:52})

    const instalment = Math.ceil(loanedAmount/tenure) + 10
    
    const overdue = Math.random() < 0.7 ? 'N/A' : faker.number.int({min:1, max:tenure})
    
    const repayment= faker.number.int({min:6, max:tenure})


    loanData.push({
        customerName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        loanedAmount: `${loanedAmount.toLocaleString('en-NG', {minimumFractionDigits: 2})}`,
        repaidAmount,
        tenure: `${tenure} weeks`,
        instalment: `${instalment}`,
        overdue: ` ${overdue}`,
        repayment: `week ${repayment}`,
    })

  }
  return loanData
}

export const dummyLoanData: DummyLoanData[] = GenerateDummyRepaymentData(20)
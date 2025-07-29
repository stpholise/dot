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
      symbol: "₦",
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

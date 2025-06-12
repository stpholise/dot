import { faker } from '@faker-js/faker'

export type DummyUser = {
  sn: number;
  accountName: string;
  accountNumber: string;
  gender: 'Male' | 'Female';
  phoneNumber: string;
  bvnStatus: 'Submitted' | 'N/A';
  createdAt: string;
};



const generateDummyUsers = (count: number): DummyUser[] => {
  const users: DummyUser[] = [];

  for (let i = 1; i <= count; i++) {
    const gender = faker.helpers.arrayElement(['Male', 'Female']);
    const bvnStatus = faker.helpers.arrayElement(['Submitted', 'N/A']);
    const createdAt = faker.date.between({
      from: new Date(new Date().getFullYear(), 0, 1),
      to: new Date(),
    });

    users.push({
      sn: i,
      accountName: `${faker.person.firstName()} ${faker.person.lastName()}`,
      accountNumber: faker.string.numeric(10),
      gender,
      phoneNumber: faker.string.numeric(12),
      bvnStatus,
      createdAt: createdAt.toLocaleDateString(),
    });
  }

  return users;
};

export const dummyUsers: DummyUser[] = generateDummyUsers(80);
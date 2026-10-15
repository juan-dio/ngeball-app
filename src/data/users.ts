export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
};

export const USERS: User[] = [
  {
    id: "123123123",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    verified: true,
  },
  {
    id: "123123124",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    verified: false,
  },
  {
    id: "123123125",
    email: "bob.johnson@example.com",
    firstName: "Bob",
    lastName: "Johnson",
    verified: true,
  },
  {
    id: "123123126",
    email: "alice.williams@example.com",
    firstName: "Alice",
    lastName: "Williams",
    verified: true,
  },
  {
    id: "123123127",
    email: "charlie.brown@example.com",
    firstName: "Charlie",
    lastName: "Brown",
    verified: false,
  },
];

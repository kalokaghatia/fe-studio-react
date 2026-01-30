import { api } from "@/lib/api";
import { User } from "@/models/user";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getUsers = async (): Promise<User[]> => {
  // const res = await api.get<User[]>("/users");
  // return res.data;
  
  await delay(600);
 
  return [
    {
      id: "1",
      email: "mario@example.com",
      name: "Mario Rossi", 
    },
    {
      id: "2",
      email: "luigi@example.com",
      name: "Luigi Verdi",
    }
  ];
};

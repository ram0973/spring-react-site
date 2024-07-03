import {Person} from "../model/Person.ts";
import axiosInstance from "../../../services/axios/axiosInstance.ts";

export const getPersons = async () => {
  return (await axiosInstance.get('/api/v1/persons')).data.persons;
}

export async function getPerson(id: number | undefined) {
  return (await axiosInstance.get(`/api/v1/persons/${id}`)).data;
}

export const createPerson = async (person: Person) => {
  await axiosInstance.post("persons", person);
}

export const updatePerson = async (person: Person) => {
  await axiosInstance.put(`persons/${person.id}`, person);
}

export const deletePerson = async (id: number) => {
  await axiosInstance.delete(`persons/${id}`);
}

// export async function getPersonsPaged(page?: number): Promise<Person[]> {
//   const offset = page ? (page - 1) * 10 : 0;
//   const searchParams = new URLSearchParams({
//     limit: "10",
//     offset: `${offset}`,
//   });
//   const BASE_URL = "https://localhost:8080/api/v1";
//   const response = await axiosInstance.get<Person[]>(`${BASE_URL}/articles/feed?` + searchParams, {
//     method: "GET",
//   });
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   console.log("FETCH articles resolved");
//   return await response.json();
//}
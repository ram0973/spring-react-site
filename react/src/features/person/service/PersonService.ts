import {Person} from "../model/Person.ts";
import axiosInstance from "../../common/axiosInstance.ts";

export async function getPersons(page?: number): Promise<Person[]> {
  const offset = page ? (page - 1) * 10 : 0;
  const searchParams = new URLSearchParams({
    limit: "10",
    offset: `${offset}`,
  });
  const BASE_URL = "https://localhost:8080/api/v1";
  const response = await axiosInstance.get<Person[]>(`${BASE_URL}/articles/feed?` + searchParams, {
    method: "GET",
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  console.log("FETCH articles resolved");
  return await response.json();
}
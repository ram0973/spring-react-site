import {Person} from "../models/Person.ts";
import publicApi from "../../common/api-client.ts";

export async function getPersons(page?: number): Promise<Person[]> {
  const offset = page ? (page - 1) * 10 : 0;
  const searchParams = new URLSearchParams({
    limit: "10",
    offset: `${offset}`,
  });
  const BASE_URL = "https://localhost:8080/api/v1";
  console.log("FETCH", `${BASE_URL}/articles/feed?` + searchParams);

  const response = await publicApi.get<Person[]>(`${BASE_URL}/articles/feed?` + searchParams, {
    method: "GET",
    headers: setHeaders(token),
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  console.log("FETCH articles resolved");
  return await response.json();
}
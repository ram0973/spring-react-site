import {Person} from "../../entities/person/model/Person.ts";

export type AuthContextType = {
  person: Person,
  login: (data: object) => void,
  logout: () => void,
} | null;
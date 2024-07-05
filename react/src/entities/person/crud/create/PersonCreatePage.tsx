import {PersonForm} from "../PersonForm.tsx";
import {Person} from "../../model/Person.ts";
import React from "react";

export const PersonCreatePage: React.FC = () => {
  const defaultPerson: Person = {id: 0, email: "", enabled: true}
  return <PersonForm isCreate={true} preloadedValues={defaultPerson} isError={false} isLoading={false}
                      errorMessage={""} />;
};

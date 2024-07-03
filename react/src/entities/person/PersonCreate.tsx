import {PersonEditRequestDto} from "../dto/PersonEditRequestDto.ts";
import PersonForm from "./PersonForm.tsx";
import {useCreatePerson} from "./service/mutations.ts";
import {data} from "autoprefixer";
import {useEffect, useState} from "react";
import {useGetPerson} from "./service/queries.ts";

const PersonCreate = () => {

  const {
    mutate,
    error,
    isPending,
    isError,
    isSuccess
  } = useCreatePerson();


  const handlePersonCreate = (person: PersonEditRequestDto) => { mutate(person); }

  return (
    <PersonForm data={null} isError={isError} isLoading={isPending} isSuccess={isSuccess}
                errorMessage={error?.response?.data?.message} onFormSubmit={handlePersonCreate}
    />
  );
};

export default PersonCreate;
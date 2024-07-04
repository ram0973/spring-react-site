import {useNavigate, useParams} from "react-router-dom";
import PersonForm from "./PersonForm.tsx";
import {useUpdatePerson} from "./service/mutations.ts";
import {Person} from "./model/Person.ts";
import {useEffect, useState} from "react";
import {useGetPerson} from "./service/queries.ts";
import {getPerson} from "./service/api.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const PersonUpdate = () => {

  const params = useParams();
  const id = Number(params?.id)

  // const {
  //   data,
  //   mutate,
  //   isPending,
  //   error,
  //   isError,
  //   isSuccess
  // } = useUpdatePerson();

  const {data, isError, isPending, isSuccess} = useGetPerson(id);
  const person = {...data}
  const mutation = useUpdatePerson()
  const handleCreateOrUpdatePerson = () => {
    console.log("submitted")
    mutation.mutate();
  }

  const navigate = useNavigate();

  return (
    <PersonForm preloadedValues={person}
                isError={isError}
                isLoading={isPending}
                isSuccess={isSuccess}
                errorMessage={error?.response?.data?.message}
                onFormSubmit={handleCreateOrUpdatePerson}
    />
  );
};

export default PersonUpdate;
import {useNavigate, useParams} from "react-router-dom";
import {PersonEditRequestDto} from "../dto/PersonEditRequestDto.ts";
import {useUpdatePerson} from "./useUpdatePerson.ts";
import PersonForm from "./PersonForm.tsx";
import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../../common/axiosInstance.ts";
import React, {useState} from "react";

const PersonUpdate = () => {

  const {id} = useParams();

  const { data } = useQuery({
    queryKey: ['person', id],
    queryFn: () => axiosInstance.get(`person/${id}`)
  })

  const {
    mutate,
    isPending,
    error,
    isError,
    isSuccess
  } = useUpdatePerson(id);

  const handleCreateOrUpdatePerson = (person: PersonEditRequestDto) => {
    console.log("submitted")
    mutate(person);
  }

  const navigate = useNavigate();

  return (
    <PersonForm isCreate={isCreate}
                isError={isError}
                isLoading={isPending}
                isSuccess={isSuccess}
                errorMessage={error?.response?.data?.message}
                onFormSubmit={handleCreateOrUpdatePerson}
    />
  );
};

export default PersonUpdate;
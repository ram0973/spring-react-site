import {useNavigate, useParams} from "react-router-dom";
import {PersonEditRequestDto} from "../dto/PersonEditRequestDto.ts";
import {useCreateOrEditPerson} from "./useCreateOrEditPerson.ts";
import PersonCreateOrEditForm from "./PersonCreateOrEditForm.tsx";
import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../../common/axiosInstance.ts";
import React, {useState} from "react";

const PersonCreateOrEditPage = () => {

  const {id} = useParams();

  const [isCreate, setIsCreate] = useState(true)

  React.useEffect(() => {
    if (id) {
      setIsCreate(false);
    }
  }, [id])

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
  } = useCreateOrEditPerson(id);

  const handleCreateOrUpdatePerson = (person: PersonEditRequestDto) => {
    mutate(person);
  }

  const navigate = useNavigate();

  return (
    <PersonCreateOrEditForm isCreate={isCreate}
                            isError={isError}
                            isLoading={isPending}
                            isSuccess={isSuccess}
                            errorMessage={error?.response?.data?.message}
                            onFormSubmit={handleCreateOrUpdatePerson}
    />
  );
};

export default PersonCreateOrEditPage;
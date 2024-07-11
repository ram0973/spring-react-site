import {AxiosError} from "axios";
import {useNavigate, useParams} from "react-router-dom";

import {useGetPerson} from "../view/useGetPerson.ts";
import {AxiosErrorResponseDto} from "../../../../services/axios/AxiosErrorResponseDto.ts";
import {PersonUpdateForm} from "./PersonUpdateForm.tsx";
import {SubmitHandler} from "react-hook-form";
import {PersonUpdateFormData} from "./zod.ts";
import {useUpdatePerson} from "./useUpdatePerson.ts";

export const PersonUpdatePage = () => {
  const updateMutation = useUpdatePerson()
  const navigate = useNavigate();
  const {id} = useParams();
  const query = useGetPerson(parseInt(id));
  const errorData = (query.error as AxiosError)?.response?.data as AxiosErrorResponseDto

  const onSubmitHandler: SubmitHandler<PersonUpdateFormData> = (data) => {
    updateMutation.mutate(data);
    navigate(`/admin/persons/view/${data.id}`);
  }
  return (<PersonUpdateForm person={query.data} isError={query.isError} isLoading={query.isPending}
                            errorMessage={errorData?.message} onFormSubmit={onSubmitHandler}/>);
}

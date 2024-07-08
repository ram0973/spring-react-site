import {AxiosError} from "axios";
import {useParams} from "react-router-dom";
import {PersonForm} from "../PersonForm.tsx";
import {useGetPerson} from "../view/useGetPerson.ts";
import {AxiosErrorResponseDto} from "../../../../services/axios/AxiosErrorResponseDto.ts";

export const PersonUpdatePage = () => {
  const params = useParams();
  const id = Number(params?.id)
  const query = useGetPerson(id);
  const errorData = (query.error as AxiosError)?.response?.data as AxiosErrorResponseDto
  return (<PersonForm isCreate={false} preloadedValues={query.data} isError={query.isError} isLoading={query.isPending}
                      errorMessage={errorData?.message}/>);
}

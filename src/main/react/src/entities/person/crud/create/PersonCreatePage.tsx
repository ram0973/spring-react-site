import {PersonCreateForm} from "./PersonCreateForm.tsx";
import {useCreatePerson} from "./useCreatePerson.ts";
import {useNavigate} from "react-router-dom";
import {SubmitHandler} from "react-hook-form";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "../../../../services/axios/AxiosErrorResponseDto.ts";
import {PersonCreateFormData} from "./zod.ts";

export const PersonCreatePage = () => {
  const createMutation = useCreatePerson()
  const errorData = (createMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<PersonCreateFormData> = async (person: PersonCreateFormData) => {
    const mutationResult = await createMutation.mutateAsync(person);
    const id = mutationResult.data.id;
    navigate(`/admin/persons/view/${id}`);
  }

  return (<PersonCreateForm isError={createMutation.isError}
                            isLoading={createMutation.isPending}
                            errorMessage={errorData?.message}
                            onFormSubmit={onSubmitHandler} />);
}
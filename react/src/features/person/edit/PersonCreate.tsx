import {PersonEditRequestDto} from "../dto/PersonEditRequestDto.ts";
import PersonForm from "./PersonForm.tsx";
import useCreatePerson from "./useCreatePerson.ts";

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
    <PersonForm isError={isError} isLoading={isPending} isSuccess={isSuccess}
                errorMessage={error?.response?.data?.message} onFormSubmit={handlePersonCreate}
    />
  );
};

export default PersonCreate;
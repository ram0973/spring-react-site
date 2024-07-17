import {ArticleCreateForm} from "./ArticleCreateForm.tsx";
import {useCreateArticle} from "./useCreateArticle.ts";
import {useNavigate} from "react-router-dom";

import {AxiosError} from "axios";
import {ArticleCreateRequestDto} from "../../model/ArticleCreateRequestDto.ts";
import {AxiosErrorResponseDto} from "../../../../services/axios/AxiosErrorResponseDto.ts";

export const ArticleCreatePage = () => {
  const createMutation = useCreateArticle()
  const errorData = (createMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto
  const navigate = useNavigate();

  const onSubmitHandler = async (article: ArticleCreateRequestDto) => {
    createMutation.mutate(article);
    const id = createMutation.data.id;
    navigate(`/articles/view/${id}`);
  }

  return (<ArticleCreateForm isError={createMutation.isError}
                             isLoading={createMutation.isPending}
                             errorMessage={errorData?.message}
                             onFormSubmit={onSubmitHandler} />);
}
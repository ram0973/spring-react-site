import {AxiosError} from "axios";
import {useNavigate, useParams} from "react-router-dom";

import {AxiosErrorResponseDto} from "../../../../services/axios/AxiosErrorResponseDto.ts";
import {ArticleUpdateForm} from "./ArticleUpdateForm.tsx";
import {SubmitHandler} from "react-hook-form";
import {ArticleUpdateFormData} from "./zod.ts";
import {useUpdateArticle} from "./useUpdateArticle.ts";
import {useGetArticle} from "../view/useGetArticle.ts";

export const ArticleUpdatePage = () => {
  const updateMutation = useUpdateArticle()
  const navigate = useNavigate();
  const {id} = useParams();
  const query = useGetArticle(parseInt(id));
  const errorData = (query.error as AxiosError)?.response?.data as AxiosErrorResponseDto

  const onSubmitHandler: SubmitHandler<ArticleUpdateFormData> = (data) => {
    updateMutation.mutate(data);
    navigate(`/articles/view/${data.id}`);
  }
  return (<ArticleUpdateForm article={query.data} isError={query.isError} isLoading={query.isPending}
                             errorMessage={errorData?.message} onFormSubmit={onSubmitHandler}/>);
}

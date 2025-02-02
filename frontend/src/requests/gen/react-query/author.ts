/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import {
  useMutation
} from '@tanstack/react-query'
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'
import type {
  AuthorCreate,
  AuthorRead,
  HTTPValidationError
} from './fastAPI.schemas'
import { customInstance } from '../../Axios';
import type { ErrorType } from '../../Axios';




/**
 * Route to create a new author.
 * @summary Create Author
 */
export const createAuthor = (
    authorCreate: AuthorCreate,
 signal?: AbortSignal
) => {
      
      
      return customInstance<AuthorRead>(
      {url: `/api/author/`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: authorCreate, signal
    },
      );
    }
  


export const getCreateAuthorMutationOptions = <TData = Awaited<ReturnType<typeof createAuthor>>, TError = ErrorType<void | HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: AuthorCreate}, TContext>, }
) => {
const mutationKey = ['createAuthor'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createAuthor>>, {data: AuthorCreate}> = (props) => {
          const {data} = props ?? {};

          return  createAuthor(data,)
        }

        


  return  { mutationFn, ...mutationOptions } as UseMutationOptions<TData, TError,{data: AuthorCreate}, TContext>}

    export type CreateAuthorMutationResult = NonNullable<Awaited<ReturnType<typeof createAuthor>>>
    export type CreateAuthorMutationBody = AuthorCreate
    export type CreateAuthorMutationError = ErrorType<void | HTTPValidationError>

    /**
 * @summary Create Author
 */
export const useCreateAuthor = <TData = Awaited<ReturnType<typeof createAuthor>>, TError = ErrorType<void | HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: AuthorCreate}, TContext>, }
): UseMutationResult<
        TData,
        TError,
        {data: AuthorCreate},
        TContext
      > => {

      const mutationOptions = getCreateAuthorMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
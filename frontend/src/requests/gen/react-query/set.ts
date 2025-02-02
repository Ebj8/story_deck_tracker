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
  HTTPValidationError,
  SetCreate,
  SetRead
} from './fastAPI.schemas'
import { customInstance } from '../../Axios';
import type { ErrorType } from '../../Axios';




/**
 * Route to create a new set.
 * @summary Create Set
 */
export const createSet = (
    setCreate: SetCreate,
 signal?: AbortSignal
) => {
      
      
      return customInstance<SetRead>(
      {url: `/api/set/`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: setCreate, signal
    },
      );
    }
  


export const getCreateSetMutationOptions = <TData = Awaited<ReturnType<typeof createSet>>, TError = ErrorType<void | HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: SetCreate}, TContext>, }
) => {
const mutationKey = ['createSet'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createSet>>, {data: SetCreate}> = (props) => {
          const {data} = props ?? {};

          return  createSet(data,)
        }

        


  return  { mutationFn, ...mutationOptions } as UseMutationOptions<TData, TError,{data: SetCreate}, TContext>}

    export type CreateSetMutationResult = NonNullable<Awaited<ReturnType<typeof createSet>>>
    export type CreateSetMutationBody = SetCreate
    export type CreateSetMutationError = ErrorType<void | HTTPValidationError>

    /**
 * @summary Create Set
 */
export const useCreateSet = <TData = Awaited<ReturnType<typeof createSet>>, TError = ErrorType<void | HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: SetCreate}, TContext>, }
): UseMutationResult<
        TData,
        TError,
        {data: SetCreate},
        TContext
      > => {

      const mutationOptions = getCreateSetMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
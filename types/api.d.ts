export declare namespace API {
  export interface NetworkResponse<T> {
    status: Ref<number>
    data: Ref<Nullable<T>>
    error: Ref<Nullable<string>>
  }

  export type PromiseResponse<T> = Promise<NetworkResponse<T>>

  export interface RequestOptions {
    loading?: Nullable<Ref<boolean>>
    server?: boolean
  }
}

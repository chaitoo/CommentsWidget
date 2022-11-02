import { AnyAction } from "redux";


export interface IPayload<U, V> {
  readonly req: U;
  readonly res: V;
}
export interface IAction<T extends string, U, V>
  extends AnyAction,
    Partial<OfflineAction> {
  readonly type: T;
  readonly payload: IPayload<U, V>;
}


interface Payload<U, V> {
  readonly req: U;
  readonly res: V;
}

export interface ReduxCustomAction<T extends string, U, V>
  extends AnyAction,
    Partial<OfflineAction> {
  readonly type: T;
  readonly payload: Payload<U, V>;
}

// action creator
export function createAction<T extends string, U, V, X>(
  type: T,
  req: U,
  res: V,
  meta?: X
): ReduxCustomAction<T, U, V> {
  return {
    type,
    payload: {
      req,
      res
    },
    meta
  };
}

export type EnumerateValues<T> = T[keyof T];

export type GetActionTypes<T> = EnumerateValues<
  {
    [P in keyof T]: T[P] extends (
      args: any
    ) => ThunkAction<any, any, undefined, infer Q>
      ? Q
      : T[P] extends (args: any) => any
      ? ReturnType<T[P]>
      : never;
  }
>;

export type ReducerMappedState<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer R ? R : never;
};

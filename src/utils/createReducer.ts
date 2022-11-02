import { IAction } from "./actionCreator";

export interface IState<T> {
  data: T | null;
  error: any;
}

type TransformType<X, Y> = (args: X) => Y;

function createReducer<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  V1,
  V2,
  V3,
  V4,
  R1 = V1,
  R2 = V2,
  R3 = V3,
  R4 = V4,
  T5 extends string = ""
>(
  [Action1, Action2, Action3, Action4]: [T1, T2, T3 | T4],
  transformer?: [
    TransformType<V1, R1>,
    TransformType<V2, R2>,
    TransformType<V3, R3>,
    TransformType<V3, R4>
  ],
  ResetAction?: T5
) {
  const initialState: IState<R1 | R2 | R3> = {
    data: [],
    error: null,
  };
  return (
    state: IState<R> = initialState,
    action: IAction<T1 | T2 | T3 | T4>
  ): IState<R> => {
    const [fn1, fn2, fn3, fn4] = transformer || [];
    switch (action.type) {
      case Action1:
        return {
          data: ((fn1 && fn1(state.data, action.payload.res)) ||
            action.payload.res) as R1,
          error: null,
        };
      case Action2:
        return {
          data: ((fn2 && fn2(state.data, action.payload.res)) ||
            action.payload.res) as R2,
          error: null,
        };
      case Action3:
        return {
          data: ((fn3 && fn3(state.data, action.payload.res)) ||
            action.payload.res) as R3,
          error: null,
        };
      case Action4:
        return {
          data: ((fn4 && fn4(state.data, action.payload.res)) ||
            action.payload.res) as R4,
          error: null,
        };
      case ResetAction:
        return initialState;
      default:
        return state;
    }
  };
}
export default createReducer;

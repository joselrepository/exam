import { City } from "./cityAction";

export interface State {
  code: string;
  name: string;
  cities: City[];
}

export enum StateActionTypes {
  POPULATE_STATE = "POPULATE_STATE",
  SELECT_STATE = "SELECT_STATE",
}

export type StateAction =
  | {
      type: StateActionTypes.POPULATE_STATE;
      payload: {
        state: State[];
      };
    }
  | {
      type: StateActionTypes.SELECT_STATE;
      payload: {
        state: State;
      };
    };

export const populateState = (state: State[]) => ({
  type: StateActionTypes.POPULATE_STATE,
  payload: {
    state,
  },
});

export const selectState = (state: State): StateAction => ({
  type: StateActionTypes.SELECT_STATE,
  payload: {
    state,
  },
});

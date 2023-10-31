import { State, StateAction, StateActionTypes } from "../actions/stateAction";

type DataState = {
  state: State[];
  selectedState: State | null;
};

const initialState: DataState = {
  state: [],
  selectedState: null,
};

const stateReducer = (state = initialState, action: StateAction): DataState => {
  switch (action.type) {
    case StateActionTypes.POPULATE_STATE:
      return { ...state, state: [...action.payload.state] };
    case StateActionTypes.SELECT_STATE:
      return { ...state, selectedState: action.payload.state };
    default:
      return state;
  }
};

export default stateReducer;

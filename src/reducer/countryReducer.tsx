import {
  Country,
  CountryAction,
  CountryActionTypes,
} from "../actions/countryAction";

export interface CountryState {
  countries: Country[];
}

export type Status = "loading" | "error" | "complete" | "idle";

export type DataState = {
  status: Status;
  error: string | null;
  data: CountryState;
  selectedCountry: Country | null;
};

const initialState: DataState = {
  status: "idle",
  error: null,
  data: {
    countries: [],
  },
  selectedCountry: null,
};

const countryReducer = (
  state = initialState,
  action: CountryAction
): DataState => {
  switch (action.type) {
    case CountryActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case CountryActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        status: "complete",
        data: {
          countries: [...action.payload.countries],
        },
      };
    case CountryActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        status: "error",
        error: "redux error",
      };
    case CountryActionTypes.SELECT_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload.country,
      };
    default:
      return state;
  }
};

export default countryReducer;

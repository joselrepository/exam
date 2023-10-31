import { Dispatch } from "redux";
import { State } from "./stateAction";

export enum CountryActionTypes {
  FETCH_DATA_IDLE = "FETCH_DATA_IDLE",
  FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST",
  FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE",
  SELECT_COUNTRY = "SELECT_COUNTRY",
}

export interface Country {
  code: string;
  name: string;
  states: State[];
}

export type CountryAction =
  | {
      type: CountryActionTypes.FETCH_DATA_REQUEST;
    }
  | {
      type: CountryActionTypes.FETCH_DATA_SUCCESS;
      payload: {
        countries: Country[];
      };
    }
  | {
      type: CountryActionTypes.FETCH_DATA_FAILURE;
      payload: {
        error: string;
      };
    }
  | {
      type: CountryActionTypes.SELECT_COUNTRY;
      payload: {
        country: Country;
      };
    };

export const selectCountry = (country: Country): CountryAction => ({
  type: CountryActionTypes.SELECT_COUNTRY,
  payload: { country },
});

const fetchDataRequest = (): CountryAction => ({
  type: CountryActionTypes.FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (countries: Country[]): CountryAction => {
  return {
    type: CountryActionTypes.FETCH_DATA_SUCCESS,
    payload: {
      countries,
    },
  };
};

const fetchDataFailure = (error: string): CountryAction => {
  return {
    type: CountryActionTypes.FETCH_DATA_FAILURE,
    payload: {
      error,
    },
  };
};

export const fetchCountries = () => {
  return async (dispatch: Dispatch<CountryAction>) => {
    dispatch(fetchDataRequest());
    await new Promise((resolve) => setTimeout(resolve, 2500));
    try {
      const res = await fetch("http://localhost:3000/countriesArray");
      const data = await res.json();

      if (res.ok) {
        dispatch(fetchDataSuccess(data));
      } else {
        throw new Error("Fetch data failed");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(fetchDataFailure(err.message));
      }
    }
  };
};

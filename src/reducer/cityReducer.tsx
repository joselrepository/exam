import { City, CityAction, CityActionTypes } from "../actions/cityAction";

export type DataState = {
  cities: City[] | null;
};

const initialState: DataState = {
  cities: null,
};

const cityReducer = (state = initialState, action: CityAction): DataState => {
  switch (action.type) {
    case CityActionTypes.POPULATE_CITY:
      return {
        cities: [...action.payload.cities],
      };
    default:
      return state;
  }
};

export default cityReducer;

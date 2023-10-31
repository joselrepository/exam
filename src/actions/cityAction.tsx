export interface City {
  name: string;
  population: number;
}

export enum CityActionTypes {
  POPULATE_CITY = "POPULATE_CITY",
}

export type CityAction = {
  type: CityActionTypes.POPULATE_CITY;
  payload: {
    cities: City[];
  };
};

export const populateCity = (cities: City[]) => {
  return {
    type: CityActionTypes.POPULATE_CITY,
    payload: {
      cities: [...cities],
    },
  };
};

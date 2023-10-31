import { useEffect } from "react";
import "./App.css";
import { fetchCountries, selectCountry } from "./actions/countryAction";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useDispatch } from "react-redux";
import { populateState, selectState } from "./actions/stateAction";
import { City, populateCity } from "./actions/cityAction";

function App() {
  const { status, error } = useAppSelector((state) => state.country);
  const { cities } = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const totalPopulation = cities
    ?.reduce((total, city) => {
      return (total += city.population);
    }, 0)
    .toLocaleString();

  useEffect(() => {
    dispatch<any>(fetchCountries());
  }, []);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="bg-slate-50 p-10">
        <h1 className="font-bold text-4xl pb-10 text-center">Frontend Exam</h1>
        <div className="max-w-7xl px-2 mx-auto py-10 ">
          <div className="flex justify-center items-center gap-5 md:gap-10">
            <CountryBox />
            <StateBox />
          </div>
        </div>
        <h2 className="text-center font-semibold p-4 text-2xl pb-10">
          Total citizens: {totalPopulation}
        </h2>
        {/* CITY */}
        <CityList />
      </div>
    </>
  );
}

function CountryBox() {
  const { selectedCountry, data } = useAppSelector((state) => state.country);
  const dispatch = useDispatch();
  const countries = data.countries;

  const handleChooseCountry = (countryName: string) => {
    const country = countries.find((country) => country.name === countryName);
    if (country) dispatch(selectCountry(country));
  };

  return (
    <div className="max-w-[250px] h-[250px] w-full flex flex-col gap-2 bg-indigo-600 rounded-md px-2 py-4 ">
      <div className="bg-slate-100 h-[35px] flex items-center p-1 text-slate-800 font-semibold">
        {selectedCountry?.name}
      </div>
      <ul className="bg-blue-200 flex-1 overflow-y-auto rounded-md gap-2">
        {countries.map((country, i) => (
          <li
            key={i}
            onClick={() => handleChooseCountry(country.name)}
            className={`${
              selectedCountry?.code === country.code
                ? "bg-indigo-300 text-slate-100"
                : " text-slate-800"
            } cursor-pointer  font-medium hover:bg-slate-100 hover:text-black p-2  `}
          >
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StateBox() {
  const { selectedCountry } = useAppSelector((state) => state.country);
  const { state: states, selectedState } = useAppSelector(
    (state) => state.state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedCountry) return;

    dispatch(populateState(selectedCountry.states));
  }, [selectedCountry]);

  const handleChooseState = (stateName: string) => {
    const state = states.find((state) => state.name === stateName);
    if (!state) return;
    dispatch(selectState(state));
    dispatch(populateCity(state.cities));
  };

  return (
    <>
      <div className="max-w-[250px] w-full h-[250px] flex flex-col gap-2 bg-indigo-600 rounded-md px-2 py-4 ">
        <div className="bg-slate-100 h-[35px] flex items-center p-1 text-slate-800 font-semibold">
          <p className="capitalize">{selectedState?.name}</p>
        </div>
        <ul className="bg-blue-200 flex-1 overflow-y-auto rounded-md gap-2">
          {states?.map((state, i) => (
            <li
              key={i}
              onClick={() => handleChooseState(state.name)}
              className={`${
                selectedState?.code === state.code
                  ? "bg-indigo-300 text-slate-100"
                  : " text-slate-800"
              } cursor-pointer font-medium  hover:bg-slate-100 hover:text-black p-2 `}
            >
              {state.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function CityList() {
  const { cities } = useAppSelector((state) => state.city);
  return (
    <div className="max-w-7xl px-2 mx-auto py-10">
      <ul className="grid place-content-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <p className="text-2xl font-semibold col-span-full">Cities</p>
        {cities?.map((city) => (
          <CityCard city={city} />
        ))}
      </ul>
    </div>
  );
}

function CityCard({ city }: { city: City }) {
  return (
    <li className="h-[250px] w-full aspect-squre bg-indigo-600 flex flex-col justify-center items-center gap-5 p-4 rounded-md">
      <p className="text-3xl font-bold text-center text-slate-100">
        {city.name}
      </p>
      <p className="text-2xl font-semibold text-slate-100">
        {city.population.toLocaleString()}
      </p>
      <p className="text-2xl text-slate-100">Citizen</p>
    </li>
  );
}

export default App;

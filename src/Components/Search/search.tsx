import { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { GEO_API_URL } from "../../api";
import { geoApiOptions } from "../../api";

const Search = ({ onSearchChange }: any) => {
	const [search, setSearch] = useState(null);

	const loadOptions: (inputvalue: string) => any = async (
		inputValue: string
	) => {
		try {
			const response = await fetch(
				`${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`,
				geoApiOptions
			);
			const response_1 = await response.json();
			return {
				options: response_1.data.map(
					(city: {
						latitude: number;
						longitude: number;
						name: string;
						countryCode: string;
					}) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.countryCode}`,
						};
					}
				),
			};
		} catch (err) {
			return console.error(err);
		}
	};

	const handleOnChange = (searchData: any) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};
	return (
		<AsyncPaginate
			placeholder="Search for city"
			debounceTimeout={600}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
		/>
	);
};

export default Search;

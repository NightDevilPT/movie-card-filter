import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { FilterProps, SelectedFilterProps, FilterOptions } from "@/types";

import { FaFilter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export interface FilterLayoutProps {
	allFilters: FilterProps;
	setSelectedFilters: React.Dispatch<
		React.SetStateAction<SelectedFilterProps>
	>;
}

const FilterLayout: React.FC<FilterLayoutProps> = ({
	allFilters,
	setSelectedFilters,
}) => {
	const [hide, setHide] = useState<boolean>(true);
	const handleLanguageChange = (selectedList: FilterOptions[]) => {
		console.log(selectedList);
		setSelectedFilters((pre: any) => ({
			...pre,
			selectedLanguages: selectedList,
		}));
	};

	const handleGeneresChange = (selectedList: FilterOptions[]) => {
		console.log(selectedList);
		setSelectedFilters((pre: any) => ({
			...pre,
			selectedGeneres: selectedList,
		}));
	};

	const handleCountriesChange = (selectedList: FilterOptions[]) => {
		console.log(selectedList);
		setSelectedFilters((pre: any) => ({
			...pre,
			selectedCountries: selectedList,
		}));
	};

	return (
		<div
			className={`col-span-3 bg-slate-900 rounded-md px-5 space-y-3 max-xl:col-span-full max-xl:fixed max-xl:w-64 ${
				hide ? "-left-64" : "left-0"
			} transition-all duration-300 top-20 z-50 pb-8`}
		>
			<button
				onClick={() => {
					setHide(!hide);
				}}
				className={`absolute -right-9 top-0 p-1 px-2 rounded ${
					hide ? "bg-sky-500" : "bg-red-500"
				} transition-all duration-300 text-slate-200 hidden max-xl:flex`}
			>
				{hide ? (
					<FaFilter className={`w-5 h-5`} />
				) : (
					<IoClose className={`w-5 h-5`} />
				)}
			</button>
			<div className={`w-full h-auto space-y-3 sticky top-3 rounded-md`}>
				<div className={`w-full h-auto space-y-1`}>
					<h1
						className={`w-full text-slate-200 font-[500] text-base`}
					>
						Select Language
					</h1>
					<Multiselect
						options={allFilters.allLanguages}
						onSelect={handleLanguageChange}
						onRemove={handleLanguageChange}
						displayValue="name"
						showCheckbox
					/>
				</div>
				<div className={`w-full h-auto space-y-1`}>
					<h1
						className={`w-full text-slate-200 font-[500] text-base`}
					>
						Select Generes
					</h1>
					<Multiselect
						options={allFilters.allGeneres}
						onSelect={handleGeneresChange}
						onRemove={handleGeneresChange}
						displayValue="name"
						showCheckbox
					/>
				</div>
				<div className={`w-full h-auto space-y-1`}>
					<h1
						className={`w-full text-slate-200 font-[500] text-base`}
					>
						Select Country
					</h1>
					<Multiselect
						options={allFilters.allCountries}
						onSelect={handleCountriesChange}
						onRemove={handleCountriesChange}
						displayValue="name"
						showCheckbox
					/>
				</div>
			</div>
		</div>
	);
};

export default FilterLayout;

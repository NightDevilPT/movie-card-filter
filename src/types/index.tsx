import React from "react";

export interface Children {
	children: React.ReactNode;
}

export interface MoviesResponse {
	movietitle: string;
	imdbmovieid: string;
	movielanguages: string[];
	moviecountries: string[];
	moviemainphotos: string[];
	moviegenres: string[];
}

export interface FilterOptions {
	name: string;
	id: string;
}

export interface FilterProps {
	allLanguages: FilterOptions[];
	allCountries: FilterOptions[];
	allGeneres: FilterOptions[];
}

export interface SelectedFilterProps {
	selectedLanguages:FilterOptions[];
	selectedCountries:FilterOptions[];
	selectedGeneres:FilterOptions[];
}

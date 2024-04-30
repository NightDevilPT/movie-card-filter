"use client";

import React, { useEffect, useState, useMemo } from "react";
import FilterLayout from "../filter-component";
import { FilterProps, MoviesResponse, SelectedFilterProps } from "@/types";
import MovieCard from "../movie-card";

const MovieLayout = () => {
	const [movieData, setMovieData] = useState<MoviesResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [allFilters, setAllFilters] = useState<FilterProps>({
		allLanguages: [],
		allCountries: [],
		allGeneres: [],
	});
	const [selectedFilters, setSelectedFilters] = useState<SelectedFilterProps>(
		{
			selectedCountries: [],
			selectedGeneres: [],
			selectedLanguages: [],
		}
	);

	const filteredData = useMemo(() => {
		return movieData.filter((movie) => {
			const hasSelectedLanguages =
				selectedFilters.selectedLanguages.length === 0 ||
				selectedFilters.selectedLanguages.every((lang) =>
					movie.movielanguages.includes(lang.name)
				);

			const hasSelectedCountries =
				selectedFilters.selectedCountries.length === 0 ||
				selectedFilters.selectedCountries.every((country) =>
					movie.moviecountries.includes(country.name)
				);

			const hasSelectedGenres =
				selectedFilters.selectedGeneres.length === 0 ||
				selectedFilters.selectedGeneres.every((genre) =>
					movie.moviegenres.includes(genre.name)
				);

			return (
				hasSelectedLanguages &&
				hasSelectedCountries &&
				hasSelectedGenres
			);
		});
	}, [movieData, selectedFilters]);

	const fetchMovies = async () => {
		try {
			setLoading(true);
			const response = await fetch("/movie.json");
			if (!response.ok) {
				throw new Error("Failed to fetch movies");
			}
			const data = await response.json();
			setMovieData(data);
			extractFiltersFromMovies(data);
		} catch (error) {
			console.error("Error fetching movies:", error);
		} finally {
			setLoading(false);
		}
	};

	const extractFiltersFromMovies = (movies: MoviesResponse[]) => {
		const newFilters: FilterProps = {
			allLanguages: [],
			allCountries: [],
			allGeneres: [],
		};

		movies.forEach((movie) => {
			movie.movielanguages.forEach((language) => {
				if (
					!newFilters.allLanguages.some(
						(item) => item.name === language
					)
				) {
					newFilters.allLanguages.push({
						name: language,
						id: language,
					});
				}
			});
			movie.moviecountries.forEach((country) => {
				if (
					!newFilters.allCountries.some(
						(item) => item.name === country
					)
				) {
					newFilters.allCountries.push({
						name: country,
						id: country,
					});
				}
			});
			movie.moviegenres.forEach((genre) => {
				if (
					!newFilters.allGeneres.some((item) => item.name === genre)
				) {
					newFilters.allGeneres.push({ name: genre, id: genre });
				}
			});
		});

		setAllFilters(newFilters);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	if (loading) {
		return (
			<div className="w-full h-[calc(100%-5rem)] container flex justify-center items-center max-sm:px-5">
				<span className="text-slate-200 relative w-28 h-28 rounded-full flex justify-center items-center after:absolute after:w-full after:h-full after:rounded-full after: left-0 after:top-0 after:content-[''] after:border-4 after:animate-spin after:border-slate-800 after:border-t-pink-600">
					Loading...
				</span>
			</div>
		);
	}

	return (
		<div className="w-full h-[calc(100%-5rem)] max-xl:h-full container grid grid-cols-10 gap-5 max-sm:px-5 max-xl:grid-cols-1">
			<FilterLayout
				setSelectedFilters={setSelectedFilters}
				allFilters={allFilters}
			/>
			<div className="col-span-7 w-full h-auto grid grid-cols-4 max-2xl:grid-cols-3 gap-5 max-xl:col-span-full max-md:grid-cols-2 max-[500px]:grid-cols-1">
				{filteredData.map((movie) => (
					<MovieCard key={movie.movietitle} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default MovieLayout;

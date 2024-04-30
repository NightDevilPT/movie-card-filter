import React, { useId } from "react";
import { MoviesResponse } from "@/types";

type MovieCardProps = {
	movie: MoviesResponse;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
	const {
		movietitle,
		movielanguages,
		moviecountries,
		moviemainphotos,
		moviegenres,
	} = movie;

	return (
		<div className="rounded overflow-hidden shadow-lg space-y-2">
			<div className={`w-full relative`}>
				<img
					className="w-full h-full object-cover rounded-md"
					src={moviemainphotos[0]}
					alt={movietitle}
				/>
				<div className={`w-full h-full absolute left-0 top-0 bg-gradient-to-b from-transparent to-slate-950`}></div>
				<div
					className={`w-full h-full absolute left-0 top-0 flex justify-end items-end flex-wrap content-end gap-1 p-3`}
				>
					{moviegenres.map((items: string) => {
						const uniqueId = useId();
						return (
							<span
								key={uniqueId}
								className={`px-2 py-1 text-xs bg-pink-600 text-slate-100 rounded-full`}
							>
								{items}
							</span>
						);
					})}
					<h1 className={`w-full text-base text-slate-100 font-[500] line-clamp-1`}>{movietitle}</h1>
				</div>
			</div>
			
		</div>
	);
};

export default MovieCard;

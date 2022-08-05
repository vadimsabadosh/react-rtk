import React from "react";
import { useActions } from "src/hooks/actions";
import { useAppSelector } from "src/hooks/redux";
import { IRepo } from "src/types/types";

const RepoCard = ({ repo }: { repo: IRepo }) => {
	const { addFavorite, removeFavorite } = useActions();
	const favs = useAppSelector((state) => state.github.favorites);

	const addToFav = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		addFavorite(repo.html_url);
	};
	const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		removeFavorite(repo.html_url);
	};

	return (
		<div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
			<a
				className="text-lg font-bold text-pink-900"
				target="_blank"
				href={repo.html_url}
				rel="noreferrer"
			>
				{repo.full_name}
			</a>
			<p className="text-sm">
				Forks: <span className="font-bold">{repo.forks}</span> | Watchers:{" "}
				<span className="font-bold">{repo.watchers}</span>
			</p>
			<p className="text-sm font-thin">{repo?.description}</p>
			<p className="text-sm font-bold color-gray mb-4">
				Clone link: {repo.git_url}
			</p>
			{favs.includes(repo.html_url) ? (
				<button
					className="py-2 px-4 bg-rose-900 rounded hover:shadow-md transition-all text-white"
					onClick={removeFromFavorite}
				>
					Remove From Favorite
				</button>
			) : (
				<button
					className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
					onClick={addToFav}
				>
					Add
				</button>
			)}
		</div>
	);
};

export default RepoCard;

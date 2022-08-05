import React from "react";
import { useAppSelector } from "src/hooks/redux";

function FavoritesPage() {
	const favs = useAppSelector((state) => state.github.favorites);

	if (!favs.length) return <p className="text-center">No Items.</p>;

	return (
		<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
			<ul className="list-none">
				{favs.map((item) => {
					return <p key={item}>{item}</p>;
				})}
			</ul>
		</div>
	);
}

export default FavoritesPage;

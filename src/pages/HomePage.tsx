import React, { useEffect, useState } from "react";
import RepoCard from "src/components/RepoCard";
import { useDebounce } from "src/hooks/debounce";
import {
	useSearchUsersQuery,
	useLazyGetUserReposQuery,
} from "src/store/github/github.api";

function HomePage() {
	const [search, setSearch] = useState("Savinvadim1312");
	const [dropdown, setDropdown] = useState(false);

	const debounceValue = useDebounce(search);

	const { isError, data, isLoading } = useSearchUsersQuery(debounceValue, {
		skip: debounceValue.length < 3,
		refetchOnFocus: true,
	});

	const [fetchRepos, { data: repos, isLoading: reposLoading }] =
		useLazyGetUserReposQuery();

	useEffect(() => {
		setDropdown(debounceValue.length > 3 && data?.length! > 0);
	}, [debounceValue, data]);

	const clickHandler = (username: string) => {
		fetchRepos(username);
		setDropdown(false);
	};

	if (isError) {
		return (
			<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
				<p className="text-center text-red-600">Something went wrong</p>
			</div>
		);
	}
	return (
		<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
			<div className="relative w-[560px]">
				<input
					type="text"
					className="border py-2 px-4 w-full h-[42px] mb-2"
					placeholder="Search for Github username..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-auto">
					{isLoading && <p className="text-center">Loading...</p>}
					{dropdown &&
						data?.map((item) => (
							<li
								onClick={() => clickHandler(item.login)}
								key={item.id}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
							>
								{item.login}
							</li>
						))}
				</div>
				<div className="container">
					{reposLoading && <p className="text-center">Loading...</p>}
					{repos?.map((repo) => (
						<RepoCard repo={repo} key={repo.id} />
					))}
				</div>
			</div>
		</div>
	);
}

export default HomePage;

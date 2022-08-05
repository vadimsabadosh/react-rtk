import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { githubActions } from "src/store/github/github.slice";

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(githubActions, dispatch);
};

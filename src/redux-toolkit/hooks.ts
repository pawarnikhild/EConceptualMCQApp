import { useDispatch, useSelector } from "react-redux";
import { rootState, AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<rootState>();

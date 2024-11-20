import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Store"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
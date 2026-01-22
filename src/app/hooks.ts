// --- Libraries
import {useSelector, useDispatch, type TypedUseSelectorHook} from "react-redux";

// --- Store Types
import type {AppDispatch, RootState} from "./store";

// --- Custom Hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
    toggleSaveScheme,
    fetchSavedSchemes
} from "../features/savedScheme/savedSchemeSlice";

const useSavedScheme = () => {

    const dispatch = useDispatch();

    const { savedSchemes, loading, error } = useSelector(
        (state) => state.savedScheme
    );

	const { user } = useSelector(
        (state) => state.auth || {} 
    );

    const toggleSave = useCallback(async (id) => {
        if (!user) {
            return {
                success: false,
                message: "Please login first"
            };
        }

        try {
            const response = await dispatch(toggleSaveScheme(id)).unwrap();
            return { success: true, data: response };
        } catch (err) {
            return { success: false, message: err || "Something went wrong" };
        }
    }, [dispatch, user]);

    const getSavedSchemes = useCallback(() => {
        if (user) {
            dispatch(fetchSavedSchemes());
        }
    }, [dispatch, user]);

	const isSchemeSaved = (schemeId) => {
		return savedSchemes.some((item) => item.scheme?._id === schemeId);
	};

    return {
        savedSchemes,
        loading,
        error,
        toggleSave,
        getSavedSchemes,
        user , 
		isSchemeSaved
    };
};

export default useSavedScheme;
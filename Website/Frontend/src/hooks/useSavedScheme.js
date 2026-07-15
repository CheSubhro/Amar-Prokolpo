
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSavedSchemes,
  toggleSaveScheme,
  clearSavedSchemes,
} from "../features/savedScheme/savedSchemeSlice";

const useSavedScheme = () => {
  const dispatch = useDispatch();
  const { savedSchemes, loading, error } = useSelector((state) => state.savedScheme);

  const getSavedSchemes = useCallback(() => {
    dispatch(fetchSavedSchemes());
  }, [dispatch]);

  const toggleSave = useCallback(async (schemeId) => {
    return await dispatch(toggleSaveScheme(schemeId));
  }, [dispatch]);

  const resetSavedSchemes = useCallback(() => {
    dispatch(clearSavedSchemes());
  }, [dispatch]);

  const isSchemeSaved = useCallback((schemeId) => {
    return savedSchemes.some((item) => item.scheme?._id === schemeId);
  }, [savedSchemes]);

  return {
    savedSchemes,
    loading,
    error,
    getSavedSchemes,
    toggleSave,
    resetSavedSchemes,
    isSchemeSaved,
  };
};

export default useSavedScheme;
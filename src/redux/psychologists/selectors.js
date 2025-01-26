export const selectPsychologists = state => state.psychologists.psychologists;
export const selectFavoritePsychologists = state => state.psychologists.favoritesPsychologists;

export const selectIsLoading = state => state.psychologists.isLoading;
export const selectError = state => state.psychologists.error;
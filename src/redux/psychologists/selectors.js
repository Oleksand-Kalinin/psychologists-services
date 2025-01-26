export const selectPsychologists = state => state.psychologists.psychologists;
export const selectTotalPages = state => state.psychologists.psychologists.totalPages;

export const selectFavoritePsychologists = state => state.psychologists.favoritesPsychologists;
export const selectFavoriteTotalPages = state => state.psychologists.favoritesPsychologists.totalPages;

export const selectIsLoading = state => state.psychologists.isLoading;
export const selectError = state => state.psychologists.error;
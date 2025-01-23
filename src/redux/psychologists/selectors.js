export const selectPsychologists = state => state.psychologists.psychologists;
export const selectFavoritePsychologists = state => state.psychologists.favoritesPsychologists;

export const selectPsychologistById = state => state.psychologists.psychologistById.item;
export const selectPsychologistByIdLoading = state => state.psychologists.psychologistById.isLoading;
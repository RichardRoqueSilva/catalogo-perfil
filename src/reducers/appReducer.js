// O Reducer é uma função pura que recebe o estado atual e uma ação,
// e retorna o NOVO estado. Ele centraliza toda a lógica de atualização do estado.
export const initialState = {
  users: [],
  selectedUser: null,
  loading: true,
  error: null,
  searchTerm: '',
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}
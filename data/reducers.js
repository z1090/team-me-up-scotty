import initialState from "./initialState";

const setInitial = () => initialState;

const generateTeams = (state, action) => ({
    ...state,
    names: action.names
})



const reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return setInitial();
        case "generateTeams":
            return generateTeams(state, action);
        default:
            return state;
    }
};

export default reducer;

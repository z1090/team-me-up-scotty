import initialState from "./initialState";

import { shuffle, splitIntoTeams } from "./LogicFunctions";

const setInitial = () => initialState;

const generateTeams = (state, action) => ({
    ...state,
    names: action.names,
    teams: splitIntoTeams(shuffle(action.names)),
});

const regenerateTeams = (state) => ({
    ...state,
    teams: splitIntoTeams(shuffle(state.names)),
});

const resetInputs = (state) => ({
    ...state,
    names: ["", "", "", "", "", "", "", "", "", ""],
});

const reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return setInitial();
        case "generateTeams":
            return generateTeams(state, action);
        case "resetInputs":
            return resetInputs(state);
        case "regenerateTeams":
            return regenerateTeams(state);
        default:
            return state;
    }
};

export default reducer;

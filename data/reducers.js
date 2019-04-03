import initialState from "./initialState";

import { shuffle, splitIntoTeams } from "./LogicFunctions";

const setInitial = () => initialState;

const generateTeams = (state, action) => ({
    ...state,
    names: action.names,
    teams: splitIntoTeams(shuffle(action.names), state.numberOfTeams),
});

const regenerateTeams = (state) => ({
    ...state,
    teams: splitIntoTeams(shuffle(state.names), state.numberOfTeams),
});

const resetInputs = (state) => ({
    ...state,
    names: [""],
});

const loadFromStorage = (state, action) => ({
    ...state,
    names: action.names,
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
        case "loadFromStorage":
            return loadFromStorage(state, action);
        default:
            return state;
    }
};

export default reducer;

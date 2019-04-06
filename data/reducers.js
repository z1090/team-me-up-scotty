import initialState from "./initialState";

import { getTeams, shuffle, splitIntoTeams } from "./LogicFunctions";

const setInitial = () => initialState;

const generateTeams = (state, action) => {
    return {
        ...state,
        names: action.names,
        teams: getTeams(
            state.settings.ratingsOn,
            state.settings.looseRatings,
            state.settings.numberOfTeams,
            action.names,
            state.teams
        ),
        // teams: splitIntoTeams(
        //     shuffle(action.names, state.settings.ratingsOn),
        //     state.settings.numberOfTeams,
        //     state.teams,
        //     state.settings.ratingsOn
        // ),
    };
};

const regenerateTeams = (state) => ({
    ...state,
    teams: getTeams(
        state.settings.ratingsOn,
        state.settings.looseRatings,
        state.settings.numberOfTeams,
        state.names,
        state.teams
    ),
});

const resetInputs = (state) => ({
    ...state,
    names: [""],
});

const loadFromStorage = (state, action) => ({
    ...state,
    names: action.names,
});

const saveTeamName = (state, action) => ({
    ...state,
    teams: action.teams,
});

const submitSettings = (state, action) => ({
    ...state,
    settings: action.settings,
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
        case "saveTeamName":
            return saveTeamName(state, action);
        case "submitSettings":
            return submitSettings(state, action);
        default:
            return state;
    }
};

export default reducer;

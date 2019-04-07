import initialState from "./initialState";
import { getTeams } from "./sortingLogic";

const setInitial = () => initialState;

const generateTeams = (state, action) => {
    return {
        ...state,
        names: action.names,
        teams: getTeams(state.settings.ratingsOn, state.settings.looseRatings, state.settings.numberOfTeams, action.names, state.teams),
    };
};

const regenerateTeams = (state) => ({
    ...state,
    teams: getTeams(state.settings.ratingsOn, state.settings.looseRatings, state.settings.numberOfTeams, state.names, state.teams),
});

const resetInputs = (state) => ({
    ...state,
    names: [
        {
            name: "",
            enteredRating: 50,
            randomMatchRating: 50,
        },
    ],
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

const togglePaused = (state) => ({
    ...state,
    settings: {
        ...state.settings,
        gamePaused: !state.settings.gamePaused,
        gamePauseText: state.settings.gamePauseText === "Start" ? "Pause" : state.settings.gamePauseText === "Pause" ? "Resume" : "Pause",
    },
});

const resetTimer = (state) => {
    return {
        ...state,
        settings: {
            ...state.settings,
            gamePaused: true,
            gamePauseText: "Start",
        },
    };
};

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
        case "togglePaused":
            return togglePaused(state);
        case "resetTimer":
            return resetTimer(state);
        default:
            return state;
    }
};

export default reducer;

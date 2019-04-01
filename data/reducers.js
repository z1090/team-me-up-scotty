import initialState from "./initialState";

import { shuffle, splitIntoTeams } from "./LogicFunctions";

const setInitial = () => initialState;

const generateTeams = (state, action) => ({
    ...state,
    names: action.names,
    teams: splitIntoTeams(shuffle(action.names))
});




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

import initialState from "./initialState";

const setInitial = () => initialState;

const reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return setInitial();
        default:
            return state;
    }
};

export default reducer;

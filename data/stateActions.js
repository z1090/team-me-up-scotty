export const reset = () => ({
    type: "reset",
});

export const generateTeams = ({ names }) => {
    console.log(names);
    return {
        type: "generateTeams",
        names,
    };
};

export const resetInputs = () => {
    return {
        type: "resetInputs",
    };
};

export const regenerateTeams = () => {
    return {
        type: "regenerateTeams",
    };
};

export const loadFromStorage = (names) => {
    return {
        type: "loadFromStorage",
        names,
    };
};

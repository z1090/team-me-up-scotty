let initialState = {
    names: [
        {
            name: "",
            enteredRating: 50,
            randomMatchRating: 50,
        },
    ],
    settings: {
        numberOfTeams: 2,
        ratingsOn: false,
        looseRatings: false,
        gameTime: 20,
        gamePaused: true,
        gamePauseText: "Start",
        showCoinToss: true,
    },
    teams: [],
};

export default initialState;

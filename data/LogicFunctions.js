export const shuffle = (array) => {
    let newArr = [...array];
    let length = newArr.length;
    let randomIndex;
    let tempValue;

    while (length > 0) {
        randomIndex = Math.floor(Math.random() * length);
        length -= 1;
        tempValue = newArr[length];
        newArr[length] = newArr[randomIndex];
        newArr[randomIndex] = tempValue;
    }
    return newArr;
};


export const splitIntoTeams = (array, numberOfTeams) => {
    let copyOfNames = [...array];
    let teamsArr = [];
    let teams = [];
    let playersPerTeam = Math.floor(copyOfNames.length / numberOfTeams);
    let leftOverPlayers = copyOfNames.length % numberOfTeams;

    // Creates an array with an equal number of players for each team
    let playersArray = Array(numberOfTeams).fill(playersPerTeam);
    // if there are extra players, distribute these evenly between teams
    let i = 0;
    while (leftOverPlayers > 0 ) {
        playersArray[i] = playersArray[i] += 1;
        leftOverPlayers -= 1;
        i += 1;
    }

    // Creates an array of arrays of player names (teams) according to number of players allocated for each team
    let j = 0;
    while (copyOfNames.length > 0) {
        teamsArr.push(copyOfNames.splice(0, playersArray[j]));
        j += 1;
    }

    // Converts each team array into an object
    while(teamsArr.length > 0) {
        teams[teamsArr.length-1] = {
            teamName: `Team ${teamsArr.length}`,
            players: teamsArr.pop()
        }
    }
    return teams;
};

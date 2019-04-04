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

const oldTeamNames = (teamsArr, oldTeams, numberOfTeams) => {
    let currentIndex = teamsArr.length - 1;
    if (oldTeams.length === 0) {
        return `Team ${teamsArr.length}`;
    } else if (oldTeams.length >= numberOfTeams) {
        return oldTeams[currentIndex].teamName;
    } else if (oldTeams.length < numberOfTeams) {
        // console.log("new teams greater than old")
        // console.dir(oldTeams[currentIndex])
        // console.log("teamsArr: "+teamsArr)
        // console.log("teamsArrlen: "+teamsArr.length)
        // console.log("currentIndex: "+currentIndex)

        if (typeof oldTeams[currentIndex] != "undefined") {
            // console.log("old name found")
            return oldTeams[currentIndex].teamName;
            // return `Team ${teamsArr.length}`;
        } else {
            // console.log("generic name used");
            return `Team ${teamsArr.length}`;
        }
        // return !(oldTeams[teamsArr.length-1])? `Team ${teamsArr.length}` : oldTeams[teamsArr.length-1].teamName
    }
};

export const splitIntoTeams = (array, numberOfTeams, oldTeams) => {
    let copyOfNames = [...array];
    let teamsArr = [];
    let teams = [];
    let playersPerTeam = Math.floor(copyOfNames.length / numberOfTeams);
    let leftOverPlayers = copyOfNames.length % numberOfTeams;

    // Creates an array with an equal number of players for each team
    let playersArray = Array(numberOfTeams).fill(playersPerTeam);
    // if there are extra players, distribute these evenly between teams
    let i = 0;
    while (leftOverPlayers > 0) {
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
    const newNumofTeams = teamsArr.length;
    // Converts each team array into an object
    while (teamsArr.length > 0) {
        // console.log("old: " + oldTeams.length)
        // console.log("newleng: " + teamsArr.length)
        // console.log("new: " + newNumofTeams)
        // console.log(oldTeams[teamsArr.length-1].teamName === true);

        teams[teamsArr.length - 1] = {
            // Keep old team name if teams are regenerated
            // teamName: oldTeams.length <= newNumofTeams ? `Team ${teamsArr.length}` : oldTeams[teamsArr.length-1].teamName,
            teamName: oldTeamNames(teamsArr, oldTeams, numberOfTeams),
            players: teamsArr.pop(),
        };
    }
    return teams;
};

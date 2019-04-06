export const getTeams = (ratingsOn, looseRatings, numberOfTeams, names, oldTeams) => {
    return ratingsOn
        ? teamNames(oldTeams, randomShuffle(shuffledPlayersinTeam(ratedSplit(ratedShuffle(names, numberOfTeams, looseRatings), numPlayersPerTeam(names, numberOfTeams)))))
        : teamNames(oldTeams, randomSplit(randomShuffle(names), numPlayersPerTeam(names, numberOfTeams)));
};

const numPlayersPerTeam = (names, numberOfTeams) => {
    const numPlayers = names.length;
    const playersPerTeam = Math.floor(numPlayers / numberOfTeams);
    let leftOverPlayers = numPlayers % numberOfTeams;

    // Creates an array with an equal number of players for each team
    let playersArray = Array(numberOfTeams).fill(playersPerTeam);
    // if there are extra players, distribute these evenly between teams
    let i = 0;
    while (leftOverPlayers > 0) {
        playersArray[i] = playersArray[i] += 1;
        leftOverPlayers -= 1;
        i += 1;
    }

    return playersArray;
};

const ratedShuffle = (array, numberOfTeams, looseRatings) => {
    let ratedShuffleTeams = [];
    for (i = 0; i < numberOfTeams; i += 1) {
        ratedShuffleTeams.push([]);
    }

    let newArr = [...array];

    for (i = 0; i < newArr.length; i += 1) {}

    if (looseRatings) {
        newArr.forEach((player) => {
            let rand = Math.round(Math.random() * 20) - 10;
            player.randomMatchRating = player.enteredRating + rand;
            console.log(
                `rand: ${rand} name: ${player.name} randRating: ${player.randomMatchRating} Rating: ${
                    player.enteredRating
                }`
            );
        });
    }

    newArr.sort((a, b) => {
        if (a.randomMatchRating < b.randomMatchRating) return 1;
        if (a.randomMatchRating > b.randomMatchRating) return -1;
        return 0;
    });

    for (i = 0; i < newArr.length; i += 1) {
        if (i > 0 && i % ratedShuffleTeams.length === 0) {
            ratedShuffleTeams.reverse();
        }
        let teamNum = i % ratedShuffleTeams.length;
        let player = newArr[i];
        console.log(`${player.name} ${player.randomMatchRating} -${player.enteredRating - player.randomMatchRating}`);
        ratedShuffleTeams[teamNum].push(player);
    }

    ratedShuffleTeams.reverse();
    const flatTeams = ratedShuffleTeams.reduce((acc, val) => acc.concat(val), []);
    return flatTeams;
};

const randomShuffle = (array) => {
    console.log("random shuffle");
    let newArr = [...array];
    let currentIndex = newArr.length;
    let randomIndex;
    let tempValue;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = newArr[currentIndex];
        newArr[currentIndex] = newArr[randomIndex];
        newArr[randomIndex] = tempValue;
    }
    return newArr;
};

const shuffledPlayersinTeam = (array) => {
    return array.map((teamToShuffle) => {
        return randomShuffle(teamToShuffle);
    });
}


const randomSplit = (names, playersArray) => {
    console.log("random split reached");

    let copyOfNames = [...names];
    let teamsArr = [];

    // Creates an array of arrays of player names (teams) according to number of players allocated for each team
    let i = 0;
    while (copyOfNames.length > 0) {
        teamsArr.push(copyOfNames.splice(0, playersArray[i]));
        i += 1;
    }

    return teamsArr;
};

const ratedSplit = (names, playersArray) => {
    console.log("rated split reached==================");
    playersArray.reverse();
    let copyOfNames = [...names];
    let teamsArr = [];

    // Creates an array of arrays of player names (teams) according to number of players allocated for each team
    let i = 0;
    while (copyOfNames.length > 0) {
        // console.dir(copyOfNames);
        teamsArr.push(copyOfNames.splice(0, playersArray[i]));
        // copyOfNames.reverse();
        i += 1;
    }

    return teamsArr;
};

const teamNames = (oldTeams, teamsArr) => {
    let teams = [];

    // Converts each team array into an object
    while (teamsArr.length > 0) {
        let currentIndex = teamsArr.length - 1;
        teams[teamsArr.length - 1] = {
            // Keep old team name if teams are regenerated
            // teamName: oldTeams.length <= newNumofTeams ? `Team ${teamsArr.length}` : oldTeams[teamsArr.length-1].teamName,
            teamName:
                typeof oldTeams[currentIndex] != "undefined"
                    ? oldTeams[currentIndex].teamName
                    : `Team ${teamsArr.length}`,
            players: teamsArr.pop(),
        };
    }
    return teams;
};

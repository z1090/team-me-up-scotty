export const getTeams = (ratingsOn, looseRatings, numberOfTeams, names, oldTeams) => {
    return ratingsOn
        ? teamNames(
              oldTeams,
              randomShuffle(
                  shufflePlayersinTeam(ratedSplit(ratedShuffle(names, numberOfTeams, looseRatings), numPlayersPerTeam(names, numberOfTeams)))
              )
          )
        : teamNames(oldTeams, splitIntoTeams(randomShuffle(names), numPlayersPerTeam(names, numberOfTeams)));
};

//Creates an Array of the number of players for each team
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
    //copies names array to keep original in order, then
    //orders players in new arry by either loose or precise rating
    let players = [...array];

    if (looseRatings) {
        players.forEach((player) => {
            let rand = Math.round(Math.random() * 20) - 10;
            player.randomMatchRating = player.enteredRating + rand;
        });
    }

    players.sort((a, b) => {
        if (a.randomMatchRating < b.randomMatchRating) return 1;
        if (a.randomMatchRating > b.randomMatchRating) return -1;
        return 0;
    });

    // creates an array of blank arrays based on the number of teams
    let ratedShuffleTeams = [];
    for (i = 0; i < numberOfTeams; i += 1) {
        ratedShuffleTeams.push([]);
    }

    //adds a player to each team in turn, then when each team has the same number of players
    //the teams array is reversed to keep the overal team rating at equal a possible.
    //E.G. if there were 3 teams and 6 players rated 1 - 6, each team would have a skill of 7.
    //The teams array would look like: [[1,6], [2,5], [3,4]]
    for (i = 0; i < players.length; i += 1) {
        if (i > 0 && i % ratedShuffleTeams.length === 0) {
            ratedShuffleTeams.reverse();
        }
        let teamNum = i % ratedShuffleTeams.length;
        let player = players[i];
        ratedShuffleTeams[teamNum].push(player);
    }

    ratedShuffleTeams.reverse();
    const flatTeams = ratedShuffleTeams.reduce((acc, val) => acc.concat(val), []);
    return flatTeams;
};

//used to either randomise players if ratings are not used or to
//randomise the order the teams are listed in if ratings are used
const randomShuffle = (array) => {
    let players = [...array];
    let currentIndex = players.length;
    let randomIndex;
    let tempValue;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = players[currentIndex];
        players[currentIndex] = players[randomIndex];
        players[randomIndex] = tempValue;
    }
    return players;
};

const splitIntoTeams = (names, playersArray) => {
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
    //reversing array ensures that the worst-rated 'leftover'
    //players get added to the worst-rated teams first,
    //rather than to the best team first.
    return splitIntoTeams(names, playersArray.reverse());
};

//randomises the order rated players are listed within a team
//so that the best players won't always appear at the top
const shufflePlayersinTeam = (array) => {
    return array.map((teamToShuffle) => {
        return randomShuffle(teamToShuffle);
    });
};

const teamNames = (oldTeams, teamsArr) => {
    let teams = [];

    // Converts each team array into an object
    while (teamsArr.length > 0) {
        let currentIndex = teamsArr.length - 1;
        teams[teamsArr.length - 1] = {
            // Keeps old team name if teams are regenerated
            teamName: typeof oldTeams[currentIndex] != "undefined" ? oldTeams[currentIndex].teamName : `Team ${teamsArr.length}`,
            players: teamsArr.pop(),
        };
    }
    return teams;
};

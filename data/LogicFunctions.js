export const shuffle = (array) => {
    let newArr = [...array];
    let length = newArr.length;
    let randomIndex;
    let tempValue;

    while (length > 0) {
        randomIndex = Math.round(Math.random() * length);
        length -= 1;
        tempValue = newArr[length];
        newArr[length] = newArr[randomIndex];
        newArr[randomIndex] = tempValue;
    }
    return newArr;
};

export const splitIntoTeams = (array) => {
    const team1 = array.slice(0, array.length / 2);
    const team2 = array.slice(array.length / 2, array.length);
    const teams = {
        team1,
        team2,
    };
    return teams;
};

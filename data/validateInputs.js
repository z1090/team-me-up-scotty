import { Alert } from "react-native";

export const noDuplicates = (array) => {
    let checked = Object.create(null);
    for (let i = 0; i < array.length; i += 1) {
        let value = array[i];
        if (value in checked) {
            return false;
        }
        checked[value] = false;
    }
    return true;
}

const removeEmptyInputs = (array) => {
    let reducedNames = array.reduce((acc, val) => {
        if (val !== "") {
            acc.push(val);
        }
        return acc;
    }, [])
    this.setState({names: reducedNames})
 }

export const noEmptyInputs = (array) => {
    for(let i = 0; i < array.length; i += 1){
        if(array[i] === "") {
            Alert.alert(
                "Inputs can't be empty",
                "Remove empty inputs and continue?",
                [
                    { text: "Cancel", onPress: () => {}, style: "cancel" },
                    { text: "OK", onPress: () => removeEmptyInputs(array) },
                ],
                { cancelable: false }
            );
            return false;
        }
    }
    return true;
 }
export const reset = () => ({
    type: "reset",
});

export const generateTeams = ({names}) => {
	console.log(names)
	return {
		type : "generateTeams",
		names,
	}
};
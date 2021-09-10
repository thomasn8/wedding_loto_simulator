let numbers = [1, 2, 3, 4, 5];

console.log(shoutedNumber(numbers));

function shoutedNumber(remainingNumbers) {
	//let number;
	let randomIndex;
	let max = remainingNumbers.length;

	randomIndex = Math.floor(Math.random() * max);
	return remainingNumbers[randomIndex];
}
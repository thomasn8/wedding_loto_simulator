class NewGame {
	constructor(round, currentPlayers) 
	{
		this.round = round;
		this.currentPlayers = currentPlayers;
	}
}

class Player {
	constructor(id, carte)
	{
		this.id = id;
		this.carte = carte;
	}
}

function startNewGame()
{
	let game = new NewGame(1, makePlayers(80));
	return game;
}

function makePlayers(n) 
{
	let players = new Array(n);
	for (let i = 0; i < n; i++) 
		players[i] = new Player(i, makeCarte());
	return players;
}

function makeCarte() 
{
	// 15 numéros dont 1 à 3 numéros par dizaine (1 à 90)
	let carte = new Array();
	for (let i = 0; i < 9; i++)
	{
		// on insère d'abord 1 numéro par dizaine
		let number = getRandomLotoNumber(carte, i * 10, i * 10 + 9)
		carte.push(number);
	}

	var dizaine = getRandomInt(10);

	while (carte.length < 15)
	{
		// puis, tant qu'on a pas 15 nombres, (1 fois sur 3 au hasard) on insère 1 numéro par dizaine
		if(dizaine === 9) dizaine = 0;
		let proba = getRandomInt(3);
		if(proba === 0)
		{
			let number = getRandomLotoNumber(carte, dizaine * 10, dizaine * 10 + 9);
			carte.push(number);
		}
		dizaine++;
	}

	carte.sort(function(a, b){return a-b});
	return carte;
}

function getRandomLotoNumber(carte, min, max)
{
	// Renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
	let random;
	min = Math.ceil(min);
	max = Math.floor(max);
	if(min === 0) min = 1;
	if(min === 80) max = 90;
	random = Math.floor(Math.random() * (max - min +1)) + min;

	// gérer les doublons en récursif
	for(let i = 0; i < carte.length; i++)
	{
		if(random === carte[i])
			random = getRandomLotoNumber(carte, min, max)
	}
	//
	return random;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

/* ///////////////////////////////////////////////////////////////////////////////////////// */
// !!!!!!!!!!!!!!!!!!!!!!! PREMIER TEST, ATTRIBUTION DES CARTES AUX JOUEURS !!!!!!!!!!!!!!!!!!!
// console.log(JSON.stringify(startNewGame()));
// for (let i = 1 ; i < 10 ; i ++)
// 	console.log('Joueur ' + i + ' : ' + JSON.stringify(startNewGame().currentPlayers[i].carte));
/* ///////////////////////////////////////////////////////////////////////////////////////// */
/* ///////////////////////////////////////////////////////////////////////////////////////// */

function playGame(obj)
{
	let roundNo = 1;
	let currentPlayers =  obj.currentPlayers;
	let countPlayers = 80;
	let playersRemoved = 0;
	let remainingNumbers = new Array();
	let shouted;
	
	for (let i = 0; i < 90; i++) 
		remainingNumbers[i] = i + 1;

	console.log('NEW GAME');

	///////////////////////////// affichage des joueurs et du sac /////////////////////////////
	console.log('Numéros dans le sac : ');
	console.log(remainingNumbers);
	for (let player in currentPlayers)
		console.log('Joueur ' + player + ' : ' + JSON.stringify(currentPlayers[player].carte));
	//////////////////////////////////////////////////////////////////////////////////////

	while(currentPlayers.length > 1)
	{
		console.log('\n');
		console.log('ROUND ' + roundNo);
		console.log('Numéro crié : ');
		shouted = shoutedNumber(remainingNumbers);
		console.log(shouted);
		remainingNumbers = removeNumber(remainingNumbers, shouted);
		currentPlayers = eliminatePlayers(currentPlayers, shouted);
		playersRemoved = countPlayers - currentPlayers.length;
		console.log('Nombre de joueurs éliminés dans ce round : ' + playersRemoved);
		countPlayers = countPlayers - playersRemoved;
		console.log('Nombre de joueurs restant en jeu : ' + currentPlayers.length);
		roundNo++;
	}
	console.log('\nFinal round : ' + (roundNo - 1));
	return 'Game terminé';
}

function shoutedNumber(remainingNumbers) {
	let randomIndex;
	let max = remainingNumbers.length;

	randomIndex = Math.floor(Math.random() * max);
	return remainingNumbers[randomIndex];
}

function removeNumber(remainingNumbers, shoutedNumber)
{
	for( let i = 0; i < remainingNumbers.length; i++){ 
		if (remainingNumbers[i] === shoutedNumber)
			remainingNumbers.splice(i, 1); 
	}
	return remainingNumbers;
}

function eliminatePlayers(currentPlayers, shoutedNumber) 
{
	let totPlayers = currentPlayers.length;
	let playersToEliminate = new Array();

	for(let i = 0; i < totPlayers; i++)
	{
		for(let j = 0; j < currentPlayers[i].carte.length; j++)
		{
			if(currentPlayers[i].carte[j] === shoutedNumber)
			{
				playersToEliminate.push(currentPlayers[i].id);
				break;  /* sort de la dernière for loop car le joueur a été éliminé de currentPlayers */
			}
		}
	}

	for(let i = 0; i < playersToEliminate.length; i++)
		currentPlayers.splice(i, 1);	

	return currentPlayers;
}


// !!!!!!!!!!!!!!!!!!!!!!! DEUXIEME TEST POUR JOUER LA PARTIE ICI !!!!!!!!!!!!!!!!!!!!!!!
playGame(startNewGame());
// !!!!!!!!!!!!!!!!!!!!!!!
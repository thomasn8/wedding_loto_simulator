let player1 = {id: 0, carte : [1, 3, 8]};
let player2 = {id: 1, carte : [4, 7, 9]};
let player3 = {id: 2, carte : [1, 5, 8]};
let currentPlayers = [player1, player2, player3];

console.log(eliminatePlayers(currentPlayers, 1));

function eliminatePlayers(currentPlayers, shoutedNumber) 
{
	let totPlayers = currentPlayers.length;
	let playersToEliminate = new Array();

	for(let i = 0; i < totPlayers; i++)
	{
		//console.log(currentPlayers[i]);
		for(let j = 0; j < currentPlayers[i].carte.length; j++)
		{
			console.log(currentPlayers[i].carte[j]);
			if(currentPlayers[i].carte[j] === shoutedNumber)
			{
				console.log('Player ' + currentPlayers[i].id + ' has number ' + shoutedNumber);
				playersToEliminate.push(currentPlayers[i].id);
				break;  /* sort de la dernière for loop car le joueur a été éliminé de currentPlayers */
			}
		}
	}
	console.log('\n');
	console.log('Joueurs à éliminer : ');
	console.log(playersToEliminate);
	console.log('\n');
	//return playersToEliminate;

	console.log('Joueurs restant après élimination :');
	for(let i = 0; i < playersToEliminate.length; i++)
		currentPlayers.splice(i, 1);	

	return currentPlayers;
}
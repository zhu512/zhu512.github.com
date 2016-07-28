function showNum(i,j,randNum){
	var numCell = $('#num-cell-' + i +'-' +j);
	numCell.css('background-color',getNumbg(randNum) );
	numCell.css('color',getNumcolor(randNum) );
	numCell.text(randNum);

	numCell.animate({
		width:cellLength,
		height:cellLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

function showMove(fromx, fromy, tox, toy){
	var numCell = $('#num-cell-' + fromx +'-' +fromy);
	numCell.animate({
		width:cellLength,
		height:cellLength,
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$('#score').text(score);
}
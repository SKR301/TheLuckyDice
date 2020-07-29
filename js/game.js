var turn;
var target;
window.onload=function()
{
	newgame();
}

//set new game
function newgame()
{
	var url = new URL(window.location.href);
	target = url.searchParams.get("target");
	target=parseInt(target);

	turn=1;		//turn player 1

	document.getElementById('p2_logo').style.display='none'; 			//hide logo player 2
	document.getElementById('p1_logo').style.display='inline-block'; 	//show logo player 1
	document.getElementById('p1_curr').innerHTML='Current Score: 0';	//reset current scores
	document.getElementById('p2_curr').innerHTML='Current Score: 0';	//reset current scores
	document.getElementById('p1_total').innerHTML='0';	//reset total scores
	document.getElementById('p2_total').innerHTML='0';	//reset total scores

	hide_die();


	if(check_target(target))
	{
		document.getElementById('target_display').innerHTML=target; 	//display target
	}
}

//check for invalid targets
function check_target(target)
{
	if(Number.isNaN(target)||target>500||target<50)
	{
		window.location.href='index.html';
	}
	else
	{
		return true;
	}
}

function roll()
{
	hide_die();
	var val=die_val(Math.random()*10);

	//play sound
	var audio = new Audio();
	audio.src = "mp3/dice_sound.mp3";
	audio.play();

	setTimeout(function(){
		//show die
		show_die(val);

		if(val==1)
		{
			//set current score 0
			document.getElementById('p'+turn+'_curr').innerHTML='Current Score: 0';
			//change turn
			change_turn();
		}
		else
		{
			//update current score
			document.getElementById('p'+turn+'_curr').innerHTML='Current Score: '+
				parseInt(parseInt(document.getElementById('p'+turn+'_curr')
				.innerHTML
				.substr(15,))+val);
		}
	},500);
}

function die_val(val)
{
	const unit=10/6;
	if(val<1*unit){
		return 1;
	}else if(val<2*unit){
		return 2;
	}else if(val<3*unit){
		return 3;
	}else if(val<4*unit){
		return 4;
	}else if(val<5*unit){
		return 5;
	}else{
		return 6;
	}
}

function show_die(val)
{
	hide_die();
	document.getElementById('img'+val).style.display='block';
}

function hide_die()
{
	for(var a=1;a<=6;a++)
	{
		document.getElementById('img'+a).style.display='none';
	}
}

function deal()
{
	document.getElementById('p'+turn+'_total').innerHTML=parseInt(document.getElementById('p'+turn+'_total').innerHTML)+
														parseInt(document.getElementById('p'+turn+'_curr').innerHTML.substr(15,));

	// check win
	if(parseInt(document.getElementById('p'+turn+'_total').innerHTML)>=target)
	{
		alert("PLAYER "+turn+" WINS...!!!");
		window.location.reload();
	}

	//set highest streak
	if(parseInt(document.getElementById('p'+turn+'_curr').innerHTML.substr(15,))>parseInt(document.getElementById('p'+turn+'_ts').innerHTML.substr(12,)))
	{
		document.getElementById('p'+turn+'_ts').innerHTML='Top Streak: '+document.getElementById('p'+turn+'_curr').innerHTML.substr(15,);
	}

	change_turn();
}

function change_turn()
{
	document.getElementById('p'+turn+'_curr').innerHTML='Current Score: 0';
	turn=(turn==1)?2:1;
	document.getElementById('p1_logo').style.display='none';
	document.getElementById('p2_logo').style.display='none';
	document.getElementById('p'+turn+'_logo').style.display='inline-block';
}

document.getElementById('help').onmouseover=function()
{
	setTimeout(function(){
		document.getElementById('help_txt').style.display='block';
	},250);
}

document.getElementById('help').onmouseout=function()
{
	document.getElementById('help_txt').style.display='none';
}
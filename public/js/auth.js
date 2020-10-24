function present() {

	var ww = window.innerWidth;
	var wh = window.innerHeight;

	var a = document.getElementById("sign-up");
	var b = document.getElementById("sign-in");

	ah = a.offsetHeight;
	aw = a.offsetWidth;

	bh = b.offsetHeight;
	bw = b.offsetWidth;

	if( wh >= ww) {

		a.style.width = "90vw";
		b.style.width = "90vw";

		a.style.right = "5vw";
		b.style.right = "5vw";

		document.getElementById("sprite").style.display="none";

	} else {

		if(ww > 1400) {
			a.style.width = "640px";
			b.style.width = "640px";
		} else {
			a.style.width = "480px";
			b.style.width = "480px";			
		}

		a.style.right = "40px";
		b.style.right = "40px";

		document.getElementById("sprite").style.display="block";
	}

	a.style.top = (wh - ah)/2 + "px";
	b.style.top = (wh - bh)/2 + "px";


}


function invokingButtonClicked(id) {

	var a = document.getElementById("sign-up");
	var b = document.getElementById("sign-in");


	if(id == 0) {
		a.style.visibility = "hidden";
		b.style.visibility = "visible";
	} else if(id == 1) {
		a.style.visibility = "visible";
		b.style.visibility = "hidden";
	} else {
		//do nothing ...
	}

}

window.onload = function() {
	present();
	document.getElementById("sign-in").style.visibility = "hidden";
}

window.onresize = function() {
	present();
}
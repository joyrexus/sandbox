//
//  main.js
//  KillMath
//
//  Created by Bret Victor on 4/14/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//

window.addEvent('domready', function () {
	var canvas = document.id("canvas");
	
	$$("canvas").each( function (canvas) {
		if (!canvas.getContext) { return; }   // no canvas support
		var clas = this[canvas.className];
		new clas(canvas);
	});
});


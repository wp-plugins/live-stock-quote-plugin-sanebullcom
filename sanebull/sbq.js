var SBPlugin = {
	tid: 0,
	over: false,
	lastEl : '',
	lastElP: '',
	quoteArray: new Array(),
	quoteHtmlArray: new Array(),

	expandQuote: function( s ) {
		try {
			SBPlugin.loadDoc(s, true);
		} catch (e) {}
    return false;
	},

	loadDoc: function( s, expanded ) {
		var t = 'nochart';
		var h = '170'; var w = '215';
		if (expanded) {t = 'full'; h = '300'; w = '215';}
		SBPlugin.quoteArray[ s ] = new Date( ).getTime();
		html = '<iframe width="'+w+'" height="'+h+'" src="http://www.sanebull.com/widget_plugin.jsp?sec=10&ticker='+s+'&type='+t+'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>';
		SBPlugin.quoteHtmlArray[ s ] = html;
		var spans = document.getElementsByTagName('span');
		if (spans) {
			for (var i = 0; i < spans.length; i++) {
				if (spans[i].className == s) {
					spans[i].innerHTML = html;
				}
			}
		}
	},

	showQuote: function( el, symbol ) {
		if ( SBPlugin.quoteArray[ symbol ] == null || SBPlugin.quoteArray[ symbol ] < new Date( ).getTime( ) - 100000 ) {
			var spans = document.getElementsByTagName('span');
				if (spans) {
					for (var i = 0; i < spans.length; i++) 
						if (spans[i].className == symbol)
							SBPlugin.loadDoc( symbol );
				}
		} else {
			var spans = document.getElementsByTagName('span');
			if (spans) {
				for (var i = 0; i < spans.length; i++) 
					if (spans[i].className == symbol) 
						spans[i].innerHTML = SBPlugin.quoteHtmlArray[ symbol ];
			}
		}
		
		var s = el.getElementsByTagName("span")[0];

		s.style.position="absolute";
		s.style.top="18px";
		s.style.left="10px";
		s.style.width="100px";
		s.style.height="123px";
		s.style.display="block";
		SBPlugin.lastEl = el;
		SBPlugin.lastElP = el.onmouseover;
		var p = el.onmouseover;
		el.onmouseover=function (){};
		s.onmouseover=function (){
			SBPlugin.over = true;	
		};
		s.onmouseout=function (){
			SBPlugin.over = false;	
			el.onmouseover=p;
			s.style.display="none";
		};
		SBPlugin.tid = setTimeout('SBPlugin.check()', 4000);
	},

	check: function () {
		if (SBPlugin.over == false) {
			clearTimeout(SBPlugin.tid);
			SBPlugin.lastEl.onmouseover = SBPlugin.lastElP;
			SBPlugin.lastEl.getElementsByTagName("span")[0].style.display="none";
		}
	}
}
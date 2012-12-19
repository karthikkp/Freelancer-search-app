var items = [];
var count = 0;

var createDivs = function(){
	'use strict';
	$(".projects").remove();
	if(items['projects'].count > (count+1)*24){

		var more = document.getElementById("more");
		more.style.visibility = "visible";
	}

	for(var i = count*24; i < (count+1)*24 && i < items['projects'].count; i++){
				

		if(i % 8 == 0){
			var div = document.createElement('div');
			div.className = "projects";
			document.getElementById("container").appendChild(div);
		}
		
		var p = document.createElement('p');
		var h1 = document.createElement('h1');
		var h2 = document.createElement('h1');
		var h3 = document.createElement('h1');
		var h4 = document.createElement('h1');
		h3.className = "bids";
		h4.className = "bids";
		h1.className = "sub_projects";
		h2.className = "desc";
		p.className = "link";

		h1.innerHTML = items['projects'].items[i].name;
		h2.innerHTML = items['projects'].items[i].short_descr;
		h3.innerHTML = "Bids : " + items['projects'].items[i].bid_stats['count'] + " ";
		var avg = items['projects'].items[i].bid_stats['avg'] == false ? "N/A" : items['projects'].items[i].bid_stats['avg'];
		h4.innerHTML = "Avg bid : " + avg;
		var a = document.createElement('a');
		a.href = items['projects'].items[i].url;
		a.appendChild(h1);
		p.appendChild(a);
		p.appendChild(h2);
		p.appendChild(h3);
		p.appendChild(h4);
		div.appendChild(p);
	}
		count++;
		if(items['projects'].count < (count*24)){
			var more = document.getElementById("more");
			more.style.visibility = "hidden";
		}
	
}

var search = function(){
	'use strict';
	var keyword = document.getElementById("search_text").value;
	var url = "http://api.freelancer.com/Project/Search.json?keyword=" + keyword + "&aff=karthickdoosra&count=100&callback=?";
	$.getJSON(url,function(data){
		var string = JSON.stringify(data);
 		items = JSON.parse(string);
 		console.log(items);
 		if(items['projects'].count>0){
 			createDivs();
 		}
 		else{
 			alert("Sorry your search returned no results");
 		}
 		
});
}
window.onload = function(){
	'use strict';
	if(document.getElementById("search").addEventListener){
	document.getElementById("search").addEventListener('click',search,false);
	document.getElementById("more").addEventListener('click',createDivs,false);
	}
	else if(document.getElementById("search").attachEvent){
	document.getElementById("search").attachEvent('onclick',search,false);
	document.getElementById("more").attachEvent('onclick',createDivs,false);
	}
}
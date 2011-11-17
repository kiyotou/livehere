function initialize() {

	// set Google Map 
	var latlng = new google.maps.LatLng(34.6718, 135.497841);
	var myOptions = {
	  zoom: 15,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_minami"), myOptions);

	// read tweets
	$.getJSON(
		"http://api.twitter.com/1/kiyotou/lists/live/statuses.json?callback=?",
		null,
		function(data, status){
			$.each(data, function(i, item){
			
				// write tweets
				var tweet = '';
				tweet += '<div class="tweet">';
				tweet += '<p><span class="username">'+item.user.name+'</span> '+item.text+'</p>';
				tweet += '<p>'+item.created_at+'</p>';
				tweet += '</div>';
				$("#livetweets").append(tweet);
				
				// add marker with tweet
				
			});
		}
	);

	// add Marker
	$.getJSON("js/livehouse.json", function(data){
		$.each(data, function(){
			// add infoWindow
		    var marker = new google.maps.Marker({
				position: new google.maps.LatLng(this.lat, this.lng), 
				map: map, 
				title:this.name
			});
			var infowindow = new google.maps.InfoWindow({
				content: '<strong>'+this.name+'</strong>'
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		});
	});
	
}







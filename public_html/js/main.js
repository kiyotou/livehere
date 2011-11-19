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
			var tw_id_list = [];
			$.each(data, function(i, item){
			
				// ツイートされたライブハウスのツイッターIDリストを配列に取得
				var tw_id =item.user.screen_name;
				var tw_exist = false;
				for(var i=0; i < tw_id_list.length; i++){
					if(tw_id_list[i] == tw_id){
						tw_exist = true;
					}
				}
				if(tw_exist==false){
					tw_id_list.push(tw_id);
				}
			
				// write tweets
				var tweet = '';
				tweet += '<div class="tweet">';
				tweet += '<p><span class="username">'+item.user.name+'</span> '+item.text+'</p>';
				tweet += '<p>'+item.created_at+'</p>';
				tweet += '</div>';
				$("#livetweets").append(tweet);
				
			});
			console.log(tw_id_list);
		}
	);

	// ツイートがあったライブハウスだけマーカー表示
	$.getJSON("js/livehouse.json", function(data){
			for(var i=0; i < tw_id_list.length; i++){
				if(tw_id_list[i] == this.twitter){
					// add Marker
				    var marker = new google.maps.Marker({
						position: new google.maps.LatLng(this.lat, this.lng), 
						map: map, 
						title:this.name
					});
					// add InfoWindow
					var infowindow = new google.maps.InfoWindow({
						content: '<strong>'+this.name+'</strong>'
					});
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map,marker);
					});
				}
		});
	});
	
}







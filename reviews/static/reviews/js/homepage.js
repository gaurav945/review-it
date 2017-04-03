console.log('working...');

$(document).ready(function () {
	window.onload = function () {
		var input = document.getElementById('searchTextField');
		var options = {
			types: ['establishment']
		};

		autocomplete = new google.maps.places.Autocomplete(input, options);
		
		autocomplete.addListener('place_changed', tester);

		function tester () {
			var place = autocomplete.getPlace();

			var reviews_list = [];
			// debugger;
			if (place.reviews) {
				for (var i=0; i<place.reviews.length; i++) {
					var temp = {}
					temp['author'] = place.reviews[i].author_name;
					temp['review'] = place.reviews[i].text;
					temp['rating'] = place.reviews[i].rating;
					temp['photo'] = place.reviews[i].profile_photo_url;
					temp['time'] = place.reviews[i].relative_time_description;
					reviews_list[i] = temp;
				}
			}		

			data = {
				'name' : place.name,
				'address' : place.formatted_address,
				'icon' : place.icon,
				'place_id' : place.place_id,
				'reviews' : reviews_list
			}

			function getCookie(name) {
			    var cookieValue = null;
			    if (document.cookie && document.cookie != '') {
			        var cookies = document.cookie.split(';');
			        for (var i = 0; i < cookies.length; i++) {
			            var cookie = jQuery.trim(cookies[i]);
			            // Does this cookie string begin with the name we want?
			            if (cookie.substring(0, name.length + 1) == (name + '=')) {
			                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
			                break;
			            }
			        }
			    }
			    return cookieValue;
			}

			// debugger;

			$.ajax({
				url : '/add_place/',
				type : 'POST',
				data : data,
				headers : {
					'X-CSRFToken' : getCookie('csrftoken')
				},
				success : function (response) {
					console.log(response)
				}
			});

			$('#one, #two').unbind();
			$('#one').on('click', function () {
				var place = autocomplete.getPlace();

				// debugger;
				var name = place.name.split(' ').join('-')
				window.location.href = "/" + name + '?id=' + place.place_id;

				if (typeof(input.value) == typeof('string')) {
					// debugger;
					$('#one').unbind();
					$('#one').on('click', function () {
						alert('Please type some establishment...');
					});
				}
			});

			$('#two').on('click', function () {
				var place = autocomplete.getPlace();
				// debugger;
				var name = place.name.split(' ').join('-')
				window.location.href = "/" + name + '?id=' + place.place_id + '&query=add';

				if (typeof(input.value) == typeof('string')) {
					// debugger;
					$('#two').unbind();
					$('#two').on('click', function () {
						alert('Please type some establishment...');
					});
				}
			});

		}

		$('#one, #two').on('click', function () {
			alert('Please type some establishment...');
		});
	}


})
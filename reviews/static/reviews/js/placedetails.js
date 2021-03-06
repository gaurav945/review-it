console.log('working place details...')

$(document).ready(function () {
	if (window.location.href.search('query=add') != -1) {
		setTimeout(function () {
			$('#add-review')[0].click();
		}, 1000)
	}

	$('.logo').on('click', function () {
		window.location.href = '/'
	})

	for (var i=0; i<$('.main-review').length; i++) {
		if ($('.main-review')[i].innerHTML == '') {
			$('.main-review')[i].style.padding = '0px';
			$('.main-review')[i].style.border = 'none';
		}
	}

	for (var i=0; i<$('.each-review').length; i++) {
		if ($('.each-review')[i].innerHTML.trim() == '') {
			$('.each-review')[i].style.backgroundColor = 'inherit';
			$('.each-review')[i].style.border = 'none';
		}
	}	

	var total = [];

	for (var i=0; i<$('.rating').length; i++) {
		var stars = parseInt($('.rating')[i].innerHTML)
		total.push(stars);
		$('.rating')[i].innerHTML = '';
		starmaker(stars, i);
	}

	function starmaker (stars, point) {
		for (var i=0; i<stars; i++) {
			var img_tag = document.createElement('img');
			img_tag.src = "https://qph.ec.quoracdn.net/main-qimg-4ef5048f6d17ba33a9f139f299d85463";
			img_tag.width = "24";
			$(img_tag).css('background-color', 'rgba(98, 98, 96, 0.3)');
			document.getElementsByClassName('rating')[point].appendChild(img_tag);
		}
	}

	function totalRating (total) {
		var temp = 0
		// debugger;
		for (var i=0; i<total.length; i++) {
			temp = temp + total[i]
		}
		var result = temp/total.length
		// debugger;
		document.getElementById('total-rating').innerHTML = result + ' (' + total.length + ' votes)'
	}

	totalRating(total);

	$('#add-review').on('click', function () {
		// debugger;
		$( "#dialog" ).dialog();
		$('.ui-dialog-titlebar').css('background-color', 'rgba(196, 214, 249, 0.9');
		$('.ui-dialog').css('width', '600px');
		$('.ui-dialog').css('height', '450px');
		$('.ui-dialog').css('position', 'absolute');
		$('.ui-dialog').css('top', '90px');
		$('.ui-dialog').css('left', '330px');
		$('.ui-button').css('display', 'none');
		$( "#dialog" ).css('padding', '25px');
	});

	$('#cancel-review').on('click', function () {
		$( "#dialog" ).dialog('close');
	});

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

	$('#submit-review').on('click', function () {
		// debugger;

		var author = $('#user-name').val();
		var rating = $('#user-rating').val();
		var review = $('#entered-review').val();
		var place_id = window.location.href.split('id=')[1];
		if (place_id.search('&query=add') > -1) {
			place_id = place_id.split('&query=add')[0];
		}

		data = {
			'author' : author,
			'rating' : rating,
			'review' : review,
			'place_id' : place_id
		}

		// debugger;

		$.ajax({
			url : '/add_review/',
			type : 'POST',
			data : data,
			headers : {
				'X-CSRFToken' : getCookie('csrftoken')
			},
			success : function (response) {
				console.log(response);

				$( "#dialog" ).dialog('close');

				var new_data = '<div class="each-review col-lg-11">' + 
							'<img src="http://www.ptc.com/images/dummy_avatar.png" class="profile-pic">' + 
							'<span class="author">'+ data.author + '</span></br>' + 
							'<span class="rating">'+ data.rating + '</span></br>' + 
							'<span class="time">'+ 'recent' + '</span></br>' + 
							'<div class="main-review">'+ data.review + '</div>' + 
						'</div>'

				$('.reviews').append(new_data);

				var new_total = [];
				// debugger;
				for (var i=0; i<$('.rating').length; i++) {
					var stars = document.getElementsByClassName('rating')[i].childNodes.length;
					new_total.push(stars);
				}
				totalRating(new_total);
			}
		});
	});
});

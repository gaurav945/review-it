$(document).ready(function () {
	$('.logo').on('click', function () {
		window.location.href = '/'
	})

	var all_places_one = []
	var all_places_two = []
	var all_places_three = []

	var total = $('.one-place').length;

	var one = parseInt(total/3) - 1;
	var two = 2*parseInt(total/3) - 1;
	var three = 3*parseInt(total/3) - 1;

	for (var i=0; i<=one; i++) {
		var name = $('.one-place')[i].innerHTML.trim().split('+')[0];
		var src_value = $('.one-place')[i].innerHTML.trim().split('+')[1];
		var place_id = $('.one-place')[i].innerHTML.trim().split('+')[2];
		var obj = '<div class="one-final-place">' + 
					'<a href="/' + name + '/?id=' + place_id + '"><img class="r-image" src="' + src_value + '">' + name + '</a>' + 
				'</div>'
		all_places_one.push(obj);
		// debugger;
	}
	$('.all').append('<div class="col1 col-lg-4"></div>')
	$('.col1').append(all_places_one)

	for (var i=one+1; i<=two; i++) {
		var name = $('.one-place')[i].innerHTML.trim().split('+')[0];
		var src_value = $('.one-place')[i].innerHTML.trim().split('+')[1];
		var place_id = $('.one-place')[i].innerHTML.trim().split('+')[2];
		var obj = '<div class="one-final-place">' + 
					'<a href="/' + name + '/?id=' + place_id + '"><img class="r-image" src="' + src_value + '">' + name + '</a>' + 
				'</div>'
		all_places_two.push(obj);
		// debugger;
	}
	$('.all').append('<div class="col2 col-lg-4"></div>')
	$('.col2').append(all_places_two)

	for (var i=two+1; i<=three; i++) {
		var name = $('.one-place')[i].innerHTML.trim().split('+')[0];
		var src_value = $('.one-place')[i].innerHTML.trim().split('+')[1];
		var place_id = $('.one-place')[i].innerHTML.trim().split('+')[2];
		var obj = '<div class="one-final-place">' + 
					'<a href="/' + name + '/?id=' + place_id + '"><img class="r-image" src="' + src_value + '">' + name + '</a>' + 
				'</div>'
		all_places_three.push(obj);
		// debugger;
	}
	$('.all').append('<div class="col3 col-lg-4"></div>')
	$('.col3').append(all_places_three)
});
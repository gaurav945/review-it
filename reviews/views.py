from .models import Place, Review
from django.shortcuts import render
from django.http import JsonResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
def homepage (request):
	return render_to_response('reviews/homepage.html', {}, context_instance=RequestContext(request))

@ensure_csrf_cookie
def add_place_to_db (request):
	# import ipdb; ipdb.set_trace();

	id_ = request.POST.get('place_id')
	if len(Place.objects.filter(place_id=id_)) != 0:
		return JsonResponse({'success' : 'the object already existed....'})
	else:
		place = Place()
		place.name = str(request.POST.get('name'))
		place.address = str(request.POST.get('address'))
		place.icon_url = str(request.POST.get('icon'))
		place.place_id = str(request.POST.get('place_id'))
		place.save()

		for i in range (0, 5):
			r = Review()
			try:
				# import ipdb; ipdb.set_trace();
				r.author = str(request.POST.get('reviews[' + str(i) + '][author]'))
				r.review = str(request.POST.get('reviews[' + str(i) + '][review]'))
				r.rating = str(request.POST.get('reviews[' + str(i) + '][rating]'))
				r.profile_pic = str(request.POST.get('reviews[' + str(i) + '][photo]'))
				r.time = str(request.POST.get('reviews[' + str(i) + '][time]'))
				# import ipdb; ipdb.set_trace();
				r.place = place

				r.save()
				# import ipdb; ipdb.set_trace();

				if isinstance(r.author, type(None)) and isinstance(r.review, type(None)) and isinstance(r.rating, type(None)) and isinstance(r.profile_pic, type(None)) and isinstance(r.time, type(None)):
					# import ipdb; ipdb.set_trace();
					r.delete()
			except:
				print 'Well, we encountered an error.'

	return JsonResponse({'success' : 'we created the new object...'})

def show_place (request, place_name):
	# import ipdb; ipdb.set_trace();

	if len(request.get_full_path().split('id=')) > 1:
		# import ipdb; ipdb.set_trace();
		if request.get_full_path().find('&query=add') != -1:
			try:
				id_ = request.get_full_path().split('id=')[-1].split('&query=add')[0]
				p = Place.objects.filter(place_id=id_)[0]
			except:
				return JsonResponse({'failure' : 'something went wrong, we are working hard to fix it...'})
			# return JsonResponse({'name' : name, 'id' : id_})
			reviews = Review.objects.filter(place=p)
			total_places = len(Place.objects.all())
			if total_places >= 10:
				required = Place.objects.all()[total_places-10:total_places]
			else:
				required = Place.objects.all()[0:total_places]
			return render_to_response('reviews/placedetails.html', {'data' : p, 'reviews' : reviews, 'recent' : required}, context_instance=RequestContext(request))
		else:
			try:
				id_ = request.get_full_path().split('id=')[-1]
				p = Place.objects.filter(place_id=id_)[0]
			except:
				return JsonResponse({'failure' : 'something went wrong, we are working hard to fix it...'})
			# return JsonResponse({'name' : name, 'id' : id_})
			reviews = Review.objects.filter(place=p)
			total_places = len(Place.objects.all())
			if total_places >= 10:
				required = Place.objects.all()[total_places-10:total_places]
			else:
				required = Place.objects.all()[0:total_places]
			return render_to_response('reviews/placedetails.html', {'data' : p, 'reviews' : reviews, 'recent' : required}, context_instance=RequestContext(request))
	else:
		return JsonResponse({'failure' : 'please enter the id as well...'})

@ensure_csrf_cookie
def add_review_to_place (request):
	# import ipdb; ipdb.set_trace()
	place_id = request.POST.get('place_id')
	author = request.POST.get('author')
	rating = request.POST.get('rating')
	review = request.POST.get('review')

	p = Place.objects.filter(place_id=place_id)[0]

	r = Review()

	r.author = author
	r.rating = rating
	r.review = review

	r.time = 'recent'

	r.profile_pic = 'http://www.ptc.com/images/dummy_avatar.png'

	r.place = p

	r.save()
	return JsonResponse({'Success' : 'Review object has been created...'})

def browse (request):
	all_places = Place.objects.all()

	return render_to_response('reviews/browseplaces.html', {'places' : all_places}, context_instance=RequestContext(request))
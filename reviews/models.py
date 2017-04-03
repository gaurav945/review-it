from django.db import models

# Create your models here.
class Place (models.Model):
	name = models.CharField(max_length=1024)
	address = models.TextField()
	icon_url = models.CharField(max_length=1024)
	place_id = models.CharField(max_length=1024)

class Review (models.Model):
	author = models.CharField(max_length=1024)
	review = models.TextField()
	rating = models.CharField(max_length=256)
	profile_pic = models.CharField(max_length=1024)
	time = models.CharField(max_length=1024)

	place = models.ForeignKey(Place)
from django.conf.urls import url, include
from django.contrib import admin
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
	url(r'^$', views.homepage, name='homepage'),
	url(r'^add_place/$', views.add_place_to_db, name='add_place_to_db'),
	url(r'^add_review/$', views.add_review_to_place, name='add_review_to_place'),
	url(r'^(?P<place_name>.*)/$', views.show_place, name='show_place'),
]
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('author', models.CharField(max_length=1024)),
                ('review', models.TextField()),
                ('rating', models.CharField(max_length=256)),
                ('profile_pic', models.CharField(max_length=1024)),
                ('time', models.CharField(max_length=1024)),
                ('place', models.ForeignKey(to='reviews.Place')),
            ],
        ),
    ]

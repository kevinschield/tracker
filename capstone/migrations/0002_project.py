# Generated by Django 3.1.1 on 2020-10-07 23:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('projname', models.CharField(max_length=64)),
                ('person', models.CharField(max_length=64)),
                ('units', models.IntegerField()),
                ('unitlabel', models.CharField(max_length=64)),
                ('completed', models.IntegerField()),
                ('theme', models.CharField(max_length=65)),
                ('victory', models.CharField(default='no', max_length=4)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

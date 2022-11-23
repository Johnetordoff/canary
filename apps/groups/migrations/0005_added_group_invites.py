# Generated by Django 3.1.14 on 2022-11-16 16:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('groups', '0004_added_group_invites'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_approved', models.BooleanField(default=False)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='member_requests', to='groups.group')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requested_groups', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Member Request',
                'verbose_name_plural': 'Member Requests',
                'ordering': ['-created_at'],
            },
        ),
    ]
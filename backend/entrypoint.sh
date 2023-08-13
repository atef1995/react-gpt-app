#!/bin/sh

# Adjust file permissions
chmod go-w /usr/share/filebeat/filebeat.yml

# Continue with the main command
exec "$@"
#!/bin/bash
gem install rails
bundle install 
createdb scheduler_db 
postgres -D scheduler_db &
psql -d scheduler_db -c 'create user myapp; \q'
rake db:migrate
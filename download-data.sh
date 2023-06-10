#!/bin/bash

year=2021
month=04
filename=$year-$month.csv

wget http://dev.hsl.fi/citybikes/od-trips-$year/$filename -P data/

curl --form "file=@data/$filename;type=text/csv" http://localhost:8080/file-upload/rental-data
  

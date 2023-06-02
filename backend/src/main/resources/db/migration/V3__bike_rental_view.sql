drop view if exists bike_rentals_by_hour;
create view bike_rentals_by_hour as
select
id,
year(departure_time) as departure_year,
month(departure_time) as departure_month,
day(departure_time) as departure_day,
hour(departure_time) as departure_hour,
year(return_time) as return_year,
month(return_time) as return_month,
day(return_time) as return_day,
hour(return_time) as return_hour,
departure_time,
return_time,
departure_station_id,
return_station_id from bike_rentals br;
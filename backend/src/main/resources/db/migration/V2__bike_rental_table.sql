drop table if exists bike_rentals;
create table if not exists bike_rentals(
  id                      int(11) not null auto_increment
  ,departure_time         datetime not null
  ,return_time            datetime not null
  ,departure_station_id   integer  not null
  ,return_station_id      integer  not null
  ,covered_distance_m     integer  not null
  ,duration_sec           integer  not null
  ,primary key (id)
);
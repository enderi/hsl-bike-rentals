DROP TABLE IF EXISTS BIKE_RENTALS;
CREATE TABLE IF NOT EXISTS BIKE_RENTALS(
  ID                      INTEGER  NOT NULL PRIMARY KEY
  ,DEPARTURE_TIME         DATETIME NOT NULL
  ,RETURN_TIME            DATETIME NOT NULL
  ,DEPARTURE_STATION_ID   INTEGER  NOT NULL
  ,DEPARTURE_STATION_NAME VARCHAR(100) NOT NULL
  ,RETURN_STATION_ID      INTEGER  NOT NULL
  ,RETURN_STATION_NAME    VARCHAR(100) NOT NULL
  ,COVERED_DISTANCE_M     INTEGER  NOT NULL
  ,DURATION_SEC           INTEGER  NOT NULL
);
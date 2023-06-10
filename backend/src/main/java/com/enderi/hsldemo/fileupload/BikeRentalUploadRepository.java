package com.enderi.hsldemo.fileupload;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.Table;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class BikeRentalUploadRepository {
  Logger logger = LoggerFactory.getLogger(BikeRentalUploadRepository.class);
  @Value("${spring.jpa.properties.hibernate.jdbc.batch_size}")
  private Integer batchSize;

  @Autowired
  HikariDataSource hikariDataSource;

  public void batchSave(List<BikeRental> entities) throws SQLException {
    String sql = String.format(
            "INSERT INTO %s "
                    + "(departure_time, return_time, departure_station_id, return_station_id, covered_distance_m, duration_sec) "
                    + "VALUES (?, ?, ?, ?, ?, ?)", BikeRental.class.getAnnotation(Table.class).name());
    try (Connection conn = hikariDataSource.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)){
      int counter = 0;
      for(var entity: entities) {
        statement.clearParameters();
        statement.setString(1, entity.getDepartureTime().toString());
        statement.setString(2, entity.getReturnTime().toString());
        statement.setLong(3, entity.getDepartureStationId());
        statement.setLong(4, entity.getReturnStationId());
        statement.setLong(5, entity.getCoveredDistance());
        statement.setLong(6, entity.getDuration());
        statement.addBatch();
        if ((counter + 1) % batchSize == 0 || (counter + 1) == entities.size()) {
          statement.executeBatch();
          statement.clearBatch();
        }
        counter++;
      }
    }
  }
}

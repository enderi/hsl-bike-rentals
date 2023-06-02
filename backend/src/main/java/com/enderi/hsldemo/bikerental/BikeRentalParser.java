package com.enderi.hsldemo.bikerental;

import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BikeRentalParser {
  @Autowired private BikeRentalMapper bikeRentalMapper;

  public List<BikeRental> parseFileContent(InputStream inputStream) {
    CsvParserSettings settings = new CsvParserSettings();
    settings.setNumberOfRowsToSkip(1);
    CsvParser csvParser = new CsvParser(settings);
    return csvParser.parseAll(inputStream).stream()
        .map(BikeRentalCSV::new)
        .map(this.bikeRentalMapper::toEntity)
        .flatMap(Optional::stream)
        .toList();
  }
}

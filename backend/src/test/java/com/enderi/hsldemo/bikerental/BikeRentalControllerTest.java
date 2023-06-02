package com.enderi.hsldemo.bikerental;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class BikeRentalControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private BikeRentalRepository bikeRentalRepository;

  @BeforeEach
  void setup() {
    when(bikeRentalRepository.findAll())
        .thenReturn(
            List.of(
                BikeRental.builder()
                    .departureTime(LocalDateTime.now())
                    .returnTime(LocalDateTime.now().plusDays(1))
                    .coveredDistance(50L)
                    .duration(51L)
                    .returnStationId(1000L)
                    .departureStationId(100L)
                    .build()));
  }

  @Test
  public void shouldReturnStatusOK() throws Exception {
    this.mockMvc.perform(get("/bike-rentals")).andExpect(status().isOk());
  }

  @Test
  public void shouldReturnTwoItems() throws Exception {
    this.mockMvc.perform(get("/bike-rentals")).andExpect(jsonPath("$", hasSize(1)));
  }

  @Test
  public void shouldReturnCorrectItems() throws Exception {
    this.mockMvc
        .perform(get("/bike-rentals"))
        .andExpect(jsonPath("$[0].departureStationName", equalTo("Home")));
  }

  @Test
  public void shouldThrowWhenNoFileGiven() throws Exception {
    this.mockMvc.perform(multipart("/bike-rentals/upload")).andExpect(status().isBadRequest());
  }

  @Test
  public void shouldResponseOkWhenFileGiven() throws Exception {
    var file = getMockMultipartFile();
    this.mockMvc.perform(multipart("/bike-rentals/upload").file(file)).andExpect(status().isOk());
  }

  @Test
  public void shouldParseFileContentAndStore() throws Exception {
    var file = getMockMultipartFile();
    this.mockMvc.perform(multipart("/bike-rentals/upload").file(file)).andExpect(status().isOk());

    verify(this.bikeRentalRepository, times(1)).saveAll(any(List.class));
  }

  private MockMultipartFile getMockMultipartFile() throws IOException {
    FileInputStream inputFile = new FileInputStream("src/test/resources/bikerentals/example.csv");
    return new MockMultipartFile("file", "example.csv", "plain/text", inputFile);
  }
}

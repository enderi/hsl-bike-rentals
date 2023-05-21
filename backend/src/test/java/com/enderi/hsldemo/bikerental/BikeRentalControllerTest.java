package com.enderi.hsldemo.bikerental;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BikeRentalControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BikeRentalRepository bikeRentalRepository;

    @BeforeEach
    void setup() {
        when(bikeRentalRepository.findAll()).thenReturn(List.of(
                new BikeRental(1L,
                        LocalDateTime.now(),
                        LocalDateTime.now().plusDays(1),
                        "Home",
                        "Target",
                        50L,
                        51L,
                        1000L,
                        100L)
        ));
    }

    @Test
    public void shouldReturnStatusOK() throws Exception {
        this.mockMvc.perform(get("/bike-rentals"))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldReturnTwoItems() throws Exception {
        this.mockMvc.perform(get("/bike-rentals"))
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    public void shouldReturnCorrectItems() throws Exception {
        this.mockMvc.perform(get("/bike-rentals"))
                .andExpect(jsonPath("$[0].departureStationName", equalTo("Home")));
    }
}
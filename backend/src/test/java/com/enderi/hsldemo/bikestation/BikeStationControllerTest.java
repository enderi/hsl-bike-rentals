package com.enderi.hsldemo.bikestation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BikeStationControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BikeStationRepository bikeStationRepository;

    @BeforeEach
    void setup() {
        when(bikeStationRepository.findAll()).thenReturn(List.of(new BikeStation(2L, "MockStation1", 23.4, 12.3), new BikeStation(3L, "MockStation2", 23.2, 12.2)));
    }

    @Test
    public void shouldReturnStatusOK() throws Exception {
        this.mockMvc.perform(get("/bike-stations"))
                .andExpect(status().isOk());

    }

    @Test
    public void shouldReturnTwoItems() throws Exception {
        this.mockMvc.perform(get("/bike-stations"))
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void shouldReturnCorrectItems() throws Exception {
        this.mockMvc.perform(get("/bike-stations"))
                .andExpect(jsonPath("$[0].name", equalTo("MockStation1")))
                .andExpect(jsonPath("$[1].name", equalTo("MockStation2")));
    }
}
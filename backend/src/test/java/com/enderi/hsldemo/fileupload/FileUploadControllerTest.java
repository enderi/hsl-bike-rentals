package com.enderi.hsldemo.fileupload;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FileUploadControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BikeRentalUploadRepository bikeRentalUploadRepository;

    @MockBean
    private BikeRentalParser bikeRentalParser;
    private String path = "/file-upload/rental-data";

    @Test
    public void shouldResponseOkWhenFileGiven() throws Exception {
        var file = getMockMultipartFile();
        this.mockMvc.perform(multipart(path).file(file)).andExpect(status().isOk());
    }

    @Test
    public void shouldParseFileContentAndStore() throws Exception {
        var file = getMockMultipartFile();
        this.mockMvc.perform(multipart(path).file(file)).andExpect(status().isOk());

        verify(this.bikeRentalParser, times(1)).parseFileContent(any());
        verify(this.bikeRentalUploadRepository, times(1)).batchSave(any(List.class));
    }

    private MockMultipartFile getMockMultipartFile() throws IOException {
        FileInputStream inputFile = new FileInputStream("src/test/resources/bikerentals/example.csv");
        return new MockMultipartFile("file", "example.csv", "plain/text", inputFile);
    }
}
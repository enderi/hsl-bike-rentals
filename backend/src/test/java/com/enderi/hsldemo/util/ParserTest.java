package com.enderi.hsldemo.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ParserTest {
    @Test
    public void shouldReturnLongWhenGivenProperString() {
        var longString = "234";
        assert (Parser.toLong(longString)).equals(234L);
    }

    @Test
    public void shouldReturnZeroWhenGivenNull() {
        assert (Parser.toLong(null)).equals(0L);
    }

    @Test
    public void shouldReturnZeroWhenEmptyStringGiven() {
        assert (Parser.toLong("")).equals(0L);
    }

    @Test
    public void shouldReturnDateTimeForProperDate() {
        var date = "2021-04-30T23:59:22";
        var result = Parser.toLocalDateTime(date);
        assertEquals(LocalDateTime.of(2021, 4, 30, 23, 59, 22), result);
    }

    @Test
    public void shouldReturnDateTimeWhenTimeIsMissing() {
        var date = "2021-04-30";
        var result = Parser.toLocalDateTime(date);
        assertEquals(LocalDateTime.of(2021, 4, 30, 0, 0, 0), result);
    }

    @Test
    public void shouldThrowWhenBadStringGiven() {
        var date = "2021-04";
        assertThrows(Exception.class, () -> Parser.toLocalDateTime(date));
    }
}
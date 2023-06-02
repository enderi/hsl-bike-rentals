package com.enderi.hsldemo.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

public class Parser {
    public static Long toLong(String input) {
        if (input == null || input.length() == 0) {
            return 0L;
        }
        return Long.parseLong(input);
    }

    public static LocalDateTime toLocalDateTime(String input) {
        try {
            return LocalDateTime.parse(input);
        } catch (DateTimeParseException pe) {
            return LocalDateTime.of(LocalDate.parse(input), LocalTime.MIDNIGHT);
        }
    }
}

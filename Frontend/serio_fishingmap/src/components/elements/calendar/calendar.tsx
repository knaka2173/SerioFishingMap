"use client";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// react-calendar の Value 互換（内部importしない版）
type CalendarValuePiece = Date | null;
type CalendarValue =
  | CalendarValuePiece
  | [CalendarValuePiece, CalendarValuePiece];

export default function CalendarButton() {
  const [date, setDate] = useState<Date>(new Date());

  const handleChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      setDate(value);
      return;
    }

    if (Array.isArray(value)) {
      const [start] = value;
      if (start instanceof Date) {
        setDate(start);
      }
      return;
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="teal">カレンダーを開く</Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box>
            <Calendar
              onChange={handleChange}
              value={date}
              locale="ja-JP"
              selectRange={false}
            />
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

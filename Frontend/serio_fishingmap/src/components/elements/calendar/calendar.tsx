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

export default function CalendarButton() {
  const [date, setDate] = useState<Date>(new Date());

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
            <Calendar onChange={setDate} value={date} locale="ja-JP" />
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

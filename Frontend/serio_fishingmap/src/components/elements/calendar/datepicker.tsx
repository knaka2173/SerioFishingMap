"use client";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerButton() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="blue">カレンダーを開く</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
            }}
            inline
            locale="ja"
            dateFormat="yyyy/MM/dd"
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

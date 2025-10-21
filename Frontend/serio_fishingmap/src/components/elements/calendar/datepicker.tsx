"use client";

import ja from "date-fns/locale/ja";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerButton() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    // <Popover>
    //   <PopoverTrigger>
    //     <Button colorScheme="blue">カレンダーを開く</Button>
    //   </PopoverTrigger>
    //   <PopoverContent>
    //     <PopoverArrow />
    //     <PopoverCloseButton />
    //     <PopoverBody>
    //       <DatePicker
    //         selected={selectedDate}
    //         onChange={(date) => {
    //           setSelectedDate(date);
    //         }}
    //         inline
    //         locale={ja}
    //         dateFormat="yyyy/MM/dd"
    //         showTimeSelect
    //         timeIntervals={30}
    //       />
    //     </PopoverBody>
    //   </PopoverContent>
    // </Popover>
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
      }}
      locale={ja}
      dateFormat="yyyy/MM/dd HH:mm"
      showTimeSelect
      timeIntervals={30}
    />
  );
}

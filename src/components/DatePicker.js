import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="date-picker">
            <label>Select Date:</label>
            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy" // Customize the date format
            />
        </div>
    );
};

export default CustomDatePicker;

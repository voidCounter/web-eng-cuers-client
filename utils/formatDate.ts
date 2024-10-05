import {format} from 'date-fns';

export function formatDateString(dateString: string | Date) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return ''; // Return empty string if the date is still invalid
    }
    return format(date, 'dd MMMM yyyy'); // Format: "24 May 2019"
}
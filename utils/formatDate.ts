import {format} from 'date-fns';

export function formatDateString(dateString: string | Date) {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy'); // Format: "24 May 2019"
}
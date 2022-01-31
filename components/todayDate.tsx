import {format, parseISO} from "date-fns";

export default function TodayDate() {
    const date = new Date().toISOString();
    return(
        <time dateTime={date}>{format(parseISO(date),'LLLL d, yyyy')}</time>
    )
}
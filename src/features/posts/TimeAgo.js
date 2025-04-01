import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
    let timeAgo = '';
    if (timestamp) {
        try {
            const date = parseISO(timestamp);
            const timePeriod = formatDistanceToNow(date);
            timeAgo = `${timePeriod} ago`;
        } catch (error) {
            timeAgo = "Invalid date"; // Fallback message in case of error
        }
    } else {
        timeAgo = "Unknown time"; // Fallback if timestamp is not provided
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};

export default TimeAgo;

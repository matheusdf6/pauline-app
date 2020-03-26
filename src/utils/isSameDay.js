export default function isSameDate(a, b) {
    return ( a.getMonth() === b.getMonth() && 
            a.getDate() === b.getDate() && 
            a.getFullYear() === b.getFullYear() );
} 
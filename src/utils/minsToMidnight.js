export default function minsToMidnight() {
    var d = new Date();
    return (-d + d.setHours(24,0,0,0))/6e4;
}
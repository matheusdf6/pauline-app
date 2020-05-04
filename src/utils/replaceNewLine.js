export default function replaceNewLine(input) {
    return input.replace(/<br\s*[\/]?>/gi, "");
}
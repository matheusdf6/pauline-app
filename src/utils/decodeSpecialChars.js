export default function decodeSpecialChars(input) {
    const parser = new DOMParser();
    return parser.parseFromString(`<!doctype html><body>${input}`, 'text/html').body.textContent;
}
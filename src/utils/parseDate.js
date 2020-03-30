export default function parseDate(input, format) {
    format = format || 'yyyy-mm-dd'; // default format
    var parts = input.match(/(\d+)/g), 
        i = 0, fmt = {};
    // extract date-part indexes from the format
    format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });
  
    return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}
  

// export default function parseDate(input, format) {
//     format = format || 'yyyy-mm-dd'; // default format
//     var parts = input.match(/(\d+)/g), 
//         i = 0, fmt = {};
//     // extract date-part indexes from the format
//     format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });
  
//     return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
// }
  
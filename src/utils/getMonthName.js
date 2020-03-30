import moment from "moment";

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

const getMonthName = (data) => {
    if(moment.isMoment(data)) {
        return months[data.month()];
    } else if( typeof data.getMonth === 'function' ) {
        return months[data.getMonth()];
    } else if( Date.parse(data) ) {
        let dataObj = new Date(data);
        return months[data.getMonth()];
    } else {
        return null;
    }
}

export default getMonthName;
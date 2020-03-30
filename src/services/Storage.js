import moment from "moment";

function setLocalStorage(key, value, minutes) {
    var expirarem = (new Date().getTime()) + (60000 * minutes);

    key = "@pauline/" + key;

    localStorage.setItem(key, JSON.stringify({
        "value": value,
        "expires": expirarem
    }));
}

function getLocalStorage(key)
{
    localStorageExpires();//Limpa itens

    key = "@pauline/" + key;    
    
    var itemValue = localStorage[key];

    if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {

        //Decodifica de volta para JSON
        var current = JSON.parse(itemValue);
        
        return current.value;
    }

    return false;
}

function getStoredUser() {
    let user = getLocalStorage('user');
    if( user ) {
        return JSON.parse(user);
    }
    return false;
}

function uploadUser(value) {
    setLocalStorage("user", JSON.stringify(value), 10800);
}

function storeTips(tips) {
    let data_criado = moment();
    let transformed = tips.map((e, index) => {
        return {
            tip: e,
            index
        }
    });
    setLocalStorage("tips", {
        tips: transformed,
        data_criado: data_criado.format("YYYY-MM-DD"),
        last_seen: -1,
        already_seen: []
    }, 1440);
}

function getOneTip() {
    let tiplist = getLocalStorage("tips");
    if(tiplist.already_seen !== 'undefined' && tiplist.already_seen.length < 5) {
        let lgth = tiplist.tips.length - 1;
        let rand = getRandomValue(lgth, tiplist.already_seen, 0);
        let choose = tiplist.tips.filter(e => e.index == rand);
        setLocalStorage("tips", {
            tips: tiplist.tips,
            data_criado: tiplist.data_criado,
            last_seen: rand,
            already_seen: [ ...tiplist.already_seen, rand ]
        }, 1440);
        return choose;
    }
    return false;
}

function getRandomValue(max, notin, counter) {
    let rand = Math.floor(Math.random() * max);
    if(counter > 1000) {
        if(notin.includes(rand)) {
            return getRandomValue(max, notin, counter + 1);
        }
        return rand; 
    }
    return rand;
}

function localStorageExpires()
{
    var
        toRemove = [],                      //Itens para serem removidos
        currentDate = new Date().getTime(); //Data atual em milissegundos

    for (var i = 0, j = localStorage.length; i < j; i++) {
       var key = localStorage.key(i);
       var current = localStorage.getItem(key);

       //Verifica se o formato do item para evitar conflitar com outras aplicações
       if (current && /^\{(.*?)\}$/.test(current)) {

            //Decodifica de volta para JSON
            current = JSON.parse(current);

            //Checa a chave expires do item especifico se for mais antigo que a data atual ele salva no array
            if (current.expires && current.expires <= currentDate) {
                toRemove.push(key);
            }
       }
    }

    // Remove itens que já passaram do tempo
    // Se remover no primeiro loop isto poderia afetar a ordem,
    // pois quando se remove um item geralmente o objeto ou array são reordenados
    for (var i = toRemove.length - 1; i >= 0; i--) {
        localStorage.removeItem(toRemove[i]);
    }

}

function removeToken() {
    localStorage.removeItem("@pauline/token");
}

function cleanAndExit() {
    localStorage.removeItem("@pauline/token");
    localStorage.removeItem("@pauline/user");
    localStorage.removeItem("@pauline/recipes");
    localStorage.removeItem("@pauline/tips");
    localStorage.removeItem("@pauline/docs");
    localStorage.removeItem("@pauline/schedules");
    localStorage.removeItem("@pauline/cups");
}

export default Storage = {
    setLocalStorage,
    getLocalStorage,
    getStoredUser,
    uploadUser,
    removeToken,
    storeTips,
    getOneTip,
    cleanAndExit
};

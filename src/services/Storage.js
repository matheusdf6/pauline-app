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

export default Storage = {
    setLocalStorage,
    getLocalStorage
};

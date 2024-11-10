const getRandomNumberWithMax = (max) => {
    return Math.floor(Math.random() * max);
};

const makeAdventureArray = async () => {
    let adventure = [];

    await fetch('./database/actions.json')
    .then(response => response.json())
    .then(data => {
        let action = data; 
        let randomAction = getRandomNumberWithMax(action.length);
        adventure.push(action[randomAction]);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

    await fetch('./database/allies.json')
    .then(response => response.json())
    .then(data => {
        let allies = data;
        let randomAllie = getRandomNumberWithMax(allies.length);
        adventure.push(allies[randomAllie]);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

    await fetch('./database/events.json')
    .then(response => response.json())
    .then(data => {
        let events = data; 
        let randomEvent = getRandomNumberWithMax(events.length);
        adventure.push(events[randomEvent]);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

    await fetch('./database/locals.json')
    .then(response => response.json())
    .then(data => {
        let locals = data; 
        let randomLocal = getRandomNumberWithMax(locals.length);
        adventure.push(locals[randomLocal]);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

    await fetch('./database/object.json')
    .then(response => response.json())
    .then(data => {
        let object = data; 
        let randomObject = getRandomNumberWithMax(object.length);
        adventure.push(object[randomObject]);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

    await fetch('./database/subject.json')
    .then(response => response.json())
    .then(data => {
        let subject = data;
        let randomSubject = getRandomNumberWithMax(subject.length); 
        adventure.push(subject[randomSubject]);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
 

    if (adventure.length === 6) {
        return adventure;
    }
};

const addAddons = async () => {
    let adventure = await makeAdventureArray();

    for (let i = 0; i < adventure.length; i++) {
      if (adventure[i].add) {
        let randomAddons = getRandomNumberWithMax(adventure[i].add.length);
        adventure[i].name =
          adventure[i].name + ", " + adventure[i].add[randomAddons].name;
      }
    }
  
    return adventure.map((el) => {
    return el.name;
    });
};

const initAdventure = async () => {
    const adventure = await addAddons();
    let sujeito = document.querySelectorAll('.sujeito');
    sujeito.forEach(el => el.textContent = `${adventure[5]}`);
    
    let acao = document.querySelectorAll('.acao');
    acao.forEach(el => el.textContent = `${adventure[0]}`);

    let local = document.querySelectorAll('.local');
    local.forEach(el => el.textContent = `${adventure[3]}`);

    let amigo = document.querySelectorAll('.amigo');
    amigo.forEach(el => el.textContent = `${adventure[1]}`);

    let objeto = document.querySelectorAll('.objeto');
    objeto.forEach(el => el.textContent = `${adventure[4]}`);

    let evento = document.querySelectorAll('.evento');
    evento.forEach(el => el.textContent = `${adventure[2]}`);
};
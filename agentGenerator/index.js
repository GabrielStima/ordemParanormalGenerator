const getRandomWithMinAndMax = (max, min) => {
    if (!min) {
      return Math.floor(Math.random() * max);
    }
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

//true Masc false Femi
const getName = async () => {
  let name = null;
  let lastName = null;
  let sex = 0;

  sex = getRandomWithMinAndMax(2, 0);

  await fetch('./database/lastName.json')
  .then(response => response.json())
  .then(data => {
    lastName = data; 
    lastName = lastName[getRandomWithMinAndMax(lastName.length)];
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  if (sex) {
    await fetch('./database/maleName.json')
    .then(response => response.json())
    .then(data => {
      name = data; 
      name = name[getRandomWithMinAndMax(name.length)];
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
    
  } else {
    await fetch('./database/femaName.json')
    .then(response => response.json())
    .then(data => {
      name = data; 
      name = name[getRandomWithMinAndMax(name.length)];
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
  }

  return {name, lastName}
};

const getPhysicalDescription = async () => {
  let hair = null;
  let eyes = null;
  let skin = null;

  await fetch('./database/hair.json')
  .then(response => response.json())
  .then(data => {
    hair = data; 
    hair = hair[getRandomWithMinAndMax(hair.length)].name;
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  await fetch('./database/eyes.json')
  .then(response => response.json())
  .then(data => {
    eyes = data; 
    eyes = eyes[getRandomWithMinAndMax(eyes.length)].name;
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  await fetch('./database/skin.json')
  .then(response => response.json())
  .then(data => {
    skin = data; 
    skin = skin[getRandomWithMinAndMax(skin.length)].name;
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  return {
    height: getRandomWithMinAndMax(200, 130) + " cm",
    weight: getRandomWithMinAndMax(150, 50) + " kg",
    hair,
    eyes,
    skin,
  };
};

const getAge = () => {
  return getRandomWithMinAndMax(80, 15);
};

const getBirthday = (age) => {
  let currentDate = new Date();
  let yearInit = currentDate.getFullYear() - age;
  let month = Math.floor(Math.random() * (12 - 1) + 1);

  return `${month}/${yearInit}`;
};

const getOrigin = async () => {
  let origins = null;

  await fetch('./database/origins.json')
  .then(response => response.json())
  .then(data => {
    origins = data; 
    origins = origins[getRandomWithMinAndMax(origins.length)].name;
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  return origins;
};

const getNex = async () => {
  let nex = null;

  await fetch('./database/nex.json')
  .then(response => response.json())
  .then(data => {
    nex = data; 
    nex = nex[getRandomWithMinAndMax(nex.length)];
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  return nex;
};

const getEvent = async () => {
  let event = null;

  await fetch('./database/events.json')
  .then(response => response.json())
  .then(data => {
    event = data; 
    event = event[getRandomWithMinAndMax(event.length)].name;
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  return event;
};

const getAttributes = (nex) => {
  let agility = 1;
  let strength = 1;
  let intellect = 1;
  let vigor = 1;
  let presence = 1;
  let loop = 4;
  let isNotInit = false;
  let tempNex = nex.split("%")[0];

  switch (true) {
    case tempNex >= 20:
      loop += 1;
      isNotInit = true;
      break;
    case tempNex >= 50:
      loop += 2;
      isNotInit = true;
      break;
    case tempNex >= 80:
      loop += 3;
      isNotInit = true;
      break;
    case tempNex >= 95:
      loop += 4;
      isNotInit = true;
      break;
  }

  for (let i = 0; i < loop; i++) {
    let temp = Math.floor(Math.random() * (5 - 1) + 1);

    switch (true) {
      case temp == 1:
        if ((!isNotInit && agility < 3) || (isNotInit && agility < 5)) {
          agility += 1;
        } else {
          i--;
        }
        break;
      case temp == 2:
        if ((!isNotInit && strength < 3) || (isNotInit && strength < 5)) {
          strength += 1;
        } else {
          i--;
        }
        break;
      case temp == 3:
        if ((!isNotInit && intellect < 3) || (isNotInit && intellect < 5)) {
          intellect += 1;
        } else {
          i--;
        }
        break;
      case temp == 4:
        if ((!isNotInit && vigor < 3) || (isNotInit && vigor < 5)) {
          vigor += 1;
        } else {
          i--;
        }
        break;
      case temp == 5:
        if ((!isNotInit && presence < 3) || (isNotInit && presence < 5)) {
          presence += 1;
        } else {
          i--;
        }
        break;
    }
  }

  return {
    agility,
    strength,
    intellect,
    vigor,
    presence,
  };
};

const getClasse = async (nex, attributes) => {
  let classe = null;
  
  await fetch('./database/class.json')
  .then(response => response.json())
  .then(data => {
    classe = data; 
    classe = classe[getRandomWithMinAndMax(classe.length)];
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));
  
  let expertise = null;

  await fetch('./database/expertise.json')
  .then(response => response.json())
  .then(data => {
    expertise = data;
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

  let tempNex = nex.split("%")[0];
  let tempPV = classe.initPV + attributes.vigor;
  let tempPE = classe.initPE + attributes.presence;
  let tempSan = classe.initSan;
  let tempPericias = [];
  
  if (tempNex % 5 == 0) {
    let temp = tempNex / 5;

    switch (true) {
      case temp == 2:
        for (let i = 0; i < 1; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 3:
        for (let i = 0; i < 2; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 4:
        for (let i = 0; i < 3; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 5:
        for (let i = 0; i < 4; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 6:
        for (let i = 0; i < 5; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 7:
        for (let i = 0; i < 6; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 8:
        for (let i = 0; i < 7; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 9:
        for (let i = 0; i < 8; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 10:
        for (let i = 0; i < 9; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 11:
        for (let i = 0; i < 10; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 12:
        for (let i = 0; i < 11; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 13:
        for (let i = 0; i < 12; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 14:
        for (let i = 0; i < 13; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 15:
        for (let i = 0; i < 14; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 16:
        for (let i = 0; i < 15; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 17:
        for (let i = 0; i < 16; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 18:
        for (let i = 0; i < 17; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
      case temp == 19:
        for (let i = 0; i < 18; i++) {
          tempPV += classe.updatePV + attributes.vigor;
          tempPE += classe.updatePE + attributes.presence;
          tempSan += classe.updateSan;
        }
        break;
    }
  } else {
    for (let i = 0; i < 19; i++) {
      tempPV += classe.updatePV + attributes.vigor;
      tempPE += classe.updatePE + attributes.presence;
      tempSan += classe.updateSan;
    }
  }

  if (classe.name == "Combatente") {
    let tempNumberPericias = classe.pericias.numberPericias + attributes.intellect;
    for (let index = 0; index < classe.pericias.numberEscolha; index++) {
      let temp = classe.pericias.idPericias[getRandomWithMinAndMax(classe.pericias.idPericias.length)]
      let tempPeri = expertise.find(el => el.id == temp);
      
      if(tempPericias.find(el => el === tempPeri.name)){
        index--;
      } else {
        switch (true) {
          case tempPeri.name == "Luta":
            if (tempPericias.find(el => el === "Pontaria")) {
              index--;
            } else {
              tempPericias.push(tempPeri.name);
            }
            break;
          case tempPeri.name == "Pontaria":
            if (tempPericias.find(el => el === "Luta")) {
              index--;
            } else {
              tempPericias.push(tempPeri.name);
            }
            break;
          case tempPeri.name == "Fortitude":
            if (tempPericias.find(el => el === "Reflexos")) {
              index--;
            } else {
              tempPericias.push(tempPeri.name);
            }
            break;
          case tempPeri.name == "Reflexos":
            if (tempPericias.find(el => el === "Fortitude")) {
              index--;
            } else {
              tempPericias.push(tempPeri.name);
            }
            break;
        }
      }
    }

    for (let index = 0; index < tempNumberPericias; index++) {
      let temp = expertise[getRandomWithMinAndMax(expertise.length)];

      if(tempPericias.find(el => el === temp.name)){
        index--;
      } else {
        tempPericias.push(temp.name);
      }
    }
  }
  if (classe.name == "Especialista") {
    let tempNumberPericias = classe.pericias.numberPericias + attributes.intellect;

    for (let index = 0; index < tempNumberPericias; index++) {
      let temp = expertise[getRandomWithMinAndMax(expertise.length)];

      if(tempPericias.find(el => el === temp.name)){
        index--;
      } else {
        tempPericias.push(temp.name);
      }
    }
  }
  if (classe.name == "Ocultista") {
    let tempNumberPericias = classe.pericias.numberPericias + attributes.intellect;
    
    for (let index = 0; index < classe.pericias.numberEscolha; index++) {
      let temp = classe.pericias.idPericias[getRandomWithMinAndMax(classe.pericias.idPericias.length)]
      let tempPeri = expertise.find(el => el.id == temp);
      
      tempPericias.push(tempPeri.name);
    }

    for (let index = 0; index < tempNumberPericias; index++) {
      let temp = expertise[getRandomWithMinAndMax(expertise.length)];

      if(tempPericias.find(el => el === temp.name)){
        index--;
      } else {
        tempPericias.push(temp.name);
      }
    }
  }

  return {
    name: classe.name,
    pv: tempPV,
    pe: tempPE,
    san: tempSan,
    proficiencias: classe.proficiencias,
    pericias: tempPericias
  };
}

const getPersonality = async () => {
  let traits = [];
  let personality = null;

  await fetch('./database/personality.json')
  .then(response => response.json())
  .then(data => {
    personality = data;
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));


  for (let index = 0; index < 4; index++) {
    let temp = personality[getRandomWithMinAndMax(personality.length)].name;

    if(traits.find(el => el === temp)){
      index--;
    } else {
      traits.push(temp);
    }
  }

  return traits;
}

const getPersona = async () => {
  let name = await getName();
  let age = getAge();
  let birthday = getBirthday(age);
  let origin = await getOrigin();
  let nex = await getNex();
  let attributes = getAttributes(nex.nex);
  let classe = await getClasse(nex.nex, attributes);
  let traits = await getPersonality();
  let event = await getEvent();
  let physicalDescription = await getPhysicalDescription();

  document.querySelector('#classe').textContent = classe.name;
  document.querySelector('#pv').textContent = classe.pv;
  document.querySelector('#pe').textContent = classe.pe;
  document.querySelector('#san').textContent = classe.san;
  document.querySelector('#proficiencias').textContent = classe.proficiencias;

  document.querySelector('#nome').textContent = `${name.name.name} ${name.lastName.name}`;
  document.querySelector('#aniversario').textContent = birthday;
  document.querySelector('#idade').textContent = age;
  document.querySelector('#origem').textContent = origin;
  document.querySelector('#evento').textContent = event;
  document.querySelector('#personalidade').textContent = `${traits[0]}, ${traits[1]}, ${traits[2]}, ${traits[3]}`;
  document.querySelector('#nex').textContent = nex.nex;
  document.querySelector('#limite-pe').textContent = nex.limitePE;

  document.querySelector('#altura').textContent = physicalDescription.height;
  document.querySelector('#peso').textContent = physicalDescription.weight;
  document.querySelector('#cabelo').textContent = physicalDescription.hair;
  document.querySelector('#olhos').textContent = physicalDescription.eyes;
  document.querySelector('#pele').textContent = physicalDescription.skin;

  document.querySelector('#forca').textContent = attributes.strength;
  document.querySelector('#agilidade').textContent = attributes.agility;
  document.querySelector('#intelecto').textContent = attributes.intellect;
  document.querySelector('#vigor').textContent = attributes.vigor;
  document.querySelector('#presenca').textContent = attributes.presence;

};
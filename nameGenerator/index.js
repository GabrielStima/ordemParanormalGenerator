const getRandomWithMinAndMax = (max, min) => {
    if (!min) {
      return Math.floor(Math.random() * max);
    }
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

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
  
    document.querySelector('#nome').textContent = name.name;
    document.querySelector('#sobrenome').textContent = lastName.name;
  };
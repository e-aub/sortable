let superHeroesData = []
// Request the file with fetch, the data will downloaded to your browser cache.
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) => response.json()) // parse the response from JSON
    .then((data) => {
        superHeroesData = filterData(data);
        putDataInTable(superHeroesData)

    }) // .then will call the `loadData` function with the JSON value.

// This function is called only after the data has been fetched, and parsed.



function filterData(heroes) {
    var filteredHeroes = []
    for (let hero of heroes) {
        var temp = {}
        temp.icon = hero.images.xs
        temp.name = hero.name
        temp.fullName = hero.biography.fullName
        temp.powerStats = hero.powerstats
        temp.race = hero.appearance.race
        temp.gender = hero.appearance.gender
        temp.height = hero.appearance.height
        temp.weight = hero.appearance.weight
        temp.placeOfBirth = hero.biography.placeOfBirth
        temp.alignment = hero.biography.alignment
        filteredHeroes.push(temp)
    }
    return filteredHeroes
}


function putDataInTable(superHeroesData) {
    const tableBody = document.querySelector('tbody'); 

    for (let hero of superHeroesData) {
        const row = document.createElement('tr');
        const tData1 = document.createElement('td');
        tData1.innerHTML = `<img src="${hero.icon}" alt="${hero.name} icon" style="width:50px;">`; // Icon as an image
        const tData2 = document.createElement('td');
        tData2.textContent = hero.name;
        const tData3 = document.createElement('td');
        tData3.textContent = hero.fullName;
        const tData4 = document.createElement('td');
        tData4.textContent = hero.powerStats; 
        const tData5 = document.createElement('td');
        tData5.textContent = hero.race;
        const tData6 = document.createElement('td');
        tData6.textContent = hero.gender;
        const tData7 = document.createElement('td');
        tData7.textContent = hero.height;
        const tData8 = document.createElement('td');
        tData8.textContent = hero.weight;
        const tData9 = document.createElement('td');
        tData9.textContent = hero.placeOfBirth;
        const tData10 = document.createElement('td');
        tData10.textContent = hero.alignment;

        row.append(tData1, tData2, tData3, tData4, tData5, tData6, tData7, tData8, tData9, tData10);
        tableBody.appendChild(row); 
    }
}
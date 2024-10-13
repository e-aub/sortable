let tableContentLength = 20
let currentPage = 1
let sortDirection = true;
let superHeroesData = [];

// Request the file with fetch, the data will downloaded to your browser cache.
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) => response.json()) // parse the response from JSON
    .then((data) => {
        superHeroesData = filterData(data);
        putDataInTable(superHeroesData, 0, 20)
        console.log(superHeroesData.length)

    }) // .then will call the `loadData` function with the JSON value.

const selectElement = document.getElementById('pageSize')
selectElement.addEventListener('change', function () {
    let selectedValue = selectElement.value;
    if (selectedValue === 'all') {
        tableContentLength = superHeroesData.length;
    } else {
        tableContentLength = parseInt(selectedValue);
    }
    currentPage = 0;
    putDataInTable(superHeroesData, currentPage, tableContentLength);
});

const nextPageButton = document.getElementById('nextPage');
nextPageButton.addEventListener('click', function () {
    currentPage++;
    let start = currentPage * tableContentLength;
    let end = start + tableContentLength;

    if (start < superHeroesData.length) {
        end = Math.min(end, superHeroesData.length)
        putDataInTable(superHeroesData, start, end);
    } else {
        currentPage--;
    }
    console.log(document.getElementsByTagName('tr').length - 1)
});

const prevPageButton = document.getElementById('prevPage');
prevPageButton.addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage--;
        const start = currentPage * tableContentLength;
        const end = start + tableContentLength;
        putDataInTable(superHeroesData, start, end);
    }
    console.log(document.getElementsByTagName('tr').length - 1)

});


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


function putDataInTable(superHeroesData, start = 0, end = superHeroesData.length) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''

    for (let i = start; i < end; i++) {

        // console.log(i)
        const row = document.createElement('tr');
        const tData1 = document.createElement('td');
        tData1.innerHTML = `<img src="${superHeroesData[i].icon}" alt="${superHeroesData[i].name} icon" style="width:50px;">`;

        const tData2 = document.createElement('td');
        tData2.textContent = superHeroesData[i].name;

        const tData3 = document.createElement('td');
        tData3.textContent = superHeroesData[i].fullName;

        const tData4 = document.createElement('td');
        const powerStatsList = document.createElement('ul');

        const li1 = document.createElement('li');
        li1.textContent = `Intelligence: ${superHeroesData[i].powerStats.intelligence}`;

        const li2 = document.createElement('li');
        li2.textContent = `Strength: ${superHeroesData[i].powerStats.strength}`;

        const li3 = document.createElement('li');
        li3.textContent = `Speed: ${superHeroesData[i].powerStats.speed}`;

        const li4 = document.createElement('li');
        li4.textContent = `Durability: ${superHeroesData[i].powerStats.durability}`;

        const li5 = document.createElement('li');
        li5.textContent = `Power: ${superHeroesData[i].powerStats.power}`;

        const li6 = document.createElement('li');
        li6.textContent = `Combat: ${superHeroesData[i].powerStats.combat}`;

        powerStatsList.append(li1, li2, li3, li4, li5, li6);
        tData4.appendChild(powerStatsList);

        const tData5 = document.createElement('td');
        tData5.textContent = superHeroesData[i].race;

        const tData6 = document.createElement('td');
        tData6.textContent = superHeroesData[i].gender;

        const tData7 = document.createElement('td');
        tData7.textContent = superHeroesData[i].height;

        const tData8 = document.createElement('td');
        tData8.textContent = superHeroesData[i].weight;

        const tData9 = document.createElement('td');
        tData9.textContent = superHeroesData[i].placeOfBirth;

        const tData10 = document.createElement('td');
        tData10.textContent = superHeroesData[i].alignment;

        row.append(tData1, tData2, tData3, tData4, tData5, tData6, tData7, tData8, tData9, tData10);

        tableBody.appendChild(row);
    }
    console.log(document.getElementsByTagName('tr').length - 1)
}


function sortTable(key) {
    if (key === 'height' || key === 'weight') {
        sortByNumbers(superHeroesData, key, sortDirection);
    } else if (key === 'powerStats') {
        sortByPowerStats(superHeroesData, sortDirection);
    } else {
        sortByAlphabet(superHeroesData, key, sortDirection);
    }
    sortDirection ? sortDirection = false : sortDirection = true
}
function sortByAlphabet(superHeroesData, key, order = 'asc') {
    superHeroesData.sort((a, b) => {
        const aValueMatch = a[key] ? a[key].match(/[a-zA-Z]+/g) : null;
        const bValueMatch = b[key] ? b[key].match(/[a-zA-Z]+/g) : null;

        const aValue = aValueMatch ? aValueMatch.join('') : '';
        const bValue = bValueMatch ? bValueMatch.join('') : '';
        if (aValue === '') return 1;
        if (bValue === '') return -1;
        const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        return order === true ? comparison : -comparison;
    });
    putDataInTable(superHeroesData, 0, tableContentLength);
    currentPage = 1
}
function sortByNumbers(superHeroesData, key, order = 'asc') {
    superHeroesData.sort((a, b) => {
        const valueA = parseFloat(a[key]) || 0;
        const valueB = parseFloat(b[key]) || 0;
        const comparison = valueA - valueB;
        return order === 'asc' ? comparison : -comparison;
    });
    putDataInTable(superHeroesData, 0, tableContentLength);
    currentPage = 1
}
function sortByPowerStats(superHeroesData, order = 'asc') {
    superHeroesData.sort((a, b) => {
        const getPowerStatsTotal = (hero) => {
            let total = 0;
            for (let stat in hero.powerStats) {
                total += parseFloat(hero.powerStats[stat]) || 0;
            }
            return total;
        };
        const valueA = getPowerStatsTotal(a);
        const valueB = getPowerStatsTotal(b);
        const comparison = valueA - valueB;
        return order === 'asc' ? comparison : -comparison;
    });
    putDataInTable(superHeroesData, 0, tableContentLength);
    currentPage = 1
}





//////////search

function search() {
    let searchResults = new Set;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    for (i = 0; i < superHeroesData.length; i++) {

        if (superHeroesData[i].race ? superHeroesData[i].race.toUpperCase().indexOf(filter) > -1 : false) {
            searchResults.add(superHeroesData[i]);
        }
        if (superHeroesData[i].name ? superHeroesData[i].name.toUpperCase().indexOf(filter) > -1 : false) {
            searchResults.add(superHeroesData[i]);

        }
        if (superHeroesData[i].placeOfBirth ? superHeroesData[i].placeOfBirth.toUpperCase().indexOf(filter) > -1 : false) {
            searchResults.add(superHeroesData[i]);
        }
        if (superHeroesData[i].fullName ? superHeroesData[i].fullName.toUpperCase().indexOf(filter) > -1 : false) {
            searchResults.add(superHeroesData[i]);

        }
        if (superHeroesData[i].gender ? superHeroesData[i].gender.toUpperCase().indexOf(filter) > -1 : false) {
            searchResults.add(superHeroesData[i]);

        }
        if (superHeroesData[i].height ? superHeroesData[i].height.toString().toUpperCase().indexOf(filter) > -1 : false) {
            searchResults.add(superHeroesData[i]);

        }
        if (superHeroesData[i].weight ? superHeroesData[i].weight.toString().toUpperCase().indexOf(filter) > -1 : false) {
            searchResults.add(superHeroesData[i]);

        }
        // if (superHeroesData[i].powerStats ? superHeroesData[i].powerStats.toUpperCase().indexOf(filter) > -1:false) {
        //     searchResults.add(superHeroesData[i]);

        // }



    }
    putDataInTable(Array.from(searchResults))
    console.log(searchResults)
}
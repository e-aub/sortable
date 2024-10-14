let tableContentLength = 20
let currentPage = 1
let sortDirection = true;
let superHeroesData = [];
let searchResults = [];

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) =>{
        if (!response.ok){
            throw new Error('error while fetching data')
        }
        return response.json()
    } )
    .then((data) => {
        superHeroesData = filterData(data);
        putDataInTable(superHeroesData, 0, 20)
        console.log(superHeroesData.length)

    }).catch((error)=>{
        console.log(error)
    })


const selectElement = document.getElementById('pageSize')
selectElement.addEventListener('change', function () {
    console.log(searchResults)
    let searchBar = document.getElementById('search');
    let dataToSplit = searchBar.value !== '' ? searchResults : superHeroesData
    let selectedValue = selectElement.value;
    if (selectedValue === 'all') {
        tableContentLength = dataToSplit.length;
    } else {
        tableContentLength = parseInt(selectedValue);
    }
    currentPage = 1;
    tableContentLength = Math.min(dataToSplit.length, tableContentLength)
    console.log(dataToSplit)
    putDataInTable(dataToSplit, 0, tableContentLength);
});

const nextPageButton = document.getElementById('nextPage');
nextPageButton.addEventListener('click', function () {
    let searchBar = document.getElementById('search');
    let dataToSplit = searchBar.value !== '' ? searchResults : superHeroesData
    let start = currentPage * tableContentLength;
    let end = start + tableContentLength;
    if (start < dataToSplit.length) {
        end = Math.min(end, dataToSplit.length)
        putDataInTable(dataToSplit, start, end);
        currentPage++;
    }
    console.log('current page', currentPage)

    console.log(document.getElementsByTagName('tr').length - 1)
});

const prevPageButton = document.getElementById('prevPage');
prevPageButton.addEventListener('click', function () {
    let searchBar = document.getElementById('search');
    let dataToSplit = searchBar.value !== '' ? searchResults : superHeroesData
    if (currentPage > 1) {
        currentPage--;
        let start = (currentPage - 1) * tableContentLength;
        let end = start + tableContentLength;
        putDataInTable(dataToSplit, start, end);
    }
    console.log(document.getElementsByTagName('tr').length - 1)
    console.log('current page', currentPage)

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
        if (i >= superHeroesData.length) break;
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




function sortByWeight(superHeroesData, order = true) {
    superHeroesData.sort((a, b) => {
        const weightA = parseFloat(a.weight) || "";
        const weightB = parseFloat(b.weight) || "";

        if (weightA === "" && weightB === "") return 0;

        if (weightA === "") return 1;
        if (weightB === "") return -1;

        const comparison = weightA - weightB;
        return order ? comparison : -comparison;
    });

    putDataInTable(superHeroesData);
}




function convertHeightToCm(height) {
    if (height){
        if (height.includes('cm')) {
            const value = parseFloat(height);
            return value;
        }else if (height.includes('m')) {
            const value = parseFloat(height);
            return value * 100;
        }
    }else{
        return 0
    }
        
}


function sortByHeight(superHeroesData, order = true) {
    superHeroesData.sort((a, b) => {
        const valueA = convertHeightToCm(a.height[1]);
        const valueB = convertHeightToCm(b.height[1]);

        if (valueA === 0 && valueB !== 0) return 1;
        if (valueB === 0 && valueA !== 0) return -1;

        const comparison = valueA - valueB;
        return order ? comparison : -comparison;
    });

    putDataInTable(superHeroesData);
}




function sortTable(key) {
    if (key === 'weight') {
        sortByWeight(superHeroesData, sortDirection);
    } else if (key === 'powerstats') {
        sortByPowerStats(superHeroesData, sortDirection);
    } else if (key === 'height') {
        sortByHeight(superHeroesData, sortDirection);
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



function getPowerStatsTotal(hero) {
    if (!hero.powerStats) return 0;

    return Object.values(hero.powerStats)
        .reduce((total, stat) => total + (parseFloat(stat) || 0), 0);
}



function sortByPowerStats(superHeroesData, order = true) {
    superHeroesData.sort((a, b) => {
        const valueA = getPowerStatsTotal(a);
        const valueB = getPowerStatsTotal(b);

        const comparison = valueA - valueB;
        return order ? comparison : -comparison;
    });

    putDataInTable(superHeroesData);
}




//////////search

function search() {
    const selectElement = document.getElementById('pageSize')
    selectElement.selectedIndex = 4;
    let searchResultsSet = new Set;
    let input = document.getElementById('search');
    let filterElement = document.getElementById('filterRange')
    let filterRange = filterElement.value
    let filter = input.value.toUpperCase();
    for (i = 0; i < superHeroesData.length; i++) {
        if (filterRange === 'all' || filterRange === 'race') {
            if (superHeroesData[i].race ? superHeroesData[i].race.toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'name') {
            if (superHeroesData[i].name ? superHeroesData[i].name.toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'placeOfBirth') {
            if (superHeroesData[i].placeOfBirth ? superHeroesData[i].placeOfBirth.toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'fullName') {
            if (superHeroesData[i].fullName ? superHeroesData[i].fullName.toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'gender') {
            if (superHeroesData[i].gender ? superHeroesData[i].gender.toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'height') {
            if (superHeroesData[i].height ? superHeroesData[i].height.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'weight') {
            if (superHeroesData[i].weight ? superHeroesData[i].weight.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'intellgence') {
            if (superHeroesData[i].powerStats.intelligence ? superHeroesData[i].powerStats.intelligence.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'strenght') {
            if (superHeroesData[i].powerStats.strength ? superHeroesData[i].powerStats.strength.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'speed') {
            if (superHeroesData[i].powerStats.speed ? superHeroesData[i].powerStats.speed.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'durability') {
            if (superHeroesData[i].powerStats.durability ? superHeroesData[i].powerStats.durability.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'power') {
            if (superHeroesData[i].powerStats.power ? superHeroesData[i].powerStats.power.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }
        if (filterRange === 'all' || filterRange === 'combat') {
            if (superHeroesData[i].powerStats.combat ? superHeroesData[i].powerStats.combat.toString().toUpperCase().indexOf(filter) > -1 : false) {
                searchResultsSet.add(superHeroesData[i]);
            }
        }




    }
    currentPage = 1
    searchResults = Array.from(searchResultsSet)
    putDataInTable(searchResults)
}

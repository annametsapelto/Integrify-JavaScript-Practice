/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */
/*
const printNum = () => {
    for (let i = 0; i <= 100; i++) {
        console.log(i);
    }
}

printNum()
*/
/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] . 
You only need to produce the same array as expected result, no need to consider other 
possibility.
 */

let myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
const fixDate = (array) => {
    const tempArray = array.map(date => {
        const sortData = date.split("-").sort((a, b) => a - b);
        return [sortData[1], sortData[0], sortData[2]].join("-");
    });
    return tempArray;
}

let newArr = fixDate(myArr)
console.log(newArr)

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000)
const dateTo = new Date(1000000000)
const counter = (from, to) => {
    const differenceInMs = to - from;
    const days = Math.floor(differenceInMs / (24*60*60*1000));
    const daysAsMs = differenceInMs % (24*60*60*1000);
    const hours = Math.floor(daysAsMs / (60*60*1000));
    const hoursAsMs = differenceInMs % (60*60*1000);
    const minutes = Math.floor(hoursAsMs / (60*1000));
    const minutesAsMs = differenceInMs % (60*1000);
    seconds = Math.floor(minutesAsMs / 1000);
    return days + " days - " + hours + " hours - " + minutes + " minutes - " + seconds + " seconds";
}
const timer = counter(dateFrom, dateTo);
console.log(timer)

/* 
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/

const getAllCountries = async () => {
    const url_allCoutries = "https://restcountries.com/v3.1/all?fields=name";
    const allCountries = await fetch(url_allCoutries).then((response) => response.json()).catch(error => console.error(error));
    const countryNameList = allCountries.map(country => {return country.name.common
    })
    const sortedCountryList = countryNameList.sort();
    sortedCountryList.map(country => {console.log(country)});
}

const getSingleCountry = async (countryName) => {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    const countryData = await fetch(url).then((response) => response.json()).catch(error => console.error(error));
    console.log(countryData);
}

getAllCountries()
/*
const searchCountry = (event) => {
    event.preventDefault();
    const countryName = document.getElementById('country');
    getSingleCountry(countryName);
}

const init = () => {
    document.getElementById('submit-button').addEventListener('click', searchCountry)
}
document.addEventListener('Loaded', init)
*/
/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

const generateNewFolderName = (existingFolders) => {
    let folderName = "New Folder";
    if (existingFolders.length === 0) {
        existingFolders.push(folderName);
    }
    else {
        const folderNumber = existingFolders.length;
        folderName = `New Folder (${folderNumber})`;
        existingFolders.push(folderName);
    }
}

let folder = []
generateNewFolderName(folder)
generateNewFolderName(folder)
generateNewFolderName(folder)
generateNewFolderName(folder)
console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']

/* 
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) and profit 
(private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the price with a certain amount 
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook: 
- inherit Book, but have 1 more private parameter in the constructor: taxRate. 
- give the logic to calculate price with taxRate. For example: 
cost 14, profit 0.3 , tax 24% => expected price is 30.43
*/
class Book {
    _title
    _cost
    _profit
    _price
    constructor(title, cost, profit) {
        if (title.trim() == "" || typeof title != "string") {
            throw new Error ("Title cannot be empty and it must be a string.");
        }
        if (cost < 0 || typeof cost != "number") {
            throw new Error ("The cost must be a positive number.");
        }
        if (profit < 0 || profit >= 0.5) {
            throw new Error ("Profit has to be between 0 and 0.5.")
        } else {
            this._title = title;
            this._cost = cost;
            this._profit = profit;
            this._price = this._cost / (1 - this._profit);
        }
    }

    get title() { return this._title; }

    get cost() { return this._cost; }

    get profit() { return this._profit; }

    get price() { return this._price; }
}

class TaxableBook extends Book {
    _taxRate

    constructor(title, cost, profit, taxRate) {
        super(title, cost, profit);
        this._taxRate = taxRate;
    }

    get taxRate() { return this._taxRate; } 

    priceWithTaxRate() {
        return this._price * (1 + this._taxRate / 100);
    }
}

const book1 = new Book("The Power of Habits", 14, 0.3)
const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 24)
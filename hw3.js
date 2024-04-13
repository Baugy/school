/*
Input: 
const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 35
  }
}

Output:
const dtoOut = [
  {
    gender: "male",
    birthdate: "1993-08-07T00:00:00.000Z",
    name: "Vratislav",
    surname: "Sýkora",
    workload: 40
  },
  {
    gender: "female",
    birthdate: "2000-01-03T00:00:00.000Z",
    name: "Jiřina",
    surname: "Ptáčková",
    workload: 20
  }
]
*/


function main(dtoIn){
    //1 Ověření input formátu
    const validation = validateInput(dtoIn);
    //2 Pokud pole není prázdné, input není v pořádku
    //  Vypsat errory
    if(validation.length > 0){
        // 2 vrácení chyb
        return validation;
    } 
    //3 Generování dtoOut
    const dtoOut = generateOutput(dtoIn);
    //4 Vracení dtoOut pole
    return dtoOut
}

function generateOutput(dtoIn){
    //1 Deklarace pole, kam se budou ukládat data
    const people = [];
    //2 Cyklus, který poběží tolikrát, kolikrát je hodnota count v inputu
    for(let i = 0; i < dtoIn.count; i++){
        // 2.1 Volání funkcí
        let person = getPerson()
        let name = person.firstName;
        let surname = person.surname;
        let gender = person.gender;
        let birthdate = generateDatetime(dtoIn.age);
        let workload = randomizeWorkload();
        // 2.2 Uložení do formátu dtoOut
        people.push({
            gender: gender,
            birthdate: birthdate,
            name: name,
            surname: surname,
            workload: workload
        });
    }
    //3 Vrácení pole
    return people;
}

function validateInput(dIn){
    // 1 Deklarace proměné
    let errors = [];
    // 2 Ověření struktury
    // 2.1 Deklarace vzoru
    const correctKeys = ['count', 'age'];
    // 2.2 Uložení klíčů v inputu
    const inputKeys = Object.keys(dIn);
    if(!inputKeys.every(key => correctKeys.includes(key)) || correctKeys.length !== inputKeys.length){
        errors = 'Incorrect format!\n Correct:\n dtoIn = {\n  count: 50,\n  age: {\n  min: 36,\n  max: 35}\n }\n';
        //2.2.1 Nesprávný formát, nemá smysl pokračovat
        return errors;
    }
    // 3 Sekvence validací dtoIn
    // 3.1 Kontrola dtoIn.count
    if (typeof dIn.count !== 'number' || dIn.count <= 0 || !Number.isInteger(dIn.count) || dIn.count > 50){
        errors.push("Count must be a positive integer in range 1 to 50 inc.");
    }
    // 3.2 Kontrola dtoIn.age
    if (typeof dIn.age !=='object' || !dIn.age){
        errors.push("Age must be an object containing min and max age range values.");
    } else {
        //3.2.1 Kontrola dtoIn.age.min
        if (typeof dIn.age.min !== 'number' || dIn.age.min < 18 || !Number.isInteger(dIn.age.min)){
            errors.push("Min age value must be positive integer > 18.");
        }
        //3.2.2 Kontrola dtoIn.age.min
        if(typeof dIn.age.max !== 'number' || dIn.age.max < dIn.age.min || dIn.age.max > 70 || !Number.isInteger(dIn.age.max)){
            errors.push("Max age value must be positive integer <= 70 and > min age value.");
        }
    }
    // 4 Vrácení pole chyb
    return errors;
};

function randomizeName(gender) {
    // 1 Určení správné sekce v datasetu
    let namesArray = dataset.names[gender];
    // 2 Randomizace jména
    let nameObject = namesArray[Math.floor(Math.random() * namesArray.length)];
    // 3 Vracení jména
    return nameObject.name;
}

function randomizeSurname(gender) {
    // 1 Určení správné sekce v datasetu
    let surnamesArray = dataset.surnames[gender];
    // 2 Randomizace přijmení
    let surnameObject = surnamesArray[Math.floor(Math.random() * surnamesArray.length)];
     // 3 Vracení přijmení
    return surnameObject.surname;
}
function getPerson(){
    // 1 Získání pohlaví
    let gender = randomizeGender();
    // 2 Volání funkcí pro získání jména a přijmení
    let firstName = randomizeName(gender);
    let surname = randomizeSurname(gender);
    // 3 Vracení pole s jménem, příjmením a pohlavím
    return {
        firstName: firstName, 
        surname: surname, 
        gender: gender
    }
}

function randomizeGender(){
    // 1 Deklarace pole pohlaví
    const genders = ["male", "female"];
    // 2 Vracení pohlaví
    return genders[Math.floor(Math.random() * genders.length)];
}
function generateDatetime(age){
    // 1 Jaký je rok?
    let currentYear = new Date().getFullYear();
    // 2 Minimální rok narození
    let minYear = currentYear - age.max;
    // 3 Maximální rok narození
    let maxYear = currentYear - age.min;
    // 4 Randomizace roku, měsíce, a dne.
    let year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    let month = Math.floor(Math.random() * 12);
    let day = Math.floor(Math.random() * (new Date(year, month + 1, 0).getDate())) + 1;
    // 5 Vracení ISO data a času.
    return new Date(year, month, day);
}



function randomizeWorkload(){
    //1 Deklarace pole hodnot
    const workload = [10, 20, 30 ,40]
    //2 Vracení náhodné hodnoty pole
    return workload[Math.floor(Math.random() * workload.length)];
}


const dataset = {
    names: {
        male: [
            { name: "Lukáš", gender: "male" },
            { name: "Martin", gender: "male" },
            { name: "Josef", gender: "male" },
            { name: "Petr", gender: "male" },
            { name: "Václav", gender: "male" },
            { name: "Roman", gender: "male" },
            { name: "Adam", gender: "male" },
            { name: "Jan", gender: "male" },
            { name: "Viktor", gender: "male" },
            { name: "Miroslav", gender: "male" },
            { name: "Karel", gender: "male" },
            { name: "Pavel", gender: "male" },
            { name: "Ondřej", gender: "male" },
            { name: "Michal", gender: "male" },
            { name: "Tomáš", gender: "male" },
            { name: "Jiří", gender: "male" },
            { name: "Jakub", gender: "male" },
            { name: "Ladislav", gender: "male" },
            { name: "Filip", gender: "male" },
            { name: "Stanislav", gender: "male" }
        ],
        female: [
            { name: "Eva", gender: "female" },
            { name: "Anna", gender: "female" },
            { name: "Jana", gender: "female" },
            { name: "Hana", gender: "female" },
            { name: "Lenka", gender: "female" },
            { name: "Kateřina", gender: "female" },
            { name: "Veronika", gender: "female" },
            { name: "Lucie", gender: "female" },
            { name: "Michaela", gender: "female" },
            { name: "Alena", gender: "female" },
            { name: "Petra", gender: "female" },
            { name: "Kristýna", gender: "female" },
            { name: "Věra", gender: "female" },
            { name: "Martina", gender: "female" },
            { name: "Jitka", gender: "female" },
            { name: "Tereza", gender: "female" },
            { name: "Barbora", gender: "female" },
            { name: "Jaroslava", gender: "female" },
            { name: "Pavlína", gender: "female" },
            { name: "Monika", gender: "female" }
        ]
    },
    surnames: {
        male: [
            { surname: "Novák", gender: "male" },
            { surname: "Svoboda", gender: "male" },
            { surname: "Dvořák", gender: "male" },
            { surname: "Černý", gender: "male" },
            { surname: "Procházka", gender: "male" },
            { surname: "Kučera", gender: "male" },
            { surname: "Veselý", gender: "male" },
            { surname: "Horák", gender: "male" },
            { surname: "Němec", gender: "male" },
            { surname: "Pokorný", gender: "male" },
            { surname: "Pospíšil", gender: "male" },
            { surname: "Hájek", gender: "male" },
            { surname: "Jelínek", gender: "male" },
            { surname: "Král", gender: "male" },
            { surname: "Růžička", gender: "male" },
            { surname: "Beneš", gender: "male" },
            { surname: "Fiala", gender: "male" },
            { surname: "Sedláček", gender: "male" },
            { surname: "Doležal", gender: "male" },
            { surname: "Zeman", gender: "male" }
        ],
        female: [
            { surname: "Nováková", gender: "female" },
            { surname: "Svobodová", gender: "female" },
            { surname: "Dvořáková", gender: "female" },
            { surname: "Černá", gender: "female" },
            { surname: "Procházková", gender: "female" },
            { surname: "Kučerová", gender: "female" },
            { surname: "Veselá", gender: "female" },
            { surname: "Horáková", gender: "female" },
            { surname: "Němcová", gender: "female" },
            { surname: "Pokorná", gender: "female" },
            { surname: "Pospíšilová", gender: "female" },
            { surname: "Hájková", gender: "female" },
            { surname: "Jelínková", gender: "female" },
            { surname: "Králová", gender: "female" },
            { surname: "Růžičková", gender: "female" },
            { surname: "Benešová", gender: "female" },
            { surname: "Fialová", gender: "female" },
            { surname: "Sedláčková", gender: "female" },
            { surname: "Doležalová", gender: "female" },
            { surname: "Zemanová", gender: "female" }
        ]
    }
};

const dtoIn = {
    count: 3,
    age: {
      min: 19,
      max: 35
    }
  }

let result = main(dtoIn);
console.log(result);

import axios from "axios";

// Display patient ID
const patientInfo = document.getElementById('patient-id');
patientInfo.innerHTML = `<h4>ID : ${JSON.parse(localStorage.getItem('ifOfPatientForForm'))}</h4>`;
// Display patient Name
// const patientInfo1 = document.getElementById('patient-name');
// patientInfo1.innerHTML = `Name : <h4>${data.patientDetails.patientName}</h4>`;
const id = JSON.parse(localStorage.getItem('ifOfPatientForForm'));
const docDetails = JSON.parse(localStorage.getItem('loginJson'));
const docName = docDetails.name;
const instance = axios.create({
    baseURL: 'http://localhost:8080/patient/',
});

const addPatientRecord = async (data) => {

    await instance.post('addPatientRecord/', data)
        .then(response => {
            console.log(response.data)
            if (response.data != null) {
                // redirectToPage(response.data)
            }
        })
        .catch(error => console.error(error));
};

// Get the "Add" button and add a click event listener


// Get the table element by its ID
// Create an array of medicine options
// Get the table element by its ID
var table = document.getElementById('medicine-table');
import medicineOptions from './medicine-options.json';

console.log(medicineOptions);

// const medOpt = JSON.parse(JSON.stringify(medicineOptions));
var rowData = [];
// var rowDataArray = [];
// Create a new row
function createTable(){
var row = document.createElement('tr');
    var medicineNameCell = document.createElement('td');
    var medicineNameSelect = document.createElement('select');
    medicineNameSelect.name = 'MedicinePrescribed';
    medicineNameSelect.id = 'medicine-name';
    medicineNameSelect.required = true;
    for (let i = 0; i < medicineOptions.length; i++) {
        let option = document.createElement("option");
        option.value = medicineOptions[i].value;
        option.textContent = medicineOptions[i].text;
        medicineNameSelect.appendChild(option);
    }
    medicineNameCell.appendChild(medicineNameSelect);
    row.appendChild(medicineNameCell);
    // medicineNameSelect.addEventListener("change",event => {
    //     medicineValue = medicineNameCell.value;
    // })

// Create the second cell for Medicine Type
    var medicineTypeCell = document.createElement('td');
    var medicineTypeSelect = document.createElement('select');
    medicineTypeSelect.name = 'MedicineType';
    medicineTypeSelect.id = 'mt';
    var injectionOption = document.createElement('option');
    injectionOption.value = 'Injections';
    injectionOption.text = 'Injections';
    medicineTypeSelect.appendChild(injectionOption);
    var syrupOption = document.createElement('option');
    syrupOption.value = 'Syrup';
    syrupOption.text = 'Syrup';
    medicineTypeSelect.appendChild(syrupOption);
    var tabletsOption = document.createElement('option');
    tabletsOption.value = 'Tablets';
    tabletsOption.text = 'Tablets';
    medicineTypeSelect.appendChild(tabletsOption);
    medicineTypeCell.appendChild(medicineTypeSelect);
    row.appendChild(medicineTypeCell);
    // medicineTypeValue = medicineTypeSelect.value;

// Create the third cell for Dosage
    var dosageCell = document.createElement('td');
    var dosageSelect = document.createElement('select');
    dosageSelect.name = 'Dosage';
    dosageSelect.id = 'dosage';
    var odOption = document.createElement('option');
    odOption.value = 'o.d';
    odOption.text = 'o.d';
    dosageSelect.appendChild(odOption);
    var bidOption = document.createElement('option');
    bidOption.value = 'b.i.d';
    bidOption.text = 'b.i.d';
    dosageSelect.appendChild(bidOption);
    var tidOption = document.createElement('option');
    tidOption.value = 't.i.d';
    tidOption.text = 't.i.d';
    dosageSelect.appendChild(tidOption);
    var qidOption = document.createElement('option');
    qidOption.value = 'q.i.d';
    qidOption.text = 'q.i.d';
    dosageSelect.appendChild(qidOption);
    dosageCell.appendChild(dosageSelect);
    row.appendChild(dosageCell);
    // dosageValue = dosageSelect.value;

// Create the fourth cell for Timing
    var timingCell = document.createElement('td');
    var timingSelect = document.createElement('select');
    timingSelect.name = 'Timing';
    timingSelect.id = 'timing';
    var morningBeforeMealOption = document.createElement('option');
    morningBeforeMealOption.value = 'Morning Before Meal';
    morningBeforeMealOption.text = 'Morning Before Meal';
    timingSelect.appendChild(morningBeforeMealOption);
    var morningAfterMealOption = document.createElement('option');
    morningAfterMealOption.value = 'Morning After Meal';
    morningAfterMealOption.text = 'Morning After Meal';
    timingSelect.appendChild(morningAfterMealOption);
    var afterEveryMealOption = document.createElement('option');
    afterEveryMealOption.value = 'After Every Meal';
    afterEveryMealOption.text = 'After Every Meal';
    timingSelect.appendChild(afterEveryMealOption);
    var beforeEveryMealOption = document.createElement('option');
    beforeEveryMealOption.value = 'Before Every Meal';
    beforeEveryMealOption.text = 'Before Every Meal';
    timingSelect.appendChild(beforeEveryMealOption);
    var atNightBeforeBedOption = document.createElement('option');
    atNightBeforeBedOption.value = 'At night before Bed';
    atNightBeforeBedOption.text = 'At night before Bed';
    timingSelect.appendChild(atNightBeforeBedOption);
    timingCell.appendChild(timingSelect);
    row.appendChild(timingCell);
    // timingValue = timingSelect.value;

// Create the fifth cell for Quantity Prescribed
    var quantityCell = document.createElement('td');
    var quantitySelect = document.createElement('select');
    quantitySelect.name = 'Quantity Prescribed';
    quantitySelect.id = 'qp';
    for (var i = 1; i <= 10; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        quantitySelect.appendChild(option);
    }
    quantityCell.appendChild(quantitySelect);
    row.appendChild(quantityCell);
    // quantityValue = quantitySelect.value;

// Create the sixth cell for Remove button
    var removeCell = document.createElement('td');
    var actionContainer = document.createElement('div');
    actionContainer.className = 'action_container';
    var removeButton = document.createElement('button');
    removeButton.className = 'danger';
    removeButton.id = 'removeColumn';
    removeButton.textContent = 'Remove';
    actionContainer.appendChild(removeButton);
    removeCell.appendChild(actionContainer);
    row.appendChild(removeCell);


// Append the row to the table
    table.appendChild(row);

    removeButton.addEventListener("click",event => {
        if (event.target && event.target.id == "removeColumn") {
            // Get the table row containing the "Remove" button
            let row = event.target.closest("tr");
            // If the row is not the last row of the table, remove it
            if (table.childElementCount-2 > 1) {
                // console.log(table.childElementCount)
                row.parentNode.removeChild(row);
                // console.log("123")
            } else {
                alert("You don't have permission to delete this.");
                // console.log("456")
            }
        }

    })

}
createTable();

function getRowData(row) {
    var rowData = {};

    // Get the values from each column
    rowData.name = row.querySelector('select[name="MedicinePrescribed"]').value;
    rowData.type = row.querySelector('select[name="MedicineType"]').value;
    rowData.dosage = row.querySelector('select[name="Dosage"]').value;
    rowData.timings = row.querySelector('select[name="Timing"]').value;
    rowData.qtyPres = parseInt(row.querySelector('select[name="Quantity Prescribed"]').value);
    rowData.qtyGiven = 0;

    return rowData;
}


document.getElementById("addColumn").addEventListener("click", function (event) {
    // Clone the first row of the table
    event.preventDefault();
    createTable();
    // table.appendChild(newRow);
});



const data = JSON.parse(localStorage.getItem("myData"))
// script for current date
console.log(data)
let btnShow = document.querySelector('label')
let output = document.querySelector('p')
let today = new Date();

let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = today.getDate();

let current_date = `${month}/${date}/${year}`;
output.innerText = current_date;


// Script for medicine dropdown

// script for the illness
const inputSelector = document.getElementById("illness1");
const taskList = document.getElementById('list1');

import illnessData from './illness.json';

let selectedIllness = [];

// Populate the list with options from the tasks array
illnessData.forEach(task => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    input.type = 'checkbox';
    input.name = task;
    span.textContent = task;
    label.appendChild(input);
    label.appendChild(span);
    label.style.display = 'block'; // Set display property to block
    taskList.appendChild(label);

    // Add event listener to the checkbox to add/remove it to/from the selectedIllness array
    input.addEventListener('change', (event) => {
        const checkbox = event.target;
        if (checkbox.checked) {
            selectedIllness.push(checkbox.name);
            // console.log(selectedIllness)
        } else {
            selectedIllness = selectedIllness.filter((item) => item !== checkbox.name);
            // console.log(selectedIllness)
        }
    });
});

// Add event listener to input field to filter the list
inputSelector.addEventListener('input', () => {
    const inputValue = inputSelector.value.toLowerCase();
    const taskLabels = taskList.querySelectorAll('label');

    taskLabels.forEach(label => {
        const labelText = label.textContent.toLowerCase();
        if (labelText.includes(inputValue)) {
            label.style.display = 'block';

            // illnessData
            // selectedIllness.findIndex(value => value === )
        } else {
            label.style.display = 'none';
        }
    });
});


document.getElementById('select-field1').addEventListener('click', () => {
    document.getElementById('list1').classList.toggle('show');
    document.getElementById('down-arrow1').classList.toggle('rotate180');

});

// script for the symptoms
const inputSelector1 = document.getElementById("symptoms1");
const taskList1 = document.getElementById('list2');

import symptomsData from './table1.json';

let selectedSymptoms = [];
// Populate the list with options from the tasks array
symptomsData.forEach(task => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    input.type = 'checkbox';
    input.name = task;
    span.textContent = task;
    label.appendChild(input);
    label.appendChild(span);
    label.style.display = 'block'; // Set display property to block
    taskList1.appendChild(label);

    input.addEventListener('change', (event) => {
        const checkbox = event.target;
        if (checkbox.checked) {
            selectedSymptoms.push(checkbox.name);
            // console.log(selectedSymptoms)
        } else {
            selectedSymptoms = selectedSymptoms.filter((item) => item !== checkbox.name);
            // console.log(selectedSymptoms)
        }
    });
});

// Add event listener to input field to filter the list
inputSelector1.addEventListener('input', () => {
    const inputValue = inputSelector.value.toLowerCase();
    const taskLabels = taskList.querySelectorAll('label');
    taskLabels.forEach(label => {
        const labelText = label.textContent.toLowerCase();
        if (labelText.includes(inputValue)) {
            label.style.display = 'block';
        } else {
            label.style.display = 'none';
        }
    });
});


document.getElementById('select-field2').addEventListener('click', () => {
    document.getElementById('list2').classList.toggle('show');
    document.getElementById('down-arrow2').classList.toggle('rotate180');

});


// script for the advisory
const inputSelector2 = document.getElementById("advisory1");
const taskList2 = document.getElementById('list3');

import advisoryData from './abc.json';

let selectedAdvisory = [];
// Populate the list with options from the tasks array
advisoryData.forEach(task => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    input.type = 'checkbox';
    input.name = task;
    span.textContent = task;
    label.appendChild(input);
    label.appendChild(span);
    label.style.display = 'block'; // Set display property to block
    taskList2.appendChild(label);

    input.addEventListener('change', (event) => {
        const checkbox = event.target;
        if (checkbox.checked) {
            selectedAdvisory.push(checkbox.name);
            // console.log(selectedAdvisory)
        } else {
            selectedAdvisory = selectedAdvisory.filter((item) => item !== checkbox.name);
            // console.log(selectedAdvisory)
        }
    });
});

// Add event listener to input field to filter the list
inputSelector2.addEventListener('input', () => {
    const inputValue = inputSelector.value.toLowerCase();
    const taskLabels = taskList.querySelectorAll('label');
    taskLabels.forEach(label => {
        const labelText = label.textContent.toLowerCase();
        if (labelText.includes(inputValue)) {
            label.style.display = 'block';
        } else {
            label.style.display = 'none';
        }
    });
});

let popup = document.getElementById("popup");

function openPopup() {
    popup.classList.add("open-popup")
}
function closePopup() {
    popup.classList.remove("open-popup")
}

var submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function() {
    var tableRows = document.querySelectorAll('#medicine-table tr');
    // Clear the existing rowData
    rowData = [];
    // Iterate over each row and get the row data
    for (var i = 1; i < tableRows.length; i++) {
        var row = tableRows[i];
        var currentRowData = getRowData(row);
        rowData.push(currentRowData);
    }
    openPopup();
    // console.log(rowData,selectedAdvisory,selectedIllness,selectedSymptoms);
    const data = {
        id: id,
        advisory: selectedAdvisory,
        illness: selectedIllness,
        symptoms: selectedSymptoms,
        doctorName: docName,
        medDetails: rowData
    }
    // console.log(data);
    addPatientRecord(data);
});

var okayButton = document.getElementById('okay-button');
okayButton.addEventListener('click', function() {
    closePopup();
    localStorage.removeItem("ifOfPatientForForm");
    // localStorage.removeItem('loginJson');
    window.location.replace("doctorWindow_patientLoginPage.html")
});


document.getElementById('select-field3').addEventListener('click', () => {
    document.getElementById('list3').classList.toggle('show');
    document.getElementById('down-arrow3').classList.toggle('rotate180');

});





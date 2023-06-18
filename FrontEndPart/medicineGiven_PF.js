// Script for name and ID
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/staff/',
});

let dataPatient = [];
let medName = [];
let qtyPres1 = [];
let json = {};
const getPatientRecord = async (id, visitNumber) => {
    const data = { id: id, visitNumber: visitNumber };

    try {
        const response = await instance.post('details/', data);
        if (response.data != null) {
            dataPatient = response.data;
            // console.log(dataPatient);
        }
    } catch (error) {
        console.error(error);
    }
};

const changeQuantity = async (name, medPres) => {
    const data = { name: name, quantityGiven: medPres };

    try {
        const response = await instance.put('change/quantity', data);
        if (response.data != null) {
            // Do something with the response if needed
        }
    } catch (error) {
        console.error(error);
    }
};

const changePatientRecordQuantity = async (id, visitNumber, qtyGiven ) => {
    const data = { id: id, visitNumber: visitNumber, qtyGiven: qtyGiven };

    try {
        const response = await instance.put('changePatientRecords', data);
        if (response.data != null) {
            // Do something with the response if needed
        }
    } catch (error) {
        console.error(error);
    }
};

const createTable = async (patientId, visitNumber, patientName) => {
    // console.log(patientId, visitNumber, patientName);
    await getPatientRecord(patientId,visitNumber);
    // console.log(dataPatient);
    const json = {
        "patientName": patientName,
        "doctorName": dataPatient.doctorName,
        "illness": dataPatient.illness,
        "date": dataPatient.date,
        "dataPatient": [
        ]
    };
    const patientInfo = document.getElementById('patient-id');
    patientInfo.innerHTML = `
    <h4>ID : ${patientId}</h4>
  `;

    const patientInfo1 = document.getElementById('patient-name');
    patientInfo1.innerHTML = `
    Name : <h4>${patientName}</h4>
  `;
    const patientInfo3 = document.getElementById('visitDate');
    patientInfo3.innerHTML = `
    VisitDate : <h3>${dataPatient.date}</h3>
  `;

    const patientInfo2 = document.getElementById('ill-ness');
    patientInfo2.innerHTML = `
    Illness : <h4>${dataPatient.illness}</h4>
  `;
    // console.log(dataPatient.medDetails);
    const tableBody = document.getElementById("table_body");
    tableBody.innerHTML = "";

    dataPatient.medDetails.forEach(item => {
        const row = document.createElement('tr');

        const mednameCell = document.createElement('td');
        mednameCell.textContent = item.name;
        medName.push(item.name);
        row.appendChild(mednameCell);

        const medType = document.createElement('td');
        medType.textContent = item.type;
        row.appendChild(medType);

        const dosageCell = document.createElement('td');

        dosageCell.textContent = item.dosage;
        row.appendChild(dosageCell);
        const timingCell = document.createElement('td');

        timingCell.textContent = item.timings;
        row.appendChild(timingCell);

        const med_prescribedCell = document.createElement('td');
        med_prescribedCell.textContent = item.qtyPres;
        row.appendChild(med_prescribedCell);

        const dropdownCell = document.createElement('td');
        const dropdown = document.createElement('select');
        const options = Array.from({ length: 50 }, (_, i) => i);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            dropdown.appendChild(optionElement);
        });
        let selectedValue = 0;
        dropdown.addEventListener('change', () => {
            selectedValue = parseInt(dropdown.value);
            qtyPres1.push(selectedValue);``
            json.dataPatient.push({...item, qtyGiven: selectedValue});
            // console.log(`Selected value is ${selectedValue}`);
        });
        dropdownCell.appendChild(dropdown);
        row.appendChild(dropdownCell);


        const tableBody = document.querySelector('#med_given tbody');
        tableBody.appendChild(row);
    });
    return json;
};
let selectedVisit;
const loadVisitNumbers = (id,visitData) => {
    const inputSelector = document.getElementById("visitno");
    const taskList = document.getElementById('list1');
    selectedVisit = visitData.visits[visitData.visits.length - 1]; // Variable to store the selected visit, initialized with the last option
    createTable(id,selectedVisit,visitData.name).then((json1) => {
        console.log(json1)
        json = json1;
    });
// Populate the list with options from the tasks array
    visitData.visits.forEach((task, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        input.type = 'radio'; // Change checkbox to radio
        input.name = 'visit'; // Set the same name for all radios
        input.value = index + 1; // Set the value to the index + 1
        span.textContent = task;
        label.appendChild(input);
        label.appendChild(span);
        label.style.display = 'block'; // Set display property to block
        taskList.appendChild(label);

        // Add event listener to the radio buttons to update the selectedVisit variable
        input.addEventListener('change', (event) => {
            const radio = event.target;
            if (radio.checked) {
                selectedVisit = visitData.visits[parseInt(radio.value) - 1];
                inputSelector.value = selectedVisit;
                console.log(selectedVisit);
                createTable(id,selectedVisit,visitData.name).then((json2) =>{
                    console.log(json2);
                    json = {};
                    json = json2;
                })
                document.getElementById('list1').classList.remove('show'); // Close the dropdown
                document.getElementById('down-arrow1').classList.remove('rotate180'); // Reset arrow direction
            }
        });

        // Set the last option as the default selected option
        if (index === visitData.visits.length - 1) {
            input.checked = true;
            selectedVisit = visitData.visits[index];
            inputSelector.value = selectedVisit;
        }
    });

// Add event listener to input field to filter the list
    inputSelector.addEventListener('input', () => {
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

    document.getElementById('select-field1').addEventListener('click', () => {
        document.getElementById('list1').classList.toggle('show');
        document.getElementById('down-arrow1').classList.toggle('rotate180');
    });
};

const getVisitNumbers = async (id) => {
    const data = {id};
    try {
        const response = await instance.post(`getVisitNumber/`,data);
        if (response.data != null) {
            const visitNumbers = response.data;
            loadVisitNumbers(id,visitNumbers);
        }
    } catch (error) {
        console.error(error);
    }
};

// Entry point
const id = JSON.parse(localStorage.getItem("patient_id"));
getVisitNumbers(id);

let popup = document.getElementById("popup");

function openPopup() {
    popup.classList.add("open-popup")
}
function closePopup() {
    popup.classList.remove("open-popup")
}
document.getElementById("openPopup").addEventListener("click",function() {

    openPopup();
    for (let i = 0; i < medName.length; i++) {
        let names = medName[i];
        let qtyG = qtyPres1[i];
        changeQuantity(names,qtyG);
        // console.log("Yessssss")
    }
    changePatientRecordQuantity(id,selectedVisit,qtyPres1);
    localStorage.setItem("prescriptionJSON",JSON.stringify(json));
    console.log(json);
})

document.getElementById("closePopup").addEventListener("click",function() {
    closePopup();
    window.location.href = "prescription.html";
})

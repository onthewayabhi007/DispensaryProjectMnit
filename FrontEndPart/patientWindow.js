import axios from "axios";

const data = JSON.parse(localStorage.getItem("loginJson"))
// const dataMed = JSON.parse(localStorage.getItem("loginJsonMed"))
console.log(data);
        // Display patient information
        const patientInfo = document.getElementById('patient-info');
        patientInfo.innerHTML = `
      <h2>Patient Name: ${data.loginDetails.name}</h2>
      <h2>Patient ID: ${data.loginDetails.userName}</h2>
    `;

const instance = axios.create({
    baseURL: 'http://localhost:8080/patient/',
});

const getPatientRecords = async (id) => {
    const data = {id: id};
    // const config =  {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     data: data
    // }
    await instance.post('getPatientRecords/', data)
        .then(response =>
                // response.data != null ? window.location.replace("new_page.html") : console.log('Error')
            {
                if (response.data != null) {
                    getTable(response.data);
                }
            }
        )
        .catch(error => console.error(error));
};

function getTable(patientRecord) {
    // Redirect to new page
    console.log(patientRecord)
    const visitsTable = document.getElementById('visits-table').getElementsByTagName('tbody')[0];

    for (const visit of patientRecord) {
        const row = visitsTable.insertRow();

        const dateCell = row.insertCell(0);
        dateCell.innerHTML = visit.date;

        const doctorNameCell = row.insertCell(1);
        doctorNameCell.innerHTML = visit.doctorName;

        const illnessCell = row.insertCell(2);
        illnessCell.innerHTML = visit.illness;

        const medicinesPrescribedCell = row.insertCell(3);
        // medicinesPrescribedCell.innerHTML = visit.medDetails.name
        if ((visit.medDetails.length) === 0) {
            console.log(123)
            medicinesPrescribedCell.innerHTML = 'None';
        } else {
            const nestedTable = document.createElement('table');
            nestedTable.classList.add('nested-table');
            // const nestedRow = nestedTable.insertRow();
            // const medicineNameCell = nestedRow.insertCell(0);
            // medicineNameCell.innerHTML = visit.medDetails.name;
            for (const medicine of visit.medDetails) {
                const nestedRow = nestedTable.insertRow();

                const medicineNameCell = nestedRow.insertCell(0);
                medicineNameCell.innerHTML = medicine.name;
            }

            medicinesPrescribedCell.appendChild(nestedTable);
        }

        const dosagesPrescribedCell = row.insertCell(4);
        // dosagesPrescribedCell.innerHTML = visit.medDetails.dosage;
        if (visit.dosages === '0') {
            dosagesPrescribedCell.innerHTML = 'None';
        }
        else {
            const nestedTable = document.createElement('table');
            nestedTable.classList.add('nested-table');

            for (const dose of visit.medDetails) {
                const nestedRow = nestedTable.insertRow();

                const dosageNameCell = nestedRow.insertCell(0);
                dosageNameCell.innerHTML = dose.dosage;
            }

            dosagesPrescribedCell.appendChild(nestedTable);
        }

        const timingsPrescribedCell = row.insertCell(5);
        // dosagesPrescribedCell.innerHTML = visit.medDetails.dosage;
        if (visit.timings === '') {
            dosagesPrescribedCell.innerHTML = 'None';
        }
        else {
            const nestedTable = document.createElement('table');
            nestedTable.classList.add('nested-table');

            for (const timings of visit.medDetails) {
                const nestedRow = nestedTable.insertRow();

                const timingCell = nestedRow.insertCell(0);
                timingCell.innerHTML = timings.timings;
            }

            timingsPrescribedCell.appendChild(nestedTable);
        }

        const quantitiesPrescribedCell = row.insertCell(6);
        // quantitiesPrescribedCell.innerHTML = visit.medDetails.qtyPres;
        if (visit.qtyPres === '0') {
            quantitiesPrescribedCell.innerHTML = 'None';
        }
        else {
            const nestedTable = document.createElement('table');
            nestedTable.classList.add('nested-table');

            for (const quantity of visit.medDetails) {
                const nestedRow = nestedTable.insertRow();

                const quantitiesNameCell = nestedRow.insertCell(0);
                quantitiesNameCell.innerHTML = quantity.qtyPres;
            }

            quantitiesPrescribedCell.appendChild(nestedTable);
        }

        const quantitiesGivenCell = row.insertCell(7);
        // quantitiesGivenCell.innerHTML = visit.medDetails.qtyGiven;
        if (visit.medDetails.qtyGiven === '0') {
            quantitiesGivenCell.innerHTML = 'None';
        }
        else {
            const nestedTable = document.createElement('table');
            nestedTable.classList.add('nested-table');

            for (const quantity of visit.medDetails) {
                const nestedRow = nestedTable.insertRow();

                const quantities_GivenNameCell = nestedRow.insertCell(0);
                quantities_GivenNameCell.innerHTML = quantity.qtyGiven;
            }

            quantitiesGivenCell.appendChild(nestedTable);
        }

        const AdvisoryCell = row.insertCell(8);
        AdvisoryCell.innerHTML = visit.advisory;
    };
}
getPatientRecords(data.loginDetails.userName);




    
// JavaScript code
document.addEventListener("DOMContentLoaded", function () {
    // Make an AJAX request to load the JSON data
    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "prescription_data.json", true);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var data = JSON.parse(xhr.responseText);
    //         populatePrescriptionForm(data);
    //     }
    // };
    // xhr.send();
    const data = JSON.parse(localStorage.getItem("prescriptionJSON"));

    // Function to populate the prescription form
    function populatePrescriptionForm(data) {
        console.log(data);
        // Populate General information like the patient name and all
        document.getElementById("doctor-name").textContent = data.doctorName;
        document.getElementById("patient-name").textContent = data.patientName;
        document.getElementById("date").textContent = data.date;
        document.getElementById("disease").textContent = data.illness;
        // document.getElementById("time").textContent = data.time;

        // Populate medicine table
        var medicineTable = document.getElementById("medicine-table");
        var tbody = medicineTable.getElementsByTagName("tbody")[0];
        data.dataPatient.forEach(function (medicine)
        {
            
            var row = document.createElement("tr");

            // making the columns
            var medicineNameCell = document.createElement("td");
            var dosageCell = document.createElement("td");
            var timingsCell = document.createElement("td");
            var quantityPrescribedCell = document.createElement("td");
            var quantityGivenCell = document.createElement("td");

            // fetching the data from the json file
            medicineNameCell.textContent = medicine.name;
            dosageCell.textContent = medicine.dosage;
            quantityPrescribedCell.textContent = medicine.qtyPres;
            quantityGivenCell.textContent = medicine.qtyGiven;
            timingsCell.textContent = medicine.timings;

            // Appending the rows into the table
            row.appendChild(medicineNameCell);
            row.appendChild(dosageCell);
            row.appendChild(timingsCell);
            row.appendChild(quantityPrescribedCell);
            row.appendChild(quantityGivenCell);
            tbody.appendChild(row);
            
        });

        // Populate doctor's signature
        document.getElementById("doctor-signature").textContent = data.doctorName;
        // document.getElementById("doctor-type").textContent = data.doctorType;
    }
    populatePrescriptionForm(data);
});

// Function to hide the print button when clicked
function printPrescription() {
    document.getElementById("print-button").style.display = "none";
    window.print();
}
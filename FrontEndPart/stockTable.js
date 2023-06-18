const staffDetails = JSON.parse(localStorage.getItem('loginJson'));
console.log(staffDetails);


// Check if the login data exists and has the required properties
if (staffDetails && staffDetails.name) {
  // Display the patient's name
  const patientInfo = document.getElementById('staff-name');
  patientInfo.innerHTML = `<h3>Mr. ${staffDetails.name}</h3>`;
  // console.log(adminData.adminData.name);
} else {
  console.log("Login data not found or incomplete.");
}

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/medicine/',
});

let medicineDetails = [];
const getMedicineDetails = async () => {
  try {
    const response = await instance.get('get/all/');
    medicineDetails = response.data;
  } catch (error) {
    console.error(error);
  }
  return medicineDetails;
};
const addMedicine = async (medicineData) => {
  try {
    const response = await instance.post('add/',medicineData);
    // if (response.data !=null){
    //     location.reload();
    // }
  } catch (error) {
    console.error(error);
  }
  // return data1;
};

const deleteMedicineRecord = async (name, branch) => {
  const data = {name, branch};
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: data
  }

  await instance.delete('delete/',config)
      .then(() => {
        console.log("Data Updated")
        location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
};

const changeMedicine = async (medicineData) => {
  try {
    const response = await instance.put('edit/',medicineData);
    // if (response.data !=null){
    //     location.reload();
    // }
  } catch (error) {
    console.error(error);
  }
  // return data1;
};


// Function to fetch new data from JSON file
let data = [];
const fetchData = async () => {
  data = await getMedicineDetails();
  console.log(data);
};
const openFormBtn = document.getElementById("open-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
// const form = document.querySelector('.form-container');
openFormBtn.addEventListener('click', (event) => {
  openForm()
})
closeFormBtn.addEventListener('click', (event) => {
  closeForm()
})

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const getStock = (stock) => {
  let srNo = 1;
  const table = document.querySelector('#medicine_stockTable');
  const tbody = table.querySelector('tbody');
  const rows = tbody.querySelectorAll('tr');
  const createTable = () => {
    // Display Table data
    const userTable = document
        .getElementById('medicine_stockTable')
        .getElementsByTagName('tbody')[0];
    userTable.innerHTML = '';
    medicineDetails.forEach(branchData => {
      for (const medicine of branchData.data) {
        const row = userTable.insertRow();

        const srNoCell = row.insertCell(0);
        srNoCell.innerHTML = srNo++;

        const nameCell = row.insertCell(1);
        nameCell.innerHTML = medicine.name;

        const typeCell = row.insertCell(2);
        typeCell.innerHTML = medicine.type != null ? medicine.type : '-';

        const phoneCell = row.insertCell(3);
        phoneCell.innerHTML = medicine.baseCount;

        const genderCell = row.insertCell(4);
        genderCell.innerHTML = medicine.quantityRemaining;

        //   edit button
        const action = row.insertCell(5);
        const editButton = document.createElement('button');
        editButton.className = 'Edit';
        editButton.innerText = 'Edit';
        editButton.id='editButton'
        editButton.addEventListener('click', (event) => {
          // Handle edit button click event
          editMedicine(event,branchData);
        });
        action.appendChild(editButton);

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'Delete';
        deleteButton.id='deleteButton';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
          // console.log("123")
          deleteMedicineRecord(medicine.name,branchData.branch)

        });
        action.appendChild(deleteButton);
      }
    });
  };
  createTable();
}
// Fetch new data from JSON file
const loadScreen = () => {
  fetchData().then(() => {
    // Iterate over each row and update the value of the specified column
      getStock(data);
  });
}

loadScreen();
const table = document.querySelector('table');
const modal = document.getElementById('myForm');
const editMedicine = async (event,details)=>{
  // console.log(details);
    // Get the row and the cells
    const row = event.target.closest('tr');
    const cells = row.querySelectorAll('td');

    // Populate the form with the row data

    modal.querySelector('[name="Branch"]').value = details.branch;
    modal.querySelector('[name="Branch"]').disabled = true;
    modal.querySelector('[name="Medicine Name"]').value = cells[1].textContent;
    modal.querySelector('[name="Medicine Name"]').disabled = true;
    modal.querySelector('[name="Type"]').value = cells[2].textContent;
    modal.querySelector('[name="Base Count"]').value = cells[3].textContent;
    modal.querySelector('[name="Actual Count"]').value = cells[4].textContent;

    // Open the modal
    openForm();

    // Submit button event listener
    modal.querySelector('.btn').addEventListener('click', (event) => {
      event.preventDefault();
      // Update the row data with the form data
      let branch = modal.querySelector('[name="Branch"]').value;
      cells[1].textContent = modal.querySelector('[name="Medicine Name"]').value;
      cells[2].textContent = modal.querySelector('[name="Type"]').value;
      cells[3].textContent = modal.querySelector('[name="Base Count"]').value;
      cells[4].textContent = modal.querySelector('[name="Actual Count"]').value;

      const updateMedicineData = {
        branch: branch,
        name : cells[1].textContent,
        type : cells[2].textContent,
        baseCount : cells[3].textContent,
        quantityRemaining: cells[4].textContent
      }
      changeMedicine(updateMedicineData);
      // Close the modal
      closeForm();
    });
}

// Get the input element for search
const searchInput = document.getElementById('searchInput');
// Add event listener for input change
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  let arr = [];
  if (query !== "") {
    // let arr2 = [];
    const getMatches =async () => {
      data.filter(details => {
        let match;
        for (const med of details.data) {
          match = med.name.toLowerCase().includes(query);
          if (match) {
            if (query)
              arr.push({...med, branch:details.branch})
          }
        }
      })
      return arr;
    }

    getMatches().then(() => {
      // console.log(arr)
      updateTable(arr);
    })
  }


    // console.log(arr)
    // updateTable(arr);
    // getStock(arr);

  else
  {
    console.log("123")
      loadScreen();
  }
});


const updateTable = (match) => {
  const userTable = document.getElementById('medicine_stockTable').getElementsByTagName('tbody')[0];
  // console.log(match);
  userTable.innerHTML = '';
  let srNumber = 1;
  // console.log(match.data);
  for (const medicine of match) {
    const row = userTable.insertRow();
    const srNo = row.insertCell(0);
    srNo.innerHTML = srNumber;

    const name = row.insertCell(1);
    name.innerHTML = medicine.name;

    const type = row.insertCell(2);
    type.innerHTML = medicine.type;

    const baseCount = row.insertCell(3);
    baseCount.innerHTML = medicine.baseCount;

    const actualCount = row.insertCell(4);
    actualCount.innerHTML = medicine.quantityRemaining;

    // Script for actual-count highlight(if count below 20)
// Highlight cells with values less than 20
    //   edit button
    const action = row.insertCell(5);
    const editButton = document.createElement('button');
    editButton.className = 'Edit';
    editButton.innerText = 'Edit';
    editButton.id='editButton'
    editButton.addEventListener('click', (event) => {
      // Handle edit button click event
      console.log(medicine.branch);
      editMedicine(event,medicine.branch);
    });
    action.appendChild(editButton);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'Delete';
    deleteButton.id='deleteButton';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      // console.log("123")
      deleteMedicineRecord(medicine.name,medicine.branch)

    });
    action.appendChild(deleteButton);

    srNumber++;

  }
};

// Get the form element
const form = document.querySelector('.form-container');

// Get the table body element
const tableBody = document.querySelector('tbody');

// Add event listener to form submit
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting and reloading the page

  // Get the input values from the form
  // const sn = document.querySelector('input[name="S.No."]').value;
  const branch = document.querySelector('input[name="Branch"]').value;
  const name = document.querySelector('input[name="Medicine Name"]').value;
  const type = document.querySelector('input[name="Type"]').value;
  const baseCount = document.querySelector('input[name="Base Count"]').value;
  const quantityRemaining = document.querySelector('input[name="Actual Count"]').value;

  const addMedicineData = {
    branch: branch,
    name : name,
    type : type,
    baseCount : baseCount,
    quantityRemaining: quantityRemaining
  }
  console.log(addMedicineData);
  addMedicine(addMedicineData).then(value => location.reload());
  form.reset();
});

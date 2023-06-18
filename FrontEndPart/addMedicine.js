// const searchInput = document.querySelector('input[placeholder="search"]');
// const rows = document.querySelectorAll('.table_section tbody tr');

// searchInput.addEventListener('keyup', function(event) {
//   const searchString = event.target.value.toLowerCase();
  
//   rows.forEach(row => {
//     const text = row.textContent.toLowerCase();
    
//     if (text.includes(searchString)) {
//       row.style.display = 'table-row';
//     } else {
//       row.style.display = 'none';
//     }
//   });
// });


function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  
  
  // Get the form element
  const form = document.querySelector('.form-container');
  
  // Get the table body element
  const tableBody = document.querySelector('tbody');
  
  // Add event listener to form submit
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting and reloading the page
  
    // Get the input values from the form
    const sn = document.querySelector('input[name="S.No."]').value;
    const medicineName = document.querySelector('input[name="Medicine Name"]').value;
    const type = document.querySelector('input[name="Type"]').value;
    const baseCount = document.querySelector('input[name="Base Count"]').value;
    const actualCount = document.querySelector('input[name="Actual Count"]').value;
  
    // Create a new row for the table with the input values
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${sn}</td>
      <td>${medicineName}</td>
      <td>${type}</td>
      <td>${baseCount}</td>
      <td>${actualCount}</td>
      <td>
        <button><i class="fa-solid fa-pen-to-square"></i></button>
        <button><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
  
    // Add the new row to the table
    tableBody.appendChild(newRow);
  
    // Reset the form inputs
    form.reset();
  });
  
  
  // Get the table and the modal
  const table = document.querySelector('table');
  const modal = document.getElementById('myForm');
  
  // Edit button event listener
  table.addEventListener('click', (event) => {
    if (event.target.matches('.fa-pen-to-square')) {
      // Get the row and the cells
      const row = event.target.closest('tr');
      const cells = row.querySelectorAll('td');
  
      // Populate the form with the row data
      modal.querySelector('[name="S.No."]').value = cells[0].textContent;
      modal.querySelector('[name="Medicine Name"]').value = cells[1].textContent;
      modal.querySelector('[name="Type"]').value = cells[2].textContent;
      modal.querySelector('[name="Base Count"]').value = cells[3].textContent;
      modal.querySelector('[name="Actual Count"]').value = cells[4].textContent;
  
      // Open the modal
      openForm();
  
      // Submit button event listener
      modal.querySelector('.btn').addEventListener('click', (event) => {
        event.preventDefault();
        // Update the row data with the form data
        cells[0].textContent = modal.querySelector('[name="S.No."]').value;
        cells[1].textContent = modal.querySelector('[name="Medicine Name"]').value;
        cells[2].textContent = modal.querySelector('[name="Type"]').value;
        cells[3].textContent = modal.querySelector('[name="Base Count"]').value;
        cells[4].textContent = modal.querySelector('[name="Actual Count"]').value;
  
        // Close the modal
        closeForm();
      });
    }
  });
  
  // Delete button event listener
  table.addEventListener('click', (event) => {
    if (event.target.matches('.fa-trash')) {
      // Get the row and remove it from the table
      alert("You are deleting the medicine details")
      const row = event.target.closest('tr');
      row.remove();
    }
  });


// // select the table body element
// const tableBody = document.querySelector("#medicine_stockTable tbody");

// // create a new row element
// const newRow = document.createElement("tr");

// // create and append new cells to the row
// const cell1 = document.createElement("td");
// cell1.textContent = "1";
// newRow.appendChild(cell1);

// const cell2 = document.createElement("td");
// cell2.textContent = "Paracetamol";
// newRow.appendChild(cell2);

// const cell3 = document.createElement("td");
// cell3.textContent = "Tablet";
// newRow.appendChild(cell3);

// const cell4 = document.createElement("td");
// cell4.textContent = "100";
// newRow.appendChild(cell4);

// const cell5 = document.createElement("td");
// cell5.textContent = "90";
// newRow.appendChild(cell5);

// const cell6 = document.createElement("td");
// cell6.innerHTML = '<button><i class="fa-solid fa-pen-to-square"></i></button><button><i class="fa-solid fa-trash"></i></button><button>Order Now</button>';
// newRow.appendChild(cell6);

// // append the new row to the table body
// tableBody.appendChild(newRow);

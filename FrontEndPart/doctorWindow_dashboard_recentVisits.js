const docDetails = JSON.parse(localStorage.getItem('loginJson'))
console.log(docDetails);
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/doctor/',
});

let dataRecent= [];
const getRecentData = async (docName) => {
  try {
    const response = await instance.post('recentHistory/')
    dataRecent = response.data;
  } catch (error) {
    console.error(error)
  }
  return dataRecent;
};

// fetch('doctorWindow_dashboard_recentVisitsData.json')
//     .then(response => response.json())
//     .then(data => {
const fetchData = async()=>{
  const data = await getRecentData(docDetails.name)
  console.log(data);
  // Display per Day patient count
  const patientInfo = document.getElementById('perDayPatients');
  patientInfo.innerHTML = `<h1>${data.recentVisitCount}</h1>`;

  // Display total patient count
  const patientInfo1 = document.getElementById('totalPatients');
  patientInfo1.innerHTML = `<h1>${data.totalVisits}</h1>`;

  // Display recentVisits table
  const recentVisitsTable = document.getElementById('Recent-visits').getElementsByTagName('tbody')[0];

  for (const visit of data.visit) {
      const row = recentVisitsTable.insertRow();

      const dateCell = row.insertCell(0);
      dateCell.innerHTML = visit.date;

      const NameCell = row.insertCell(1);
      NameCell.innerHTML = visit.name;

      const IDCell = row.insertCell(2);
      IDCell.innerHTML = visit.id;

      const PhoneNoCell = row.insertCell(3);
      PhoneNoCell.innerHTML = visit.phoneNumber;

      const illnessCell = row.insertCell(4);
      illnessCell.innerHTML = visit.illness;
  }
}

fetchData();
    // });
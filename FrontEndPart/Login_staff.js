import axios from 'axios';

const form = document.querySelector('form');
const button = document.querySelector('#myButton');

button.addEventListener('click', (event) => {
    // event.preventDefault();
    const field1 = document.querySelector('#textbox1').value;
    const field2 = document.querySelector('#textbox2').value;
    login(field1, field2);
});

const instance = axios.create({
    baseURL: 'http://localhost:8080/staff/',
});

const login = async (id, password) => {
    const data = { id, password };
    const config = {
        headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`,
            // Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGlzdGluZ1VzZXJEYXRhIjp7InBhc3N3b3JkIjoiJDJiJDEwJFB2WDRUZE9VeGY4WURobjhGODR2Mk90eG1SL3BtR1A0M3l2OU1lSVFqeEdPaVFsTFpMRXBXIiwicGhvbmVOdW1iZXIiOiI2Mzc1MTY3MTE3IiwidXNlck5hbWUiOiJSb24yMjg4IiwiZW1haWwiOiJnM0BnbWFpbC5jb20iLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsYldGcGJDSTZJbWN6UUdkdFlXbHNMbU52YlNJc0ltbGtJam9pVW05dU1qSTRPQ0lzSW1saGRDSTZNVFkzT0RjM01UYzBNWDAueHhrWmFWUG1RVjJwVVp5SjZIckZqZ0VHMFFNVWFVRExpZkxvOG1qWkNQayJ9LCJpYXQiOjE2Nzg4MTgxMDN9.mFRpzpUxrdEx53V-bTTAilsOdZlMAJxxtNvk-JzKtFo`,
        },
    };
    const response = await instance.post('signin/', data, config)
        .then(response => {
            console.log(response.data)
            if (response.data != null) {
                redirectToPage(response.data)
            }
        })
        .catch(error => console.error(error));
};

function redirectToPage(loginData) {
    // Redirect to new page
    console.log(loginData)
    window.location.replace('stockTable.html');
    localStorage.setItem("loginJson", JSON.stringify(loginData));
    // Update content of HTML element
    const redirectMessage = document.getElementById("redirect-message")
    redirectMessage.innerHTML = "You are being redirected to a new page..."
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

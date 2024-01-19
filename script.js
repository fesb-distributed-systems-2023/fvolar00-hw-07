var submittedData = [];

async function submitForm() {
    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var position = document.getElementById("position").value;
    var nationality = document.getElementById("nationality").value;
    var club = document.getElementById("club").value;

    var userData = {
        "id": 0,
        "name": name,
        "dob": dob,
        "position": position,
        "nationality": nationality,
        "club": club
    };

    try{
        var response = await fetch('http://localhost:5223/Players/New', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            fetchData();
        } else {
            console.error('Failed to submit data. Server returned:', response.status, response.response);
        }      
    }
    catch{
        console.error('Error submitting data:', error);
    }
    finally{
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("position").value = "";
        document.getElementById("nationality").value = "";
        document.getElementById("club").value = "";
    }
}


async function fetchData() {
    try {
        // Fetch data from the backend API (replace 'YOUR_BACKEND_API_URL' with your actual URL)
        var response = await fetch('http://localhost:5223/Players/Get/All');
        var data = await response.json();

        // Display data in the table
        displayDataInTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayDataInTable(dataArray) {
    var tableBody = document.getElementById("dataBody");
    tableBody.innerHTML = "";

    dataArray.forEach(function(data) {
        var newRow = tableBody.insertRow();

        var idCell = newRow.insertCell(0);
        var nameCell = newRow.insertCell(1);
        var dobCell = newRow.insertCell(2);
        var positionCell = newRow.insertCell(3);
        var nationalityCell = newRow.insertCell(4);
        var clubCell = newRow.insertCell(5);

        idCell.innerHTML = data.id;
        nameCell.innerHTML = data.name;
        dobCell.innerHTML = data.dob;
        positionCell.innerHTML = data.position;
        nationalityCell.innerHTML = data.nationality;
        clubCell.innerHTML = data.club;
    });
}

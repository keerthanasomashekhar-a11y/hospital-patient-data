const API_URL = "http://localhost:5000/api/patients";

let updateId = null;

// Load all patients on page load
window.onload = loadPatients;

// Fetch and display patients
async function loadPatients() {
    const res = await fetch(API_URL);
    const data = await res.json();

    let table = "";
    data.forEach(p => {
        table += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.disease}</td>
                <td>${p.phone}</td>
                <td>${p.address || "-"}</td>
                <td>
                    <button class="edit-btn" onclick="editPatient('${p._id}', '${p.name}', '${p.age}', '${p.disease}', '${p.phone}', '${p.address}')">Edit</button>
                    <button class="delete-btn" onclick="deletePatient('${p._id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("patientTable").innerHTML = table;
}

// Add patient
async function addPatient() {
    const patient = getFormData();

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient)
    });

    clearForm();
    loadPatients();
}

// Prepare for update
function editPatient(id, name, age, disease, phone, address) {
    updateId = id;

    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("disease").value = disease;
    document.getElementById("phone").value = phone;
    document.getElementById("address").value = address;
}

// Update patient
async function updatePatient() {
    if (!updateId) {
        alert("Select a patient to edit!");
        return;
    }

    const patient = getFormData();

    await fetch(`${API_URL}/${updateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient)
    });

    clearForm();
    updateId = null;
    loadPatients();
}

// Delete patient
async function deletePatient(id) {
    if (!confirm("Delete this patient?")) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadPatients();
}

// Collect form data
function getFormData() {
    return {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        disease: document.getElementById("disease").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };
}

// Clear form fields
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("disease").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
}

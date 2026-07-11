// Application state variables
let studentsData = [];
let currentDataView = [];

// Elements bindings
const tableContainer = document.getElementById('tableContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Control Actions bindings
document.getElementById('sortAZ').addEventListener('click', sortAZ);
document.getElementById('sortZA').addEventListener('click', sortZA);
document.getElementById('sortMarks').addEventListener('click', sortByMarks);
document.getElementById('sortPassing').addEventListener('click', sortByPassing);
document.getElementById('sortClass').addEventListener('click', sortByClass);
document.getElementById('sortGender').addEventListener('click', sortByGender);

// Search event listeners (Input event handles dynamic change typing; Button click fallback)
searchInput.addEventListener('input', handleSearch);
searchBtn.addEventListener('click', handleSearch);

// Initialization: Fetch Remote JSON Data Array
async function initPortal() {
    try {
        const targetUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Network error fetching remote data stream.');
        
        studentsData = await response.json();
        currentDataView = [...studentsData]; // Maintain pointer to default state
        renderSingleTable(currentDataView);
    } catch (error) {
        console.error('Initialization error: ', error);
        tableContainer.innerHTML = `<p style="padding: 20px; color: red;">Failed to load data elements from server source.</p>`;
    }
}

// Global Core Data Row Renderer Utility 
function createTableHtml(dataArray) {
    if (dataArray.length === 0) {
        return `<tr><td colspan="7" style="text-align:center; padding: 20px;">No matching student profiles found</td></tr>`;
    }

    return dataArray.map(student => {
        const fullName = `${student.first_name} ${student.last_name}`;
        const passStatusText = student.passing ? 'Passing' : 'Failed';
        const passClass = student.passing ? 'status-passing' : 'status-failed';

        return `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="student-identity">
                        <img src="${student.img_src}" alt="${fullName}" onerror="this.src='https://via.placeholder.com/32'">
                        <span>${fullName}</span>
                    </div>
                </td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td class="${passClass}">${passStatusText}</td>
                <td>${student.email}</td>
            </tr>
        `;
    }).join('');
}

// Master Single Frame Generator Layout
function renderSingleTable(dataArray) {
    tableContainer.innerHTML = `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Passing</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    ${createTableHtml(dataArray)}
                </tbody>
            </table>
        </div>
    `;
}

// Search Logic Implementation: Match against first_name, last_name, or email
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    currentDataView = studentsData.filter(student => {
        const firstNameMatch = student.first_name.toLowerCase().includes(query);
        const lastNameMatch = student.last_name.toLowerCase().includes(query);
        const emailMatch = student.email.toLowerCase().includes(query);
        return firstNameMatch || lastNameMatch || emailMatch;
    });

    renderSingleTable(currentDataView);
}

// Sorting Functions
function sortAZ() {
    currentDataView.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    renderSingleTable(currentDataView);
}

function sortZA() {
    currentDataView.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameB.localeCompare(nameA);
    });
    renderSingleTable(currentDataView);
}

function sortByMarks() {
    currentDataView.sort((a, b) => a.marks - b.marks);
    renderSingleTable(currentDataView);
}

function sortByPassing() {
    const passingStudents = currentDataView.filter(student => student.passing);
    renderSingleTable(passingStudents);
}

function sortByClass() {
    currentDataView.sort((a, b) => a.class - b.class);
    renderSingleTable(currentDataView);
}

// Gender split functionality renders two distinct stack panels sequentially
function sortByGender() {
    const females = currentDataView.filter(student => student.gender.toLowerCase() === 'female');
    const males = currentDataView.filter(student => student.gender.toLowerCase() === 'male');

    tableContainer.innerHTML = `
        <div class="table-wrapper">
            <h2 class="table-title">Female Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Passing</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    ${createTableHtml(females)}
                </tbody>
            </table>
        </div>
        
        <div class="table-wrapper" style="margin-top: 24px;">
            <h2 class="table-title">Male Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Passing</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    ${createTableHtml(males)}
                </tbody>
            </table>
        </div>
    `;
}

// Run Core Service Engine
initPortal();
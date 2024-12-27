const data = [
    { id:1,  name: "John", age: 30, country: "USA" },
    { id:2, name: "Mary", age: 25, country: "UK" },
    { id:3, name: "Paul", age: 40, country: "Canada" },
    { id:4, name: "Anna", age: 22, country: "Germany" },
    { id:5,name: "Mike", age: 35, country: "Australia" },
    { id:6, name: "Sara", age: 28, country: "Italy" },
    { id:7, name: "Leo", age: 32, country: "France" },
    { id:8, name: "Nina", age: 27, country: "Spain" },
    { id:9, name: "Tom", age: 45, country: "Netherlands" },
    { id:10, name: "Kim", age: 38, country: "South Korea" }
];

let currentPage = 1;
const rowsPerPage = 5;
let sortColumn = null;
let sortOrder = 'asc';

const tableContainer = document.getElementById('table-container');
const paginationContainer = document.getElementById('pagination');

function renderTable() {
    const paginatedData = getPaginatedData();
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th onclick="sortTable('id')">ID</th>
                    <th onclick="sortTable('name')">Name</th>
                    <th onclick="sortTable('age')">Age</th>
                    <th onclick="sortTable('country')">Country</th>
                </tr>
            </thead>
            <tbody>
                ${paginatedData.map(row => `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                        <td>${row.age}</td>
                        <td>${row.country}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    tableContainer.innerHTML = tableHTML;
    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    let paginationHTML = `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    `;
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" ${currentPage === i ? 'disabled' : ''}>${i}</button>
        `;
    }
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;
    paginationContainer.innerHTML = paginationHTML;
}

function getPaginatedData() {
    let sortedData = [...data];
    if (sortColumn) {
        sortedData.sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedData.slice(start, end);
}

function sortTable(column) {
    if (sortColumn === column) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortOrder = 'asc';
    }
    currentPage = 1;
    renderTable();
}

function changePage(page) {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
    }
}

renderTable();

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://market-place-q0q5.onrender.com/api';

const usersGrid = document.getElementById('usersGrid');

async function loadUsers() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
            renderUsers(data.data);
        } else {
            usersGrid.innerHTML = `<tr><td colspan="5" class="error">${data.error}</td></tr>`;
        }
    } catch (error) {
        console.error('Error loading users:', error);
        usersGrid.innerHTML = '<tr><td colspan="5" class="error">Failed to load users.</td></tr>';
    }
}

function renderUsers(users) {
    if (users.length === 0) {
        usersGrid.innerHTML = '<tr><td colspan="5" class="loader">No users found.</td></tr>';
        return;
    }

    usersGrid.innerHTML = users.map(user => `
        <tr>
            <td>${user.businessName}</td>
            <td>${user.ownerName}</td>
            <td>${user.email}</td>
            <td>${user.location}</td>
            <td>${user.contactInfo}</td>
        </tr>
    `).join('');
}

window.addEventListener('DOMContentLoaded', loadUsers);

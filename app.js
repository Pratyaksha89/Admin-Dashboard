let users = [];
let roles = ['Admin', 'Editor', 'Viewer'];
let permissions = ['Read', 'Write', 'Delete'];

// Show the user form when "Add User" button is clicked
document.getElementById('add-user-btn').addEventListener('click', () => {
    document.getElementById('user-form').style.display = 'flex';
    resetFormFields();
});

// Save user and update table
document.getElementById('save-user-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    // Validate user input
    if (!name || !email || !role) {
        alert('Please fill in all fields');
        return;
    }

    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address');
        return;
    }

    // Check if role is valid
    if (!roles.includes(role)) {
        alert('Invalid role selected');
        return;
    }

    // Save user and update table
    users.push({ name, email, role });
    updateUserTable();
    document.getElementById('user-form').style.display = 'none'; // Hide form
    resetFormFields();
    alert('User added successfully!');
});

// Close modal
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('user-form').style.display = 'none';
});

// Add new role
document.getElementById('add-role-btn').addEventListener('click', () => {
    const newRole = prompt('Enter a new role:');
    if (newRole && !roles.includes(newRole)) {
        roles.push(newRole);
        updateRoleList();
        alert('Role added successfully!');
    } else {
        alert('Role already exists or input is invalid.');
    }
});

// Add new permission
document.getElementById('add-permission-btn').addEventListener('click', () => {
    const newPermission = prompt('Enter a new permission:');
    if (newPermission && !permissions.includes(newPermission)) {
        permissions.push(newPermission);
        updatePermissionList();
        alert('Permission added successfully!');
    } else {
        alert('Permission already exists or input is invalid.');
    }
});

// Update User Table
function updateUserTable() {
    const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    users.forEach(user => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser('${user.email}')">Edit</button>
                <button onclick="deleteUser('${user.email}')">Delete</button>
            </td>
        `;
    });
}

// Edit User
function editUser(email) {
    const user = users.find(u => u.email === email);
    if (user) {
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('role').value = user.role;
        document.getElementById('user-form').style.display = 'flex';
        users = users.filter(u => u.email !== email); // Remove the user to update
        updateUserTable();
    }
}

// Delete User
function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.email !== email);
        updateUserTable();
        alert('User deleted successfully!');
    }
}

// Update Role List
function updateRoleList() {
    const roleList = document.getElementById('role-list');
    roleList.innerHTML = '';
    roles.forEach(role => {
        const li = document.createElement('li');
        li.textContent = role;
        roleList.appendChild(li);
    });
}

// Update Permission List
function updatePermissionList() {
    const permissionList = document.getElementById('permission-list');
    permissionList.innerHTML = '';
    permissions.forEach(permission => {
        const li = document.createElement('li');
        li.textContent = permission;
        permissionList.appendChild(li);
    });
}

// Reset form fields
function resetFormFields() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('role').value = '';
}

// Initial UI update
updateRoleList();
updatePermissionList();

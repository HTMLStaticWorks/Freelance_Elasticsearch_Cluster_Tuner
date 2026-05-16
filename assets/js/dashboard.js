// Dashboard specific JS
document.addEventListener('DOMContentLoaded', function() {
    // Highlight active sidebar link
    const path = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });

    // User Management Functionality
    const addUserBtn = document.querySelector('#addUserModal .btn-primary');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            const name = document.querySelector('#addUserModal input[type="text"]').value;
            const email = document.querySelector('#addUserModal input[type="email"]').value;
            const role = document.querySelector('#addUserModal select:nth-of-type(1)').value;
            
            if (name && email) {
                addUserToTable(name, email, role);
                // Reset form and close modal
                document.querySelector('#addUserModal input[type="text"]').value = '';
                document.querySelector('#addUserModal input[type="email"]').value = '';
                const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
                modal.hide();
                
                // Show success toast or alert
                alert('User ' + name + ' has been invited!');
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    console.log("Dashboard initialized");
});

function addUserToTable(name, email, role) {
    const table = document.querySelector('#usersTable tbody');
    if (!table) return;

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const roleClass = role === 'Admin' ? 'bg-primary' : (role === 'Engineer' ? 'bg-info text-dark' : 'bg-secondary');
    
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-role', role);
    newRow.innerHTML = `
        <td>
            <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                    style="width:40px;height:40px;background:#${Math.floor(Math.random()*16777215).toString(16)};flex-shrink:0;">${initials}</div>
                <div>
                    <div class="fw-bold">${name}</div>
                    <div class="small text-muted">${email}</div>
                </div>
            </div>
        </td>
        <td><span class="badge ${roleClass}">${role}</span></td>
        <td>Custom</td>
        <td>Just now</td>
        <td><span class="badge bg-warning text-dark">Pending</span></td>
        <td>
            <div class="dropdown">
                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Action</button>
                <ul class="dropdown-menu shadow-sm border-0">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Edit</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-envelope me-2"></i>Resend Invite</a></li>
                    <li><a class="dropdown-item text-danger" href="#" onclick="deleteUser(this)"><i class="bi bi-trash me-2"></i>Remove</a></li>
                </ul>
            </div>
        </td>
    `;
    table.prepend(newRow);
}

function deleteUser(el) {
    if (confirm('Are you sure you want to remove this user?')) {
        const row = el.closest('tr');
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all 0.3s';
        setTimeout(() => row.remove(), 300);
    }
}

function suspendUser(el) {
    const row = el.closest('tr');
    const statusCell = row.cells[4];
    statusCell.innerHTML = '<span class="badge bg-danger">Suspended</span>';
    el.innerHTML = '<i class="bi bi-check-circle me-2"></i>Reactivate';
    el.classList.remove('text-danger');
    el.classList.add('text-success');
    el.setAttribute('onclick', 'reactivateUser(this)');
}

function reactivateUser(el) {
    const row = el.closest('tr');
    const statusCell = row.cells[4];
    statusCell.innerHTML = '<span class="badge bg-success">Active</span>';
    el.innerHTML = '<i class="bi bi-slash-circle me-2"></i>Suspend';
    el.classList.remove('text-success');
    el.classList.add('text-danger');
    el.setAttribute('onclick', 'suspendUser(this)');
}


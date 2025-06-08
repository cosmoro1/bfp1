// Logout function
function logoutUser() {
    localStorage.removeItem('bfp_current_user');
    window.location.href = 'bfp-login-system.html'; // Redirect to login page
}

// Auto-redirect if not logged in
window.addEventListener('load', function () {
    const user = JSON.parse(localStorage.getItem('bfp_current_user') || '{}');
    if (!user.username) {
        alert('You must login first.');
        window.location.href = 'login.html';
    }
});

// Modal open/close
function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
};

// Sidebar navigation highlight
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Open new incident modal
document.querySelector('.btn-primary')?.addEventListener('click', function() {
    if (this.textContent.includes('New Incident Report')) {
        openModal('newIncidentModal');
    }
});

// Update dashboard stats (simulated)
function updateStats() {
    const stats = {
        activeIncidents: Math.floor(Math.random() * 10) + 1,
        pendingReports: Math.floor(Math.random() * 20) + 5,
        personnelOnDuty: Math.floor(Math.random() * 20) + 40,
        systemStatus: 'Online'
    };
    console.log('Updated stats:', stats);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('BFP Records Management System initialized');
    updateStats();
});

// Handle form submission (simulated incident report creation)
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Incident report created successfully!';
    document.querySelector('main').insertBefore(alert, document.querySelector('main').firstChild);
    closeModal('newIncidentModal');
    setTimeout(() => {
        alert.remove();
    }, 3000);
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHXjEmLrjKeXJOf2qdn-_yqqXGMj-0VgA",
  authDomain: "bfp-project-6727f.firebaseapp.com",
  databaseURL: "https://bfp-project-6727f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bfp-project-6727f",
  storageBucket: "bfp-project-6727f.firebasestorage.app",
  messagingSenderId: "675371440922",
  appId: "1:675371440922:web:6e3d6690f827b69dd4eaa3",
  measurementId: "G-L90W11F8Y3"
};

// Demo user credentials
const demoUsers = {
  'admin': {
    password: 'admin123',
    fullName: 'Administrator User',
    role: 'admin',
    station: 'Central Command'
  },
  'officer1': {
    password: 'officer123',
    fullName: 'Fire Officer Juan',
    role: 'personnel',
    station: 'Manila Fire Station'
  },
  'regional1': {
    password: 'regional123',
    fullName: 'Regional Coordinator',
    role: 'regional',
    station: 'Metro Manila Regional Office'
  }
};

// Initialize demo users in localStorage
if (!localStorage.getItem('bfp_users')) {
  localStorage.setItem('bfp_users', JSON.stringify(demoUsers));
}

// Tab switching
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  document.getElementById(tabName + 'Tab').classList.add('active');
  event.target.classList.add('active');
  clearAlerts();
}

// Alert functions
function showAlert(message, type = 'error') {
  const alertContainer = document.getElementById('alertContainer');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type} show`;
  alert.innerHTML = `
    <div class="flex items-center">
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} mr-2"></i>
      ${message}
    </div>
  `;
  alertContainer.innerHTML = '';
  alertContainer.appendChild(alert);
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

function clearAlerts() {
  document.getElementById('alertContainer').innerHTML = '';
}

// Set loading state for buttons
function setLoading(buttonId, isLoading) {
  const button = document.getElementById(buttonId);
  if (isLoading) {
    button.disabled = true;
    button.innerHTML = '<span class="loading"></span> Please wait...';
  } else {
    button.disabled = false;
    button.innerHTML = buttonId === 'loginButton' ? 'Sign In' : 'Create Account';
  }
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  clearAlerts();

  const formData = new FormData(this);
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
    showAlert('Please fill in all fields');
    return;
  }

  setLoading('loginButton', true);

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('bfp_users') || '{}');
    if (users[username] && users[username].password === password) {
      const currentUser = {
        username: username,
        fullName: users[username].fullName,
        role: users[username].role,
        station: users[username].station,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('bfp_current_user', JSON.stringify(currentUser));
      showAlert('Login successful! Redirecting to dashboard...', 'success');
      setTimeout(() => {
        window.location.href = 'bfp-records-system.html';
      }, 1500);
    } else {
      showAlert('Invalid username or password');
      setLoading('loginButton', false);
    }
  }, 1000);
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  clearAlerts();

  const formData = new FormData(this);
  const fullName = formData.get('fullName');
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');
  const station = formData.get('station');

  if (!fullName || !username || !password || !role) {
    showAlert('Please fill in all required fields');
    return;
  }

  if (password.length < 6) {
    showAlert('Password must be at least 6 characters long');
    return;
  }

  setLoading('registerButton', true);

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('bfp_users') || '{}');

    if (users[username]) {
      showAlert('Username already exists');
      setLoading('registerButton', false);
      return;
    }

    users[username] = {
      password: password,
      fullName: fullName,
      role: role,
      station: station || ''
    };

    localStorage.setItem('bfp_users', JSON.stringify(users));

    showAlert('Account created successfully! You can now login.', 'success');
    setLoading('registerButton', false);
    this.reset();
    setTimeout(() => {
      switchTab('login');
    }, 2000);
  }, 1000);
});

// Check if user is already logged in
window.addEventListener('load', function() {
  // 🔧 Optional for development: Uncomment to always force login
  // localStorage.removeItem('bfp_current_user');

  const currentUser = localStorage.getItem('bfp_current_user');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);

    if (hoursSinceLogin < 8) {
      showAlert(`Welcome back, ${user.fullName}! Redirecting to dashboard...`, 'success');
      setTimeout(() => {
        window.location.href = 'bfp-records-system.html';
      }, 2000);
    } else {
      localStorage.removeItem('bfp_current_user');
      showAlert('Your session has expired. Please login again.');
    }
  }
});

// Demo credentials autofill
function fillDemoCredentials(username, password) {
  document.getElementById('login-username').value = username;
  document.getElementById('login-password').value = password;
}

document.addEventListener('DOMContentLoaded', function() {
  const demoContainer = document.querySelector('.bg-blue-50');
  if (demoContainer) {
    demoContainer.addEventListener('click', function(e) {
      const text = e.target.textContent;
      if (text.includes('admin / admin123')) {
        fillDemoCredentials('admin', 'admin123');
      } else if (text.includes('officer1 / officer123')) {
        fillDemoCredentials('officer1', 'officer123');
      } else if (text.includes('regional1 / regional123')) {
        fillDemoCredentials('regional1', 'regional123');
      }
    });
  }
});

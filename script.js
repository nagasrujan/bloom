
const adminCredentials = {
    username: 'admin',
    password: 'password123'
};
window.onload = function() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        showProductManagement();
    } else {
        showLogin();
    }
};

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        sessionStorage.setItem('loggedIn', 'true');
        showProductManagement();
    } else {
        document.getElementById('error-message').innerText = 'Invalid username or password';
    }
});

function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('product-management').style.display = 'none';
}


function showProductManagement() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('product-management').style.display = 'block';
}


document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.removeItem('loggedIn');
    showLogin();
});

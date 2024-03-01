
document.querySelector('.signup-form').addEventListener('submit', signupHandler);

const signupHandler = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            alert('You have successfully signed up! Please log in.');
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
}
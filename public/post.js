document.querySelector('post-form').addEventListener('submit', newFormHandler);

async function newFormHandler(event) {
    event.preventDefault();

    const postContent = document.getElementById('postContent').value;
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }});
    if (response.ok) {
        document.location.replace('/posts');
    }else {
        alert(response.statusText);
    }
}
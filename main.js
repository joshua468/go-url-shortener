const baseURL = window.location.origin + window.location.pathname;

// Redirect if code is present
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    const originalUrl = localStorage.getItem(code);
    if (originalUrl) {
      window.location.href = originalUrl;
    } else {
      document.body.innerHTML = '<h2>404 - Link not found</h2>';
    }
  }
});

function generateCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function shortenUrl() {
  const input = document.getElementById('longUrl');
  const longUrl = input.value.trim();
  if (!longUrl) {
    alert('Please enter a valid URL.');
    return;
  }
  const code = generateCode();
  localStorage.setItem(code, longUrl);
  const shortUrl = `${baseURL}?code=${code}`;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>Short URL: <a class="short-link" href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
  input.value = '';
}

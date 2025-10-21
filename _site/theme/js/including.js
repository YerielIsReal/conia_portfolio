fetch('/inc/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

fetch('/inc/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

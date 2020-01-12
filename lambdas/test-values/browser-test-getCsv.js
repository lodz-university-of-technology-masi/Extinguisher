var xhr = new XMLHttpRequest();
xhr.open("GET", "https://tmwls6e9oi.execute-api.us-east-1.amazonaws.com/prod/csv?testID=af0c4bff-3398-476d-a51a-6f576dfeaddf", true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send()
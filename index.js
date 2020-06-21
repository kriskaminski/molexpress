
//Uruchomienie:
//kopiujemy plik do folderu, instalujemy expressa i mongodb "npm install express mongodb"
// modyfikujemy zmienną connectionString podając swoje dane i rozwijamy aplikację dalej :)
// uruchamiamy wpisując w konsoli "node index.js"

//żeby móc użyć expressa w projekcie mówimy Node'owi, żeby go zaimportował
// musi być najpierw zainstalowany - "npm install express"
const express = require('express');

//Połączenie z bazą danych 
// instalujemy mongodb - "npm install mongodb"
//i impotrtujemy clienta
const MongoClient = require('mongodb').MongoClient

//Oczywiście trzeba sobie wpisać dane swojego użytkownika i serwera
const connectionString = 'mongodb+srv://<username>:<password>@<clustername>-rmp3c.mongodb.net/test?retryWrites=true&w=majority'


//Na jakim porcie ma słuchać serwer - jeśli nie podamy to słucha na 3000
const PORT = process.env.PORT || 3000

//Inicjalizacja expressa
const app = express();

// Wbudowany w expressa parser danych, które klient wyśle POSTem
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Połączenie z bazą danych MongoDB
MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  console.log("Jesteś połączony z bazą danych")

})

//GET wysłany na http://localhost:3000/ (można wejść z przeglądarki) 
// albo przetestować curl'em:
// curl http://localhost:3000/

app.get('/', (req, res) => {
  res.send('Pozdrowienia z zaliczenia!');
});

// Wysłanie zapytania metodą POST zwróci informacje i wysłane dane
//curl -X POST -H "Content-Type:application/json" http://localhost:3000/ -d '{"message":"Express nie jest taki zły"}'
app.post('/', (req, res) => {

  let message = JSON.stringify(req.body)
  res.send(`Ktoś wysłał mi POSTem: ${message}`)
});

// W konsoli po uruchomieniu skryptu powinno się wyświetlić wiadomość mówiąca nam, że wszystko jest ok.
app.listen(PORT, () => console.log(`Express grzecznie słucha na porcie ${PORT}`));

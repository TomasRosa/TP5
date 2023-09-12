document.addEventListener('DOMContentLoaded', () => 
{
const table = document.getElementById("table");

/*Preguntar a Nahue si puedo intercambiar los backticks por la concatenacion*/ 
fetch("https://jsonplaceholder.typicode.com/users") /*Consumo la api*/ 
.then(res => res.json()) /*Paso la api a JSON.*/ 
.then((users) =>{        /*Imprimo la data de la JSON y la retorno, preguntar por que.*/ 
    console.log(users);
    users.forEach(user =>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td> ${user.name}</td>
        <td> ${user.email}</td>
        <td> ${user.username}</td>
        <td>${user.company.name}</td>`
        table.appendChild(tr);
        /*Preguntar como acceder a las companys. Lo estoy haciendo con otra API xq la del TP no funciona. */ 
    });
})
.catch(err =>{
    console.error("Ha ocurrido un error. ", err);
})
})

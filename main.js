document.addEventListener("DOMContentLoaded",() =>{
    //Obtengo los ID de las tablas para luego manipularlas y rellenarlas.
    const idEmpleado = document.getElementById('idEmpleado');
    const idCompañia = document.getElementById('idCompañia');
    const idNombre = document.getElementById('idNombre');
    const idApellido = document.getElementById('idApellido');
    const idEmail = document.getElementById('idEmail');
    const idNombreCompañia = document.getElementById('idNombreCompañia');
    const table = document.getElementById('table');
    ///PREGUNTAR ERROR JOHN DOE, NO IMPRIME NADA PERO LO COMENTO Y LO IMPRIME... WTF
    let empleados;
    let compañia;

    //Obtengo los endpoint de los empleados y la compañia a partir de la URL de la API.
    const urlApi = "https://utn-lubnan-api-1.herokuapp.com";
    const employeeEndpoint = `${urlApi}/api/Employee`;
    const companyEndpoint = `${urlApi}/api/Company`;
    /*
    const nuevoEmpleado =
        {
            companyId:8,
            firstName:"John",
            lastName:"Doe",
            Email:"john@doe.com",
        }
    */
        //CREO QUE LO AGREGUE A LA API PERO LO COMENTE, SE QUEDO AGREGADO IGUAL??
    fetch(employeeEndpoint,/*{
        
        method: "POST",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoEmpleado)
        
    }*/)
    .then(res => 
    {
        if (!res.ok) 
        {
            console.log("Error en la solicitud POST");
        }
        return res.json()
    })
    .then(data =>{
        empleados = data;
        console.log(empleados); //Preguntar a nahue porque no puedo imprimirlo mediante backTicks
        //Una vez que ya tengo los datos de los empleados, necesito los de la Company ya que los debo listar donde cada empleado tenga asignada su company correspondiente.
        //Para realizar eso, tengo que hacer un fetch del endPoint de la company para luego pasarlo a json y asi poder utilizar esos datos en conjunto.
        return fetch(companyEndpoint)
    })
    .then(resCompany => resCompany.json())
    .then(data =>{
        compañia = data;
        console.log(data);

        
        empleados.forEach(empleado =>{
            const newRow = table.insertRow();

            const tdIdEmpleado = newRow.insertCell();
            tdIdEmpleado.innerHTML = empleado.employeeId;
            
            const tdCompany = newRow.insertCell();
            tdCompany.innerHTML = empleado.companyId;
            
            const tdNombre = newRow.insertCell();
            tdNombre.innerHTML = empleado.firstName; 
            
            const tdApellido = newRow.insertCell();
            tdApellido.innerHTML = empleado.lastName; 
            
            const tdEmail = newRow.insertCell();
            tdEmail.innerHTML = empleado.email;

            let nombre = asignarCompañiaAEmpleado(empleado.companyId,compañia); ///Paso el id compañia ya que es el que comparten, estaba pasando el employee nada que evr

            const tdNombreCompañia = newRow.insertCell();
            tdNombreCompañia.innerHTML = nombre;
        })
    })
    .catch(err => {
        console.error("Error en la solicutd POST" + err);
    })
    function asignarCompañiaAEmpleado (IDcompañia, arregloCompañia)
    {
        let retorno = null;

        arregloCompañia.forEach(compañia =>{
            if(IDcompañia === compañia.companyId)
            {
                retorno = compañia.name;
            }
        })
        return retorno;
    }
})

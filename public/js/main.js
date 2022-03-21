window.onload = function() {
    leer();
    labelsX = [];
    dataY = [];
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function leer() {

    var ajax = objetoAjax();
    formdata = new FormData();
    formdata.append('_token', document.getElementById('token').getAttribute("content"));
    formdata.append('_method', 'GET');

    ajax.open("POST", "leer", true);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            for (var i = 0; i < respuesta.length; i++) {
                labelsX.push(respuesta[i].nombre);
                dataY.push(respuesta[i].num);
            }
            // creamos el chart
            chartCreate();
        }
    }

    ajax.send(formdata)
}

function chartCreate() {
    const data = {
        labels: labelsX,
        datasets: [{
            label: 'Número de Pokemons por tipo',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(46, 98, 73)',
                'rgb(22, 1, 226)',
                'rgb(100, 205, 98)',
                'rgb(255, 24, 86)',
                'rgb(1, 55, 150)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(46, 98, 73)',
                'rgb(22, 1, 226)',
                'rgb(100, 205, 98)',
                'rgb(255, 24, 86)',
                'rgb(1, 55, 150)',
            ],
            data: dataY,
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {}
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}
$(function () {

    let edit = false;
    //console.log('jQuery esta funcionando');
    $('#lista-busqueda').hide();
    fetchTasks();


    $('#search').keyup(function () {
        if ($('#search').val()) {

            let search = $('#search').val();
            //console.log(search);
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                            ${task.nombre}
                        </li>`
                    });

                    $('#container').html(template);
                    $('#lista-busqueda').show();
                }
            });


        }



    });




    $('#task-form').submit(function (e) {
        e.preventDefault();
        const postData = {
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            id: $('#taskId').val()
        };
        let url =  edit===false ? 'task-add.php': 'task-edit.php'

        
       


        $.post(url, postData, function (response) {
            fetchTasks();

            $('#task-form').trigger('reset');
            edit=false;

        });




    });

    function fetchTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `<tr  taskID= ${task.id}>
                                    <td>${task.id}</td>
                                        <td>
                                            <a href='#' class='task-item'>${task.nombre}</a>             
                                        </td>
                                    <td>${task.descripcion}</td>
                                    <td>
                                        <button class="task-delete btn btn-danger">
                                        eliminar
                                        </button>
                                    </td>
                                </tr>`
                });

                $('#tasks').html(template);


            }
        });
    }



    $(document).on('click','.task-delete', function(){
        if(confirm('Esta seguro de eliminar la tarea')){
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr('taskID');
    
            $.post('task-delete.php', {id}, function (response) {
                fetchTasks();

            });

        }

    });

    $(document).on('click','.task-item', function(){
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('taskID');
        $.post('task-seleccionada.php',{id}, function(response){
            let task = JSON.parse(response);
            $('#nombre').val(task.nombre);
            $('#descripcion').val(task.descripcion);
            $('#taskId').val(task.id);
            edit = true;
        })
    });

});
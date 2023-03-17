$(document).ready(function () {
    // example: https://getbootstrap.com/docs/4.2/components/modal/
    // show modal
    $('#task-modal').on('show.bs.modal', function (event) {
        const modal = $(this)
          modal.find('.form-control').val('');
        
    })


    $('#edit-task-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget) // Button that triggered the modal
        const taskID = button.data('source') // Extract info from data-* attributes
        const content = button.data('content') // Extract info from data-* attributes

        const modal = $(this)
            modal.find('.modal-title').text('Edit Task ' + taskID)
            $('#task-form-display').attr('taskID', taskID)
        if (content) {
            modal.find('.form-control').val(content);
        } else {
            modal.find('.form-control').val('');
        }
    })

    $('#submit-task').click(function () {
        const tID = $('#task-form-display').attr('taskID');
        console.log($('#task-modal').find('.form-control').val())
        $.ajax({
            type:'GET',
            url:'/fetch-max-id',
            success: function(res){
                let id=0;
                if(res.length==0){
                    id = 1;
                }else{
                    id = res;
                    id++;
                    console.log(id);

                }

                $.ajax({
                    type: 'POST',
                    url: '/create',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        'description': $('#task-modal').find('.form-control').val(),
                        'id': id
                    }),
                    success: function (res) {
                        console.log(res.response)
                        location.reload();
                    },
                    error: function () {
                        console.log('Error');
                    }
                });

            },error: function(){
                console.log('Error');
            }
        })
       
    });
    

   
    
    
    $('.remove').click(function () {
        const remove = $(this)
        $.ajax({
            type: 'DELETE',
            url: '/delete/' + remove.data('source'),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });


 $('.state').click(function () {
        let state = $(this)
        let tID = state.data('source')
        let new_state;

        if (state.text() === "Todo") {
            new_state = "In Progress"
        }
       
        console.log(new_state)
    
        $.ajax({
            type: 'PATCH',
            url: '/edit-status/' + tID,
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'status': new_state
            }),
            success: function (res) {
                
                console.log(res)
                location.reload();
            }, 
            error: function () {
                console.log('Error');
            }
        });
    });
    
});
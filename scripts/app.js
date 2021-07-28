iconToggle = false;
var serverUrl = "https://fsdiapi.azurewebsites.net/";


function checkOther() {
    let category = $(`#selCategory`).val();
    if (category === "5"){
        $(`#otherCategory`).show();
    }else{$(`#otherCategory`).hide();
    }
}

function toggleForm() {

if ($(`#inputForm`).is(":hidden")){
            $(`#inputForm`).show();
    }else{
            $(`#inputForm`).hide();
}

}

function toggleImportant() {
    if (iconToggle) {
        $(`#icon-important`).removeClass(`fa-exclamation`).addClass(`fa-times`);
        iconToggle = false;
    }else{
        $(`#icon-important`).removeClass(`fa-times`).addClass(`fa-exclamation`);
        iconToggle = true;
    }      
}

function saveTask(){
    
    let title = $(`#txtTitle`).val();
    let description = $(`#txtDescription`).val();
    let duedate = $(`#selDuedate`).val();
    let category = $(`#selCategory`).val();
    if(category == "5") category = $(`#otherCategory`).val();
    let location = $(`#txtLocation`).val();
    let color = $(`#selColor`).val();

    let task = new Task(title,iconToggle,description,duedate,category,location,color);
    console.log(task);

    $.ajax({
        type:`POST`,
        url: serverUrl + "api/tasks/",
        data: JSON.stringify(task),
        contentType:`application/JSON`,
        
        success: function(response) {
            console.log(`Server says ${response}`)
            // process good, display
            displayTask(response);

        },
        
        error: function(error){
            console.log(`Server failed, ${error}`)
            //show there was an error
        
        }
    });

}

function displayTask(task) {
    let newtask = JSON.parse(task);
    //create syntax
    if(newtask.isImportant){
        var taskIcon = `<i class="fa-exclamation fas" style="color:red"></i>`
    }else{
        var taskIcon = `<i class="fa-times fas" style="color:grey"></i>`
        }
    let syntax = `

    <div class="task-box" style="background-color:${newtask.color}">

    <div class="task-leftside">
        <div id="iconBox">${taskIcon}</div>
        <div class="left-text"><h4>${newtask.title}</h3>${newtask.description}</div>
    </div>

    <div class="task-rightside">
        <div class="task-info">
            <p>Category: ${newtask.category}</p> <p>Due Date: ${newtask.duedate}</p> <p>Location: ${newtask.location}</p>
        </div>
        <div class="deleteBox">
            <button class="btn btn-dark">Delete</button>
        </div>
    </div>
</div>


    `;

    //append syntax to container
$(`#pendingTasks`).append(syntax);


}

function init() {

console.log(`Loaded JS`);



$(`#selCategory`).change(checkOther);
$(`#btn-toggle`).click(toggleForm);
$(`#icon-important`).click(toggleImportant);
$(`#btn-saveTask`).click(saveTask);


$(`#otherCategory`).hide();
}

window.onload = init;



function testRequest(){
    $.ajax({
        type: `GET`,
        url:`https://restclass.azurewebsites.net/api/test`,
        success: function(response){
            console.log(`Response Succeeded, ${response}`);
        },
        error: function(errorDetails){
            console.log(`Error on sending request, ${errorDetails}`);
        }
    })

}

let nameInput = document.getElementById("name");
let professionInput =document.getElementById("profession")
let ageInput = document.getElementById("age")
let addbtn = document.getElementById("add-btn")
let messagecontainer = document.getElementById("message-container")
let employeelist    = document.getElementById("employee-list")


let employeesArray = [];
function renderEmployees() {
    // Agar array khali hai to default message dikhao
    if (employeesArray.length === 0) {
        employeelist.innerHTML = `<p class="default-text">You have 0 Employees.</p>`;
        return;
    }

    // List ko clear karke naya data generate karo
    employeelist.innerHTML = "";

    employeesArray.forEach((employee, index) => {
        
        let card = document.createElement("div");
        card.className = "employee-card";

        
        card.innerHTML = `
            <div class="employee-info">
                <span>${index + 1}.</span>
                <span>Name: ${employee.name}</span>
                <span>Profession: ${employee.profession}</span>
                <span>Age: ${employee.age}</span>
            </div>
            <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete User</button>
        `;

        employeelist.appendChild(card);
    });
}

// 2. Function jo employee ko array se delete karega
window.deleteEmployee = function(id) {
   
    employeesArray = employeesArray.filter(emp => emp.id !== id);
    
    
    renderEmployees();
};
addbtn.addEventListener("click", (e)=>{
    e.preventDefault();

    let nameValue = nameInput.value.trim()
    let professionValue = professionInput.value.trim()
    let ageValue = ageInput.value.trim()
     
    if(nameValue === "" || professionValue === "" || ageValue === ""){
        messagecontainer.innerHTML = `<span class="error-msg">Error : Please Make sure All the fields are filled before adding in an employee !</span>`;
        return ;
    
    }
    let newEmployee = {
        id: Date.now(), 
        name: nameValue,
        profession: professionValue,
        age: Number(ageValue) 
    };

    employeesArray.push(newEmployee);
    messagecontainer.innerHTML = `<span class="success-msg">Success : Employee Added!</span>`;

    nameInput.value = "";
    professionInput.value = "";
    ageInput.value = ""; 
    renderEmployees();
    
   
})
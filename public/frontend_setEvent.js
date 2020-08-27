const studentsTable = document.querySelector('#stu-table');
const form = document.querySelector("#add-students-form");
// // create element & render 
function renderStudents(doc){
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let tr = document.createElement("tr");
    tr.setAttribute('data-id', doc.id);
    td1.textContent = doc.data().name;
    td2.textContent = doc.data().age;
    td3.textContent = doc.data().gender;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    // delete 
    let cross = document.createElement('div');
    cross.textContent = 'x';
    tr.appendChild(cross);
    cross.addEventListener('click', (test) => {
        test.stopPropagation();
        let id = test.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('ClassA_frontend').doc(id).delete().then(()=>{
            alert("Successfully Delete Account !");
            location.reload();
        });
    });
    //

    studentsTable.appendChild(tr);
}

// getting data 
db.collection('ClassA_frontend').get().then(data => {
    data.docs.forEach(doc => {
        renderStudents(doc);
    });
});
// 

// add data
form.addEventListener('submit',async (e) => {
    e.preventDefault();
    await db.collection('ClassA_frontend').add({
        name: form.name.value,
        gender: form.gender.value,
        age: form.age.value
    });
    form.name.value = '';
    form.gender.value = '';
    form.age.value = '';
    alert("Successfully Add Account !");
    location.reload();  // 自己重新整理
});
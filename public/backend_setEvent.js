const cross = document.querySelectorAll('#cross-family')
const form = document.querySelector("#add-students-form");
for(let i = 0 ; i < cross.length; i ++){
    cross[i].addEventListener('click', async (test) => {
        test.stopPropagation();
        let id = cross[i].getAttribute('cross-id');
        console.log(id);
        let apiUrl = `https://jim-nodejs-app01.herokuapp.com/API/deleteMember?id=${id}`
        let res = await fetch(apiUrl, {method:'GET'});
        let text = await res.text();
        console.log(text);
        console.log("in the cross, id = ", id);

        // await alert("Successfully Delete Account !");
        // // 馬上重新整理
        // await location.reload();
    });
}
// add data
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // call add api
    name    = form.name.value,
    gender  = form.gender.value,
    age     = form.age.value
    let apiUrl = `https://jim-nodejs-app01.herokuapp.com/API/addMember?name=${name}&gender=${gender}&age=${age}`
    let res = await fetch(apiUrl, {method:'GET'});
    let text = await res.text();
    console.log(text);
    form.name.value = '';
    form.gender.value = '';
    form.age.value = '';

    // await alert("Successfully Add Account !");
    // await location.reload();
});
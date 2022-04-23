document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById("table-body")
    const form = document.getElementById("dog-form")
    function dogs(){
        fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then (data => 
            data.forEach((dog) =>{
                showData(dog)
            })
        )
    }
    function showData(dog){
        let tr = document.createElement('tr')
        let nameTd = document.createElement('td')
        let breedTd = document.createElement('td')
        let sexTd = document.createElement('td')
        let editTd = document.createElement('td')
        let btn = document.createElement('button')

        nameTd.innerText = dog.name
        breedTd.innerText = dog.breed
        sexTd.innerText = dog.sex 
        btn.innerText = "Edit Dog"
        editTd.appendChild(btn)
        tr.appendChild(nameTd)
        tr.appendChild(breedTd)
        tr.appendChild(sexTd)
        tr.appendChild(editTd)
        table.appendChild(tr)

        btn.addEventListener('click', (e)=>{
            e.target.dog
            // let pid = e.target.parentNode.parentNode
            // let p = id.dog.id
            // if(parseInt(id) === dog.id){
            //     editForm.setAttribute("id", `${dog.id}`)
                form["name"].value = dog.name
                form["breed"].value = dog.breed
                form["sex"].value = dog.sex
            form.addEventListener('submit', (e)=>{
                e.preventDefault()
                fetch(`http://localhost:3000/dogs/${dog.id}`,{
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: e.target.name.value,
                        break: e.target.breed.value,
                        sex: e.target.sex.value
                    })
                })
                table.innerHTML=''
                dogs()
            })
        })
        
    }
    
    dogs()
})
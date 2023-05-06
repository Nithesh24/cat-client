const server_url = "https://prickly-ring-crab.cyclic.app/"

function visit(url){
    window.location.href=url
}

let texts = [
    "click for random cat facts",
    "click for a random cat picture",
    "click for a random cat info"
]

let card = document.getElementsByClassName("card");

  
function displayText(e, num){
    let lst = [0, 1, 2]
    lst.splice(num,1)
    for(let i = 0; i<lst.length; i++){
        card[lst[i]].innerHTML = ""
    }
    e.innerHTML = texts[num]; 
}

function mainFun(e, num){
    let output = document.getElementsByClassName("output")[0]
    let loader = document.createElement("div")
    output.innerHTML = ""
    loader.classList.add("loader")
    loader.style.display = "block"
    output.appendChild(loader)
    
    fetch(server_url, {
        method : "POST",
        body : JSON.stringify({num : num}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res=>{
        return res.json()
    }).then(value =>{
        let output = document.getElementsByClassName("output")[0]

        while(output.lastChild){
            output.removeChild(output.lastChild)
            break
        }
        switch(num){
            case 0:
                loader.style.display = "none"
                let fact = value.fact
                output.innerHTML = fact
                break;
            case 1:
                let image = document.createElement("img")
                image.classList.add("image")
                image.src = value.url
                output.appendChild(image)
                break;
            case 2:
                console.log(value)
                let data = "";
                let keys = Object.keys(value)
                for(let i =0 ; i<keys.length; i++){
                    data = keys[i] + " : " + value[keys[i]] + "&#10;"
                    let div = document.createElement("div")
                    div.innerHTML = data
                    output.appendChild(div)
                }

                break;
        }
    })
    
}


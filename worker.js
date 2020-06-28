const Deta = require('deta')

const  projectKey = document.getElementById('projectKey')
const  baseName = document.getElementById('baseName')
const  entryKey = document.getElementById('entryKey')

const getAll = document.getElementById('getAll')
const get = document.getElementById('get')
const deleteButton = document.getElementById('delete')
const put = document.getElementById('put')
const inputArea = document.getElementById('inputArea')
const inputText = document.getElementById('inputText')
const putConfirm = document.getElementById('putConfirm')
const addItem = document.getElementById('addItem')

const result = document.getElementById('resultText')
const tableDiv = document.getElementById('tableDiv')
const table = document.getElementById('dataTable')

var inputAreaVisibility = false;

put.addEventListener('click', ()=>{
    tableDiv.style.display = 'none'
    if(inputAreaVisibility==false){
        inputArea.style.display = 'block'
        put.innerText = 'Hide Input Area'
        inputAreaVisibility = true
        const div = document.createElement('div')
        div.style = 'display:flex; text-align:center; width:100%'
        
        const labelInput = document.createElement('input')
        labelInput.className = "input"
        labelInput.placeholder = "Enter Label"
        labelInput.style = "float:left; margin-right:5px; margin-bottom:5px; margin-left:auto;"
        
        const valueInput = document.createElement('input')
        valueInput.className = "input"
        valueInput.placeholder = "Enter Value"
        valueInput.style = "float:right; margin-left:5px; margin-bottom:5px; margin-right:auto;"

        div.appendChild(labelInput)
        div.appendChild(valueInput)
        inputText.appendChild(div)

    }else if(inputAreaVisibility){
        inputArea.style.display = 'none'
        put.innerText = 'Put Data'
        inputAreaVisibility = false
        inputText.innerHTML = ''
        result.innerText = ''
    }
})

addItem.addEventListener('click',()=>{
    const div = document.createElement('div')
    div.style = 'display:flex; text-align:center; width:100%'
    
    const labelInput = document.createElement('input')
    labelInput.className = "input"
    labelInput.placeholder = "Enter Label"
    labelInput.style = "float:left; margin-right:5px; margin-bottom:5px; margin-left:auto;"
    
    const valueInput = document.createElement('input')
    valueInput.className = "input"
    valueInput.placeholder = "Enter Value"
    valueInput.style = "float:right; margin-left:5px; margin-bottom:5px; margin-right:auto;"

    div.appendChild(labelInput)
    div.appendChild(valueInput)
    inputText.appendChild(div)
})

async function writeFunction(projectKey,baseName,inputText){
    console.log(projectKey.value)
    console.log(baseName.value)
    tableDiv.style.display = 'none'
    if(projectKey.value==='' || baseName.value===''){
        result.innerText = 'Enter valid Project Key and Base Name'

    }else{
        result.innerText = 'Writing ...'
        inputArea.style.display = 'none'
        inputAreaVisibility = false
        put.innerText = 'Put Data'

        const deta = Deta(projectKey.value)
        const db = deta.Base(baseName.value)
        // console.log(inputText.children[0].children[0].value)
        let data = {}
        for (let i=0; i<inputText.childElementCount; i++){
            data[`${inputText.children[i].children[0].value}`] = `${inputText.children[i].children[1].value}`
        }
        console.log(data)
        const resultPromise = await db.put(data)
        if(resultPromise!=null){
            result.innerText = 'Succesfully Wrote!'
        }
        inputText.innerHTML = ''
        
    }

    

}

async function getAllFunction(projectKey,baseName){
    tableDiv.style.display = 'none'
    if(projectKey.value==='' || baseName.value===''){
        result.innerText = 'Enter valid Project Key and Base Name'
        tableDiv.style.display = 'none'
    }else{

        result.innerText = 'Collecting Base...'
        const deta = Deta(projectKey.value)
        const db = deta.Base(baseName.value)

        const everything = await db.fetch().next()
        console.log('going to print everything')
        console.log( JSON.stringify(everything['value'][0]) )
        if(everything===null){
            result.innerText = 'There are no entries in this Base!'
        }else{
            result.innerText = ''
            tableDiv.style.display = 'block'
            
            console.log('loopil keran ponu')
            var i =1
            for (var x=table.rows.length-1; x>0; x--) {
                table.deleteRow(x);
            }
            everything['value'].forEach(element => {
                console.log(element)
                
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
                
                var indexCell = row.insertCell(0)
                indexCell.innerText = i

                var dataCell = row.insertCell(1)
                dataCell.innerText = JSON.stringify(element,undefined,4)

                i+=1
            });       
        }
    }
}

async function getFunction(projectKey,baseName,entryKey){
    tableDiv.style.display = 'none'
    if((projectKey.value==='' || baseName.value==='') && entryKey.value===''){
        result.innerText = 'Enter valid Project Key and Base Name'
        tableDiv.style.display = 'none'
    }
    else if((projectKey.value==='' || baseName.value==='') && entryKey.value!=''){
        result.innerText = 'Enter Project Key and Base Name'
        tableDiv.style.display = 'none'
    }
    else if(entryKey.value===''){
        result.innerText = 'Invalid Key, Try Again!'
        tableDiv.style.display = 'none'
    }else{
        result.innerText = 'Collecting Entry...'
        const deta = Deta(projectKey.value)
        const db = deta.Base(baseName.value)
        const entry = await db.get(entryKey.value)
        if(entry===null){
            result.innerText = 'Sorry, there is no record with this key!'
        }else{
            tableDiv.style.display = 'block'
            //result.innerText = JSON.stringify(entry,undefined,4)
            result.innerText =''
            for (var x=table.rows.length-1; x>0; x--) {
                table.deleteRow(x);
            }
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            
            var indexCell = row.insertCell(0)
            indexCell.innerText = 1

            var dataCell = row.insertCell(1)
            dataCell.innerText = JSON.stringify(entry,undefined,4)
        }
    }
}

async function deleteFunction(projectKey,baseName,entryKey){

    tableDiv.style.display = 'none'

    if(projectKey.value==='' && baseName.value==='' && entryKey.value===''){
        result.innerText = 'Enter valid Project Key and Base Name'
    }
    else if((projectKey.value==='' || baseName.value==='') && entryKey.value===''){
        result.innerText = 'Enter valid Project Key and Base Name'
        tableDiv.style.display = 'none'
    }
    else if((projectKey.value==='' || baseName.value==='') && entryKey.value!=''){
        result.innerText = 'Enter Project Key and Base Name'
        tableDiv.style.display = 'none'
    }
    else if(entryKey.value===''){
        result.innerText = 'Invalid Key, Try Again!'
        tableDiv.style.display = 'none'
    }
    else{
        result.innerText = 'Deleting Entry...'
        const deta = Deta(projectKey.value)
        const db = deta.Base(baseName.value)
        const deleted = await db.delete(entryKey.value)
        if(deleted===null){
            result.innerText = 'The entry was deleted!'
        }
    }
}

get.addEventListener('click', async ()=>{
    
    getFunction(projectKey,baseName,entryKey)
})

deleteButton.addEventListener('click',()=>{
    console.log(`Project Key is ${projectKey.value}`)
    console.log(`Base Name is ${baseName.value}`)
    console.log(`Entry Key is ${entryKey.value}`)

    deleteFunction(projectKey,baseName,entryKey)
})

getAll.addEventListener('click',()=>{
    console.log(`Project Key is ${projectKey.value}`)
    console.log(`Base Name is ${baseName.value}`)
    console.log(`Entry Key is ${entryKey.value}`)

    getAllFunction(projectKey,baseName)
})

putConfirm.addEventListener('click',()=>{
    writeFunction(projectKey,baseName,inputText)
})
import React, {Fragment} from "react";
import ReactDOM  from 'react-dom'
import Dir from './Dir'
import Terminal from './componentes/Terminal'

const storageKey = "SOFiles"
const root = new Dir("root")
let ponteiro = root //Ponteiro

const lerJson = () => JSON.parse(localStorage.getItem(storageKey))
const salvarJson = json => localStorage.setItem(storageKey, JSON.stringify(json))

//Verifica arquivos que já existem
if(!lerJson())
    localStorage.setItem(storageKey, JSON.stringify(root))

const main = code => {
    const [comando, param, param2] = code.split(" ")

    if(!comando)
        return alert("Comando não encontrado")

    switch (comando) {
        case "dirroot":
            console.log(lerJson())
            break;

        case "dir":
            console.log(ponteiro)
            break;

        case "mkdir":
            if(!param)
                return alert("Parametro não encontrado")

            ponteiro.mkdir(param)
            break;

        case "rmdir":
            if(!param)
                return alert("Parametro não encontrado")

            ponteiro.rmdir(param)
            break;

        case "cd":
            if(!param)
                return alert("Parametro não encontrado")

            ponteiro = ponteiro.cd(param)
            break;

        case "mvdir":
            if(!param || !param2)
                return alert("Parametro não encontrado")

            ponteiro.mvdir(param, param2)
            break;
            
        case "touch":
            if(!param)
                return alert("Parametro não encontrado")

            ponteiro.touch(param)
            break; 

        case "rm":
            if(!param)
                return alert("Parametro não encontrado")

            ponteiro.rm(param)
            break; 

        case "echo":
            if(!param || !param2)
                return alert("Parametro não encontrado")

            ponteiro.echo(param, param2)
            break;

        case "cat":
            if(!param)
                return alert("Parametro não encontrado")

            ponteiro.cat(param)
            break; 

        case "cp":
            if(!param || !param2)
                return alert("Parametro não encontrado")

            ponteiro.cp(param, param2)
            break; 

        case "mv":
            if(!param || !param2)
                return alert("Parametro não encontrado")

            ponteiro.mv(param, param2)
            break;
    
        default:
            alert("Comando não encontrado")
            break;
    }
    // console.log(root)
    salvarJson(root)
}

ReactDOM.render(
    <Fragment>
        <Terminal callBackSubmit={main}/>
    </Fragment>,
    document.getElementById('root')
)

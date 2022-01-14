import File from './File'

export default class Dir {
    #parent

    constructor(nome, parent = {}, dirs = [], files = []){
        this.nome = nome 
        this.dirs = []   
        this.files = []
        
        this.#parent = parent
    }

    findDir(nome){
        if(nome == "..")
            return [this.#parent, 0]

        const childIndex = this.dirs.findIndex(d => d.nome == nome)

        if(childIndex == -1) {
            alert("O Diretorio não foi encontrado")
            return [false, 0]
        }

        return [this.dirs[childIndex], childIndex]
    }

    findFile(nome){
        const childIndex = this.files.findIndex(d => d.nome == nome)

        if(childIndex == -1) {
            alert("O Arquivo não foi encontrado")
            return [false, 0]
        }

        return [this.files[childIndex], childIndex]
    }

    mkdir(nome) {
        this.dirs.push(new Dir(nome, this))
    }

    rmdir(nome) {
        const [child, childIndex] = this.findDir(nome)
        if(child == false)
            return

        const hasChild = parseInt(child.dirs.length) + parseInt(child.files.length) != 0

        if(hasChild) return alert("O Diretorio precisa estar vazio para ser removido")

        this.dirs.splice(childIndex, 1)
    }

    cd(nome) {
        const [child] = this.findDir(nome)
        if(child == false)
            return this

        return child
    }

    mvdir(nome, novoNome) {
        const [child, childIndex] = this.findDir(nome)
        if(child == false)
            return

        child.nome = novoNome
    }

    touch(nome) {
        this.files.push(new File(nome))
    }

    rm(nome) {
        const [child, childIndex] = this.findFile(nome)
        if(child == false)
            return

        this.files.splice(childIndex, 1)
    }

    echo(conteudo, nome) {
        const [child, childIndex] = this.findFile(nome)
        if(child == false)
            return

        child.conteudo = conteudo
    }

    cat(nome) {
        const [child, childIndex] = this.findFile(nome)
        if(child == false)
            return

        console.log(child.conteudo)
    }

    cp(nome, novoArquivo) {
        const [child, childIndex] = this.findFile(nome)
        if(child == false)
            return

        this.files.push(new File(novoArquivo, child.conteudo))
    }

    mv(nome, novoNome) {
        const [child, childIndex] = this.findFile(nome)
        if(child == false)
            return

        child.nome = novoNome
    }
}
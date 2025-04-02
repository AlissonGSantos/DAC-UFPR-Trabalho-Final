const cepMask = (cep:string) => {
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export default cepMask
package utils.dto

data class ClienteOutputDTO (
  val codigo: Long,
  val cpf: String,
  val nome: String,
  val email:String,
  val saldo_milhas: Float,
  val endereco: EnderecoDTO
)
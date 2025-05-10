package utils.dto

data class RabbitMessageDTO<T>(
    val success: Boolean,
    val data: T?,
    val message: String?,
    val exception: String?
) {
    constructor(sucess: Boolean, data: T) : this(sucess, data, null, null)
    constructor(sucess: Boolean, message: String?) : this(sucess, null, message, null)
    constructor(sucess: Boolean, message: String?, exception: String) : this(sucess, null, message, exception)
}

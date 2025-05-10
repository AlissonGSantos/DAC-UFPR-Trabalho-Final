package br.ufpr.dac.autenticacao_service

import br.ufpr.dac.autenticacao_service.domain.User
import utils.dto.UsuarioRole
import br.ufpr.dac.autenticacao_service.repository.IAuthRepository
import br.ufpr.dac.autenticacao_service.utils.PasswordService
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@EnableMongoRepositories(basePackageClasses = [IAuthRepository::class])
@Configuration
class MongoConfig {

    @Bean
    fun commandLineRunner(repository: IAuthRepository, passwordService: PasswordService) : CommandLineRunner {
        return CommandLineRunner {
            repository.save(User("func_pre@gmail.com", 1L,
                "${passwordService.hashPassword("TADS", "12334")}:12334", UsuarioRole.FUNCIONARIO))
            repository.save(User("cliente1@example.com", 1L,
                "${passwordService.hashPassword("TADS", "25302")}:25302", UsuarioRole.CLIENTE))
            repository.save(User("cliente3@example.com", 3L,
                "${passwordService.hashPassword("TADS", "43096")}:43096", UsuarioRole.CLIENTE))
        }
    }
}
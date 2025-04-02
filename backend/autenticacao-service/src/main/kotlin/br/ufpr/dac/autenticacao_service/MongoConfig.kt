package br.ufpr.dac.autenticacao_service

import br.ufpr.dac.autenticacao_service.domain.User
import br.ufpr.dac.autenticacao_service.domain.UserRole
import br.ufpr.dac.autenticacao_service.repository.IAuthRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@EnableMongoRepositories(basePackageClasses = [IAuthRepository::class])
@Configuration
class MongoConfig {

    @Bean
    fun commandLineRunner(repository: IAuthRepository) : CommandLineRunner {
        return CommandLineRunner {
            repository.save(User("func_pre@gmail.com", "TADS", UserRole.FUNCIONARIO))
            repository.save(User("cli_pre@gmail.com", "TADS", UserRole.CLIENTE))
        }
    }
}
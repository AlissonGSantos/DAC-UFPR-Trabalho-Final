package br.ufpr.dac.saga_orchestration_service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SagaOrchestrationServiceApplication

fun main(args: Array<String>) {
	runApplication<SagaOrchestrationServiceApplication>(*args)
}

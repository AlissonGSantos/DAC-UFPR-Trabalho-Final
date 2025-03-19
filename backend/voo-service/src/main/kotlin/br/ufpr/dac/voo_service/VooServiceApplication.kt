package br.ufpr.dac.voo_service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class VooServiceApplication

fun main(args: Array<String>) {
	runApplication<VooServiceApplication>(*args)
}

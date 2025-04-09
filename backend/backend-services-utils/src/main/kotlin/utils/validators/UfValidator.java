package utils.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class UfValidator implements ConstraintValidator<Uf, String> {

    @Override
    public boolean isValid(String uf, ConstraintValidatorContext constraintValidatorContext) {

        List<String> ufsValidas = List.of("AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
                "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
                "SP", "SE", "TO");

        return ufsValidas.contains(uf.toUpperCase());
    }
}

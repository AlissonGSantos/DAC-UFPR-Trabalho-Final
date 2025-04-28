package utils.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(
        validatedBy = {SomenteNumerosValidator.class}
)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface SomenteNumeros {
    String message() default "Valor número no formato inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

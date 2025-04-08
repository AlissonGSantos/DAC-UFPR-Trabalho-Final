package utils.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(
        validatedBy = {UfValidator.class}
)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Uf {
    String message() default "A UF informada é inválida";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

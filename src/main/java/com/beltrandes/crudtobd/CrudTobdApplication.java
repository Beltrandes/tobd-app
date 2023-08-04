package com.beltrandes.crudtobd;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.beltrandes.crudtobd.models.Bill;
import com.beltrandes.crudtobd.models.Diary;
import com.beltrandes.crudtobd.models.Task;
import com.beltrandes.crudtobd.repository.BillRepository;
import com.beltrandes.crudtobd.repository.DiaryRepository;
import com.beltrandes.crudtobd.repository.TaskRepository;

@SpringBootApplication
public class CrudTobdApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudTobdApplication.class, args);
    }

    @Bean
    CommandLineRunner initTaskDatabase(TaskRepository taskRepository) {
        return args -> {
            taskRepository.deleteAll();
            Task a = new Task();
            a.setDescription("Impedir que a variável da data do Diary seja modificada quando o usuário editar o Diary.");
            a.setCategory("Studies");

            Task b = new Task();
            b.setDescription("Corrigir bug visual no Diary quando são inseridos 50 caracteres na description.");
            b.setCategory("Work");

            Task c = new Task();
            c.setDescription("Achar uma forma de quando uma Bill for paga, o balance atualize no mesmo instante, ou recarregar a pagina pra mudança acontecer.");
            c.setCategory("Home");

            taskRepository.save(a);
            taskRepository.save(b);
            taskRepository.save(c);

        };
    }

    @Bean
    CommandLineRunner initBillDatabase(BillRepository billRepository) {
        return args -> {
            billRepository.deleteAll();

            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            Bill a = new Bill();
            a.setDescription("Pagar o Hermes");
            a.setAmount(1050.00);
            a.setDueDate(LocalDate.of(2024, 12, 10).format(dateFormatter)); // Format date as a string
            a.setCategory("Rent");
            a.setStatus("Pending");

            Bill b = new Bill();
            b.setDescription("Pagar o Condomínio");
            b.setAmount(528.19);
            b.setDueDate(LocalDate.of(2023, 07, 07).format(dateFormatter)); // Format date as a string
            b.setCategory("Condominium");
            b.setStatus("Paid");

            Bill c = new Bill();
            c.setDescription("Pagar a Claro");
            c.setAmount(69.39);
            c.setDueDate(LocalDate.of(2023, 06, 15).format(dateFormatter)); // Format date as a string
            c.setCategory("Internet");
            c.setStatus("Late");

            billRepository.save(a);
            billRepository.save(b);
            billRepository.save(c);

        };
    }

    @Bean
    CommandLineRunner initDiaryDatabase(DiaryRepository diaryRepository) {
        return args -> {
            diaryRepository.deleteAll();

            Diary a = new Diary();
            a.setDescription("Dia cansativo mas produtivo");
            a.setDate(new Date());
            a.setText(
                    "Hoje foi um dia cansativo, mas incrivelmente produtivo. Acordei cedo e mergulhei em diversas tarefas no trabalho. A pressão era alta, mas consegui me concentrar e produzir resultados significativos. Sinto-me exausto, mas com a sensação de dever cumprido. Agora, é hora de descansar e recarregar as energias para amanhã.");
            a.setStatus("Unmarked");

            Diary b = new Diary();
            b.setDescription("Longa caminhada e exame médico");
            b.setDate(new Date());
            b.setText(
                    "Realizei uma longa caminhada pela manhã, aproveitando a beleza da natureza ao meu redor. Depois, passei por um exame médico de rotina, que correu bem. Estou grato por estar cuidando da minha saúde. O dia foi tranquilo, permitindo que eu me conectasse comigo mesmo e refletisse sobre o que é realmente importante na vida.");
            b.setStatus("Unmarked");

            Diary c = new Diary();
            c.setDescription("Entrevista de emprego e academia");
            c.setDate(new Date());
            c.setText(
                    "Hoje foi um dia cheio de oportunidades. Pela manhã, participei de uma entrevista de emprego que me deixou animado com as possibilidades. Sinto que dei o meu melhor e estou esperançoso. Em seguida, fui à academia, onde me exercitei intensamente. O exercício físico me ajudou a liberar o estresse e me sentir revigorado. Estou confiante em relação ao futuro e grato por todas as experiências que tive hoje.");
            c.setStatus("Marked");

            diaryRepository.save(a);
            diaryRepository.save(b);
            diaryRepository.save(c);

        };
    }

}

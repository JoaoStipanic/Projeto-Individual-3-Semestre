package individual.projeto.back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/pokemons")
public class PokemonController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/listar")
    public ResponseEntity<List<Pokemon>> listar() {
        String sql = """
                SELECT idPokemon, nome, tipo1, tipo2, corPredominante, habitat, faseEvolucao, geracao FROM pokemon
                """;

        try {
            List<Pokemon> lista = jdbcTemplate
                    .query(sql, new BeanPropertyRowMapper<>(Pokemon.class));

            if (lista.isEmpty()) {
                return ResponseEntity.status(204).build();
            }

            return ResponseEntity.status(200).body(lista);

        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping
    public ResponseEntity<Pokemon> cadastrar(@RequestBody Pokemon pokemon) {
        String sql = """
                INSERT INTO pokemon  (nome, tipo1, tipo2, corPredominante, habitat, faseEvolucao, geracao) VALUES
                    (?, ?, ?, ?, ?, ?, ?)
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps  = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                ps.setString(1, pokemon.getNome());
                ps.setString(2, pokemon.getTipo1());
                ps.setString(3, pokemon.getTipo2());
                ps.setString(4, pokemon.getCorPredominante());
                ps.setString(5, pokemon.getHabitat());
                ps.setString(6, pokemon.getFaseEvolucao());
                ps.setInt(7, pokemon.getGeracao());

                return ps;
            }, keyHolder);

            Integer idGerado = keyHolder.getKey().intValue();
            pokemon.setId(idGerado);

            return ResponseEntity.status(201).body(pokemon);

        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}

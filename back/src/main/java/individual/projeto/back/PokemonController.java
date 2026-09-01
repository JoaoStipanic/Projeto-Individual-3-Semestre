package individual.projeto.back;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/pokemons")
public class PokemonController {
    private final JdbcTemplate jdbcTemplate;

    public PokemonController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<List<PokemonResposta>> listar() {
        String sql = """
                SELECT
                    p.idPokemon,
                    p.nome,
                    STRING_AGG(t.nome, '/') AS tipos,
                    p.corPredominante,
                    p.habitat,
                    p.faseEvolucao,
                    p.geracao
                FROM pokemon p
                    LEFT JOIN pokemonTipo pt
                        ON p.idPokemon = pt.idPokemon
                    LEFT JOIN tipo t
                        ON pt.idTipo = t.idTipo
                GROUP BY
                    p.idPokemon,
                    p.nome,
                    p.corPredominante,
                    p.habitat,
                    p.faseEvolucao,
                    p.geracao
                ORDER BY p.idPokemon
                """;

        List<PokemonResposta> lista = jdbcTemplate
                    .query(sql, new BeanPropertyRowMapper<>(PokemonResposta.class));

        if (lista.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(lista);
    }

    @Transactional
    @PostMapping
    public ResponseEntity<Pokemon> cadastrar(@RequestBody Map<String, Object> dados) {
        String sqlPokemon = """
                INSERT INTO pokemon (nome, corPredominante, habitat, faseEvolucao, geracao) VALUES
                    (?, ?, ?, ?, ?)
                """;

        String sqlPokemonTipo = """
                INSERT INTO pokemonTipo (idPokemon, idTipo) VALUES
                    (?, ?)
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            String nome = (String) dados.get("nome");
            String corPredominante = (String) dados.get("corPredominante");
            String habitat = (String) dados.get("habitat");
            String faseEvolucao = (String) dados.get("faseEvolucao");
            String geracao = (String) dados.get("geracao");

            Integer tipo1 = ((Number) dados.get("tipo1")).intValue();

            // Cadastra o Pokémon
            jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(sqlPokemon, Statement.RETURN_GENERATED_KEYS);

                ps.setString(1, nome);
                ps.setString(2, corPredominante);
                ps.setString(3, habitat);
                ps.setString(4, faseEvolucao);
                ps.setString(5, geracao);

                return ps;
            }, keyHolder);

            Integer idPokemon = keyHolder.getKey().intValue();

            // Associação com o tipo 1
            jdbcTemplate.update(sqlPokemonTipo,
                    idPokemon,
                    tipo1
            );

            // Associação com o tipo 2
            if (dados.get("tipo2") != null) {
                jdbcTemplate.update(sqlPokemonTipo,
                        idPokemon,
                        ((Number) dados.get("tipo2")).intValue()
                );
            }

            // Cria o objeto Pokemon para retornar
            Pokemon pokemon = new Pokemon();

            pokemon.setIdPokemon(idPokemon);
            pokemon.setNome(nome);
            pokemon.setCorPredominante(corPredominante);
            pokemon.setHabitat(habitat);
            pokemon.setFaseEvolucao(faseEvolucao);
            pokemon.setGeracao(geracao);

            return ResponseEntity.status(201).body(pokemon);

        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).build();
        }
    }
}

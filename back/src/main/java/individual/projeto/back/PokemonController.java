package individual.projeto.back;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<Pokemon>> listar() {
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

        List<Pokemon> lista = jdbcTemplate
                    .query(sql, new BeanPropertyRowMapper<>(Pokemon.class));

        if (lista.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(lista);
    }

//    @PostMapping
//    public ResponseEntity<Pokemon> cadastrar(@RequestBody Pokemon pokemon) {
//        String sql = """
//                INSERT INTO pokemon (nome, corPredominante, habitat, faseEvolucao, geracao) VALUES
//                    (?, ?, ?, ?, ?);
//
//                INSERT INTO pokemonTipo (idPokemon, idTipo)
//                """;
//
//        KeyHolder keyHolder = new GeneratedKeyHolder();
//
//        try {
//            jdbcTemplate.update(connection -> {
//                PreparedStatement ps  = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
//
//                ps.setString(1, pokemon.getNome());
//                ps.setString(4, pokemon.getCorPredominante());
//                ps.setString(5, pokemon.getHabitat());
//                ps.setString(6, pokemon.getFaseEvolucao());
//                ps.setInt(7, pokemon.getGeracao());
//
//                return ps;
//            }, keyHolder);
//
//            Integer idGerado = keyHolder.getKey().intValue();
//            pokemon.setIdPokemon(idGerado);
//
//            return ResponseEntity.status(201).body(pokemon);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//    }

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
            // Dados do Pokémon
            String nome = (String) dados.get("nome");
            String corPredominante = (String) dados.get("corPredominante");
            String habitat = (String) dados.get("habitat");
            String faseEvolucao = (String) dados.get("faseEvolucao");
            String geracao = (String) dados.get("geracao");

            // Tipos
            Integer tipo1 = ((Number) dados.get("tipo1")).intValue();
            Integer tipo2 = null;

            if (dados.get("tipo2") != null) {
                tipo2 = ((Number) dados.get("tipo2")).intValue();
            }

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

            // ID gerado pelo banco
            Integer idPokemon = keyHolder.getKey().intValue();

            // Associação com o tipo 1
            jdbcTemplate.update(sqlPokemonTipo,
                    idPokemon,
                    tipo1
            );

            // Associação com o tipo 2
            if (tipo2 != null) {
                jdbcTemplate.update(sqlPokemonTipo,
                        idPokemon,
                        tipo2
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

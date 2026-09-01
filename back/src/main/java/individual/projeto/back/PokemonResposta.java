package individual.projeto.back;

public class PokemonResposta {
    private Integer idPokemon;
    private String nome;
    private String tipos;
    private String corPredominante;
    private String habitat;
    private String faseEvolucao;
    private String geracao;

    public PokemonResposta() {}

    public PokemonResposta(Integer idPokemon, String nome, String tipos, String corPredominante, String habitat, String faseEvolucao, String geracao) {
        this.idPokemon = idPokemon;
        this.nome = nome;
        this.tipos = tipos;
        this.corPredominante = corPredominante;
        this.habitat = habitat;
        this.faseEvolucao = faseEvolucao;
        this.geracao = geracao;
    }

    public Integer getIdPokemon() {
        return idPokemon;
    }

    public void setIdPokemon(Integer idPokemon) {
        this.idPokemon = idPokemon;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipos() {
        return tipos;
    }

    public void setTipos(String tipos) {
        this.tipos = tipos;
    }

    public String getCorPredominante() {
        return corPredominante;
    }

    public void setCorPredominante(String corPredominante) {
        this.corPredominante = corPredominante;
    }

    public String getHabitat() {
        return habitat;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }

    public String getFaseEvolucao() {
        return faseEvolucao;
    }

    public void setFaseEvolucao(String faseEvolucao) {
        this.faseEvolucao = faseEvolucao;
    }

    public String getGeracao() {
        return geracao;
    }

    public void setGeracao(String geracao) {
        this.geracao = geracao;
    }
}

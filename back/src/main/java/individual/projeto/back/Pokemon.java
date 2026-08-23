package individual.projeto.back;

public class Pokemon {
    private Integer id;
    private String nome;
    private String tipo1;
    private String tipo2;
    private String corPredominante;
    private String habitat;
    private Integer faseEvolucao;
    private Integer geracao;

    public Pokemon() {}

    public Pokemon(Integer id, String nome, String tipo1, String tipo2, String corPredominante, String habitat, Integer faseEvolucao, Integer geracao) {
        this.id = id;
        this.nome = nome;
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.corPredominante = corPredominante;
        this.habitat = habitat;
        this.faseEvolucao = faseEvolucao;
        this.geracao = geracao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo1() {
        return tipo1;
    }

    public void setTipo1(String tipo1) {
        this.tipo1 = tipo1;
    }

    public String getTipo2() {
        return tipo2;
    }

    public void setTipo2(String tipo2) {
        this.tipo2 = tipo2;
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

    public Integer getFaseEvolucao() {
        return faseEvolucao;
    }

    public void setFaseEvolucao(Integer faseEvolucao) {
        this.faseEvolucao = faseEvolucao;
    }

    public Integer getGeracao() {
        return geracao;
    }

    public void setGeracao(Integer geracao) {
        this.geracao = geracao;
    }
}

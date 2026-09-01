package individual.projeto.back;

public class Tipo {
    private Integer idTipo;
    private String nome;
    private String forteContra;
    private String fracoContra;

    public Tipo() {
    }

    public Tipo(Integer idTipo, String nome, String forteContra, String fracoContra) {
        this.idTipo = idTipo;
        this.nome = nome;
        this.forteContra = forteContra;
        this.fracoContra = fracoContra;
    }

    public Integer getIdTipo() {
        return idTipo;
    }

    public void setIdTipo(Integer idTipo) {
        this.idTipo = idTipo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getForteContra() {
        return forteContra;
    }

    public void setForteContra(String forteContra) {
        this.forteContra = forteContra;
    }

    public String getFracoContra() {
        return fracoContra;
    }

    public void setFracoContra(String fracoContra) {
        this.fracoContra = fracoContra;
    }
}

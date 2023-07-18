# <p align="center">Lobo Adoção de animais</p>

Lobo, é um site que visa conectar pets e seus donos de forma facil e rapida. O projeto constitui um website que gerencia tanto os que realizam a adoção quanto os que querem adotar.<br>

## Tecnologia Utilizadas

* **Banco de Dados:** Google Firestore Database - v9.22.2
* **Linguagem BackEnd:** Google Firebase - v9.22.2 / Node - v20.2.5 / Eslint - 7.23.0 / React Firebase Hooks - v5.1.1 / Typescript - v5.0.4
* **Linguagem FrontEnd:** HTML5 / Bootstrap - v5.3 / Formik - v2.4.1 / Yup - v1.2.0 / Typescript - v5.0.4
* **Framework** Next.JS - v13.4.4 / React - v18.2.0

## Principais Funcionalidades

* Login
* Ver instituições
* Ver pets
* Gerenciar a Instituição
  * Cadastrar
  * Visualizar
  * Deletar
  * Editar
* Gerenciar pets
  * Cadastrar
  * Visualizar
  * Deletar
  * Editar
* Gerenciar adoções
  * Cadastrar
  * Visualizar
  * Deletar
  * Editar

## Público Alvo

Pessoas que desejam adotar animais

## Regras de Uso

* A pasta "Requisitos" apresenta o documento de requisitos do projeto, ademais o diagrama UML dos casos de uso.
* A pasta "Diagramas" apresenta os diagramas de Classe, Pacote e Sequência.
* A pasta "Protótipo de Interface" apresenta todos os PNGs de todas as interfaces do projeto.
* A pasta "Padrões Adotados" apresenta as regras de verificação/análise de requisitos.
* A pasta "src" apresenta os códigos do projeto.

### Regras de Commit

Preferencialmente ao commitar alguma funcionalidade do sistema deve-se fechar a issue correspondente da implementação.

Ao commitar utilize o padrão: git commit -m "closes #\<numero issue\>; \<MENSAGEM\>"
* Caso precise fechar mais de uma issue, basta separar as issues por vírgula.
* A mensagem é opcional, o que importa aqui é saber qual issue foi fechada.
* Ao fechar uma issue, procure ela no menu das issues e marque a opção "Pronto para Teste de Sistema" na aba "Projects" => "BackLog - Lobo adoção de animais" => "Status"

### Regras de Branch

O uso de braches é liberado.

### Boas Práticas de Programação

O grupo deve pelo menos seguir as 6 boas práticas de programação abaixo:

1. **Identar o código**: é um dos itens mais básicos e importantes para um programador, pois facilita a legibilidade e deixa o código mais bonito.
    1.  A identação deve ser feita por tabs.
2.  **Nomear variáveis de maneira intuitiva**: escrever nomes que não possuem sentido acaba por dificultar a legibilidade do código, além de prejudicar o trabalho em grupo, pelo fato de que as variáveis não são intuitivas.
    1.  Ao declarar a tag *name* nos *inputs* no front-end, tais declarações devem ter sentido e serem intuitivas para o back-end compreender mais facilmente como realizar os endpoints.
3.  **Usar o máximo de variáveis tipadas possível**: pelo projeto ser Typescript temos a opção de definir o tipo das variáveis, em alguns casos esse tipo pode ser oculto facilitando a legibilidade do codigo porem deve-se tentar ao maximo usar as variáveis tipadas para evitar bugs aumentar a eficiencia e a legibilidade do código.
    1.  O back-end deve respeitar essa boa prática.
5.  **Escreva um comando por linha**: por se tratar de um trabalho, o desempenho não é extremamente essencial, logo escrever um comando por linha, além de aumentar a legibilidade do código facilita o entendimento do código por estar descrito de uma maneira sequencial.
6.  **Use sempre virgula e ponto-e-virgula (, ;) quando possível**: tambem referente a um projeto typescript para facilitar a legibilidade de definição de variaveis ou funções ou parametros, usar sempre os separadores correspondentes.
    1.  O back-end deve respeitar essa boa prática.
7.  **Declare as variáveis sempre no início das funções**: útil para entendimento do que acontecerá na função logo de imediato.
    1.  No back-end, declarar uma variável do comando sql e escrever seu código de imediato, já adicionando parâmetros à ela se necessário, ou seja, não se deve montar o comando quando realizar a query/consulta.

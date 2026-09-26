# Planejador Inteligente de Férias

Aplicação web para planejamento e otimização de férias de trabalhadores regidos pela CLT no Brasil.

O objetivo do projeto é encontrar boas combinações de períodos de férias considerando regras trabalhistas, jornada de trabalho, finais de semana e feriados, buscando aumentar o número de dias consecutivos de descanso.

> Projeto em desenvolvimento.

---

## Objetivo

Permitir que o usuário informe dados como:

- quantidade de dias de férias disponíveis;
- períodos de férias já utilizados;
- data a partir da qual pode tirar férias;
- data limite para utilização;
- cidade e estado;
- jornada de trabalho;
- feriados aplicáveis.

A aplicação deverá analisar diferentes combinações e apresentar os períodos com melhor aproveitamento.

Exemplo:

```text
5 dias de férias
+
feriado
+
final de semana
=
10 dias consecutivos de descanso
```

---

## Funcionalidades planejadas

- [x] Regras básicas de fracionamento de férias
- [x] Geração de combinações de períodos
- [x] Utilitários para manipulação de datas
- [ ] Modelagem da jornada de trabalho
- [ ] Cadastro e identificação de feriados
- [ ] Geração do calendário de trabalho
- [ ] Validação das possíveis datas de início das férias
- [ ] Cálculo de blocos consecutivos de descanso
- [ ] Algoritmo de otimização dos períodos
- [ ] Interface completa para planejamento
- [ ] Comparação entre diferentes estratégias
- [ ] Suporte a banco de horas
- [ ] Suporte a feriados municipais
- [ ] Persistência dos planejamentos

---

## Tecnologias

- React
- TypeScript
- Vite
- Vitest

Outras tecnologias poderão ser adicionadas conforme o projeto evoluir.

---

## Arquitetura

O projeto busca manter as regras de negócio independentes da interface React.

```text
React
  │
  ▼
Vacation Optimizer
  │
  ├── regras
  ├── combinações
  ├── datas
  ├── jornada
  ├── feriados
  └── calendário
```

As regras relacionadas ao planejamento de férias ficam concentradas em:

```text
src/domain/vacation/
```

A interface React utiliza esse domínio para realizar os cálculos e apresentar os resultados.

---

## Estrutura inicial

```text
src/
├── components/
│   └── VacationForm.tsx
│
├── domain/
│   └── vacation/
│       ├── types.ts
│       ├── rules.ts
│       ├── rules.test.ts
│       ├── combinations.ts
│       ├── combinations.test.ts
│       ├── date.ts
│       ├── date.test.ts
│       └── optimizer.ts
│
├── App.tsx
└── main.tsx
```

Essa estrutura será expandida conforme novas funcionalidades forem implementadas.

---

## Executando o projeto

### Pré-requisitos

Tenha instalado:

- Node.js
- npm
- Git

Clone o repositório:

```bash
git clone https://github.com/jessicamartns/ferias-inteligentes.git
```

Entre na pasta:

```bash
cd ferias-inteligentes
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

---

## Testes

O projeto utiliza Vitest.

Para executar os testes em modo watch:

```bash
npm run test
```

Para executar os testes uma única vez:

```bash
npm run test:run
```

---

## Princípios do projeto

### Regras de negócio independentes do React

Os componentes da interface não devem implementar diretamente as regras de férias.

Em vez disso:

```ts
const plans = optimizeVacation(input)
```

A lógica fica concentrada no domínio.

---

### Cálculos determinísticos

Regras trabalhistas e cálculos de datas devem ser implementados de forma determinística e testável.

IA, caso seja adicionada futuramente, poderá ser utilizada para explicar os resultados, mas não deverá ser responsável pela validação das regras legais ou pelo cálculo principal.

---

### Testes automatizados

Cada regra relevante do domínio deve possuir testes automatizados.

O objetivo é garantir que alterações futuras não quebrem comportamentos que já foram validados.

---

## Roadmap

### Fase 1 — Motor de domínio

- [x] Regras de férias
- [x] Combinações
- [x] Datas
- [ ] Jornada de trabalho
- [ ] Feriados
- [ ] Calendário

### Fase 2 — Otimizador

- [ ] Geração de períodos possíveis
- [ ] Cálculo de dias de descanso
- [ ] Identificação de emendas
- [ ] Ranking das melhores combinações

### Fase 3 — Interface

- [ ] Formulário completo
- [ ] Calendário visual
- [ ] Apresentação dos melhores planos
- [ ] Comparação entre alternativas

### Fase 4 — Evoluções

- [ ] Banco de horas
- [ ] Persistência
- [ ] Autenticação
- [ ] Feriados municipais
- [ ] Compartilhamento de planejamento
- [ ] Integração com calendários

---

## Fluxo esperado

A aplicação deverá evoluir para um fluxo semelhante a:

```text
Usuário informa os dados
        │
        ▼
Validação das regras
        │
        ▼
Geração das divisões possíveis
        │
        ▼
Construção do calendário
        │
        ▼
Análise de feriados e folgas
        │
        ▼
Cálculo dos períodos de descanso
        │
        ▼
Otimização
        │
        ▼
Melhores planos
```

---

## Exemplo de resultado esperado

```text
Plano encontrado

Período 1
04/01/2027 até 08/01/2027

5 dias de férias
10 dias consecutivos de descanso

Período 2
29/03/2027 até 17/04/2027

20 dias de férias
24 dias consecutivos de descanso
```

Os valores acima são apenas exemplos de como os resultados poderão ser apresentados.

---

## Aviso

Este projeto tem finalidade de planejamento e apoio à organização de férias.

Os resultados não substituem validações junto ao empregador, departamento de RH, sindicato ou profissional especializado quando houver regras específicas, acordos coletivos, convenções coletivas ou situações particulares.

As regras trabalhistas utilizadas pelo sistema deverão ser mantidas atualizadas e acompanhadas de suas respectivas fontes.

---

## Status do projeto

Atualmente o projeto está na fase de construção do motor de domínio.

Já foram implementados:

- regras básicas de fracionamento;
- geração de combinações;
- utilitários de datas;
- testes automatizados dessas funcionalidades.

O próximo passo é implementar a modelagem da jornada de trabalho.

---

## Licença

A definir.
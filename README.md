<p align="center">
  <strong>Jesus Brez Me Pls</strong>
</p>

<p align="center">
  <em>Guild de World of Warcraft</em>
</p>

---

A guild **Jesus Brez Me Pls** está recrutando jogadores para a guild e para o core.

Somos um grupo de amigos que busca reviver a diversão de jogar online. Hoje, na maior parte dos jogos, a competitividade se tornou a norma — e muitas vezes há estresse e intriga onde deveria existir diversão e amizade. Se você procura um ambiente que respeita seu tempo, em que a vida real vem antes do jogo, será bem-vindo!

Estamos à procura de jogadores novos e veteranos. Estamos dispostos a ensinar e a ajudar a evoluir o personagem — e, o mais importante, a se divertir no processo. Nosso foco é matar boss, fazer dungeon, equipar, rir e se descontrair. AOTC, KSM, KSH e afins vêm de brinde.

Se o seu foco é jogar para se divertir, raidar uma vez por semana, fazer dungeons e delves em equipe, aprender junto sobre o jogo (mecânicas, classe, rotação) e fazer amigos no caminho, junte-se a nós pelo Discord (o convite está [no site](https://www.jesusbrezmepls.com)).

---

## Desenvolvimento

Pré-requisitos: Node.js instalado.

```bash
npm install
npm run watch   # compila TypeScript em modo watch (terminal 1)
npm run serve   # sobe servidor estático em http://localhost:3000 (terminal 2)
```

### Configuração (links, e-mail, nome)

Todos os valores que costumam mudar (link do Discord, endpoint do formulário, assunto do e-mail, nome da guilda) ficam **em um único lugar**: [`config.ts`](./config.ts).

Para alterar, edite `config.ts` e rode `npm run build` (ou deixe `npm run watch` rodando). O `config.js` gerado é carregado antes do `main.js`, expondo `window.APP_CONFIG`, e o DOM é hidratado em runtime via atributos `data-config="..."` no HTML.

Campos disponíveis:

| Campo | Para que serve |
|---|---|
| `guildName` | Nome da guilda (usado no assunto do e-mail). |
| `guildTagline` | Subtítulo da guilda (referência). |
| `discord.inviteUrl` | Link de convite do Discord (botão "Entrar no Discord"). |
| `form.submitUrl` | Endpoint do FormSubmit — **é aqui que você troca o e-mail que recebe o formulário**. Gere um novo endpoint em https://formsubmit.co/ com seu e-mail. |
| `form.subject` | Assunto do e-mail enviado pelo formulário. |

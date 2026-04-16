"use strict";
/**
 * Configuração global do site — FONTE ÚNICA DE VERDADE
 * ----------------------------------------------------
 * Edite APENAS este arquivo para alterar links, e-mail do formulário e nomes.
 * Depois rode `npm run build` (ou deixe `npm run watch` rodando em outro terminal)
 * para regenerar o `config.js` servido ao navegador.
 *
 * Como funciona: este script é carregado ANTES do `main.js` e expõe
 * `window.APP_CONFIG`. O `main.ts` aplica esses valores ao DOM em runtime,
 * procurando elementos com o atributo `data-config="..."`.
 *
 * Se você precisar adicionar um novo campo:
 *   1) Acrescente no objeto `APP_CONFIG` abaixo.
 *   2) Marque o(s) elemento(s) no HTML com `data-config="sua-chave"`.
 *   3) Trate essa chave em `hydrateConfig()` dentro de `main.ts`.
 */
window.APP_CONFIG = {
    guildName: 'Jesus Brez Me Pls',
    guildTagline: 'Guilda de World of Warcraft',
    discord: {
        inviteUrl: 'https://discord.gg/hvghudJE8y',
    },
    form: {
        submitUrl: 'https://formsubmit.co/1b4aa9ab860dfa9a0538cbed18716524',
        subject: 'Nova mensagem - Jesus Brez Me Pls',
    },
};

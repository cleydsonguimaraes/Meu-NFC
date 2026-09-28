# Mini Sites NFC — demonstração

Protótipo estático para apresentar páginas NFC à sua sócia. Há uma vitrine e dois clientes fictícios. Não requer npm, banco de dados ou domínio próprio. Cada página começa com atalhos para Wi-Fi, Pix, WhatsApp, avaliação no Google e Instagram. Depois mostra cardápio ou agendamento, serviços, galeria e informações.

## Estrutura

```text
mini-sites-nfc/
├── index.html                          # Vitrine dos modelos
├── assets/
│   ├── app.js                          # Renderiza qualquer cliente
│   └── style.css                       # Estilos compartilhados
├── clientes/
│   ├── barbearia-modelo/
│   │   ├── index.html                   # Casca da página
│   │   └── dados.js                     # Dados do cliente
│   └── confeitaria-modelo/
│       ├── index.html
│       └── dados.js
└── .nojekyll
```

## Abrir no VS Code

Abra a pasta `mini-sites-nfc` em **Arquivo → Abrir Pasta**. Para visualizar, você pode abrir `index.html` no navegador. Também pode executar `python -m http.server 8000` no terminal dessa pasta e abrir `http://localhost:8000/`. No Windows, se `python` não funcionar, tente `py -m http.server 8000`. Encerre com Ctrl+C.

## Criar outro cliente

1. Copie a pasta `clientes/barbearia-modelo` e renomeie para `clientes/nome-do-cliente` (sem espaços ou acentos).
2. Edite **somente** `clientes/nome-do-cliente/dados.js`: nome, serviços, horários, links, Wi-Fi, Pix e cores.
3. Para logo, salve a imagem em `assets/imagens/` e defina `logo: "../../assets/imagens/arquivo.png"`.
4. Acrescente um card na vitrine `index.html`, se quiser exibir o novo modelo. A página do cliente funciona mesmo sem aparecer na vitrine.
5. Teste `http://localhost:8000/clientes/nome-do-cliente/`.

O WhatsApp deve conter país + DDD + número, apenas dígitos, como `5511999999999`. Sem dados reais, os botões de links aparecem desativados. Use URLs completas começando por `https://` para Instagram, Maps e avaliação.

Em `tipo`, use `"cardapio"` para destacar **Ver cardápio** e **Fazer pedido**, ou `"servicos"` para destacar **Agendar horário** e **Ver serviços**. O campo `agendamento` aceita a URL de um sistema de reservas; se ficar vazio, o botão usa o WhatsApp. Edite `servicos` para itens do cardápio ou serviços e `galeria` para fotos. Para uma foto local, coloque o arquivo em `assets/imagens/` e use `imagem: "../../assets/imagens/foto.jpg"` no item da galeria. Sem foto, aparece um quadro ilustrativo com o `simbolo`.

Os botões **Wi-Fi** e **Pix** abrem painéis com dados para copiar. Preencha `wifi: { ssid: "Rede de visitantes", senha: "..." }` e `pix: { recebedor: "Nome", chave: "...", copiaCola: "", qrImagem: "" }`. Se houver `copiaCola`, ele tem prioridade sobre `chave`. `qrImagem` pode apontar para um QR Pix estático fornecido pelo estabelecimento. Confira recebedor e chave antes de publicar. Uma página web não conecta automaticamente ao Wi-Fi nem executa pagamentos. A senha colocada em `dados.js` ficará pública: use apenas uma **rede de visitantes**, nunca a senha da rede interna. Não coloque chaves de API ou dados privados no repositório público.

## GitHub Pages

Crie um repositório **público** chamado, por exemplo, `mini-sites-nfc`. Dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Criar prototipo de mini sites NFC"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/mini-sites-nfc.git
git push -u origin main
```

No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → main → /(root) → Save**. O endereço normalmente será `https://SEU_USUARIO.github.io/mini-sites-nfc/` e cada cliente terá um caminho, como `https://SEU_USUARIO.github.io/mini-sites-nfc/clientes/barbearia-modelo/`. Aguarde a publicação e confira o endereço exibido em Settings → Pages.

Para atualizar: `git add .`, `git commit -m "Atualizar mini site"`, `git push`.

## Antes de vender

GitHub Pages funciona bem para este protótipo estático, mas suas regras de uso não permitem utilizá-lo como hospedagem gratuita de um negócio online ou de SaaS. Para hospedar o serviço comercial dos clientes, escolha uma hospedagem com termos adequados. Como o link gravado no NFC deve continuar válido, só grave as tags após escolher o endereço definitivo.

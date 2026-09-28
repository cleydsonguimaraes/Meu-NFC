(() => {
  const data = window.CLIENTE;
  const root = document.getElementById("app");
  if (!root || !data) {
    if (root) root.textContent = "Não foi possível carregar os dados desta página.";
    return;
  }

  // Cria elementos e usa textContent para que textos do cliente não virem HTML.
  const el = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value != null) node.textContent = String(value);
    return node;
  };
  const add = (parent, ...children) => { children.forEach(child => parent.append(child)); return parent; };
  const safeUrl = value => {
    try {
      const url = new URL(value);
      return ["https:", "mailto:", "tel:"].includes(url.protocol) ? url.href : "";
    } catch { return ""; }
  };
  const link = (label, url, cls) => {
    const href = safeUrl(url);
    const node = el(href ? "a" : "span", cls + (href ? "" : " is-disabled"), label);
    if (href) { node.href = href; if (href.startsWith("https:")) { node.target = "_blank"; node.rel = "noopener noreferrer"; } }
    else node.title = "Link disponível após configurar os dados do cliente";
    return node;
  };
  const anchor = (label, href, cls) => {
    const node = el("a", cls, label); node.href = href; return node;
  };
  const imagePath = value => {
    if (!value || typeof value !== "string") return "";
    if (/^https:\/\//i.test(value)) return safeUrl(value);
    return !value.includes(":") && !value.startsWith("//") ? value : "";
  };
  const color = /^#[0-9a-fA-F]{6}$/.test(data.cor) ? data.cor : "#c39a62";
  const background = /^#[0-9a-fA-F]{6}$/.test(data.fundo) ? data.fundo : "#151b29";
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty("--dark", background);
  document.title = `${data.nome || "Mini site"} | Contato`;
  const phone = String(data.whatsapp || "").replace(/\D/g, "");
  const whatsapp = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(data.mensagem || "Olá!")}` : "";

  const shell = el("div", "client-shell");
  const top = el("header", "client-top");
  const back = el("a", "back-link", "← Ver outros modelos"); back.href = "../../";
  add(top, back, el("span", "demo-badge", "DEMONSTRAÇÃO"));
  const hero = el("section", "client-hero compact-hero");
  const identity = el("div", "identity");
  if (imagePath(data.logo)) {
    const img = el("img", "client-logo"); img.src = imagePath(data.logo); img.alt = `Logo de ${data.nome || "cliente"}`; add(identity, img);
  } else add(identity, el("div", "client-logo initials", data.iniciais || "✦"));
  add(hero, identity, el("p", "client-category", data.categoria), el("h1", "", data.nome), el("p", "client-description", data.descricao));
  const content = el("main", "client-content");
  const quick = el("section", "quick-panel");
  add(quick, el("p", "eyebrow", "ACESSO RÁPIDO"), el("h2", "", "O que você precisa agora?"));
  const quickGrid = el("div", "quick-grid");
  const wifiButton = el("button", "quick-tile"); wifiButton.type = "button";
  add(wifiButton, el("span", "quick-icon", "⌁"), el("span", "", "Wi-Fi"));
  const pixButton = el("button", "quick-tile"); pixButton.type = "button";
  add(pixButton, el("span", "quick-icon", "◇"), el("span", "", "Pix"));
  const quickLink = (icon, label, url) => {
    const node = link("", url, "quick-tile");
    const iconNode = icon === "google" ? el("img", "quick-icon") : el("span", "quick-icon", icon);
    if (icon === "google") {
      iconNode.src = "../../assets/google.svg";
      iconNode.alt = ""; // O texto do botão já informa o destino.
    }
    add(node, iconNode, el("span", "", label)); return node;
  };
  add(quickGrid, wifiButton, pixButton, quickLink("↗", "WhatsApp", whatsapp),
    quickLink("google", "Avaliar no Google", data.avaliar), quickLink("◎", "Instagram", data.instagram));
  add(quick, quickGrid, el("p", "quick-hint", "Wi-Fi e Pix mostram dados para copiar. Links sem cadastro ficam desativados nesta demonstração."));
  add(content, quick);
  const intro = el("section", "intro-panel");
  add(intro, el("span", "eyebrow", data.tipo === "cardapio" ? "NOSSO CARDÁPIO" : "NOSSOS SERVIÇOS"), el("h2", "", data.destaque));
  const introActions = el("div", "intro-actions");
  if (data.tipo === "cardapio") add(introActions, anchor("Ver cardápio ↓", "#ofertas", "button action-primary"), link("Fazer pedido ↗", whatsapp, "button intro-outline"));
  else add(introActions, link("Agendar horário ↗", safeUrl(data.agendamento) || whatsapp, "button action-primary"), anchor("Ver serviços ↓", "#ofertas", "button intro-outline"));
  add(intro, introActions);
  add(content, intro);
  if (Array.isArray(data.servicos) && data.servicos.length) {
    const section = el("section", "client-section"); section.id = "ofertas";
    add(section, el("p", "eyebrow", data.tipo === "cardapio" ? "ESCOLHA SEU FAVORITO" : "ESCOLHA SEU SERVIÇO"), el("h2", "", data.tipo === "cardapio" ? "Cardápio" : "Serviços"));
    const list = el("div", "service-list");
    data.servicos.forEach(item => {
      const card = el("article", "service-card");
      const main = el("div"); add(main, el("h3", "", item.nome), el("p", "", item.descricao));
      add(card, main, el("span", "price", item.preco)); add(list, card);
    });
    add(section, list); add(content, section);
  }
  if (Array.isArray(data.galeria) && data.galeria.length) {
    const section = el("section", "client-section gallery-section");
    add(section, el("p", "eyebrow", "CONHEÇA MAIS"), el("h2", "", "Um pouco do nosso trabalho"));
    const gallery = el("div", "gallery-grid");
    data.galeria.forEach((item, index) => {
      const figure = el("figure", "gallery-card gallery-tone-" + index % 3);
      const src = imagePath(item.imagem);
      if (src) {
        const img = el("img", "gallery-image"); img.src = src; img.alt = item.alt || item.legenda || "Foto do serviço"; img.loading = "lazy"; add(figure, img);
      } else add(figure, el("div", "gallery-placeholder", item.simbolo || "✦"));
      add(figure, el("figcaption", "", item.legenda || "Nosso trabalho")); add(gallery, figure);
    });
    add(section, gallery); add(content, section);
  }
  const details = el("section", "client-section details");
  add(details, el("p", "eyebrow", "INFORMAÇÕES"), el("h2", "", "Visite ou entre em contato"));
  const info = el("div", "info-grid");
  const hours = el("div", "info-card"); add(hours, el("span", "info-icon", "◷"), el("h3", "", "Horário"));
  (data.horario || []).forEach(line => add(hours, el("p", "", line)));
  const address = el("div", "info-card"); add(address, el("span", "info-icon", "⌖"), el("h3", "", "Endereço"), el("p", "", data.endereco));
  add(info, hours, address); add(details, info);
  const smallLinks = el("div", "small-links");
  add(smallLinks, link("Como chegar ↗", data.maps, "text-link"));
  if (data.email) add(smallLinks, link("Enviar e-mail ↗", `mailto:${data.email}`, "text-link"));
  add(details, smallLinks); add(content, details);

  // Uma página web não conecta o celular ao Wi-Fi nem confirma pagamentos Pix.
  // O visitante vê os dados e pode copiá-los para usar no aparelho ou no banco.
  const dialog = el("dialog", "details-dialog");
  const dialogBody = el("div", "dialog-body"); add(dialog, dialogBody);
  const copy = async (value, button) => {
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Copiado!";
      setTimeout(() => { button.textContent = "Copiar"; }, 1800);
    } catch { button.textContent = "Selecione e copie"; }
  };
  const row = (label, value, secret = false) => {
    const wrapper = el("div", "dialog-row"); add(wrapper, el("span", "dialog-label", label));
    const display = el("div", "dialog-value");
    const field = el("input", "copy-field"); field.readOnly = true; field.value = value || "Não configurado";
    if (secret && value) field.type = "password";
    add(display, field);
    if (value) {
      if (secret) {
        const reveal = el("button", "reveal-button", "Mostrar"); reveal.type = "button";
        reveal.addEventListener("click", () => { field.type = field.type === "password" ? "text" : "password"; reveal.textContent = field.type === "password" ? "Mostrar" : "Ocultar"; });
        add(display, reveal);
      }
      const button = el("button", "copy-button", "Copiar"); button.type = "button";
      button.addEventListener("click", () => copy(value, button)); add(display, button);
    }
    add(wrapper, display); return wrapper;
  };
  const openDialog = kind => {
    const close = el("button", "dialog-close", "×"); close.type = "button"; close.setAttribute("aria-label", "Fechar");
    close.addEventListener("click", () => dialog.close()); dialogBody.replaceChildren(close);
    if (kind === "wifi") {
      add(dialogBody, el("span", "eyebrow", "ACESSO À REDE"), el("h2", "", "Conecte-se ao Wi-Fi"),
        el("p", "dialog-help", "Copie a senha e use as configurações de Wi-Fi do celular."),
        row("Nome da rede", data.wifi?.ssid), row("Senha", data.wifi?.senha, true));
    } else {
      add(dialogBody, el("span", "eyebrow", "PAGAMENTO"), el("h2", "", "Pagar com Pix"),
        el("p", "dialog-help", "Confira os dados com o estabelecimento antes de pagar."),
        row("Recebedor", data.pix?.recebedor), row(data.pix?.copiaCola ? "Pix Copia e Cola" : "Chave Pix", data.pix?.copiaCola || data.pix?.chave));
      const qr = imagePath(data.pix?.qrImagem);
      if (qr) { const img = el("img", "pix-qr"); img.src = qr; img.alt = "QR Code Pix fornecido pelo estabelecimento"; add(dialogBody, img); }
    }
    dialog.showModal();
  };
  wifiButton.addEventListener("click", () => openDialog("wifi"));
  pixButton.addEventListener("click", () => openDialog("pix"));
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

  const footer = el("footer", "client-footer");
  add(footer, el("span", "", data.nome), el("span", "", "Mini site demonstrativo · Dados fictícios"));
  add(shell, top, hero, content, footer, dialog); root.replaceChildren(shell);
})();

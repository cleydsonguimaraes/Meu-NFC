// Edite somente os valores. URLs devem começar com https://, mailto: ou tel:.
window.CLIENTE = {
  nome: "Barbearia Horizonte",
  categoria: "BARBEARIA • ESTILO & CUIDADO",
  iniciais: "BH",
  descricao: "Seu momento de pausa, com atendimento cuidadoso e um corte do seu jeito.",
  destaque: "Seu próximo corte começa aqui.",
  tipo: "servicos", // Mostra Agendar horário em destaque
  cor: "#c39a62",
  fundo: "#151b29",
  logo: "", // Exemplo: "../../assets/imagens/logo-barbearia.png"
  whatsapp: "", // Exemplo: "5511999999999" (apenas dígitos, com código do país)
  agendamento: "", // Link de agenda; se vazio, usa o WhatsApp configurado
  mensagem: "Olá! Gostaria de agendar um horário.",
  instagram: "", // Exemplo: "https://www.instagram.com/seuperfil/"
  maps: "", // Cole o link de compartilhamento do Google Maps
  avaliar: "", // Cole o link direto para avaliação da empresa
  wifi: { ssid: "", senha: "" },
  pix: { recebedor: "", chave: "", copiaCola: "", qrImagem: "" },
  email: "",
  telefone: "", // Exemplo: "+55 11 99999-9999"
  endereco: "Seu endereço aparece aqui",
  horario: ["Segunda a sexta · 09h às 19h", "Sábado · 09h às 17h"],
  servicos: [
    { nome: "Corte masculino", descricao: "Do clássico ao moderno", preco: "Consulte" },
    { nome: "Barba", descricao: "Acabamento e cuidado", preco: "Consulte" },
    { nome: "Corte + barba", descricao: "Experiência completa", preco: "Consulte" }
  ],
  galeria: [
    { imagem: "", legenda: "Cortes personalizados", simbolo: "✂" },
    { imagem: "", legenda: "Cuidado com a barba", simbolo: "✦" },
    { imagem: "", legenda: "Um espaço para você", simbolo: "◈" }
  ]
};

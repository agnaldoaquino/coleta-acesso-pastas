$(document).ready(function () {
  // Dados simulados para teste. Substitua por seus dados reais.
  const estruturaPastas = [
    {
      id: "adm",
      parent: "#",
      text: "Administrativo"
    },
    {
      id: "adm-financeiro",
      parent: "adm",
      text: "Financeiro"
    },
    {
      id: "adm-rh",
      parent: "adm",
      text: "Recursos Humanos"
    },
    {
      id: "comercial",
      parent: "#",
      text: "Comercial"
    },
    {
      id: "comercial-vendas",
      parent: "comercial",
      text: "Vendas"
    }
  ];

  $('#tree').jstree({
    'core': {
      'data': estruturaPastas
    },
    'checkbox': {
      'keep_selected_style': false,
      'three_state': true,
      'tie_selection': false
    },
    'plugins': ["checkbox"]
  });

  $('#enviar').click(function () {
    const nome = $('#nome').val().trim();
    const departamento = $('#departamento').val().trim();
    const pastasSelecionadas = $('#tree').jstree('get_checked', true).map(node => node.text);

    if (!nome || !departamento || pastasSelecionadas.length === 0) {
      alert('Preencha todos os campos e selecione pelo menos uma pasta.');
      return;
    }

    // Dados que serão enviados
    const payload = {
      nome: nome,
      departamento: departamento,
      pastas: pastasSelecionadas.join(", ")
    };

    // URL do seu script Google Apps Script
    const url = "https://script.google.com/macros/s/AKfycbxW-BrvM4ORJV-LFG1rVemUuVbwJZ3BkkocWsjP0YKoJNvUwgGq03v6Focrqlce6bd9/exec";

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      alert("Formulário enviado com sucesso!");
      $('#nome').val('');
      $('#departamento').val('');
      $('#tree').jstree('uncheck_all');
    })
    .catch(error => {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar o formulário.");
    });
  });
});

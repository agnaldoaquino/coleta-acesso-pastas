document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nomeInput = document.querySelector('input[name="nome"]');
  const deptInput = document.querySelector('input[name="departamento"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Coletar pastas selecionadas
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const pastasSelecionadas = Array.from(checkboxes).map((el) => el.value);

    const dados = {
      nome: nomeInput.value,
      departamento: deptInput.value,
      pastas: pastasSelecionadas,
    };

    fetch("https://script.google.com/macros/s/AKfycbxW-BrvM4ORJV-LFG1rVemUuVbwJZ3BkkocWsjP0YKoJNvUwgGq03v6Focrqlce6bd9/exec", {
      method: "POST",
      body: JSON.stringify(dados),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((mensagem) => {
        alert("Formulário enviado com sucesso!");
        form.reset();
      })
      .catch((err) => {
        alert("Erro ao enviar formulário.");
        console.error(err);
      });
  });
});

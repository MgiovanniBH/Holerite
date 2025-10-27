function calcularProLabore() {
    // Obter valores dos inputs
    const faturamento = parseFloat(document.getElementById('faturamento').value);
    const despesas = parseFloat(document.getElementById('despesas').value) || 0;
    const socios = parseInt(document.getElementById('socios').value);
    const porcentagem = parseFloat(document.getElementById('porcentagem').value);

    // Validações
    if (!faturamento || faturamento <= 0) {
        alert('Por favor, digite um valor válido para o faturamento.');
        return;
    }

    if (socios <= 0) {
        alert('O número de sócios deve ser maior que zero.');
        return;
    }

    if (porcentagem <= 0 || porcentagem > 100) {
        alert('A porcentagem do pró-labore deve estar entre 1% e 100%.');
        return;
    }

    // Cálculos
    const lucroBruto = faturamento - despesas;
    const valorTotalProLabore = (lucroBruto * porcentagem) / 100;
    const proLaborePorSocio = valorTotalProLabore / socios;

    // Cálculos de impostos (valores aproximados)
    const inss = proLaborePorSocio * 0.11; // 11% de INSS
    const irrfBase = proLaborePorSocio - inss;
    
    // Cálculo do IRRF (tabela 2024)
    let irrf = 0;
    if (irrfBase > 4664.68) {
        irrf = (irrfBase * 0.275) - 869.36;
    } else if (irrfBase > 3751.05) {
        irrf = (irrfBase * 0.225) - 636.13;
    } else if (irrfBase > 2826.65) {
        irrf = (irrfBase * 0.15) - 354.80;
    } else if (irrfBase > 2259.20) {
        irrf = (irrfBase * 0.075) - 169.44;
    }

    irrf = Math.max(irrf, 0);
    const proLaboreLiquido = proLaborePorSocio - inss - irrf;

    // Formatar para moeda brasileira
    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Exibir resultados
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h3>Resultado do Cálculo</h3>
        <div class="resultado-item">
            <span>Lucro Bruto da Empresa:</span>
            <span class="valor">${formatador.format(lucroBruto)}</span>
        </div>
        <div class="resultado-item">
            <span>Pró-Labore Total (${porcentagem}%):</span>
            <span class="valor">${formatador.format(valorTotalProLabore)}</span>
        </div>
        <div class="resultado-item">
            <span>Pró-Labore por Sócio (Bruto):</span>
            <span class="valor">${formatador.format(proLaborePorSocio)}</span>
        </div>
        <div class="resultado-item">
            <span>INSS (11%):</span>
            <span class="valor">- ${formatador.format(inss)}</span>
        </div>
        <div class="resultado-item">
            <span>IRRF:</span>
            <span class="valor">- ${formatador.format(irrf)}</span>
        </div>
        <div class="resultado-item">
            <span><strong>Pró-Labore Líquido por Sócio:</strong></span>
            <span class="valor"><strong>${formatador.format(proLaboreLiquido)}</strong></span>
        </div>
    `;

    resultadoDiv.classList.add('mostrar');
}

// Adicionar evento de Enter nos inputs
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcularProLabore();
            }
        });
    });
});
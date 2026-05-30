/**
 * Formata número de telefone para usar na URL do WhatsApp
 * Remove espaços, parênteses, traços e outros caracteres especiais
 * Garante que o código de país (55) esteja presente
 * @param {string} telefone - Número de telefone
 * @returns {string} - Número formatado apenas com dígitos
 */
export const formatarParaWhatsApp = (telefone) => {
  if (!telefone) return '';
  
  // Remove espaços, parênteses, traços, barras e pontos
  let numero = telefone
    .replace(/\s/g, '')
    .replace(/[()[\]]/g, '')
    .replace(/-/g, '')
    .replace(/\//g, '')
    .replace(/\./g, '');
  
  // Remove qualquer caractere que não seja dígito
  numero = numero.replace(/\D/g, '');
  
  // Garante que comece com 55 (código do Brasil)
  if (!numero.startsWith('55')) {
    numero = '55' + numero;
  }
  
  return numero;
};

/**
 * Gera a URL do WhatsApp Web
 * @param {string} telefone - Número de telefone
 * @returns {string} - URL do WhatsApp Web
 */
export const gerarUrlWhatsApp = (telefone) => {
  const numeroFormatado = formatarParaWhatsApp(telefone);
  if (!numeroFormatado) return '';
  return `https://wa.me/${numeroFormatado}`;
};

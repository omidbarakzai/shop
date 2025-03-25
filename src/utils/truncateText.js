// utils/constants/truncateText.js

export function truncateText(text, maxLength) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength);
}

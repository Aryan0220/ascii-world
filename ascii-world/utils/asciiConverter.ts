const grayRamp = '@%#*+=-:. '; // Characters used for ASCII representation

export const convertToAscii = (imageData: ImageData): string => {
  const { data, width, height } = imageData;
  let asciiStr = '';

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const gray = (r + g + b) / 3;
      const char = grayRamp[Math.floor((gray * (grayRamp.length - 1)) / 255)];
      line += char;
    }
    asciiStr += line + '\n';
  }
  return asciiStr;
};

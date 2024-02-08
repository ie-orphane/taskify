const colors = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];

const textColor = Object.fromEntries(colors.map((value, index) => [value, `\x1b[3${index}m`]));
const backgroundColor = Object.fromEntries(
  colors.map((value, index) => [value, `\x1b[1;37;4${index}m`])
);

const reset = "\x1b[0m";

export { textColor as txt, backgroundColor as bg, reset as br };

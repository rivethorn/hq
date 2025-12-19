export function useUiBackground() {
  const background = useState<string>("ui-background", () => "var(--ui-bg)");

  function setBackground(value: string) {
    background.value = value;

    if (process.client) {
      document.documentElement.style.setProperty("--ui-bg", value);
    }
  }

  function resetBackground() {
    setBackground("");
  }

  return {
    background,
    setBackground,
    resetBackground,
  };
}

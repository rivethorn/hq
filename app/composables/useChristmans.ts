export function useChristmasSeason() {
  const now = ref(new Date());

  if (process.client) {
    const interval = setInterval(
      () => {
        now.value = new Date();
      },
      60 * 60 * 1000
    );
    onUnmounted(() => clearInterval(interval));
  }

  const isChristmasSeason = computed(() => {
    const month = now.value.getMonth();
    const day = now.value.getDate();

    if (month === 11) return true;
    if (month === 0 && day <= 6) return true;

    return false;
  });

  const seasonalEffectsEnabled = useCookie<boolean>(
    "seasonal-effects-enabled",
    { default: () => true }
  );

  const enableSnowEffect = computed(() => {
    return isChristmasSeason.value && seasonalEffectsEnabled.value;
  });

  return {
    isChristmasSeason,
    enableSnowEffect,
    seasonalEffectsEnabled,
  };
}

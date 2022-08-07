
export const stripeTimeToUTC = (time: number | null) => {
  if (!time) return null;

  return new Date(time*1000).toISOString().split("T")[0];
}


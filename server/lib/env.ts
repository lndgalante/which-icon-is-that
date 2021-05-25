export function isDevelopment() {
  const ENV = Deno.env.get('ENVIRONMENT') as string;
  return ENV === 'development';
}

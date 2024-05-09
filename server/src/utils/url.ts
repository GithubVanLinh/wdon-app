export function getFullMediaUrl(name: string) {
  return process.env.BASE_URL + '/uploads/' + name;
}

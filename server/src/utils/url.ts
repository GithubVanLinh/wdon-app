export function getFullMediaUrl(name: string) {
  if (name.startsWith('http')) {
    return name;
  }
  return process.env.BASE_URL + '/uploads/' + name;
}

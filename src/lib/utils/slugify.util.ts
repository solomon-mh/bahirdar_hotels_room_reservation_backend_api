import slugify from 'slugify';

export function slugifyText(text: string) {
  return slugify(text, { lower: true });
}

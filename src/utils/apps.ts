// Registro de apps de la casa: cada carpeta en content/apps/<slug>/
// con meta.json + privacidad.md + terminos.md + eliminar-cuenta.md
// genera automáticamente sus páginas legales. Cero código por app nueva.

export interface AppMeta {
  nombre: string;
  tagline: string;
  descripcion: string;
  email: string;
  gradiente: [string, string];
  colorLink: string;
  updatedAt: string;
}

export interface AppEntry {
  slug: string;
  meta: AppMeta;
}

const metaModules = import.meta.glob<{ default: AppMeta }>(
  '/content/apps/*/meta.json',
  { eager: true }
);

export function getApps(): AppEntry[] {
  return Object.entries(metaModules)
    .map(([path, mod]) => ({
      // '/content/apps/<slug>/meta.json' -> '<slug>'
      slug: path.split('/')[3],
      meta: mod.default,
    }))
    .sort((a, b) => a.meta.nombre.localeCompare(b.meta.nombre, 'es'));
}

export function getApp(slug: string): AppEntry | undefined {
  return getApps().find((app) => app.slug === slug);
}

// seguridad-infantil.md es opcional (solo apps de categoría Social/Citas);
// las apps sin el archivo no generan la ruta y sus páginas no la enlazan.
const seguridadInfantilDocs = import.meta.glob('/content/apps/*/seguridad-infantil.md');

export function hasSeguridadInfantil(slug: string): boolean {
  return `/content/apps/${slug}/seguridad-infantil.md` in seguridadInfantilDocs;
}

// Formatea '2026-08-23' como '23 de agosto de 2026' sin depender de zona horaria
export function formatFecha(isoDate: string): string {
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${day} de ${meses[month - 1]} de ${year}`;
}

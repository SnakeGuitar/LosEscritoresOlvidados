# Los Escritores Olvidados

Sitio Nuxt desplegable en Vercel con funciones serverless, PostgreSQL y autorización mediante roles de Discord.

La base comienza vacía. El esquema solo crea las colas comunitaria y profesional; no inserta autores, concursos ni textos de ejemplo.

## Desarrollo

```bash
npm install
Copy-Item .env.example .env
npm run db:migrate
npm run dev
```

## 1. Base de datos

Crea una base PostgreSQL administrada compatible con conexiones desde Vercel y copia su URL como `DATABASE_URL`. Después aplica [database/schema.sql](database/schema.sql):

```bash
npm run db:migrate
```

El esquema contiene:

- Usuarios y sesiones cifradas.
- Dos colas de lectura: comunitaria y profesional.
- Autores, obras y strikes.
- Concursos.
- Ganador, dos finalistas y hasta dos menciones honoríficas.

## 2. Discord OAuth2

En Discord Developer Portal:

1. Crea o abre una aplicación.
2. Añade como redirect URI `https://TU_DOMINIO/api/auth/discord/callback`.
3. Activa el modo desarrollador de Discord y copia los IDs del servidor y de los roles autorizados.
4. Configura las variables de entorno.

El flujo solicita `identify` y `guilds.members.read`. Antes de cada escritura se consulta nuevamente el objeto Member del usuario y se comprueba su rol actual.

Permisos:

- Administrador: listas, concursos y textos seleccionados.
- Lector oficial: listas y textos seleccionados.

## 3. Variables de entorno

```env
DATABASE_URL=
NUXT_DISCORD_CLIENT_ID=
NUXT_DISCORD_CLIENT_SECRET=
NUXT_DISCORD_REDIRECT_URI=https://TU_DOMINIO/api/auth/discord/callback
NUXT_DISCORD_GUILD_ID=
NUXT_DISCORD_ADMIN_ROLE_ID=
NUXT_DISCORD_READER_ROLE_ID=
NUXT_SESSION_SECRET=
```

`NUXT_SESSION_SECRET` debe ser aleatorio y tener al menos 32 caracteres. Los secretos se configuran en Vercel para Production y, si corresponde, Preview. Cada redirect URI utilizado debe estar registrado en Discord.

## 4. Despliegue en Vercel

1. Añade las variables anteriores en Project Settings → Environment Variables.
2. Ejecuta la migración una sola vez contra la base de producción.
3. Despliega el proyecto normalmente.
4. Entra a `/admin` y autentícate con Discord.

Nuxt transforma automáticamente las rutas de `server/api/` en funciones serverless. No se necesita un proceso permanentemente encendido.

## Panel de gestión

`/admin` permite:

- Crear concursos como borrador o publicarlos.
- Pegar textos seleccionados y clasificarlos.
- Guardar textos como borrador o publicación.
- Consultar y eliminar contenido existente.

La página de lecturas permite a usuarios autorizados añadir, ordenar, rotar, registrar ausencias y eliminar autores. Los usuarios públicos solo pueden consultar.

## Logo transparente

El script utiliza únicamente módulos incluidos en Node:

```bash
npm run logo:transparent
```

Elimina solo el fondo conectado a los bordes y conserva los blancos internos del dibujo.

# Casa Rosa POS 🌸

Sistema de punto de venta para tienda familiar. Gestiona inventario, ventas, caja y reportes desde una sola interfaz web moderna.

---

## Módulos

| Módulo | Rosa (admin) | Greici (ventas) |
|---|---|---|
| Dashboard | ✅ | ✅ |
| Inventario | ✅ | ✅ (solo lectura) |
| Ventas | ✅ | ✅ |
| Caja | ✅ | ❌ |
| Reportes | ✅ | ❌ |

---

## Stack

- **Frontend:** React 18 + Vite
- **Base de datos + Auth:** [Supabase](https://supabase.com) (PostgreSQL)
- **Estilos:** CSS-in-JS (sin librerías externas)
- **Íconos:** Tabler Icons
- **Fuentes:** Fraunces + Inter (Google Fonts)

---

## Configuración paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/casa-rosa-pos.git
cd casa-rosa-pos
npm install
```

### 2. Crear proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com) → **New project**
2. Elegir nombre (ej: `casa-rosa-pos`), contraseña segura y región más cercana (South America)
3. Esperar que termine de inicializar (~1 minuto)

### 3. Crear la base de datos

1. En Supabase: ir a **SQL Editor → New query**
2. Pegar todo el contenido del archivo `supabase/schema.sql`
3. Hacer clic en **Run**

Esto crea las tablas, la función `registrar_venta`, las políticas de seguridad y los datos de ejemplo.

### 4. Crear los usuarios (Rosa y Greici)

En Supabase: ir a **Authentication → Users → Add user**

Crear dos usuarios:

| Nombre | Email (ejemplo) | Contraseña |
|---|---|---|
| Rosa | rosa@casarosa.com | (la que elijas) |
| Greici | greici@casarosa.com | (la que elijas) |

Después de crearlos, ir a **SQL Editor** y ejecutar lo siguiente (reemplaza los UUIDs con los que aparecen en la lista de usuarios):

```sql
-- Reemplaza los valores con los datos reales
INSERT INTO perfiles (id, nombre, rol) VALUES
  ('UUID-DE-ROSA-AQUI',   'Rosa',   'admin'),
  ('UUID-DE-GREICI-AQUI', 'Greici', 'ventas');
```

### 5. Variables de entorno

```bash
cp .env.example .env
```

Abrir `.env` y completar con los datos de tu proyecto Supabase
(los encuentras en **Project Settings → API**):

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
```

> ⚠️ El archivo `.env` está en `.gitignore`. Nunca lo subas a GitHub.

### 6. Correr el proyecto

```bash
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173)

---

## Build para producción

```bash
npm run build
```

Los archivos quedan en `/dist`. Se puede alojar gratis en **Vercel** o **Netlify** (solo conectas el repo y listo).

---

## Cómo funciona el lector de código de barras

El módulo de Ventas detecta automáticamente cuando el lector USB (que funciona como teclado) termina de ingresar un código. Si el código coincide exactamente con un producto registrado, lo agrega al carrito sin necesidad de tocar el mouse.

Para registrar un código de barras a un producto: ir a Inventario → editar el producto → campo "Código de barras".

---

## Estructura del proyecto

```
casa-rosa-pos/
├── supabase/
│   └── schema.sql          # Base de datos completa (ejecutar en Supabase)
├── src/
│   ├── lib/
│   │   └── supabase.js     # Cliente de conexión
│   ├── contexts/
│   │   └── AuthContext.jsx # Autenticación y roles
│   ├── components/
│   │   └── Sidebar.jsx     # Navegación compartida
│   ├── styles/
│   │   └── theme.js        # Colores y tipografía
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Inventario.jsx
│   │   ├── Ventas.jsx
│   │   ├── Caja.jsx
│   │   └── Reportes.jsx
│   ├── App.jsx             # Rutas y protección por rol
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

# Ciclo - Rastreador de Ciclo Menstrual

Aplicación web para rastrear y entender el ciclo menstrual. Calcula automáticamente las fases, días fértiles y proporciona información útil sobre cada etapa del ciclo.

## Características

- **Visualización del ciclo** - Anillo de progreso que muestra el día actual del ciclo
- **Calendario interactivo** - Vista mensual con colores por fase
- **Información por fase** - Descripción, síntomas y recomendaciones
- **Predicciones** - Días fértiles, ovulación y próximo período
- **Modo claro/oscuro** - Tema adaptable
- **PWA** - Instalable como aplicación nativa
- **Offline** - Funciona sin conexión
- **Exportar/Importar** - Respaldo de datos en JSON
- **100% Local** - Todos los datos se guardan en el navegador

## Fases del Ciclo

| Fase | Días aprox. | Descripción |
|------|-------------|-------------|
| **Menstrual** | 1-5 | Período activo, energía baja |
| **Folicular** | 6-13 | Aumento de energía y optimismo |
| **Ovulación** | ~14 | Máxima fertilidad y energía |
| **Lútea** | 15-22 | Energía introspectiva |
| **SPM** | 23-28 | Síndrome premenstrual |

## Tecnologías

- **Vite** - Build tool
- **JavaScript Vanilla** - Sin frameworks
- **CSS Custom Properties** - Sistema de diseño
- **LocalStorage** - Persistencia de datos
- **Service Worker** - Funcionalidad offline

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/ciclo.git

# Entrar al directorio
cd ciclo

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## Despliegue en GitHub Pages

1. Ejecutar `npm run build`
2. El contenido estará en la carpeta `dist/`
3. Subir el contenido de `dist/` a la rama `gh-pages` o configurar GitHub Pages para servir desde esa carpeta

### Configuración para GitHub Pages

Agregar en `vite.config.js`:

```javascript
export default {
  base: '/nombre-del-repo/'
}
```

## Uso

1. **Configuración inicial**: Ingresa la fecha del primer día del último período
2. **Ajustar ciclo**: Modifica la duración del ciclo (21-35 días) y período (3-7 días)
3. **Ver calendario**: Navega entre meses para ver las predicciones
4. **Registrar períodos**: Añade nuevos registros cuando inicie cada período
5. **Exportar datos**: Descarga un respaldo en formato JSON

## Algoritmo de Cálculo

```
Día de Ovulación = Duración del Ciclo - 14
Ventana Fértil = 5 días antes de ovulación hasta 1 día después
SPM = Últimos 6 días antes del siguiente período
```

## Estructura del Proyecto

```
├── index.html              # HTML principal
├── public/
│   ├── manifest.json       # Configuración PWA
│   ├── sw.js               # Service Worker
│   ├── icon.svg            # Icono vectorial
│   ├── icon-192.png        # Icono PWA
│   └── icon-512.png        # Icono PWA grande
└── src/
    ├── main.js             # Lógica de la aplicación
    └── style.css           # Estilos
```

## Privacidad

Todos los datos se almacenan **exclusivamente** en el navegador del usuario mediante LocalStorage. No se envía ninguna información a servidores externos.

## Licencia

MIT

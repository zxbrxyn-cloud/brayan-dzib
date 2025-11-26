# Configuración del Chatbot con Google Gemini Flash

## 📋 Instrucciones para configurar el chatbot

### Paso 1: Obtener tu API Key de Google Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Haz clic en **"Get API Key"** o **"Create API Key"**
3. Selecciona el proyecto (o crea uno nuevo)
4. Copia tu API Key

### Paso 2: Configurar la API Key en tu proyecto

Abre el archivo `script.js` y busca la línea:

```javascript
const GEMINI_API_KEY = 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Reemplaza con tu API key
```

Reemplaza `'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx'` con tu API Key actual. Ejemplo:

```javascript
const GEMINI_API_KEY = 'AIzaSyDc1234567890abcdefghijklmnopqrst'; // Tu API Key aquí
```

### Paso 3: Guardar y probar

1. Guarda el archivo `script.js`
2. Abre tu página HTML en el navegador
3. Haz clic en el botón del chatbot en la esquina inferior derecha
4. ¡Comienza a chatear!

---

## 🎨 Características del Chatbot

✅ **Interfaz moderna y responsive**
- Se adapta a todos los tamaños de pantalla
- Animaciones suaves y fluidas
- Diseño minimalista pero atractivo

✅ **Integración con Google Gemini 1.5 Flash**
- Respuestas rápidas y precisas
- Modelo optimizado para velocidad
- Soporte para múltiples idiomas

✅ **Funcionalidades**
- Abrir/cerrar el chatbot fácilmente
- Enviar mensajes con Enter o haciendo clic en el botón
- Indicador de escritura en tiempo real
- Scroll automático en la conversación
- Manejo de errores robusto

✅ **Código limpio y bien documentado**
- Usa solo Fetch API
- Sin dependencias externas
- Fácil de mantener y personalizar

---

## ⚙️ Personalización

### Cambiar los colores del chatbot

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --secondary-color: #8b5cf6;
    /* Más colores... */
}
```

### Cambiar el nombre del chatbot

En `index.html`, busca:

```html
<span>Asistente IA</span>
```

Y cámbialo a tu preferencia.

### Ajustar configuración de la API

En `script.js`, puedes modificar la configuración de respuesta:

```javascript
generationConfig: {
    temperature: 0.7,      // 0-1: Controla la creatividad (0=determinístico, 1=creativo)
    topK: 40,              // Número de tokens a considerar
    topP: 0.95,            // Probabilidad acumulada
    maxOutputTokens: 1024  // Longitud máxima de la respuesta
}
```

---

## 🔒 Seguridad

⚠️ **IMPORTANTE:** 
- **Nunca** compartas tu API Key públicamente
- Si accidentalmente expones tu API Key, elimínala inmediatamente en Google AI Studio
- Considera usar un backend seguro para producción en lugar de una API Key en el cliente

---

## 📱 Soporte de navegadores

- ✅ Chrome (versión 60+)
- ✅ Firefox (versión 55+)
- ✅ Safari (versión 12+)
- ✅ Edge (versión 79+)
- ✅ Opera (versión 47+)

---

## 🐛 Solución de problemas

### El chatbot no responde
- Verifica que tu API Key sea correcta
- Comprueba la consola del navegador (F12) para ver errores
- Asegúrate de estar conectado a internet

### Las respuestas son lentas
- Google Gemini Flash es rápido, pero depende de tu conexión
- Prueba de nuevo en unos segundos

### El chatbot no aparece en móvil
- El diseño es responsive, debería funcionar en todos los dispositivos
- Verifica los estilos CSS en `styles.css`

---

## 📚 Recursos

- [Documentación de Google Gemini API](https://ai.google.dev/docs)
- [AI Studio de Google](https://aistudio.google.com)
- [REST API Documentation](https://generativelanguage.googleapis.com)

---

¡Disfruta de tu chatbot con IA! 🚀

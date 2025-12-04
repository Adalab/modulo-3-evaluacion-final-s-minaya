# **Guía del Mago: Explorador de Personajes de Harry Potter**

> Esta aplicación React te permite adentrarte en el universo de **Harry Potter** y consultar información sobre sus personajes, obtenidos mediante la API pública [HP-API](https://hp-api.onrender.com/).
> Podrás filtrarlos, ver sus detalles y viajar entre pantallas como si usaras un traslador.

Este proyecto forma parte del **Ejercicio de Evaluación del Módulo 3 (Adalab).**

---

## ⚡️ **Hechizos y funcionalidades principales**

### 🧙‍♂️ **1. Libro de personajes (listado principal)**

La aplicación muestra un listado de personajes según la casa seleccionada (por defecto, **Gryffindor**, _por supuesto_).

Cada tarjeta incluye:

- **Imagen del personaje**
- **Nombre**
- **Especie**
- **Actor o actriz** (si no se conoce, se muestra un texto alternativo enviado desde el Ministerio)

---

### 🔍 **2. Encantamiento Revelio (búsqueda por nombre o actor)**

El buscador permite localizar personajes o actores **sin importar mayúsculas** (el encantamiento no es caprichoso).

Si no hay coincidencias, aparece un mensaje:

> _"Este personaje aún no ha salido de la cámara de los secretos..."_

---

### 🏰 **3. Selección de casa**

Un select te permite cambiar entre las cuatro grandes casas:

- 🦁 Gryffindor
- 🐍 Slytherin
- 🦅 Ravenclaw
- 🦡 Hufflepuff

Cada cambio realiza automáticamente una nueva consulta a la API.

---

### 💀 **4. Filtro de estado vital (vivo / muerto)**

Puedes mostrar:

- ✨ Solo vivos
- ⚰️ Solo muertos
- 🌀 Todos

---

### 🖼️ **5. Filtro “solo personajes con foto”**

Al activar este hechizo, solo se listan personajes cuya imagen ha sido enviada correctamente por el **Ministerio de Magia.**

---

### 🔄 **6. Botón de reset**

Restablece todos los filtros a sus valores iniciales.  
Perfecto para cuando un encantamiento se te va de las manos.

---

## ⚗️ **Página de detalle del personaje**

Al seleccionar una tarjeta, viajas a:

```js
/character/:characterId
```

Aquí encontrarás una ficha detallada con:

- **Imagen**
- **Nombre**
- **Estado** + icono
- **Especie** + icono
- **Género** + icono
- **Casa** + escudo

> Los iconos se generan dinámicamente según la información que devuelve la API.  
> Además, la pantalla de detalle incluye un botón encantado para volver al listado.

---

## 🎨 Diseño y estética

La app incorpora:

- ✨ **Loader animado**
- 🎨 **Tarjetas tematizadas por casa**
- 🌙 **Bordes redondeados y sombras suaves**
- 📱 **Diseño responsive** (adaptable a móviles y pantallas pequeñas)

---

## 🧪 Tecnologías utilizadas

- ⚛️ **React**
- 🔗 **React Router**
- 🎨 **SCSS**
- 🌐 **Fetch API**
- 📜 **JSX**
- 🚀 **GitHub Pages** (deploy)

---

## ✨ Autora

Proyecto desarrollado por **Sofía Minaya**, quien sigue esperando su carta de Hogwarts.

👉 **Puedes ver el proyecto funcionando**
[aquí:](http://beta.adalab.es/modulo-3-evaluacion-final-s-minaya/)

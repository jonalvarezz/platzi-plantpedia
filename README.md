<p align="center">
  <a href="https://platzi.com/cursos/next-2020/" target="_blank">
    <img alt="Curso de Next.js" src="https://static.platzi.com/media/achievements/badge-nextjs-2259fc68-f86b-486e-bc09-95311a887985.png" width="60" />
  </a>
</p>
<h1 align="center">
  Saga de Next.js de Platzi
</h1>
<p align="center">
  <a href="https://platzi-plantpedia.vercel.app" target="_blank">
    https://platzi-plantpedia.vercel.app
  </a>
</p>

Este repositorio recopila el proyecto de la Saga de Next.js dictado por [@jonalvarezz](https://twitter.com/jonalvarezz) para [Platzi](https://platzi.com). Los cursos que componen la saga son:

* [Curso de Next.js: Sitios Estáticos y Jamstack](https://platzi.com/cursos/nextjs-jamstack)
* [Curso de Next.js: Internacionalización de Aplicaciones Web con i18n](https://platzi.com/cursos/nextjs-internacionalizacion)
* [Curso de Next.js: Deploy a Producción](https://platzi.com/cursos/nextjs-deploy)
* [Curso de Next.js: Grandes Datasets](https://platzi.com/cursos/nextjs-datasets)
* [Curso de Next.js: Autenticación](https://platzi.com/cursos/nextjs-auth)
* [Curso de Next.js: Seguridad con OWASP](https://platzi.com/cursos/nextjs-seguridad-owasp)

### Tabla de contenidos
* [¿Cómo trabajar en este proyecto?](#-cómo-trabajar-en-este-proyecto)
* [Guía rápida de desarrollo](#-gu%C3%ADa-rápida-de-desarrollo)
* [¿Encontraste un error o mejora?](#-encontraste-un-error-o-mejora)

### 🔎 ¿Cómo trabajar en este proyecto?
El curso es totalmente práctico, progresivo y está dividido por etiquetas de Git. Este repositorio sólo existe como una guía para cuando lo necesites. Puedes realizar todo el curso en tu propio proyecto y tu propio repositorio.

Avanzamos en el curso a un nuevo tema y no puedes o no quieres completar los cambios anteriores para continuar? 
Empieza desde la etiqueta git correspondiente al módulo del curso que te interese

1.  Clona el repositorio, si no lo has hecho aún:

    ```sh
    git clone git@github.com:jonalvarezz/platzi-plantpedia.git
    ```


1.  Actualiza la información de las etiquetas:

    ```sh
    git fetch --tags
    ```
    

1.  Lista las etiquetas disponibles:

    ```sh
    git tag
    ```
    
    Deberías ver algo como:

    ```sh
    0-inicio
    1-incremental-rendering
    2-env-vars
    ...
    ```

1.  Inicia un nuevo branch desde el punto que desees:

    ```sh
    git checkout -b el-nombre-de-mi-branch etiqueta-elegida

    # Por ejemplo, para crear un branch llamado 'dev' desde el módulo '10-react-query'
    git checkout -b dev 10-react-query
    ```

    🔥 Eso es todo, ya puedes iniciar con todos los cambios incluídos hasta ese módulo.

    > 💡 En la sección de [Releases](https://github.com/jonalvarezz/platzi-plantpedia/releases) puedes encontrar toda la lista de etiquetas.


#### ¿Cómo subo mis cambios a otro repositorio?
Git permite manejar varios repositorios remotos en una misma copia local. [Aquí encuentras más información](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) y te dejaré el cheatsheet a continuación:
```sh
# Crea tu nuevo repositorio en GitHub/GitLab/otro. 
# Asumamos la URL es git@github.com:jonalvarezz/mi-repo-mas-bello.git
# Agrega el nuevo remote

git remote add mi-repo git@github.com:jonalvarezz/mi-repo-mas-bello.git

# Para push
git push mi-repo branch-a-hacer-push


# Para pull
git pull mi-repo branch-a-hacer-push
```

### 🤖 Guía Rápida Para Desarrollar

1. Instala dependencias

    ```sh
    yarn
    ```

1. Inicia el proyecto

    ```sh
    yarn dev
    ```

    El sitio estará disponible en http://localhost:3000.

> ⚠️ Dependiendo del lugar en la saga donde te ubiques podrías necesitar algunas Variables de Entorno. Revisa [`.env.local.example`](https://github.com/jonalvarezz/platzi-plantpedia/blob/main/.env.local.example) y el [Curso de Next.js: Deploy a Producción](https://platzi.com/cursos/nextjs-deploy)



### 🐞 ¿Encontraste un error o mejora?
Ayuda a otros estudiantes con eso que acabas de descubrir que haría este curso y respositorio mucho mejor.
* En [Issues](https://github.com/jonalvarezz/platzi-plantpedia/issues/new) puedes reportar errores, agregar sugerencias y comentarios.
* Por su parte, los [Pull Request](https://github.com/jonalvarezz/platzi-plantpedia/pulls) siempre estarán abiertos para recibir mejoras puntuales.

Happy hacking!

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

## Tabla de contenidos
* [¿Cómo trabajar en este proyecto?](#-cómo-trabajar-en-este-proyecto)
* [Guía rápida de desarrollo](#-gu%C3%ADa-rápida-para-desarrollar)
* [Importar contenido a Contentful](#%EF%B8%8F-importar-contenido-a-contentful)
* [¿Encontraste un error o mejora?](#-encontraste-un-error-o-mejora)

## 🔎 ¿Cómo trabajar en este proyecto?
El curso es totalmente práctico y progresivo. Este repositorio sólo existe como una guía para cuando lo necesites. Puedes realizar todo el curso en tu propio proyecto y tu propio repositorio.


El repositorio y toda la saga está dividido por etiquetas de Git. Empieza desde la etiqueta git correspondiente al módulo del curso que te interese:

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


### ¿Cómo subo mis cambios a otro repositorio?
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

## 🤖 Guía Rápida Para Desarrollar

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


## ⚙️ Importar contenido a Contentful

El proyecto utiliza un Content Management System (CMS) llamado Contenful. En el primer curso de esta Saga [Next.js: Sitios Estáticos y Jamstack](https://platzi.com/cursos/nextjs-jamstack) vemos en detalle como configurarlo.

Los pasos son:

1. Crea una cuenta en [Contentful](https://www.contentful.com)

1. Identifica tu Space ID y crea un token de acceso.
   > 💡 Lo encuentras en Your Space > Settings > API Keys.

1. Modifica el archivo `import/config.json` con tus valores generados en el punto anterior.

1. Instala la herramienta CLI de Contentful:

    ```sh
    npm install -g contentful-cli
    ```

1. Corre el siguiente comando desde la raiz de este proyecto:

    ```sh
    cd platzi-plantpedia
    contentful space import --config import/config.json
    ```
    
    > 💡 La importación puede tardar varios minutos.
    

1. En el navegador, verifica que el contenido se haya importado en la pestaña **Model** y **Content**.

    > 💡 Deberías ver al menos 400 registros creados entre entradas e imágenes.


1. Adicionalmente, puedes interactuar con tu contenido utilizando el [explorador de GraphQL](https://www.contentful.com/developers/docs/references/graphql/):

    Abre en tu navegador: `https://graphql.contentful.com/content/v1/spaces/{SPACE}/explore?access_token={CDA_TOKEN}`
    
    > 💡 Reemplaza `{SPACE}` y `{CDA_TOKEN}` por tus valores propios.


## 🐞 ¿Encontraste un error o mejora?
Ayuda a otros estudiantes con eso que acabas de descubrir que haría este curso y respositorio mucho mejor.
* En [Issues](https://github.com/jonalvarezz/platzi-plantpedia/issues/new) puedes reportar errores, agregar sugerencias y comentarios.
* Por su parte, los [Pull Request](https://github.com/jonalvarezz/platzi-plantpedia/pulls) siempre estarán abiertos para recibir mejoras puntuales.

Happy hacking!

# THiN SASS Framework

THiN is a minimalistic SASS framework designed to provide a pattern oriented approach front end design. Relying primarily on common HTML patterns and best practices, THiN leverages an intentionally weak structural system to provide a basic reusable design platform for front-end designers to build upon.
-----------------------

Unlike many other CSS frameworks, the goal of THiN is not to inform the website's design, but to provide the barest minimum scaffolding to build upon. Old and irrelevant browser styles are removed but not replaced with opinionated alternatives. Simple element specific patterns are used to provide consistently applied grid to the layout, but without the burden of complicated naming schemes. 

### Root pattern
    <body>
      <header></header>
      <div role="main"></div>
      <footer></footer>
    </body>

### Module
    <div class="module">
      <header></header>
      <footer></footer>
    </div>
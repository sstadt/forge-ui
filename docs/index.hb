<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ForgeUI</title>

    <link href="https://fonts.googleapis.com/css?family=Hind" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" rel="stylesheet">
    <link href="_assets/prism.css" inline>
    <link href="_assets/style.css" inline>
    <link rel="stylesheet" href="dist/css/forge-ui.css">
  </head>
  <body>

    <div class="page-header">
      <div class="wrapper">
        <div class="row">
          <div class="large-12 column">
            <h1>ForgeUI</h1>
            <p>Forge UI is a Vue.js component library and CSS framework. Vue components are reusable, with customizable templates. CSS framework components are kept minimal to avoid the need for style overwrites or excessive configuration inherent in many modern frameworks.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="row">
        <div class="hide-small medium-3 column">
          <ul class="vertical menu docs-nav">
            {{#each sections}}
              <li class="docs-nav-title">{{title}}</li>
              {{#each pages}}
                <li><a href="#{{id}}">{{title}}</a></li>
              {{/each}}
            {{/each}}
          </ul>
        </div>

        <div class="small-12 medium-9 column">
          <!-- Start demo content -->

          {{#each sections}}
            <h2 class="docs-heading">{{{title}}}</h2>
            <div class="row">
              <div class="small-12 column">
                {{{__content}}}
              </div>
            </div>
            {{#each pages}}
              <div class="row" id="{{id}}">
                <div class="small-12 column">
                  <h3 class="docs-heading">{{{title}}}</h3>
                  {{{__content}}}
                  <p class="back-to-top"><a href="#">Back to top</a></p>
                </div>
              </div>
            {{/each}}
          {{/each}}

          <!-- End demo content -->
        </div>
      </div>
    </div>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/prism.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
    <script type="text/javascript" src="dist/js/forge-ui.js"></script>
    <script type="text/javascript" src="_assets/script.js" inline></script>
  </body>
</html>

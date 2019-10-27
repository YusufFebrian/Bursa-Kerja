<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" href="/image/logo_skariga.png">

        <link rel='stylesheet' href='/css/app.css'>
        <link rel='stylesheet' href='/minovate/css/main.css'>
        <style>
            .div-center{
                margin: 5% auto;
            }
            #login-form{
                height: 300px;
                background: white;
                box-shadow: 0px 0px 3px -1px rgba(0,0,0,0.75);
            }
        </style>
    </head>
    <body>
        <div id='target'></div>
    </body>
</html>
<script type='text/javascript' src='./js/app.js'></script>
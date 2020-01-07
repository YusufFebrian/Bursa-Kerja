<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" href="/image/favicon.ico">

        <link rel='stylesheet' href='/css/app.css'>
        <link rel="stylesheet" href="/minovate/css/vendor/bootstrap.min.css">
        <link rel="stylesheet" href="/font-awesome/css/fontawesome.css">
        <link rel="stylesheet" href="/font-awesome/css/all.css">
        <link rel='stylesheet' href='/minovate/css/main.css'>
        <link rel='stylesheet' href='/css/own.css'>
    </head>
    <body>
        <div id='target'></div>

        <script type='text/javascript' src="/font-awesome/js/all.js"></script>
        <script src="/js/jquery.js"></script>
        <script src="minovate/js/vendor/bootstrap/bootstrap.min.js"></script>
        <script src="/minovate/js/main.js"></script>
    </body>
</html>
<script type='text/javascript' src='./js/app.js'></script>
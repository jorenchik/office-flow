<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    {{-- <script src="https://kit.fontawesome.com/b15b0846bf.js" crossorigin="anonymous"></script> --}}
    @vite('resources/css/app.css')
</head>

<body>
    @include('header')
    <div id="content-wrapper" class="">
        @yield('content')
        @include('footer')
    </div>
</body>

</html>

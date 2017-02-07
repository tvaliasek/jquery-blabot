# jquery-blabot
Jednoduchý blabot.net api klient pro vepsání českých výplňových textů do html

## Použití
```hmtl
<body>
    <p data-blabot="true"></p>
    
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="/js/blabot.min.js"></script>
    <script type="text/javascript">
        jQuery(function(){
            $.fn.vyblabol();
        });
    </script>
</body>
```

## Dostupné parametry: 
 - data-blabot="true" - použije na element výplň
 - data-blabot-exact="2" - vyplní přesně dvěma větami
 - data-blabot-min="1" - vyplní nejméně jednou větou
 - data-blabot-max="6" - vyplní maximálně šesti větami
 - data-blabot-elipsize="200" - zkrátí text maximálně na 200 znaků (196 + ' ...')

[![NPM](https://nodei.co/npm/iblazingx-ms.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/iblazingx-ms)


Este paquete es muy util para convertir muchos formatos de tiempo a milisegundos o viseversa.

## Como se usa?
```js
const ms = require("iblazingx-ms")

ms(100, { format: "short", miliseconds: true }) // ms(value, options)
/*
  value: number | string
  options: { format: string, miliseconds: boolean }
    - format: "short" | "long" | "number"
    - miliseconds: true | false

  options.format:
    - "long": el valor que te devolvera sera un "string" con el formato de tiempo largo, ejemplo: "3 days 1 hour"
    - "short": el valor que te devolvera sera un "string" con el formato de tiempo corto, ejemplo: "15h 3m 257ms" (default si "value" es un numero)
    - "number": el valor que te devolvera sera un "number", ejemplo: 15525 (default si "value" es un string)

  options.miliseconds:
    - true: el valor que te devuelva contendra milisegundos
    - false: el valor que te devuelva no contendra milisegundos (default)

    Ejemplos:
      - true:
        5342 => "5s"
        1662885 => "27m 42s"
        245151535225 => "7y 40w 15h 38m 55s"

      - false:
        5342 => "5s 342ms"
        1662885 => "27m 42s 885ms"
        245151535225 => "7y 40w 15h 38m 55s 225ms"
*/
```

## Ejemplos
```js
const ms = require("iblazingx-ms")

ms(0) // 
ms(144) // 144ms
ms(4252) // 4s 252ms
ms(10034533) // 2h 47m 14s 533ms
ms(5350000642400) // 169y 27w 5d 1h 17m 400ms

ms("267") // 267
ms("20s") // 20000
ms("1.5 years 6m") // 47336760000
ms("5w 6 hour 200ms") // 3045600200
ms("15m 20 second 6 minutes") // 1280000
```

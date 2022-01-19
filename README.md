
[![Package](https://img.shields.io/npm/v/iblazingx-ms?color=green&label=package)](https://www.npmjs.com/package/iblazingx-ms)
[![Size](https://img.shields.io/bundlephobia/min/iblazingx-ms)](https://www.npmjs.com/package/blx-discord_commands)
[![Paypal](https://img.shields.io/badge/donate-paypal-blue)](https://www.paypal.me/blazingx)
[![Twitter](https://img.shields.io/twitter/follow/IBlazingX?style=social)](https://www.twitter.com/IBlazingX)

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
    - false: el valor que te devuelva no contendra milisegundos
    - true: el valor que te devuelva contendra milisegundos (default)

    Ejemplos:
      - false:
        5342 => "5s"
        1662885 => "27m 42s"
        245151535225 => "7y 40w 15h 38m 55s"

      - true:
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

## Formatos
#### Milisegundos
- Ejemplo: **ms('346')**
- `ms` Ejemplo: **ms('346 ms')**
- `milisecond` Ejemplo: **ms('346milisecond')**
- `miliseconds` Ejemplo: **ms('346miliseconds')**

#### Segundos
- `s` Ejemplo: **ms('10s')**
- `second` Ejemplo: **ms('10 second')**
- `seconds` Ejemplo: **ms('10seconds')**

#### Minutos
- `m` Ejemplo: **ms('42m')**
- `minute` Ejemplo: **ms('42minute')**
- `minutes` Ejemplo: **ms('42 minutes')**

#### Horas
- `h` Ejemplo: **ms('28h')**
- `hour` Ejemplo: **ms('28 hour')**
- `hours` Ejemplo: **ms('28 hours')**

#### Días
- `d` Ejemplo: **ms('72 d')**
- `day` Ejemplo: **ms('72 day')**
- `days` Ejemplo: **ms('72 days')**

#### Semanas
- `w` Ejemplo: **ms('3 w')**
- `week` Ejemplo: **ms('3 week')**
- `weeks` Ejemplo: **ms('3weeks')**

#### Años
- `y` Ejemplo: **ms('671 y')**
- `year` Ejemplo: **ms('671year')**
- `years` Ejemplo: **ms('671 years')**


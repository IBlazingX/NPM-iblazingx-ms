// Variables
var
  s = 1000 // seconds
  m = s * 60 // minutes
  h = m * 60 // hours
  d = h * 24 // days
  w = d * 7 // weeks
  y = d * 365.25 // years

/**
 * Convierte `value`
 *
 * Options:
 *
 *  - `format` return format [long/short/number]
 *  - `miliseconds` enable return miliseconds [true/false] (default: true)
 *
 * @param {String|Number} value
 * @param {Object} [options]{long}
 * @throws {Error} lanza un error si value no es un numero o texto no vacio
 * @return {String|Number}
 * @api public
 */

module.exports = function(value, options) {
  options = options || {}
  var type = typeof value

  if (typeof options.miliseconds !== 'boolean') options.miliseconds = true
  if (!options.format || typeof options.format !== 'string') {
    if (type === 'number') options.format = 'short'
    if (type === 'string') options.format = 'number'
  }
  
  if (type === 'string' && value.length > 0) {
    if (options.format && options.format.toLowerCase() === 'long') return text(value, options.format, options.miliseconds)
    if (options.format && options.format.toLowerCase() === 'short') return text(value, options.format, options.miliseconds)
    return number(value, options.format, options.miliseconds)
  } else if (type === 'number' && isFinite(value)) {
    if (options.format && options.format.toLowerCase() === 'number') return number(value, options.format, options.miliseconds)
    if (options.format && options.format.toLowerCase() === 'long') return text(value, options.format, options.miliseconds)
    return text(value, options.format, options.miliseconds)
  }
  throw new Error(
    'value tiene que ser un numero o texto no vacio. value=' + JSON.stringify(value)
  )
}

/**
 * Convierte `str` retorna milisegundos
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function number(str, format, miliseconds) {
  format = format || 'short'
  var
    result
    list = []
    temp = ''
    args = String(str).split('')
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    letters = ['m', 'i', 'l', 'i', 's', 'e', 'c', 'o', 'n', 'd', 's', 's', 'e', 'c', 'o', 'n', 'd', 's', 'm', 'i', 'n', 'u', 't', 'e', 's', 'h', 'o', 'u', 'r', 's', 'd', 'a', 'y', 's', 'w', 'e', 'e', 'k', 's', 'y', 'e', 'a', 'r', 's']
    chars = ['ms', 'milisecond', 'miliseconds', 's', 'second', 'seconds', 'm', 'minute', 'minutes', 'h', 'hour', 'hours', 'd', 'day', 'days', 'w', 'week', 'weeks', 'y', 'year', 'years']

  for (i=0; i<1; i++){
    if (temp.length > 0) {
      if (temp.startsWith('number#') && letters.includes(args[0])) {
        list.push([String(temp.split('#')[0]), Number(temp.split('#')[1])])
        temp = ''
      } else if (temp.startsWith('letter#') && numbers.includes(args[0])) {
        if (chars.includes(temp.split('#')[1])) list.push([String(temp.split('#')[0]), String(temp.split('#')[1])])
        temp = ''
      }
    }

    if (temp.length <= 0) {
      if (list.length <= 0) {
        if (numbers.includes(args[0])) temp = `number#${args[0]}`
      } else {
        if (numbers.includes(args[0])) temp = `number#${args[0]}`
        if (letters.includes(args[0])) temp = `letter#${args[0]}`

        if (numbers.includes(args[0]) && list[list.length - 1][0] === 'number') list = list.slice(0, -1)
        if (letters.includes(args[0]) && list[list.length - 1][0] === 'letter') list = list.slice(0, -1)
      }
    } else if (temp.length > 0) {
      if (numbers.includes(args[0]) || letters.includes(args[0])) temp = `${temp}${args[0]}`
    }

    args = args.slice(1)

    if (args.length <= 0) {
      if (temp.length > 0) {
        if (list.length <= 0) {
          if (temp.startsWith('number#')) list.push([String(temp.split('#')[0]), Number(temp.split('#')[1])])
        } else {
          if (temp.startsWith('number#') && list[list.length - 1][0] === 'letter') list.push([String(temp.split('#')[0]), Number(temp.split('#')[1])])
          if (temp.startsWith('letter#') && chars.includes(temp.split('#')[1]) && list[list.length - 1][0] === 'number') list.push([String(temp.split('#')[0]), String(temp.split('#')[1])])
        }
      }

      break
    }
    
    i--  
  }

  if (typeof str === 'string') result = convert(list, format, miliseconds)
  if (typeof str === 'number') result = convert([ ['number', str] ], format, miliseconds)

  return result
}

/**
 * Convierte `num` retorna un tiempo en formato `format`
 *
 * @param {Number} num
 * @param {String} format
 * @return {String}
 * @api private
 */

function text(num, format, miliseconds) {
  format = format || 'short'
  var
    result
    list = []
    temp = ''
    args = String(num).split('')
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    letters = ['m', 'i', 'l', 'i', 's', 'e', 'c', 'o', 'n', 'd', 's', 's', 'e', 'c', 'o', 'n', 'd', 's', 'm', 'i', 'n', 'u', 't', 'e', 's', 'h', 'o', 'u', 'r', 's', 'd', 'a', 'y', 's', 'w', 'e', 'e', 'k', 's', 'y', 'e', 'a', 'r', 's']
    chars = ['ms', 'milisecond', 'miliseconds', 's', 'second', 'seconds', 'm', 'minute', 'minutes', 'h', 'hour', 'hours', 'd', 'day', 'days', 'w', 'week', 'weeks', 'y', 'year', 'years']

  for (i=0; i<1; i++){
    if (temp.length > 0) {
      if (temp.startsWith('number#') && letters.includes(args[0])) {
        list.push([String(temp.split('#')[0]), Number(temp.split('#')[1])])
        temp = ''
      } else if (temp.startsWith('letter#') && numbers.includes(args[0])) {
        if (chars.includes(temp.split('#')[1])) list.push([String(temp.split('#')[0]), String(temp.split('#')[1])])
        temp = ''
      }
    }

    if (temp.length <= 0) {
      if (list.length <= 0) {
        if (numbers.includes(args[0])) temp = `number#${args[0]}`
      } else {
        if (numbers.includes(args[0])) temp = `number#${args[0]}`
        if (letters.includes(args[0])) temp = `letter#${args[0]}`

        if (numbers.includes(args[0]) && list[list.length - 1][0] === 'number') list = list.slice(0, -1)
        if (letters.includes(args[0]) && list[list.length - 1][0] === 'letter') list = list.slice(0, -1)
      }
    } else if (temp.length > 0) {
      if (numbers.includes(args[0]) || letters.includes(args[0])) temp = `${temp}${args[0]}`
    }

    args = args.slice(1)

    if (args.length <= 0) {
      if (temp.length > 0) {
        if (list.length <= 0) {
          if (temp.startsWith('number#')) list.push([String(temp.split('#')[0]), Number(temp.split('#')[1])])
        } else {
          if (temp.startsWith('number#') && list[list.length - 1][0] === 'letter') list.push([String(temp.split('#')[0]), Number(temp.split('#')[1])])
          if (temp.startsWith('letter#') && chars.includes(temp.split('#')[1]) && list[list.length - 1][0] === 'number') list.push([String(temp.split('#')[0]), String(temp.split('#')[1])])
        }
      }

      break
    }
    
    i--  
  }

  if (typeof num === 'string') result = convert(list, format, miliseconds)
  if (typeof num === 'number') result = convert([ ['number', num] ], format, miliseconds)

  return result
}

/**
 * Convierte `args`
 *
 * @param {Array} args
 * @param {Boolean} type
 * @return {String|Number}
 * @api private
 */

function convert(args, type, miliseconds) {
  var
    result
    list = 0
    chars = [ ['ms', 'milisecond', 'miliseconds'], ['s', 'second', 'seconds'], ['m', 'minute', 'minutes'], ['h', 'hour', 'hours'], ['d', 'day', 'days'], ['w', 'week', 'weeks'], ['y', 'year', 'years'] ]

  for (i=0; i<1; i++) {
    var
      number = args[0] || undefined
      letter = args[1] || undefined
      
    if (args.length >= 2) {
      args = args.slice(2)
    } else if (args.length <= 1) {
      args = args.slice(1)
    }

    if (number) {
      if (letter) {
        if (chars[0].includes(letter[1])) list+= number[1]
        if (chars[1].includes(letter[1])) list+= number[1] * s
        if (chars[2].includes(letter[1])) list+= number[1] * m
        if (chars[3].includes(letter[1])) list+= number[1] * h
        if (chars[4].includes(letter[1])) list+= number[1] * d
        if (chars[5].includes(letter[1])) list+= number[1] * w
        if (chars[6].includes(letter[1])) list+= number[1] * y
      } else {
        list+= number[1]
      }
    }

    if (args.length <= 0) {
      list = Math.round(list)

      if (type === 'short' || type === 'long') {
        var 
          _y = Math.floor(list / y)
          _w = Math.floor((list - ((_y * y)) ) / w)
          _d = Math.floor((list - ((_y * y) + (_w * w)) ) / d)
          _h = Math.floor((list - ((_y * y) + (_w * w) + (_d * d)) ) / h)
          _m = Math.floor((list - ((_y * y) + (_w * w) + (_d * d) + (_h * h)) ) / m)
          _s = Math.floor((list - ((_y * y) + (_w * w) + (_d * d) + (_h * h) + (_m * m)) ) / s)
          _ms = Math.floor(list - ((_y * y) + (_w * w) + (_d * d) + (_h * h) + (_m * m) + (_s * s)))

        if (miliseconds === false) _ms = 0

        list = []
        if (type === 'short') {
          if (_y > 0) list.push(`${_y}y`)
          if (_w > 0) list.push(`${_w}w`)
          if (_d > 0) list.push(`${_d}d`)
          if (_h > 0) list.push(`${_h}h`)
          if (_m > 0) list.push(`${_m}m`)
          if (_s > 0) list.push(`${_s}s`)
          if (_ms > 0) list.push(`${_ms}ms`)
        } else {
          if (_y == 1) list.push(`${_y} year`)
          if (_y > 1) list.push(`${_y} years`)
          if (_w == 1) list.push(`${_w} week`)
          if (_w > 1) list.push(`${_w} weeks`)
          if (_d == 1) list.push(`${_d} day`)
          if (_d > 1) list.push(`${_d} days`)
          if (_h == 1) list.push(`${_h} hour`)
          if (_h > 1) list.push(`${_h} hours`)
          if (_m == 1) list.push(`${_m} minute`)
          if (_m > 1) list.push(`${_m} minutes`)
          if (_s == 1) list.push(`${_s} second`)
          if (_s > 1) list.push(`${_s} seconds`)
          if (_ms == 1) list.push(`${_ms} milisecond`)
          if (_ms > 1) list.push(`${_ms} miliseconds`)
        }

        list = list.join(' ')
      }

      if (type === 'number' && miliseconds === false) list = Math.floor(list / 1000)
      
      result = list

      break
    }

    i--
  }

  if (typeof result !== 'number' && typeof result !== 'string') result = undefined

  return result
}


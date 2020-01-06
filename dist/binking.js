/*
 * binking v1.0.0
 * Get bank logo, colors, phone, brand and etc. by card number
 * https://github.com/binkingio/binking.git
 * by BinKing (https://binking.io)
 */

(function () {
  var binking = function (cardNumberSource, optionsOrCallback, callbackSource) {
    var result = binking._assign({}, binking.defaultResult)
    var optionsAndCallback = binking._getOptionsAndCallback(optionsOrCallback, callbackSource)
    var options = optionsAndCallback.options
    var callback = optionsAndCallback.callback
    binking._checkOptions(options, 'Form')
    result.cardNumberSource = cardNumberSource
    result.cardNumberNormalized = binking._getCardNumberNormalized(result.cardNumberSource)
    if (options.strategy === 'archive') {
      if (result.cardNumberNormalized.length >= 6) {
        var bank = binking._getBankByCardNumber(result.cardNumberNormalized)
        binking._appendResultWithArchiveBank(result, options, bank)
      }
      binking._appendResultWithBrand(result, options)
      if (options.sync) {
        return result
      } else if (callback) {
        callback(result)
      } else if (binking._promiseSupported) {
        return Promise.resolve(result)
      }
    } else {
      if (result.cardNumberNormalized.length >= 6) {
        var apiRequestOptions = { apiUrl: options.apiFormUrl, apiKey: options.apiKey, cardNumber: result.cardNumberNormalized.substr(0, 6), sandbox: options.sandbox }
        if (callback) {
          binking._apiRequest(apiRequestOptions, function (res, err) {
            if (err) {
              console.error(err)
              binking._appendResultWithBrand(result, options)
              callback(result)
            } else {
              binking._appendResultByApiResponse(result, options, res)
              binking._appendResultWithBrand(result, options)
              callback(result)
            }
          })
        } else if (binking._promiseSupported) {
          return new Promise(function (resolve) {
            binking._apiRequest(apiRequestOptions, function (res, err) {
              if (err) {
                console.error(err)
                binking._appendResultWithBrand(result, options)
                resolve(result)
              } else {
                binking._appendResultByApiResponse(result, options, res)
                binking._appendResultWithBrand(result, options)
                resolve(result)
              }
            })
          })
        }
      } else {
        binking._appendResultWithBrand(result, options)
        if (callback) {
          callback(result)
        } else if (binking._promiseSupported) {
          return Promise.resolve(result)
        }
      }
    }
  }

  binking.getBrand = function (brandAlias, optionsSource) {
    var options = binking._assign({}, binking.defaultOptions, optionsSource || {})
    var brand = binking._brands[brandAlias]
    if (!brand) return null
    var logoOriginalSvg = options.brandsLogosPath + brand.alias + '-original.svg'
    var logoDarkSvg = options.brandsLogosPath + brand.alias + '-dark.svg'
    var logoLightSvg = options.brandsLogosPath + brand.alias + '-light.svg'
    var brandWithLogos = binking._assign({}, brand, { logoOriginalSvg: logoOriginalSvg, logoDarkSvg: logoDarkSvg, logoLightSvg: logoLightSvg })
    return brandWithLogos
  }

  binking.getBrands = function (brandsAliasesOrOptions, optionsSource) {
    var brandsAliases
    var options
    if (!brandsAliasesOrOptions) {
      brandsAliases = Object.keys(binking._brands)
      options = {}
    } else if (binking._isArray(brandsAliasesOrOptions)) {
      brandsAliases = brandsAliasesOrOptions
      options = optionsSource
    } else {
      brandsAliases = Object.keys(binking._brands)
      options = brandsAliasesOrOptions
    }
    var brandsWithLogos = []
    for (var i = 0; i < brandsAliases.length; i++) {
      var brandAlias = brandsAliases[i]
      var brandWithLogos = binking.getBrand(brandAlias, options)
      if (brandWithLogos) brandsWithLogos.push(brandWithLogos)
    }
    return brandsWithLogos
  }

  binking.getBank = function (bankAlias, optionsOrCallback, callbackSource) {
    var optionsAndCallback = binking._getOptionsAndCallback(optionsOrCallback, callbackSource)
    var options = optionsAndCallback.options
    var callback = optionsAndCallback.callback
    binking._checkOptions(options, 'Bank')
    var result
    if (options.strategy === 'archive') {
      var bank = binking._banks[bankAlias]
      result = bank ? binking._appendResultWithArchiveBank({}, options, bank) : null
      if (options.sync) {
        return result
      } else if (callback) {
        callback(result)
      } else if (binking._promiseSupported) {
        return Promise.resolve(result)
      }
    } else {
      var apiRequestOptions = { apiUrl: options.apiBankUrl, apiKey: options.apiKey, bankAlias: bankAlias, sandbox: options.sandbox }
      if (callback) {
        binking._apiRequest(apiRequestOptions, function (res, err) {
          if (err) {
            console.error(err)
            callback(null)
          } else {
            result = res ? binking._appendResultByApiResponse({}, options, res) : null
            callback(result)
          }
        })
      } else if (binking._promiseSupported) {
        return new Promise(function (resolve) {
          binking._apiRequest(apiRequestOptions, function (res, err) {
            if (err) {
              console.error(err)
              resolve(null)
            } else {
              result = res ? binking._appendResultByApiResponse({}, options, res) : null
              resolve(result)
            }
          })
        })
      }
    }
  }

  binking.getBanks = function (banksAliases, optionsOrCallback, callbackSource) {
    var optionsAndCallback = binking._getOptionsAndCallback(optionsOrCallback, callbackSource)
    var options = optionsAndCallback.options
    var callback = optionsAndCallback.callback
    binking._checkOptions(options, 'Banks')
    var result = []
    var i
    if (options.strategy === 'archive') {
      for (i = 0; i < banksAliases.length; i++) {
        var bankAlias = banksAliases[i]
        var bank = binking._banks[bankAlias]
        var resultPart = bank ? binking._appendResultWithArchiveBank({}, options, bank) : null
        result.push(resultPart)
      }
      if (options.sync) {
        return result
      } else if (callback) {
        callback(result)
      } else if (binking._promiseSupported) {
        return Promise.resolve(result)
      }
    } else {
      var apiRequestOptions = { apiUrl: options.apiBanksUrl, apiKey: options.apiKey, banksAliases: banksAliases.join(','), sandbox: options.sandbox }
      if (callback) {
        binking._apiRequest(apiRequestOptions, function (res, err) {
          if (err) {
            console.error(err)
            for (i = 0; i < banksAliases.length; i++) {
              result.push(null)
            }
            callback(result)
          } else {
            for (i = 0; i < res.length; i++) {
              var resPart = res[i]
              var resultPart = resPart ? binking._appendResultByApiResponse({}, options, resPart) : null
              result.push(resultPart)
            }
            callback(result)
          }
        })
      } else if (binking._promiseSupported) {
        return new Promise(function (resolve) {
          binking._apiRequest(apiRequestOptions, function (res, err) {
            if (err) {
              console.error(err)
              for (i = 0; i < banksAliases.length; i++) {
                result.push(null)
              }
              resolve(result)
            } else {
              for (i = 0; i < res.length; i++) {
                var resPart = res[i]
                var resultPart = resPart ? binking._appendResultByApiResponse({}, options, resPart) : null
                result.push(resultPart)
              }
              resolve(result)
            }
          })
        })
      }
    }
  }

  binking.setDefaultOptions = function (options) {
    binking._assign(binking.defaultOptions, options)
  }

  binking._checkOptions = function (options, method) {
    if (options.strategy === 'archive') {
      if (!Object.keys(binking._bins).length) {
        throw new Error('BinKing: you should add banks by binking.addBanks(banks) to use archive strategy')
      }
      if (!Object.keys(binking._banks).length) {
        throw new Error('BinKing: you should add bins by binking.addBins(bins) to use archive strategy')
      }
    } else if (options.strategy === 'api') {
      if (options['api' + method + 'Url'] === binking['_defaultApi' + method + 'Url'] && !options.apiKey) {
        throw new Error('BinKing: you should set option "apiKey" if you use api strategy with default api url')
      }
    } else {
      throw new Error('BinKing: you should set option "strategy" to "api" or "archive"')
    }
  }

  binking.setDefaultResult = function (props) {
    if (props.formBackgroundColor) {
      binking.defaultResult.formBackgroundColor = props.formBackgroundColor
    }
    if (props.formBackgroundColors) {
      binking.defaultResult.formBackgroundColors = props.formBackgroundColors
      binking.defaultResult.formBackgroundGradient = binking._getGradient(['#eeeeee', '#dddddd'], binking.defaultOptions.gradientDegrees)
    }
    if (props.formBackgroundLightness) {
      binking.defaultResult.formBackgroundLightness = props.formBackgroundLightness
    }
    if (props.formTextColor) {
      binking.defaultResult.formTextColor = props.formTextColor
    }
    if (props.formBorderColor) {
      binking.defaultResult.formBorderColor = props.formBorderColor
    }
  }

  binking._getOptionsAndCallback = function (optionsOrCallback, callbackSource) {
    var optionsSource = !optionsOrCallback || binking._isFunction(optionsOrCallback) ? {} : optionsOrCallback
    var options = binking._assign({}, binking.defaultOptions, optionsSource)
    var callback = callbackSource || (binking._isFunction(optionsOrCallback) ? optionsOrCallback : null)
    return { options: options, callback: callback }
  }

  binking._banks = {}

  binking.addBanks = function (banks) {
    binking._assign(binking._banks, banks)
  }

  binking._bins = {}

  binking.addBins = function (bins) {
    binking._assign(binking._bins, bins)
  }

  binking._appendResultWithBrand = function (result, options) {
    var brand = binking._getBrandByCardNumber(result.cardNumberNormalized)
    if (brand) {
      result.brandAlias = brand.alias
      result.brandName = brand.name
      result.brandLogoOriginalSvg = options.brandsLogosPath + brand.alias + '-original.svg'
      result.brandLogoDarkSvg = options.brandsLogosPath + brand.alias + '-dark.svg'
      result.brandLogoLightSvg = options.brandsLogosPath + brand.alias + '-light.svg'
      var formBrandLogoBasename = binking._getFormBrandLogoBasename(result.brandAlias, options.brandLogoPolicy, result.backgroundLightness, result.formLogoScheme)
      result.formBrandLogoSvg = options.brandsLogosPath + formBrandLogoBasename + '.svg'
      result.codeName = brand.codeName
      result.codeMaxLength = brand.codeMaxLength
      result.codeMinLength = brand.codeMinLength
      result.cardNumberLengths = brand.lengths
      result.cardNumberGaps = brand.gaps
    }
    result.cardNumberBlocks = binking._getBlocks(result.cardNumberGaps, result.cardNumberLengths)
    result.cardNumberMask = binking._getMask(options.maskDigitSymbol, options.maskDelimiterSymbol, result.cardNumberBlocks)
    result.cardNumberNice = binking._getNumberNice(result.cardNumberNormalized, result.cardNumberGaps)
  }

  binking._appendResultWithArchiveBank = function (result, options, bank) {
    if (bank) {
      binking._assign(result, bank)
      result.bankLogoBigOriginalSvg = options.banksLogosPath + bank.bankAlias + '-big-original.svg'
      result.bankLogoBigDarkSvg = options.banksLogosPath + bank.bankAlias + '-big-dark.svg'
      result.bankLogoBigLightSvg = options.banksLogosPath + bank.bankAlias + '-big-light.svg'
      result.bankLogoSmallOriginalSvg = options.banksLogosPath + bank.bankAlias + '-small-original.svg'
      result.bankLogoSmallDarkSvg = options.banksLogosPath + bank.bankAlias + '-small-dark.svg'
      result.bankLogoSmallLightSvg = options.banksLogosPath + bank.bankAlias + '-small-light.svg'
      result.formBankLogoBigSvg = options.banksLogosPath + bank.bankAlias + '-big-' + bank.formLogoScheme + '.svg'
      result.formBankLogoSmallSvg = options.banksLogosPath + bank.bankAlias + '-small-' + bank.formLogoScheme + '.svg'
    }
    result.formBackgroundGradient = binking._getGradient(result.formBackgroundColors, options.gradientDegrees)
    return result
  }

  binking._appendResultByApiResponse = function (result, options, res) {
    if (res) {
      binking._assign(result, res)
    }
    result.formBackgroundGradient = binking._getGradient(result.formBackgroundColors, options.gradientDegrees)
    return result
  }

  binking._assign = function () {
    var objTarget = arguments[0]
    for (var i = 1; i < arguments.length; i++) {
      var objSource = arguments[i]
      for (var key in objSource) {
        if (Object.prototype.hasOwnProperty.call(objSource, key)) {
          if (objSource[key] instanceof Array) {
            objTarget[key] = binking._assign([], objSource[key])
          } else {
            objTarget[key] = objSource[key]
          }
        }
      }
    }
    return objTarget
  }

  binking._getCardNumberNormalized = function (cardNumberSource) {
    var cardNumberSourceString = cardNumberSource + ''
    return cardNumberSourceString.replace(/\D/g, '')
  }

  binking._getBankByCardNumber = function (cardNumberNormalized) {
    if (cardNumberNormalized.length < 6) return null
    var bin = cardNumberNormalized.substr(0, 6)
    var bankAlias = binking._bins[bin]
    if (!bankAlias) return null
    var bank = binking._banks[bankAlias]
    return bank || null
  }

  binking._getGradient = function (colors, gradientDegrees) {
    return 'linear-gradient(' + gradientDegrees + 'deg, ' + colors.join(', ') + ')'
  }

  binking._brands = {
    visa: {
      name: 'Visa',
      alias: 'visa',
      pattern: /^4/,
      gaps: [4, 8, 12],
      lengths: [16, 18, 19],
      codeName: 'CVV',
      codeMinLength: 3,
      codeMaxLength: 3
    },
    mastercard: {
      name: 'Mastercard',
      alias: 'mastercard',
      pattern: /^(51|52|53|54|55|22|23|24|25|26|27)/,
      gaps: [4, 8, 12],
      lengths: [16],
      codeName: 'CVC',
      codeMinLength: 3,
      codeMaxLength: 3
    },
    'american-express': {
      name: 'American Express',
      alias: 'american-express',
      pattern: /^(34|37)/,
      gaps: [4, 10],
      lengths: [15],
      codeName: 'CID',
      codeMinLength: 3,
      codeMaxLength: 4
    },
    'diners-club': {
      name: 'Diners Club',
      alias: 'diners-club',
      pattern: /^(30|36|38|39)/,
      gaps: [4, 10],
      lengths: [14, 16, 19],
      codeName: 'CVV',
      codeMinLength: 3,
      codeMaxLength: 3
    },
    discover: {
      name: 'Discover',
      alias: 'discover',
      pattern: /^(60|64|65)/,
      gaps: [4, 8, 12],
      lengths: [16, 19],
      codeName: 'CID',
      codeMinLength: 3,
      codeMaxLength: 3
    },
    jcb: {
      name: 'JCB',
      alias: 'jcb',
      pattern: /^(18|21|35)/,
      gaps: [4, 8, 12],
      lengths: [16, 17, 18, 19],
      codeName: 'CVV',
      codeMinLength: 3,
      codeMaxLength: 3
    },
    unionpay: {
      name: 'UnionPay',
      alias: 'unionpay',
      pattern: /^(62)/,
      gaps: [4, 8, 12],
      lengths: [14, 15, 16, 17, 18, 19],
      codeName: 'CVN',
      codeMinLength: 3,
      codeMaxLength: 3
    },
    maestro: {
      name: 'Maestro',
      alias: 'maestro',
      pattern: /^(49|50|56|59|63|67)/,
      gaps: [4, 8, 12],
      lengths: [12, 13, 14, 15, 16, 17, 18, 19],
      codeName: 'CVC',
      codeMinLength: 3,
      codeMaxLength: 3
    },
    mir: {
      name: 'Mir',
      alias: 'mir',
      pattern: /^(22)/,
      gaps: [4, 8, 12],
      lengths: [16, 17, 18, 19],
      codeName: 'CVP2',
      codeMinLength: 3,
      codeMaxLength: 3
    }
  }

  binking._getBrandByCardNumber = function (cardNumberNormalized) {
    if (!cardNumberNormalized) return null
    var brands = []
    for (var brandAlias in binking._brands) {
      if (Object.prototype.hasOwnProperty.call(binking._brands, brandAlias)) {
        if (binking._brands[brandAlias].pattern.test(cardNumberNormalized)) brands.push(this._brands[brandAlias])
      }
    }
    if (brands.length === 1) return brands[0]
    return null
  }

  binking._isArray = function (arg) {
    if (!arg) return false
    return Object.prototype.toString.call(arg) === '[object Array]'
  }

  binking._isFunction = function (arg) {
    if (!arg) return false
    return Object.prototype.toString.call(arg) === '[object Function]'
  }

  binking._promiseSupported = typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1

  binking._getFormBrandLogoBasename = function (brandAlias, brandLogoPolicy, formBackgroundLightness, formLogoScheme) {
    switch (brandLogoPolicy) {
      case 'auto':
        return brandAlias + '-' + (formLogoScheme || 'original')
      case 'original':
        return brandAlias + '-original'
      case 'mono':
        return brandAlias + (formBackgroundLightness === 'light' ? '-dark' : '-light')
      case 'dark':
        return brandAlias + '-dark'
      case 'light':
        return brandAlias + '-light'
      default:
        return brandAlias + '-original'
    }
  }

  binking._getBlocks = function (cardNumberGaps, cardNumberLengths) {
    var numberLength = cardNumberLengths[cardNumberLengths.length - 1]
    var blocks = []
    for (var i = cardNumberGaps.length - 1; i >= 0; i--) {
      var blockLength = numberLength - cardNumberGaps[i]
      numberLength -= blockLength
      blocks.push(blockLength)
    }
    blocks.push(numberLength)
    return blocks.reverse()
  }

  binking._getMask = function (maskDigitSymbol, maskDelimiterSymbol, cardNumberBlocks) {
    var mask = ''
    for (var i = 0; i < cardNumberBlocks.length; i++) {
      mask += (i ? maskDelimiterSymbol : '') + Array(cardNumberBlocks[i] + 1).join(maskDigitSymbol)
    }
    return mask
  }

  binking._getNumberNice = function (cardNumberNormalized, cardNumberGaps) {
    var offsets = [0].concat(cardNumberGaps).concat([cardNumberNormalized.length])
    var components = []
    for (var i = 0; offsets[i] < cardNumberNormalized.length; i++) {
      var start = offsets[i]
      var end = Math.min(offsets[i + 1], cardNumberNormalized.length)
      components.push(cardNumberNormalized.substring(start, end))
    }
    return components.join(' ')
  }

  binking._buildUrl = function (url, data) {
    var fullUrl = url
    var firstKey = true
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== undefined) {
        fullUrl += (firstKey ? '?' : '&') + key + '=' + data[key]
        firstKey = false
      }
    }
    return fullUrl
  }

  binking._apiRequestsCount = 0

  binking._savedApiResults = {}

  binking._request = function (url, callback) {
    var _XMLHttpRequest = binking._XMLHttpRequest
    var xhr = new _XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return
      var parsedRes, err
      try {
        parsedRes = JSON.parse(this.responseText)
      } catch (e) {
        err = new Error(this.responseText)
        callback(null, err)
        return false
      }
      if (this.status !== 200) {
        err = new Error('BinKing Api Error: ' + parsedRes.message)
        callback(null, err)
      } else {
        callback(parsedRes)
      }
    }
    xhr.send()
  }

  binking._apiRequest = function (apiRequestOptions, callback) {
    var apiUrl = apiRequestOptions.apiUrl
    var apiKey = apiRequestOptions.apiKey
    var cardNumber = apiRequestOptions.cardNumber
    var bankAlias = apiRequestOptions.bankAlias
    var banksAliases = apiRequestOptions.banksAliases
    var sandbox = apiRequestOptions.sandbox
    var url = binking._buildUrl(apiUrl, {
      apiKey: apiKey,
      cardNumber: cardNumber,
      bankAlias: bankAlias,
      banksAliases: banksAliases,
      sandbox: sandbox ? 1 : undefined
    })
    var savedApiResult = binking._savedApiResults[url]
    if (savedApiResult) {
      if (savedApiResult === 'pending') {
        var interval = setInterval(function () {
          var savedApiResultUpdated = binking._savedApiResults[url]
          if (savedApiResultUpdated !== 'pending') {
            clearInterval(interval)
            callback(savedApiResultUpdated[0], savedApiResultUpdated[1])
          }
        }, 100)
      } else {
        callback(savedApiResult[0], savedApiResult[1])
      }
    } else {
      binking._apiRequestsCount++
      binking._savedApiResults[url] = 'pending'
      binking._request(url, function (result, err) {
        binking._savedApiResults[url] = [result, err]
        callback(result, err)
      })
    }
  }

  binking._XMLHttpRequest = typeof XMLHttpRequest !== 'undefined' ? XMLHttpRequest : undefined

  binking._defaultApiFormUrl = 'https://api.binking.io/form'
  binking._defaultApiBankUrl = 'https://api.binking.io/bank'
  binking._defaultApiBanksUrl = 'https://api.binking.io/banks'

  binking.defaultOptions = {
    strategy: 'api',
    apiFormUrl: binking._defaultApiFormUrl,
    apiBankUrl: binking._defaultApiBankUrl,
    apiBanksUrl: binking._defaultApiBanksUrl,
    apiKey: undefined,
    sandbox: false,
    sync: false,
    banksLogosPath: '',
    brandsLogosPath: 'https://static.binking.io/brands-logos/',
    maskDigitSymbol: '0',
    maskDelimiterSymbol: ' ',
    gradientDegrees: 135,
    brandLogoPolicy: 'auto'
  }

  binking.defaultResult = {
    bankAlias: null,
    bankName: null,
    bankLocalName: null,
    bankCountry: null,
    bankSite: null,
    bankPhone: null,
    bankLogoBigOriginalSvg: null,
    bankLogoBigDarkSvg: null,
    bankLogoBigLightSvg: null,
    bankLogoSmallOriginalSvg: null,
    bankLogoSmallDarkSvg: null,
    bankLogoSmallLightSvg: null,
    bankColor: null,
    bankColors: null,
    brandAlias: null,
    brandName: null,
    brandLogoOriginalSvg: null,
    brandLogoDarkSvg: null,
    brandLogoLightSvg: null,
    formBackgroundColor: '#eeeeee',
    formBackgroundColors: ['#eeeeee', '#dddddd'],
    formBackgroundGradient: binking._getGradient(['#eeeeee', '#dddddd'], binking.defaultOptions.gradientDegrees),
    formBackgroundLightness: 'light',
    formTextColor: '#000000',
    formBorderColor: '#333333',
    formBrandLogoSvg: null,
    formBankLogoBigSvg: null,
    formBankLogoSmallSvg: null,
    formLogoScheme: null,
    codeName: null,
    codeMinLength: 3,
    codeMaxLength: 4,
    cardNumberMask: '0000 0000 0000 0000000',
    cardNumberGaps: [4, 8, 12],
    cardNumberBlocks: [4, 4, 4, 7],
    cardNumberLengths: [12, 13, 14, 15, 16, 17, 18, 19],
    cardNumberNice: '',
    cardNumberNormalized: '',
    cardNumberSource: undefined
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = binking
    }
    exports.binking = binking
  } else if (typeof window !== 'undefined') {
    window.binking = binking
  }
})()

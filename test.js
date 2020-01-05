var isBrowser = typeof window !== 'undefined'
var expect = isBrowser ? window.expect : require('expect.js')
var _ = isBrowser ? window._ : require('underscore')
var binking = isBrowser ? window.binking : require('./index.js')
if (!isBrowser) binking._XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var apiKey = isBrowser ? window.location.hash.substr(1) : process.env.API_KEY

var banks = {
  'ru-sberbank': {
    bankAlias: 'ru-sberbank',
    bankName: 'Sberbank',
    bankLocalName: 'Сбербанк России',
    bankColor: '#1a9f29',
    bankColors: ['#1a9f29'],
    bankCountry: 'ru',
    bankSite: 'https://www.sberbank.ru',
    bankPhone: '8 800 555-55-50',
    formBackgroundColor: '#1a9f29',
    formBackgroundColors: ['#1a9f29', '#0d7518'],
    formBackgroundLightness: 'dark',
    formTextColor: '#ffffff',
    formLogoScheme: 'light',
    formBorderColor: '#ffffff'
  },
  'ru-rosbank': {
    bankAlias: 'ru-rosbank',
    bankName: 'Rosbank',
    bankLocalName: 'Росбанк',
    bankColor: '#ff0016',
    bankColors: ['#ff0016', '#000000'],
    bankCountry: 'ru',
    bankSite: 'https://www.rosbank.ru',
    bankPhone: '8 800 200-54-34',
    formBackgroundColor: '#f0f0f0',
    formBackgroundColors: ['#f0f0f0', '#d6d0d0'],
    formBackgroundLightness: 'light',
    formTextColor: '#000000',
    formLogoScheme: 'original',
    formBorderColor: '#d6d0d0'
  }
}
var bins = {
  402333: 'ru-sberbank',
  546918: 'ru-sberbank',
  400812: 'ru-rosbank',
  677721: 'ru-rosbank'
}
var getBankSberbankApiResult = {
  bankAlias: 'ru-sberbank',
  bankName: 'Sberbank',
  bankLocalName: 'Сбербанк России',
  bankLogoBigOriginalSvg: 'https://static.binking.io/banks-logos/c4902a868555835e.svg',
  bankLogoBigDarkSvg: 'https://static.binking.io/banks-logos/2553ee39193f832b.svg',
  bankLogoBigLightSvg: 'https://static.binking.io/banks-logos/dd12813fcdc36407.svg',
  bankLogoSmallOriginalSvg: 'https://static.binking.io/banks-logos/3dc348ddd7af05f0.svg',
  bankLogoSmallDarkSvg: 'https://static.binking.io/banks-logos/140dabf53b7fdc36.svg',
  bankLogoSmallLightSvg: 'https://static.binking.io/banks-logos/0d4639f082f52d37.svg',
  bankColor: '#1a9f29',
  bankColors: ['#1a9f29'],
  bankCountry: 'ru',
  bankSite: 'https://www.sberbank.ru',
  bankPhone: '8 800 555-55-50',
  formBackgroundColor: '#1a9f29',
  formBackgroundColors: ['#1a9f29', '#0d7518'],
  formBackgroundGradient: 'linear-gradient(135deg, #1a9f29, #0d7518)',
  formBackgroundLightness: 'dark',
  formTextColor: '#ffffff',
  formBorderColor: '#ffffff',
  formBankLogoBigSvg: 'https://static.binking.io/banks-logos/dd12813fcdc36407.svg',
  formBankLogoSmallSvg: 'https://static.binking.io/banks-logos/0d4639f082f52d37.svg',
  formLogoScheme: 'light'
}
var getBankSberbankArchiveResult = {
  bankAlias: 'ru-sberbank',
  bankName: 'Sberbank',
  bankLocalName: 'Сбербанк России',
  bankLogoBigOriginalSvg: 'ru-sberbank-big-original.svg',
  bankLogoBigDarkSvg: 'ru-sberbank-big-dark.svg',
  bankLogoBigLightSvg: 'ru-sberbank-big-light.svg',
  bankLogoSmallOriginalSvg: 'ru-sberbank-small-original.svg',
  bankLogoSmallDarkSvg: 'ru-sberbank-small-dark.svg',
  bankLogoSmallLightSvg: 'ru-sberbank-small-light.svg',
  bankColor: '#1a9f29',
  bankColors: ['#1a9f29'],
  bankCountry: 'ru',
  bankSite: 'https://www.sberbank.ru',
  bankPhone: '8 800 555-55-50',
  formBackgroundColor: '#1a9f29',
  formBackgroundColors: ['#1a9f29', '#0d7518'],
  formBackgroundGradient: 'linear-gradient(135deg, #1a9f29, #0d7518)',
  formBackgroundLightness: 'dark',
  formTextColor: '#ffffff',
  formBorderColor: '#ffffff',
  formBankLogoBigSvg: 'ru-sberbank-big-light.svg',
  formBankLogoSmallSvg: 'ru-sberbank-small-light.svg',
  formLogoScheme: 'light'
}
var bankDetectedBrandDetectedCardNumber = '40233300'
var bankDetectedBrandDetectedResult = {
  bankAlias: 'ru-sberbank',
  bankName: 'Sberbank',
  bankLocalName: 'Сбербанк России',
  bankLogoBigOriginalSvg: 'https://static.binking.io/banks-logos/c4902a868555835e.svg',
  bankLogoBigDarkSvg: 'https://static.binking.io/banks-logos/2553ee39193f832b.svg',
  bankLogoBigLightSvg: 'https://static.binking.io/banks-logos/dd12813fcdc36407.svg',
  bankLogoSmallOriginalSvg: 'https://static.binking.io/banks-logos/3dc348ddd7af05f0.svg',
  bankLogoSmallDarkSvg: 'https://static.binking.io/banks-logos/140dabf53b7fdc36.svg',
  bankLogoSmallLightSvg: 'https://static.binking.io/banks-logos/0d4639f082f52d37.svg',
  bankColor: '#1a9f29',
  bankColors: ['#1a9f29'],
  bankCountry: 'ru',
  bankSite: 'https://www.sberbank.ru',
  bankPhone: '8 800 555-55-50',
  brandAlias: 'visa',
  brandName: 'Visa',
  brandLogoOriginalSvg: 'https://static.binking.io/brands-logos/visa-original.svg',
  brandLogoDarkSvg: 'https://static.binking.io/brands-logos/visa-dark.svg',
  brandLogoLightSvg: 'https://static.binking.io/brands-logos/visa-light.svg',
  formBackgroundColor: '#1a9f29',
  formBackgroundColors: ['#1a9f29', '#0d7518'],
  formBackgroundGradient: 'linear-gradient(135deg, #1a9f29, #0d7518)',
  formBackgroundLightness: 'dark',
  formTextColor: '#ffffff',
  formBorderColor: '#ffffff',
  formBrandLogoSvg: 'https://static.binking.io/brands-logos/visa-light.svg',
  formBankLogoBigSvg: 'https://static.binking.io/banks-logos/dd12813fcdc36407.svg',
  formBankLogoSmallSvg: 'https://static.binking.io/banks-logos/0d4639f082f52d37.svg',
  formLogoScheme: 'light',
  codeName: 'CVV',
  codeMinLength: 3,
  codeMaxLength: 3,
  cardNumberMask: '0000 0000 0000 0000000',
  cardNumberGaps: [4, 8, 12],
  cardNumberBlocks: [4, 4, 4, 7],
  cardNumberLengths: [16, 18, 19],
  cardNumberNice: '4023 3300',
  cardNumberNormalized: '40233300',
  cardNumberSource: '40233300'
}
var bankDetectedBrandDetectedResultArchive = _.assign({}, bankDetectedBrandDetectedResult, {
  formBankLogoBigSvg: '/banks-logos-path/ru-sberbank-big-light.svg',
  formBankLogoSmallSvg: '/banks-logos-path/ru-sberbank-small-light.svg',
  bankLogoBigOriginalSvg: '/banks-logos-path/ru-sberbank-big-original.svg',
  bankLogoBigDarkSvg: '/banks-logos-path/ru-sberbank-big-dark.svg',
  bankLogoBigLightSvg: '/banks-logos-path/ru-sberbank-big-light.svg',
  bankLogoSmallOriginalSvg: '/banks-logos-path/ru-sberbank-small-original.svg',
  bankLogoSmallDarkSvg: '/banks-logos-path/ru-sberbank-small-dark.svg',
  bankLogoSmallLightSvg: '/banks-logos-path/ru-sberbank-small-light.svg'
})
var bankNotDetectedBrandDetectedCardNumber = '40000000'
var bankNotDetectedBrandDetectedResult = {
  bankAlias: null,
  bankName: null,
  bankLocalName: null,
  bankLogoBigOriginalSvg: null,
  bankLogoBigDarkSvg: null,
  bankLogoBigLightSvg: null,
  bankLogoSmallOriginalSvg: null,
  bankLogoSmallDarkSvg: null,
  bankLogoSmallLightSvg: null,
  bankColor: null,
  bankColors: null,
  bankCountry: null,
  bankSite: null,
  bankPhone: null,
  brandAlias: 'visa',
  brandName: 'Visa',
  brandLogoOriginalSvg: 'https://static.binking.io/brands-logos/visa-original.svg',
  brandLogoDarkSvg: 'https://static.binking.io/brands-logos/visa-dark.svg',
  brandLogoLightSvg: 'https://static.binking.io/brands-logos/visa-light.svg',
  formBackgroundColor: '#eeeeee',
  formBackgroundColors: ['#eeeeee', '#dddddd'],
  formBackgroundGradient: 'linear-gradient(135deg, #eeeeee, #dddddd)',
  formBackgroundLightness: 'light',
  formTextColor: '#000000',
  formBorderColor: '#333333',
  formBrandLogoSvg: 'https://static.binking.io/brands-logos/visa-original.svg',
  formBankLogoBigSvg: null,
  formBankLogoSmallSvg: null,
  formLogoScheme: null,
  codeName: 'CVV',
  codeMinLength: 3,
  codeMaxLength: 3,
  cardNumberMask: '0000 0000 0000 0000000',
  cardNumberGaps: [4, 8, 12],
  cardNumberBlocks: [4, 4, 4, 7],
  cardNumberLengths: [16, 18, 19],
  cardNumberNice: '4000 0000',
  cardNumberNormalized: '40000000',
  cardNumberSource: '40000000'
}
var bankNotDetectedBrandNotDetectedCardNumber = '00000000'
var bankNotDetectedBrandNotDetectedResult = {
  bankAlias: null,
  bankName: null,
  bankLocalName: null,
  bankLogoBigOriginalSvg: null,
  bankLogoBigDarkSvg: null,
  bankLogoBigLightSvg: null,
  bankLogoSmallOriginalSvg: null,
  bankLogoSmallDarkSvg: null,
  bankLogoSmallLightSvg: null,
  bankColor: null,
  bankColors: null,
  bankCountry: null,
  bankSite: null,
  bankPhone: null,
  brandAlias: null,
  brandName: null,
  brandLogoOriginalSvg: null,
  brandLogoDarkSvg: null,
  brandLogoLightSvg: null,
  formBackgroundColor: '#eeeeee',
  formBackgroundColors: ['#eeeeee', '#dddddd'],
  formBackgroundGradient: 'linear-gradient(135deg, #eeeeee, #dddddd)',
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
  cardNumberNice: '0000 0000',
  cardNumberNormalized: '00000000',
  cardNumberSource: '00000000'
}
var brandDetectedCardNumber = '400'
var brandDetectedResult = {
  bankAlias: null,
  bankName: null,
  bankLocalName: null,
  bankLogoBigOriginalSvg: null,
  bankLogoBigDarkSvg: null,
  bankLogoBigLightSvg: null,
  bankLogoSmallOriginalSvg: null,
  bankLogoSmallDarkSvg: null,
  bankLogoSmallLightSvg: null,
  bankColor: null,
  bankColors: null,
  bankCountry: null,
  bankSite: null,
  bankPhone: null,
  brandAlias: 'visa',
  brandName: 'Visa',
  brandLogoOriginalSvg: 'https://static.binking.io/brands-logos/visa-original.svg',
  brandLogoDarkSvg: 'https://static.binking.io/brands-logos/visa-dark.svg',
  brandLogoLightSvg: 'https://static.binking.io/brands-logos/visa-light.svg',
  formBackgroundColor: '#eeeeee',
  formBackgroundColors: ['#eeeeee', '#dddddd'],
  formBackgroundGradient: 'linear-gradient(135deg, #eeeeee, #dddddd)',
  formBackgroundLightness: 'light',
  formTextColor: '#000000',
  formBorderColor: '#333333',
  formBrandLogoSvg: 'https://static.binking.io/brands-logos/visa-original.svg',
  formBankLogoBigSvg: null,
  formBankLogoSmallSvg: null,
  formLogoScheme: null,
  codeName: 'CVV',
  codeMinLength: 3,
  codeMaxLength: 3,
  cardNumberMask: '0000 0000 0000 0000000',
  cardNumberGaps: [4, 8, 12],
  cardNumberBlocks: [4, 4, 4, 7],
  cardNumberLengths: [16, 18, 19],
  cardNumberNice: '400',
  cardNumberNormalized: '400',
  cardNumberSource: '400'
}
var brandNotDetectedCardNumber = '000'
var brandNotDetectedResult = {
  bankAlias: null,
  bankName: null,
  bankLocalName: null,
  bankLogoBigOriginalSvg: null,
  bankLogoBigDarkSvg: null,
  bankLogoBigLightSvg: null,
  bankLogoSmallOriginalSvg: null,
  bankLogoSmallDarkSvg: null,
  bankLogoSmallLightSvg: null,
  bankColor: null,
  bankColors: null,
  bankCountry: null,
  bankSite: null,
  bankPhone: null,
  brandAlias: null,
  brandName: null,
  brandLogoOriginalSvg: null,
  brandLogoDarkSvg: null,
  brandLogoLightSvg: null,
  formBackgroundColor: '#eeeeee',
  formBackgroundColors: ['#eeeeee', '#dddddd'],
  formBackgroundGradient: 'linear-gradient(135deg, #eeeeee, #dddddd)',
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
  cardNumberNice: '000',
  cardNumberNormalized: '000',
  cardNumberSource: '000'
}
var emptyResult = _.assign({}, binking.defaultResult, { cardNumberSource: '' })

describe('binking()', function () {
  it('should work when brand and bank not detected (callback, api)', function (done) {
    binking(bankNotDetectedBrandNotDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.eql(bankNotDetectedBrandNotDetectedResult)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand and bank not detected (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(bankNotDetectedBrandNotDetectedCardNumber, { strategy: 'archive' }, function (result, err) {
      expect(result).to.eql(bankNotDetectedBrandNotDetectedResult)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand and bank not detected (promise, api)', function (done) {
    binking(bankNotDetectedBrandNotDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.eql(bankNotDetectedBrandNotDetectedResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand and bank not detected (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(bankNotDetectedBrandNotDetectedCardNumber, { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.eql(bankNotDetectedBrandNotDetectedResult)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand and bank not detected (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking(bankNotDetectedBrandNotDetectedCardNumber, { strategy: 'archive', sync: true })
    expect(result).to.eql(bankNotDetectedBrandNotDetectedResult)
    binking._banks = {}
    binking._bins = {}
  })

  it('should work when brand detected and bank not detected (callback, api)', function (done) {
    binking(bankNotDetectedBrandDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.eql(bankNotDetectedBrandDetectedResult)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand detected and bank not detected if api not working (callback, api)', function (done) {
    binking(bankNotDetectedBrandDetectedCardNumber, { strategy: 'api', apiKey: 'badApiKey', sandbox: true })
      .then(function (result) {
        expect(result).to.eql(bankNotDetectedBrandDetectedResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand detected and bank not detected (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(bankNotDetectedBrandDetectedCardNumber, { strategy: 'archive' }, function (result, err) {
      expect(result).to.eql(bankNotDetectedBrandDetectedResult)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand detected and bank not detected (promise, api)', function (done) {
    binking(bankNotDetectedBrandDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.eql(bankNotDetectedBrandDetectedResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand detected and bank not detected if api not working (promise, api)', function (done) {
    binking(bankNotDetectedBrandDetectedCardNumber, { strategy: 'api', apiKey: 'badApiKey', sandbox: true })
      .then(function (result) {
        expect(result).to.eql(bankNotDetectedBrandDetectedResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand detected and bank not detected (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(bankNotDetectedBrandDetectedCardNumber, { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.eql(bankNotDetectedBrandDetectedResult)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand detected and bank not detected (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking(bankNotDetectedBrandDetectedCardNumber, { strategy: 'archive', sync: true })
    expect(result).to.eql(bankNotDetectedBrandDetectedResult)
    binking._banks = {}
    binking._bins = {}
  })

  it('should work when brand and bank detected (callback, api)', function (done) {
    binking(bankDetectedBrandDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.eql(bankDetectedBrandDetectedResult)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand and bank detected (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(bankDetectedBrandDetectedCardNumber, { strategy: 'archive', banksLogosPath: '/banks-logos-path/' }, function (result, err) {
      expect(result).to.eql(bankDetectedBrandDetectedResultArchive)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand and bank detected (promise, api)', function (done) {
    binking(bankDetectedBrandDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.eql(bankDetectedBrandDetectedResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand and bank detected (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(bankDetectedBrandDetectedCardNumber, { strategy: 'archive', banksLogosPath: '/banks-logos-path/' })
      .then(function (result) {
        expect(result).to.eql(bankDetectedBrandDetectedResultArchive)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand and bank detected (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking(bankDetectedBrandDetectedCardNumber, { strategy: 'archive', sync: true, banksLogosPath: '/banks-logos-path/' })
    expect(result).to.eql(bankDetectedBrandDetectedResultArchive)
    binking._banks = {}
    binking._bins = {}
  })

  it('should work when brand detected and cardNumber length less then six (callback, api)', function (done) {
    binking(brandDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.eql(brandDetectedResult)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand detected and cardNumber length less then six (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(brandDetectedCardNumber, { strategy: 'archive' }, function (result, err) {
      expect(result).to.eql(brandDetectedResult)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand detected and cardNumber length less then six (promise, api)', function (done) {
    binking(brandDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.eql(brandDetectedResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand detected and cardNumber length less then six (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(brandDetectedCardNumber, { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.eql(brandDetectedResult)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand detected and cardNumber length less then six (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking(brandDetectedCardNumber, { strategy: 'archive', sync: true })
    expect(result).to.eql(brandDetectedResult)
    binking._banks = {}
    binking._bins = {}
  })

  it('should work when brand not detected and cardNumber length less then six (callback, api)', function (done) {
    binking(brandNotDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.eql(brandNotDetectedResult)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand not detected and cardNumber length less then six (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(brandNotDetectedCardNumber, { strategy: 'archive' }, function (result, err) {
      expect(result).to.eql(brandNotDetectedResult)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when brand not detected and cardNumber length less then six (promise, api)', function (done) {
    binking(brandNotDetectedCardNumber, { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.eql(brandNotDetectedResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand not detected and cardNumber length less then six (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking(brandNotDetectedCardNumber, { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.eql(brandNotDetectedResult)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when brand not detected and cardNumber length less then six (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking(brandNotDetectedCardNumber, { strategy: 'archive', sync: true })
    expect(result).to.eql(brandNotDetectedResult)
    binking._banks = {}
    binking._bins = {}
  })

  it('should work when cardNumber is empty (callback, api)', function (done) {
    binking('', { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.eql(emptyResult)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when cardNumber is empty (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking('', { strategy: 'archive' }, function (result, err) {
      expect(result).to.eql(emptyResult)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should work when cardNumber is empty (promise, api)', function (done) {
    binking('', { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.eql(emptyResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when cardNumber is empty (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking('', { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.eql(emptyResult)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should work when cardNumber is empty (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking('', { strategy: 'archive', sync: true })
    expect(result).to.eql(emptyResult)
    binking._banks = {}
    binking._bins = {}
  })

  it('Should not make unnecessary api requests (callback, api)', function (done) {
    binking._apiRequestsCount = 0
    binking._savedApiResults = {}
    binking('00000', { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      if (err) {
        done(err)
      }
      binking('000000', { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
        if (err) {
          done(err)
        }
        binking('0000000', { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
          if (err) {
            done(err)
          }
          binking('111111', { strategy: 'api', apiKey: apiKey, sandbox: true })
          binking('111111', { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
            if (err) {
              done(err)
            }
            expect(binking._apiRequestsCount).to.eql(2)
            done()
          })
        })
      })
    })
  })

  it('Should not make unnecessary api requests (promise, api)', function (done) {
    binking._apiRequestsCount = 0
    binking._savedApiResults = {}
    binking('00000', { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(() => binking('000000', { strategy: 'api', apiKey: apiKey, sandbox: true }))
      .then(() => binking('0000000', { strategy: 'api', apiKey: apiKey, sandbox: true }))
      .then(() => {
        binking('111111', { strategy: 'api', apiKey: apiKey, sandbox: true })
        return binking('111111', { strategy: 'api', apiKey: apiKey, sandbox: true })
      })
      .then(() => {
        expect(binking._apiRequestsCount).to.eql(2)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })
})

describe('binking.getBank()', function () {
  it('should return bank if found (callback, api)', function (done) {
    binking.getBank('ru-sberbank', { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.eql(getBankSberbankApiResult)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should return bank if found (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking.getBank('ru-sberbank', { strategy: 'archive' }, function (result, err) {
      expect(result).to.eql(getBankSberbankArchiveResult)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should return bank if found (promise, api)', function (done) {
    binking
      .getBank('ru-sberbank', { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.eql(getBankSberbankApiResult)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should return bank if found (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking
      .getBank('ru-sberbank', { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.eql(getBankSberbankArchiveResult)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should return bank if found (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking.getBank('ru-sberbank', { strategy: 'archive', sync: true })
    expect(result).to.eql(getBankSberbankArchiveResult)
    binking._banks = {}
    binking._bins = {}
  })

  it('should return null if not found (callback, api)', function (done) {
    binking.getBank('ru-xxx', { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.equal(null)
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should return null if not found (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking.getBank('ru-xxx', { strategy: 'archive' }, function (result, err) {
      expect(result).to.equal(null)
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should return null if not found (promise, api)', function (done) {
    binking
      .getBank('ru-xxx', { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.equal(null)
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should return null if not found (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking
      .getBank('ru-xxx', { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.equal(null)
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should return null if not found (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking.getBank('ru-xxx', { strategy: 'archive', sync: true })
    expect(result).to.equal(null)
    binking._banks = {}
    binking._bins = {}
  })
})

describe('binking.getBanks()', function () {
  it('should return array of banks or nulls (callback, api)', function (done) {
    binking.getBanks(['ru-sberbank', 'ru-xxx', 'ru-rosbank'], { strategy: 'api', apiKey: apiKey, sandbox: true }, function (result, err) {
      expect(result).to.be.an('array')
      expect(result[0]).to.eql(getBankSberbankApiResult)
      expect(result[1]).to.equal(null)
      expect(result[2].bankAlias).to.equal('ru-rosbank')
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should return array of banks or nulls (callback, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking.getBanks(['ru-sberbank', 'ru-xxx', 'ru-rosbank'], { strategy: 'archive' }, function (result, err) {
      expect(result).to.be.an('array')
      expect(result[0]).to.eql(getBankSberbankArchiveResult)
      expect(result[1]).to.equal(null)
      expect(result[2].bankAlias).to.equal('ru-rosbank')
      binking._banks = {}
      binking._bins = {}
      if (err) {
        done(err)
      } else {
        done()
      }
    })
  })

  it('should return array of banks or nulls (promise, api)', function (done) {
    binking
      .getBanks(['ru-sberbank', 'ru-xxx', 'ru-rosbank'], { strategy: 'api', apiKey: apiKey, sandbox: true })
      .then(function (result) {
        expect(result).to.be.an('array')
        expect(result[0]).to.eql(getBankSberbankApiResult)
        expect(result[1]).to.equal(null)
        expect(result[2].bankAlias).to.equal('ru-rosbank')
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should return array of banks or nulls (promise, archive)', function (done) {
    binking.addBanks(banks)
    binking.addBins(bins)
    binking
      .getBanks(['ru-sberbank', 'ru-xxx', 'ru-rosbank'], { strategy: 'archive' })
      .then(function (result) {
        expect(result).to.be.an('array')
        expect(result[0]).to.eql(getBankSberbankArchiveResult)
        expect(result[1]).to.equal(null)
        expect(result[2].bankAlias).to.equal('ru-rosbank')
        binking._banks = {}
        binking._bins = {}
        done()
      })
      .catch(function (err) {
        done(err)
      })
  })

  it('should return array of banks or nulls (sync, archive)', function () {
    binking.addBanks(banks)
    binking.addBins(bins)
    var result = binking.getBanks(['ru-sberbank', 'ru-xxx', 'ru-rosbank'], { strategy: 'archive', sync: true })
    expect(result).to.be.an('array')
    expect(result[0]).to.eql(getBankSberbankArchiveResult)
    expect(result[1]).to.equal(null)
    expect(result[2].bankAlias).to.equal('ru-rosbank')
    binking._banks = {}
    binking._bins = {}
  })
})

describe('binking.getBrand()', function () {
  it('should return brand with logos if found', function () {
    var brandWithLogos = binking.getBrand('visa')
    expect(brandWithLogos.alias).to.eql('visa')
    expect(brandWithLogos.name).to.eql('Visa')
    expect(brandWithLogos.logoOriginalSvg).to.eql('https://static.binking.io/brands-logos/visa-original.svg')
    brandWithLogos = binking.getBrand('mastercard', { brandsLogosPath: 'xxx/' })
    expect(brandWithLogos.alias).to.eql('mastercard')
    expect(brandWithLogos.name).to.eql('Mastercard')
    expect(brandWithLogos.logoDarkSvg).to.eql('xxx/mastercard-dark.svg')
  })

  it('should return null if not found', function () {
    var brandWithLogos = binking.getBrand('xxx')
    expect(brandWithLogos).to.eql(null)
  })
})

describe('binking.getBrands()', function () {
  it('should return array with all brands with logos if brandsAliases not setted', function () {
    var brandsWithLogos = binking.getBrands()
    expect(brandsWithLogos).to.be.an('array')
    expect(brandsWithLogos.length).to.eql(Object.keys(binking._brands).length)
    var visa = _.find(brandsWithLogos, { alias: 'visa' })
    expect(visa.alias).to.eql('visa')
    expect(visa.name).to.eql('Visa')
    expect(visa.logoOriginalSvg).to.eql('https://static.binking.io/brands-logos/visa-original.svg')
  })

  it('should return array with all brands with logos if brandsAliases not setted and options setteed', function () {
    var brandsWithLogos = binking.getBrands({ brandsLogosPath: 'yyy/' })
    expect(brandsWithLogos).to.be.an('array')
    expect(brandsWithLogos.length).to.eql(Object.keys(binking._brands).length)
    var visa = _.find(brandsWithLogos, { alias: 'visa' })
    expect(visa.alias).to.eql('visa')
    expect(visa.name).to.eql('Visa')
    expect(visa.logoOriginalSvg).to.eql('yyy/visa-original.svg')
  })

  it('should return array with brands setted in brandsAliases', function () {
    var brandsWithLogos = binking.getBrands(['visa', 'mastercard'])
    expect(brandsWithLogos).to.be.an('array')
    expect(brandsWithLogos.length).to.eql(2)
    var mastercard = _.find(brandsWithLogos, { alias: 'mastercard' })
    expect(mastercard.alias).to.eql('mastercard')
    expect(mastercard.name).to.eql('Mastercard')
    expect(mastercard.logoDarkSvg).to.eql('https://static.binking.io/brands-logos/mastercard-dark.svg')
  })

  it('should return array with brands setted in brandsAliases and setted options', function () {
    var brandsWithLogos = binking.getBrands(['visa', 'mastercard'], { brandsLogosPath: 'xxx/' })
    expect(brandsWithLogos).to.be.an('array')
    expect(brandsWithLogos.length).to.eql(2)
    var mastercard = _.find(brandsWithLogos, { alias: 'mastercard' })
    expect(mastercard.alias).to.eql('mastercard')
    expect(mastercard.name).to.eql('Mastercard')
    expect(mastercard.logoDarkSvg).to.eql('xxx/mastercard-dark.svg')
  })
})

describe('binking.setDefaultOptions()', function () {
  it('should set default options', function () {
    var savedDefaultOptions = _.clone(binking.defaultOptions)
    var newOptions = { maskDigitSymbol: 'X', maskDelimiterSymbol: '-' }
    var expectedDefaultOptions = _.assign({}, binking.defaultOptions, newOptions)
    binking.setDefaultOptions(newOptions)
    expect(binking.defaultOptions).to.eql(expectedDefaultOptions)
    binking.setDefaultOptions(savedDefaultOptions)
  })
})

describe('binking.setDefaultResult()', function () {
  it('should set default result and accepts only: formBackgroundColor, formBackgroundColors, formBackgroundLightness, formTextColor, formBorderColor', function () {
    var savedDefaultResult = _.clone(binking.defaultResult)
    var newProps = {
      formBackgroundColor: '#eeeeee',
      formBackgroundColors: ['#eeeeee', '#dddddd'],
      formBackgroundLightness: 'dark',
      formTextColor: '#000000',
      formBorderColor: '#333333',
      bankAlias: 'wrong'
    }
    var expectedDefaultResult = _.assign({}, binking.defaultResult, newProps, { formBackgroundGradient: 'linear-gradient(135deg, #eeeeee, #dddddd)', bankAlias: null })
    binking.setDefaultResult(newProps)
    expect(binking.defaultResult).to.eql(expectedDefaultResult)
    binking.setDefaultResult(savedDefaultResult)
  })
})

describe('binking.addBanks()', function () {
  it('should add banks to binking._banks', function () {
    var savedBanks = _.clone(binking._banks)
    var newBanks = { 'ru-bank1': { alias: 'ru-bank1' }, 'ru-bank2': { alias: 'ru-bank2' } }
    binking.addBanks(newBanks)
    expect(binking._banks).to.eql(newBanks)
    var newBanks2 = { 'ru-bank3': { alias: 'ru-bank3' }, 'ru-bank4': { alias: 'ru-bank4' } }
    binking.addBanks(newBanks2)
    expect(binking._banks).to.eql(_.assign({}, newBanks, newBanks2))
    binking._banks = savedBanks
  })
})

describe('binking.addBins()', function () {
  it('should add bins to binking._bins', function () {
    var savedBins = _.clone(binking._banks)
    var newBins = { 123456: 'ru-bank1', 234567: 'ru-bank2' }
    binking.addBins(newBins)
    expect(binking._bins).to.eql(newBins)
    var newBins2 = { 345678: 'ru-bank1', 456789: 'ru-bank3' }
    binking.addBins(newBins2)
    expect(binking._bins).to.eql(_.assign({}, newBins, newBins2))
    binking._bins = savedBins
  })
})

describe('binking._assign()', function () {
  it('should extend an object with the attributes of another', function () {
    var obj1 = { a: 1 }
    var obj2 = { b: 2, x: 22 }
    var obj3 = { c: 3, x: 33 }
    binking._assign(obj1, obj2, obj3)
    expect(obj1).to.eql({ a: 1, b: 2, x: 33, c: 3 })
  })

  it('and return it', function () {
    var obj1 = { a: 1 }
    var obj2 = { b: 2, x: 22 }
    var obj3 = { c: 3, x: 33 }
    var obj4 = binking._assign(obj1, obj2, obj3)
    expect(obj4).to.equal(obj1)
  })
})

describe('binking._getCardNumberNormalized()', function () {
  it('should return cardNumberSource converted to string with digits only and removed spaces', function () {
    expect(binking._getCardNumberNormalized('a1')).to.equal('1')
    expect(binking._getCardNumberNormalized('1 1')).to.equal('11')
    expect(binking._getCardNumberNormalized('1  1 a1')).to.equal('111')
    expect(binking._getCardNumberNormalized(null)).to.equal('')
    expect(binking._getCardNumberNormalized(undefined)).to.equal('')
    expect(binking._getCardNumberNormalized(NaN)).to.equal('')
    expect(binking._getCardNumberNormalized(true)).to.equal('')
    expect(binking._getCardNumberNormalized(false)).to.equal('')
    expect(binking._getCardNumberNormalized([[]])).to.equal('')
    expect(binking._getCardNumberNormalized([{}])).to.equal('')
    expect(binking._getCardNumberNormalized([])).to.equal('')
  })
})

describe('binking._getGradient()', function () {
  it('should return css gradient by colors array and degreeses', function () {
    expect(binking._getGradient(['#000000', '#ffffff'], 100)).to.equal('linear-gradient(100deg, #000000, #ffffff)')
    expect(binking._getGradient(['#000000', '#aaaaaa', '#ffffff'], 100)).to.equal('linear-gradient(100deg, #000000, #aaaaaa, #ffffff)')
  })
})

describe('binking._brands', function () {
  it('should be an object', function () {
    expect(binking._brands).to.be.an('object')
  })

  it('should be not empty', function () {
    expect(Object.keys(binking._brands).length).to.be.greaterThan(1)
  })

  _.each(_.pairs(binking._brands), function (pair) {
    var brandAlias = pair[0]
    var brand = pair[1]

    describe(brand.alias, function () {
      it('.alias should be equal to key', function () {
        expect(brand.alias).to.equal(brandAlias)
      })

      it('.alias should contain only small letters and hyphens', function () {
        expect(brand.alias).to.match(/^[a-z-]+$/)
      })

      it('.name should be a string', function () {
        expect(brand.name).to.be.a('string')
      })

      it('.codeMinLength should be a number', function () {
        expect(brand.codeMinLength).to.be.a('number')
      })

      it('.codeMaxLength should be a number', function () {
        expect(brand.codeMinLength).to.be.a('number')
      })

      it('.gaps should be an array', function () {
        expect(brand.gaps).to.be.an('array')
      })

      it('.gaps should have at least two elements', function () {
        expect(brand.gaps.length).to.be.greaterThan(1)
      })

      it('.gaps each element should be a number', function () {
        _.each(brand.gaps, function (gapPos) {
          expect(gapPos).to.be.a('number')
        })
      })

      it('.lengths should be an array', function () {
        expect(brand.lengths).to.be.an('array')
      })

      it('.lengths should have at least one element', function () {
        expect(brand.lengths.length).to.be.greaterThan(0)
      })

      it('.lengths each element should be a number', function () {
        _.each(brand.lengths, function (length) {
          expect(length).to.be.a('number')
        })
      })

      it('.pattern should be a regexp', function () {
        expect(brand.pattern).to.be.an('regexp')
      })
    })
  })
})

describe('binking._getBrandByCardNumber()', function () {
  it('should return brand by stringified card number', function () {
    var brand = _.find(binking._brands, { alias: 'visa' })
    expect(binking._getBrandByCardNumber('42')).to.equal(brand)
  })

  it('should return null if card number suitable for several brands', function () {
    expect(binking._getBrandByCardNumber('5')).to.equal(null)
  })

  it('should return null if brand not found', function () {
    expect(binking._getBrandByCardNumber('')).to.equal(null)
  })
})

describe('binking._getFormBrandLogoBasename()', function () {
  it('should return original brand logo basename if policy is "original"', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'original', 'light', 'original')).to.equal('visa-original')
  })

  it('should return dark brand logo basename if policy is "dark"', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'dark', 'light', 'original')).to.equal('visa-dark')
  })

  it('should return light brand logo basename if policy is "light"', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'light', 'light', 'original')).to.equal('visa-light')
  })

  it('should return light brand logo basename if policy is "mono" and background is dark', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'mono', 'dark', 'original')).to.equal('visa-light')
  })

  it('should return dark brand logo basename if policy is "mono" and background is light', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'mono', 'light', 'original')).to.equal('visa-dark')
  })

  it('should return original brand logo basename if policy is "auto" and logo style is original', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'auto', 'dark', 'original')).to.equal('visa-original')
  })

  it('should return light brand logo basename if policy is "auto" and logo style is light', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'auto', 'dark', 'light')).to.equal('visa-light')
  })

  it('should return dark brand logo basename if policy is "auto" and logo style is dark', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'auto', 'dark', 'dark')).to.equal('visa-dark')
  })

  it('should return original brand logo basename if policy is "auto" and logo style is null', function () {
    expect(binking._getFormBrandLogoBasename('visa', 'auto', 'dark', null)).to.equal('visa-original')
  })
})

describe('binking._getBlocks()', function () {
  it('should return number blocks by avaliable lengths and gaps', function () {
    expect(binking._getBlocks([4, 8, 12], [16])).to.eql([4, 4, 4, 4])
    expect(binking._getBlocks([4, 8, 12], [16, 17])).to.eql([4, 4, 4, 5])
  })
})

describe('binking._getMask()', function () {
  it('should return mask by digit symbol, delimiter symbol, avaliable lengths and gaps', function () {
    expect(binking._getMask('0', ' ', [4, 4, 4, 4])).to.equal('0000 0000 0000 0000')
    expect(binking._getMask('X', '-', [4, 4, 4, 5])).to.equal('XXXX-XXXX-XXXX-XXXXX')
  })
})

describe('binking._getNumberNice()', function () {
  it('should return masked card number by stringified card number and gaps', function () {
    expect(binking._getNumberNice('1234567890123456', [4, 8, 12])).to.equal('1234 5678 9012 3456')
    expect(binking._getNumberNice('1234567890123456000000000000000', [4, 8, 12])).to.equal('1234 5678 9012 3456000000000000000')
    expect(binking._getNumberNice('12345678', [4, 8, 12])).to.equal('1234 5678')
    expect(binking._getNumberNice('12345', [4, 8, 12])).to.equal('1234 5')
    expect(binking._getNumberNice('', [4, 8, 12])).to.equal('')
  })
})

describe('binking._buildUrl()', function () {
  it('should return source url if data is empty', function () {
    var result = binking._buildUrl('https://example.com', {})
    expect(result).to.equal('https://example.com')
  })

  it('should return url with get parmeters from data', function () {
    var result = binking._buildUrl('https://example.com', { a: 1, bar: 'xxx' })
    expect(result).to.equal('https://example.com?a=1&bar=xxx')
  })

  it('should return url with get parmeters from data except undefined', function () {
    var result = binking._buildUrl('https://example.com', { a: 1, b: undefined, bar: 'xxx', foo: '' })
    expect(result).to.equal('https://example.com?a=1&bar=xxx&foo=')
  })

  it('should return null if card number suitable for several brands', function () {
    expect(binking._getBrandByCardNumber('5')).to.equal(null)
  })

  it('should return null if brand not found', function () {
    expect(binking._getBrandByCardNumber('')).to.equal(null)
  })
})

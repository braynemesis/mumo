$('.header').fadeOut('fast');
$('.fixed-badge').fadeOut('fast');

var pageList = [
  '',
  'Sobre',
  'Dispositivos',
  'Para Todos',
  'É só dar play',
  'Seu Provedor',
  'Operadoras',
  'Superplayer',
  'Contato',
];
function setTitleContent(index) {
  document.querySelector('#title-content').innerHTML = pageList[index - 1];
}

function headerControl(index) {
  if (index != 1) {
    $('.header').fadeIn();
    $('.fixed-badge').fadeIn();
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', '#ffffff');
  } else {
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', '#FB6253');
    $('.header').fadeOut('fast');
    $('.fixed-badge').fadeOut('fast');
  }
  if (index == 9) {
    $('.fixed-badge').fadeOut('fast');
  }
}

$('#main').onepage_scroll({
  sectionContainer: 'section', // sectionContainer accepts any kind of selector in case you don't want to use section
  easing: 'ease-in-out', // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
  // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
  animationTime: 1000, // AnimationTime let you define how long each section takes to animate
  pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
  updateURL: true, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
  beforeMove: function (index) {
    $('#sec-' + index).html($('#sec-' + index + ' > div'));
    headerControl(index);
  }, // This option accepts a callback function. The function will be called before the page moves.
  afterMove: function (index) {
    setTitleContent(index);
  }, // This option accepts a callback function. The function will be called after the page moves.
  loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
  keyboard: true, // You can activate the keyboard controls
  responsiveFallback: false, // You can fallback to normal page scroll by defining the width of the browser in which
  direction: 'vertical', // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
});

function registerLead(values) {
  var body = {
    event_type: 'CONVERSION',
    event_family: 'CDP',
    payload: {
      conversion_identifier: 'superplayer',
      name: values.name,
      email: 'mumo@mumo.fm',
      mobile_phone: values.phone,
      company_name: values.company,
      available_for_mailing: true,
      cf_numero_de_clientes: values.customers,
      cf_mensagem: values.msg,
    },
  };
  $('.loader-message').hide();
  $('.spinner-border').show();
  fetch(
    'https://api.rd.services/platform/conversions?api_key=8243915ba4f62b7a2db2a20d67651853',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
    .then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Obrigado, sua mensagem foi enviada!',
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById('contact-form').reset();
      $('.loader-message').show();
      $('.spinner-border').hide();
    })
    .catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ops! tivemos um problema aqui. Tente novamente mais tarde.',
        showConfirmButton: false,
        timer: 1500,
      });
      $('.loader-message').show();
      $('.spinner-border').hide();
    });
}

function handleSubmit(event) {
  event.preventDefault();

  var data = new FormData(event.target);

  var value = Object.fromEntries(data.entries());

  value.topics = data.getAll('topics');

  registerLead(value);
}

var form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function mask(o, f) {
  setTimeout(function () {
    var v = mphone(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mphone(v) {
  var r = v.replace(/\D/g, '');
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    r = r.replace(/^(\d*)/, '($1');
  }
  return r;
}

// $('.dropdown').on('click', function(){
//   $('.dropdown-menu').fadeToggle('fast')
// })
// Add slideDown animation to dropdown
$('.dropdown-menu .dropdown-item').on('click', function () {
  $('.dropdown-menu .dropdown-item').removeClass('active');
  $(this).addClass('active');
});

$('.item-card').on('mouseenter', function () {
  var target = $(this).attr('id');
  console.log($(this).attr('id'));
  switch (target) {
    case '1':
      $('#text-content')
        .html(
          'Com nosso SVA de música e notícias seu provedor oferece mais valor para os clientes enquanto economiza nos impostos.'
        )
        .addClass('fade-in');
      setTimeout(() => {
        $('#text-content').removeClass('fade-in');
      }, 100);
      break;
    case '2':
      $('#text-content')
        .html(
          'Ofereça mais valor para seus assinantes com centenas de canais de música - 24h por dia, sem propaganda e com a a melhor curadoria.'
        )
        .addClass('fade-in');
      setTimeout(() => {
        $('#text-content').removeClass('fade-in');
      }, 100);
      break;
    case '3':
      $('#text-content')
        .html(
          'Fidelize seus clientes e aumente sua taxa de recompra adicionando música e notícias a sua oferta prime - 24h por dia e sem propaganda.'
        )
        .addClass('fade-in');
      setTimeout(() => {
        $('#text-content').removeClass('fade-in');
      }, 100);
      break;
    case '4':
      $('#text-content')
        .html(
          'Crie um diferencial inovador para seu cliente oferecendo música e notícias já integradas aos veículos - 24h por dia e sem propagandas.'
        )
        .addClass('fade-in');
      setTimeout(() => {
        $('#text-content').removeClass('fade-in');
      }, 100);
      break;
    case '5':
      $('#text-content')
        .html(
          'Fidelize e ofereça mais valor para seus clientes oferecendo um app de música e notícias - 24h por dia e sem propagandas.'
        )
        .addClass('fade-in');
      setTimeout(() => {
        $('#text-content').removeClass('fade-in');
      }, 100);
      break;
    case '6':
      $('#text-content')
        .html(
          'Utilize um habito diário para aumentar a frequência de uso do seu app adicionando música e notícias - 24h por dia e sem propagandas.'
        )
        .addClass('fade-in');
      setTimeout(() => {
        $('#text-content').removeClass('fade-in');
      }, 100);
      break;
    default:
      $('#text-content').html(
        'Passe o mouse sobre o ícone e saiba mais sobre as vantagens do MUMO para a sua empresa.'
      );
      break;
  }
});

$('.item-card').on('mouseleave', function () {
  $('#text-content')
    .html(
      'Passe o mouse sobre o ícone e saiba mais sobre as vantagens do MUMO para a sua empresa.'
    )
    .addClass('fade-in');
  setTimeout(() => {
    $('#text-content').removeClass('fade-in');
  }, 100);
});

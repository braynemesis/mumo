// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true
// });

// const target = document.querySelector('#id-9');

// scroll.scrollTo(target);
// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });

$(".header").fadeOut("fast");
$(".fixed-badge").fadeOut("fast");

// $(window).on("scroll", function (event) {
//   if (document.documentElement.scrollTop > 900) {
//     $(".header").fadeIn();
//     $(".fixed-badge").fadeIn();
//     document
//       .querySelector('meta[name="theme-color"]')
//       .setAttribute("content", "#ffffff");
//   } else {
//     document
//       .querySelector('meta[name="theme-color"]')
//       .setAttribute("content", "#FB6253");
//     $(".header").fadeOut("fast");
//     $(".fixed-badge").fadeOut("fast");
//   }
// });

const pageList = [
  "",
  "Sobre",
  "Dispositivos",
  "Para Todos",
  "É só dar play",
  "Seu Provedor",
  "Operadoras",
  "Superplayer",
  "Contato",
];
function setTitleContent(index) {
  document.querySelector("#title-content").innerHTML = pageList[index - 1];
}

function headerControl(index) {
  if (index != 1) {
    $(".header").fadeIn();
    $(".fixed-badge").fadeIn();
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#ffffff");
  } else {
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#FB6253");
    $(".header").fadeOut("fast");
    $(".fixed-badge").fadeOut("fast");
  }
  if (index == 9) {
    $(".fixed-badge").fadeOut("fast");
  }
}

$("#main").onepage_scroll({
  sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
  easing: "ease-in-out", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
  // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
  animationTime: 1000, // AnimationTime let you define how long each section takes to animate
  pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
  updateURL: true, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
  beforeMove: function (index) {
    $("#sec-" + index).html($("#sec-" + index + " > div"));
    headerControl(index);
  }, // This option accepts a callback function. The function will be called before the page moves.
  afterMove: function (index) {
    setTitleContent(index);
  }, // This option accepts a callback function. The function will be called after the page moves.
  loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
  keyboard: true, // You can activate the keyboard controls
  responsiveFallback: false, // You can fallback to normal page scroll by defining the width of the browser in which
  // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
  // the browser's width is less than 600, the fallback will kick in.
  direction: "vertical", // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
});

function registerLead(values) {
  fetch(
    "https://api.rd.services/platform/conversions?api_key=8243915ba4f62b7a2db2a20d67651853",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: "mumo",
          name: values.name,
          email: "mumo@mumo.fm",
          mobile_phone: values.phone,
          company_name: values.company,
          available_for_mailing: true,
          cf_numero_de_clientes: values.customers,
        },
      },
    }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());

  value.topics = data.getAll("topics");

  registerLead(value.topics);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

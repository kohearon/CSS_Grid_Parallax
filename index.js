/* Main Entrypoint */

var parallaxUp = require('./scripts/parallax-up');

document.addEventListener('scroll', function(){

  parallaxUp('.parallax-container__secondary-content', 0.05);
})

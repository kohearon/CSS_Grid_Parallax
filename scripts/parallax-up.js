/* This Function Shall Take As Input The Desired CSS Class Selector,
** Desired Amount of Parallax As A Multiple of How Far The User Has Scrolled,
** And Shall Apply Said Parallax Effect Upon The User Scrolling To All Items
** With The Said Class
*/
module.exports = function parallaxUp(parallaxItemClass,speedFactor){

  /* Get Position of Top of Image, Top of User's Window */
  var topOfPage = window.pageYOffset;
  document.querySelectorAll(parallaxItemClass).forEach( function(parallaxItem) {
    parallaxItem.style.transform = 'translateY(' + (-speedFactor * topOfPage) + 'px)';
  })
}

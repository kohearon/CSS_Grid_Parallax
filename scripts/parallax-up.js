/* This Function Shall Take As Input The Desired CSS Class Selector,
** Desired Amount of Parallax As A Multiple of How Far The User Has Scrolled,
** And Shall Apply Said Parallax Effect Upon The User Scrolling
*/
module.exports = function parallaxUp(parallaxItemID,speedFactor){

  /* Get Position of Top of Image, Top of User's Window */
  var topOfPage = window.pageYOffset;
  document.querySelector(parallaxItemID).style.transform = 'translateY(' + (-speedFactor * topOfPage) + 'px)'
}

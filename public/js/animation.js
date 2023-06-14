// for front page start....................................................>>>>>
$(document).ready(function () {
    $(window).scroll(function () {
      var positiontop = $(document).scrollTop();
      console.log(positiontop);


      if ((positiontop >100) && (positiontop < 122)) {
        $('#top').addClass('animate__animated animate__backInLeft');
      }

    })
  })
//for front page start
  
let $buttons = $('#buttons > span')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()

$slides.css({transform:'translateX(-400px)'})

bindEvents()

let timer = setInterval(function(){
  goToSlide(current+1)
},3000)

$('.window').on('mouseenter',function(){
  window.clearInterval(timer)
}).on('mouseleave',function(){
  timer = setInterval(function(){
    goToSlide(current+1)
  },3000)
})

$('#next').on('click',function(){
  goToSlide(current+1)
  console.log('current','index')
  console.log(current)
})
$('#previous').on('click',function(){
  goToSlide(current-1)
  console.log('current','index')
  console.log(current)
})


function bindEvents(){
 $('#buttons').on('click','span',function(e){
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
    
  })
}

function goToSlide(index){
  if(index > $buttons.length-1){
    index = 0
    activeButton($buttons.eq(index))
  }else if(index < 0){
    index = $buttons.length - 1 
  }
  if(current === $buttons.length-1 && index === 0){
   $slides.css({transform:`translateX(${-($buttons.length+1)*400}px)`}).one('transitionend',function(){
      $slides.hide().offset()
      $slides.css({transform:`translateX(${-(index+1)*400}px)`}).show()
      activeButton($buttons.eq(index))    
    })
  }else if(current === 0 && index === $buttons.length - 1){
    $slides.css({transform:`translateX(0px)`}).one('transitionend',function(){
      $slides.hide().offset()
      $slides.css({transform:`translateX(${-(index+1)*400}px)`}).show()
      activeButton($buttons.eq(index))  
    })
  }else{
    $slides.css({transform:`translateX(${-(index+1)*400}px)`})
    activeButton($buttons.eq(index))
  }
  current = index
}

function makeFakeSlides(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length-1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}

function activeButton(b){  b.addClass('highlight').siblings('.highlight').removeClass('highlight')
}
const slider = document.querySelector( ".slider-content" );
const dots = document.querySelectorAll( ".dot" );
// get slider's width from css
const computedStyle = window.getComputedStyle( slider );
let width = computedStyle.getPropertyValue( "width" );
width = parseInt( width, 10 );
// get images and photo size
const photos = document.querySelectorAll( "img" );
const photoSize = width / photos.length;
// initialize "left" property and set it to 0
const { style } = slider;
style.left = 0;

let timeout = false;
let i = 1;
let j = 0;

const withTransition = "left 600ms";
const noTransition = "none";
const normalSize = "10px";
const biggerSize = "25px";
dots[ 0 ].style.width = biggerSize;
dots[ 0 ].style.height = biggerSize;

function transformBulletSize( i, j ) {
    dots[ i ].style.width = biggerSize;
    dots[ i ].style.height = biggerSize;
    dots[ j ].style.width = normalSize;
    dots[ j ].style.height = normalSize;
}

function getNextPhotoPosition ( ) {
    let { left } = style;
    left = parseInt( left, 10 );
    left -= photoSize;
    return left;
}

function moveSlider ( left, transition ) {
    slider.style.left = `${ left }px`;
    slider.style.transition = transition;
}

function showNextPhoto ( ) {
    if ( !timeout ) {
        left = getNextPhotoPosition();
        current = left / photoSize;
        if ( left > -( width ) ) {
            timeout = true;
            transformBulletSize( i, j );
            if ( left === -3500 ) {
                j += 1;
                transformBulletSize( 0, j );
            }
            i = Math.min( i += 1, photos.length - 2 );
            if ( i < 6 ) {
                j += 1;
            }
            moveSlider( left, withTransition );
            setTimeout( function () {
                timeout = false;
            }, 500 );
        } else {
            i = 1;
            j = 0;
            moveSlider( 0, noTransition );
            setTimeout( function () {
                showNextPhoto();
            }, 15 );
        }
    }
}

// function getCurrent

function showPreviousPhoto ( ) {
    if ( !timeout ) {
        // console.log( j );
        // console.log( i );
        // console.log("************");
        i -= 1;
        j -= 1;
        if ( i !== 0 ) {
            transformBulletSize( j, i );
        } else {
            transformBulletSize( 6, 0 );
            i = 7;
            j = 6;
        }
        let { left } = style;
        left = parseInt( left, 10 );
        if ( left !== 0 ) {
            timeout = true;
            slider.style.left = `${ left + photoSize }px`;
            slider.style.transition = "left 600ms";
            setTimeout( function () {
                timeout = false;
            }, 500 );
        } else {
            moveSlider( -3500, noTransition );
            setTimeout( function () {
                showPreviousPhoto();
            }, 15 );
        }
    }
}

document.getElementById( "click-right" ).addEventListener( "click", showNextPhoto );
document.getElementById( "click-left" ).addEventListener( "click", showPreviousPhoto );

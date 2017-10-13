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
// timeout variable for handling click abuse
let timeout = false;
// useful constants
const lastPhoto = -( width - photoSize );
const withTransition = "left 600ms";
const noTransition = "none";
const normalSize = "10px";
const biggerSize = "25px";
const lastDot = dots.length - 1;
const numberOfBullets = dots.length;
// initialize bullets and set them to middle
let currentBullet = Math.floor( numberOfBullets / 2 );
let previousBullet = currentBullet - 1;
// set the left value to -currentbullet times photosize so it displays the coresponding photo/bullet
slider.style.left = `${ -( currentBullet * photoSize ) }px`;

function initializeBullet ( ) {
    dots[ currentBullet ].style.width = biggerSize;
    dots[ currentBullet ].style.height = biggerSize;
}

function transformBulletSize( i, j ) {
    dots[ i ].style.width = biggerSize;
    dots[ i ].style.height = biggerSize;
    dots[ j ].style.width = normalSize;
    dots[ j ].style.height = normalSize;
}

function getCurrentPhotoPosition ( ) {
    let { left } = style;
    left = parseInt( left, 10 );
    return left;
}

function moveSlider ( left, transition ) {
    slider.style.left = `${ left }px`;
    slider.style.transition = transition;
}

function showNextPhoto ( ) {
    if ( !timeout ) {
        let left = getCurrentPhotoPosition();
        if ( left > lastPhoto ) {
            timeout = true;
            bulletNext();
            left -= photoSize;
            moveSlider( left, withTransition );
            setTimeout( function () {
                timeout = false;
            }, 500 );
        } else {
            handleEdgePhotos( 0, showNextPhoto );
        }
    }
}

function showPreviousPhoto ( ) {
    if ( !timeout ) {
        let left = getCurrentPhotoPosition();
        if ( left !== 0 ) {
            timeout = true;
            bulletPrevious();
            left += photoSize;
            moveSlider( left, withTransition );
            setTimeout( function () {
                timeout = false;
            }, 500 );
        } else {
            handleEdgePhotos( lastPhoto, showPreviousPhoto );
        }
    }
}

function handleEdgePhotos ( position, functionName ) {
    moveSlider( position, noTransition );
    setTimeout( function () {
        functionName();
    }, 15 );
}

function resetBullets () {
    currentBullet = 0;
    previousBullet = lastDot;
    transformBulletSize( currentBullet, previousBullet );
    previousBullet = -1;
}

function resetBulletsForPrevious () {
    currentBullet = lastDot;
    previousBullet = 0;
    transformBulletSize( currentBullet, previousBullet );
    previousBullet = lastDot - 1;
}

function bulletPrevious( ) {
    if ( currentBullet !== 0 ) {
        transformBulletSize( previousBullet, currentBullet );
        currentBullet -= 1;
        previousBullet -= 1;
    } else {
        resetBulletsForPrevious();
    }
}

function bulletNext( ) {
    currentBullet += 1;
    previousBullet += 1;
    if ( currentBullet <= lastDot ) {
        transformBulletSize( currentBullet, previousBullet );
    } else {
        resetBullets();
    }
}

initializeBullet();
document.getElementById( "click-right" ).addEventListener( "click", showNextPhoto );
document.getElementById( "click-left" ).addEventListener( "click", showPreviousPhoto );

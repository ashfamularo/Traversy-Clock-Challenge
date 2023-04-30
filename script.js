const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lgLineColor = document.getElementById('lg-line-color');
const smLineColor = document.getElementById('sm-line-color');
const hourHandColor = document.getElementById('hour-hand-color');
const minHandColor = document.getElementById('min-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

// pulling user's most recent colors in local storage if applicaple
if (localStorage.getItem('faceColor') !== null) {
  faceColor.value = localStorage.getItem('faceColor');
};
if (localStorage.getItem('borderColor') !== null) {
  borderColor.value = localStorage.getItem('borderColor');
};
if (localStorage.getItem('lgLineColor') !== null) {
  lgLineColor.value = localStorage.getItem('lgLineColor');
};
if (localStorage.getItem('smLineColor') !== null) {
  smLineColor.value = localStorage.getItem('smLineColor');
};
if (localStorage.getItem('hourHandColor') !== null) {
  hourHandColor.value = localStorage.getItem('hourHandColor');
};
if (localStorage.getItem('minHandColor') !== null) {
  minHandColor.value = localStorage.getItem('minHandColor');
};
if (localStorage.getItem('secondHandColor') !== null) {
  secondHandColor.value = localStorage.getItem('secondHandColor');
};

function clock() {
  const now = new Date();
  const ctx = canvas.getContext('2d');

  // Setup canvas
  ctx.save();  // save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // puts 0,0 coords right in middle of canvas (default is top left corner of canvas)
  ctx.rotate(-Math.PI / 2); //rotate clock -90 degress

  // Set default styles
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#f4f4f4';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // ! Drawing clock face/border
  ctx.save(); // saves the state of everything prior
  ctx.beginPath();
  // design/draw clock border and fill
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value; // this only applies within the save / restore just above and below
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true); // design of circle
  ctx.stroke(); // actually draws circle on canvas
  ctx.fillStyle = faceColor.value;
  ctx.fill(); // fills circle with default light gray
  ctx.restore(); // makes sure default styles aren't changed


  // design/draw hour line marks
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6); // if didn't do this step, all 12 lines would show up (overlap) at 12 o'clock mark so it would appear there is only a line at the 12 o'clock mark. the rest of the clock face would be empty
    ctx.moveTo(100, 0); // useing the x axis but creating a vertical line b/c we rotated the clock -90 degress on line 10. if we didn't have line 10, this first stroke would actually show up at the 3 o'clock mark instead of the 12 o'clock mark
    ctx.lineTo(120, 0);
    ctx.strokeStyle = lgLineColor.value;
    ctx.stroke();
  };
  ctx.restore();

  // design/draw minute line marks
  ctx.save();
  ctx.strokeStyle = smLineColor.value;
  ctx.lineWidth = 3;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(110, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30)
  };
  ctx.restore();
  
  //! get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // draw hour hand
  ctx.save();
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
  ctx.strokeStyle = hourHandColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // draw minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = minHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

    // draw second hand
  ctx.save();
  ctx.rotate((sec * Math.PI / 30));
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore default state

  requestAnimationFrame(clock); //recursive function, making clock tick every second
}

// start up clock tick
requestAnimationFrame(clock);

// save clock as image and store user's selected colors in local storage so clock does not automatically reset to default colors once image is saved
document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
  localStorage.setItem('faceColor', faceColor.value);
  localStorage.setItem('borderColor', borderColor.value);
  localStorage.setItem('lgLineColor', lgLineColor.value);
  localStorage.setItem('smLineColor', smLineColor.value);
  localStorage.setItem('hourHandColor', hourHandColor.value);
  localStorage.setItem('minHandColor', minHandColor.value);
  localStorage.setItem('secondHandColor', secondHandColor.value);
});

// reset clock colors to default, update them in local storage
document.getElementById('reset-btn').addEventListener('click', () => {
  localStorage.setItem('faceColor', '#f4f4f4');
  localStorage.setItem('borderColor', '#800000');
  localStorage.setItem('lgLineColor', '#000000');
  localStorage.setItem('smLineColor', '#000000');
  localStorage.setItem('hourHandColor', '#800000');
  localStorage.setItem('minHandColor', '#800000');
  localStorage.setItem('secondHandColor', '#FF7F50');
})
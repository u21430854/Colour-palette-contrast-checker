let colourCount = 2; //keep track of how many colours there are
let colourIDs = [1, 2]; //keep track of valid ID nos in the DOM
let donutChart, mixedChart; //chart.js charts
let coloursnRatios = []; //track colour and contrast ratios

window.addEventListener('load', () => {
  //Hide and display rgb & hsl adjusters on btn click
  document.querySelectorAll('.adjust-btn').forEach(button => {
    button.addEventListener('click', () => {
      openAccordionItem(button);
    });
  });

  //add colour
  document.getElementById('btnAdd').addEventListener('click', () => {
    colourCount++;
    colourIDs.push(colourCount); //add to ID tracking array

    //create colour picker, sliders, etc.
    let newColour = document.createElement('div');
    newColour.classList.add('col-4', 'colour-item');

    let newIcon = document.createElement('i');
    newIcon.id = colourCount;
    newIcon.classList.add('bi', 'bi-x');

    let colourGroup = document.createElement('div');
    colourGroup.classList.add('colour-group');

    let newInputGroup = document.createElement('span');
    newInputGroup.id = `colour${colourCount}`;
    newInputGroup.classList.add('colour-input-group');

    let hashtag = document.createElement('span');
    hashtag.textContent = '#';

    let txtInput = document.createElement('input');
    txtInput.id = `colourText${colourCount}`;
    txtInput.type = 'text';
    txtInput.classList.add('hex');
    txtInput.value = 'FFFFFF';

    let colourInput = document.createElement('input');
    colourInput.id = `colourPicker${colourCount}`;
    colourInput.type = 'color';
    colourInput.classList.add('picker');
    colourInput.value = '#ffffff';
    newInputGroup.append(hashtag, txtInput, colourInput);

    let adjustBtns = document.createElement('span');
    adjustBtns.classList.add('adjust-buttons');
    adjustBtns.textContent = 'Adjust:';

    let hslBtn = document.createElement('button');
    hslBtn.id = `btnHSL${colourCount}`;
    hslBtn.type = 'button';
    hslBtn.classList.add('adjust-btn');
    hslBtn.textContent = 'HSL';

    let rgbBtn = document.createElement('button');
    rgbBtn.id = `btnRGB${colourCount}`;
    rgbBtn.type = 'button';
    rgbBtn.classList.add('adjust-btn');
    rgbBtn.textContent = 'RGB';

    adjustBtns.append(hslBtn, rgbBtn);
    colourGroup.append(newInputGroup, adjustBtns);

    let hslAdjustGroup = document.createElement('div');
    hslAdjustGroup.id = `adjustHSL${colourCount}`;
    hslAdjustGroup.classList.add('adjust', 'adjustHSL');

    let hueLbl = document.createElement('label');
    hueLbl.classList.add('slideContainer');
    hueLbl.textContent = 'Hue ';

    let hueValue = document.createElement('span');
    hueValue.id = `hue${colourCount}Value`;
    hueValue.textContent = '0';
    hueLbl.appendChild(hueValue); //span must be in between the words
    hueLbl.innerHTML += '&deg;<br/>';

    let hueSlider = document.createElement('input');
    hueSlider.id = `hue${colourCount}`;
    hueSlider.type = 'range';
    hueSlider.min = '0';
    hueSlider.max = '360';
    hueSlider.value = '0';

    hueLbl.append(hueSlider);

    let satLbl = document.createElement('label');
    satLbl.classList.add('slideContainer');
    satLbl.textContent = 'Saturation ';

    let satValue = document.createElement('span');
    satValue.id = `sat${colourCount}Value`;
    satValue.textContent = '0';
    satLbl.appendChild(satValue); //span must be in between the words
    satLbl.innerHTML += '%<br/>';

    let satSlider = document.createElement('input');
    satSlider.id = `sat${colourCount}`;
    satSlider.type = 'range';
    satSlider.min = '0';
    satSlider.max = '100';
    satSlider.value = '0';

    satLbl.append(satSlider);

    let lightLbl = document.createElement('label');
    lightLbl.classList.add('slideContainer');
    lightLbl.textContent = 'Lightness ';

    let lightValue = document.createElement('span');
    lightValue.id = `light${colourCount}Value`;
    lightValue.textContent = '100';
    lightLbl.appendChild(lightValue); //span must be in between the words
    lightLbl.innerHTML += '%<br/>';

    let lightSlider = document.createElement('input');
    lightSlider.id = `light${colourCount}`;
    lightSlider.type = 'range';
    lightSlider.min = '0';
    lightSlider.max = '100';
    lightSlider.value = '100';

    lightLbl.append(lightSlider);
    hslAdjustGroup.append(hueLbl, satLbl, lightLbl);

    let rgbAdjustGroup = document.createElement('div');
    rgbAdjustGroup.id = `adjustRGB${colourCount}`;
    rgbAdjustGroup.classList.add('adjust', 'adjustRGB');

    let redLbl = document.createElement('label');
    redLbl.classList.add('slideContainer');
    redLbl.textContent = 'Red ';

    let redValue = document.createElement('span');
    redValue.id = `red${colourCount}Value`;
    redValue.textContent = '255';
    redLbl.appendChild(redValue); //span must be in between the words
    redLbl.innerHTML += '<br/>';

    let redSlider = document.createElement('input');
    redSlider.id = `red${colourCount}`;
    redSlider.type = 'range';
    redSlider.min = '0';
    redSlider.max = '255';
    redSlider.value = '255';

    redLbl.append(redSlider);

    let greenLbl = document.createElement('label');
    greenLbl.classList.add('slideContainer');
    greenLbl.textContent = 'Green ';

    let greenValue = document.createElement('span');
    greenValue.id = `green${colourCount}Value`;
    greenValue.textContent = '255';
    greenLbl.appendChild(greenValue); //span must be in between the words
    greenLbl.innerHTML += '<br/>';

    let greenSlider = document.createElement('input');
    greenSlider.id = `green${colourCount}`;
    greenSlider.type = 'range';
    greenSlider.min = '0';
    greenSlider.max = '255';
    greenSlider.value = '255';

    greenLbl.append(greenSlider);

    let blueLbl = document.createElement('label');
    blueLbl.classList.add('slideContainer');
    blueLbl.textContent = 'Blue ';

    let blueValue = document.createElement('span');
    blueValue.id = `blue${colourCount}Value`;
    blueValue.textContent = '255';
    blueLbl.appendChild(blueValue); //span must be in between the words
    blueLbl.innerHTML += '<br/>';

    let blueSlider = document.createElement('input');
    blueSlider.id = `blue${colourCount}`;
    blueSlider.type = 'range';
    blueSlider.min = '0';
    blueSlider.max = '255';
    blueSlider.value = '255';

    blueLbl.append(blueSlider);
    rgbAdjustGroup.append(redLbl, greenLbl, blueLbl);

    newColour.append(newIcon, colourGroup, hslAdjustGroup, rgbAdjustGroup);

    document.getElementById('colourRow').appendChild(newColour);

    //add event listeners to open colour adjusters
    hslBtn.addEventListener('click', () => {
      openAccordionItem(hslBtn);
    });
    rgbBtn.addEventListener('click', () => {
      openAccordionItem(rgbBtn);
    });
    newIcon.addEventListener('click', () => {
      removeColour(newIcon);
    }); //event listener to remove colour
    //event listener to update other inputs when txtbox is updated
    txtInput.addEventListener('blur', () => {
      let hex = validateHex(txtInput);
      let colourIDNo = txtInput.id.replace('colourText', '');

      updatePicker(colourIDNo, 'text', hex); //update colour picker
      updateRGBSliders(colourIDNo, 'text', hex); //update rgb
      updateHSLSliders(colourIDNo, 'text', hex) //update hsl
    });
    //event listener to update other inputs when colour picker is updated
    colourInput.addEventListener('input', () => {
      let hex = colourInput.value.replace('#', '');
      let colourIDNo = colourInput.id.replace('colourPicker', '');

      updateTxtInput(colourIDNo, 'picker', hex); //update txtbox
      updateRGBSliders(colourIDNo, 'picker', hex); //update rgb
      updateHSLSliders(colourIDNo, 'picker', hex) //update hsl
    });

    //when input sliders are changed
    hueSlider.addEventListener('input', () => {
      updateSliderOutputs(hueSlider); //show hsl and rgb range slider values
      onSliderChange(hueSlider); // update other inputs when hsl / rgb input changes
    });

    satSlider.addEventListener('input', () => {
      updateSliderOutputs(satSlider); //show hsl and rgb range slider values
      onSliderChange(satSlider); // update other inputs when hsl / rgb input changes
    });

    lightSlider.addEventListener('input', () => {
      updateSliderOutputs(lightSlider); //show hsl and rgb range slider values
      onSliderChange(lightSlider); // update other inputs when hsl / rgb input changes
    });

    //when input sliders are changed
    redSlider.addEventListener('input', () => {
      updateSliderOutputs(redSlider); //show hsl and rgb range slider values
      onSliderChange(redSlider); // update other inputs when hsl / rgb input changes
    });

    //when input sliders are changed
    greenSlider.addEventListener('input', () => {
      updateSliderOutputs(greenSlider); //show hsl and rgb range slider values
      onSliderChange(greenSlider); // update other inputs when hsl / rgb input changes
    });

    //when input sliders are changed
    blueSlider.addEventListener('input', () => {
      updateSliderOutputs(blueSlider); //show hsl and rgb range slider values
      onSliderChange(blueSlider); // update other inputs when hsl / rgb input changes
    });

  });

  //target all input sliders
  document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', () => {
      updateSliderOutputs(slider); //show hsl and rgb range slider values
      onSliderChange(slider); // update other inputs when hsl / rgb input changes
    });
  });

  // update other inputs when colour in text input changes
  document.querySelectorAll('.hex').forEach(txtInput => {
    txtInput.addEventListener('blur', () => {
      let hex = validateHex(txtInput);
      let colourIDNo = txtInput.id.replace('colourText', '');

      updatePicker(colourIDNo, 'text', hex); //update colour picker
      updateRGBSliders(colourIDNo, 'text', hex); //update rgb
      updateHSLSliders(colourIDNo, 'text', hex) //update hsl
    });
  });

  // update other inputs when colour input changes
  document.querySelectorAll('.picker').forEach(pickerInput => {
    pickerInput.addEventListener('input', () => {
      let hex = pickerInput.value.replace('#', '');
      let colourIDNo = pickerInput.id.replace('colourPicker', '');

      updateTxtInput(colourIDNo, 'picker', hex); //update txtbox
      updateRGBSliders(colourIDNo, 'picker', hex); //update rgb
      updateHSLSliders(colourIDNo, 'picker', hex) //update hsl
    });
  });

  //check colour contrast
  document.getElementById('btnCheck').addEventListener('click', () => {
    let allPairs = getColourPairs(); //pair colours with each other
    coloursnRatios = []; //clear global array
    coloursnRatios = calcContrastRatio(allPairs); //get contrast ratios
    displayResults(coloursnRatios); //display ratios

    document.getElementById('contrastRatioResults').style.display = 'flex'; //show results
    document.getElementById('scroll').style.display = 'block'; //show button to scroll to results
  });

  //draw pie chart
  donutChart = new Chart("donutChart", {
    type: "doughnut",
    data: {
      datasets: [{
        backgroundColor: ['#50AF8F', 'F3AF80'],
        data: [120, 240]
      }]
    }
  });

  //draw bar/line chart combo
  mixedChart = new Chart('mixedChart', {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Income',
        type: 'bar',
        data: [25, 20, 30, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'F3AF80',
        order: 2 //drawn below
      }, {
        label: 'Sales',
        type: 'line',
        data: [10, 25, 45, 30],
        fill: false,
        borderColor: '#50AF8F',
        order: 1 //this dataset is drawn on top
      }],
      labels: ['Jan', 'Feb', 'Mar', 'Apr']
    }
  });
});

//open / close rgb adjusters
function openAccordionItem(button) {
  // Get the id of the button and derive the associated adjustment div's id
  const buttonId = button.id; // e.g., 'btnHSL1'
  const adjustId = buttonId.replace('btn', 'adjust'); // e.g., 'adjustHSL1'
  const accordionItem = button.closest('.colour-item'); // Find container of the clicked button

  // Close all adjustment panels within the group
  accordionItem.querySelectorAll('.adjust').forEach(panel => {
    if (panel.id !== adjustId) {
      panel.classList.remove('open');
      panel.style.height = null; // Remove inline style
    }
  });

  // Remove active styles from all buttons in the group
  accordionItem.querySelectorAll('.adjust-btn').forEach(btn => {
    btn.classList.remove('adjust-active');
  });

  // Open the selected adjustment panel and mark the button as active
  const adjustPanel = document.getElementById(adjustId);
  if (adjustPanel) {
    if (!adjustPanel.classList.contains('open')) {
      adjustPanel.classList.add('open');
      adjustPanel.style.height = adjustPanel.scrollHeight + 'px'; // Set height to content height
      button.classList.add('adjust-active');
    } else {
      adjustPanel.classList.remove('open');
      adjustPanel.style.height = null; // Collapse panel
    }
  }
}

function removeColour(btnRemove) {
  const colourDiv = btnRemove.closest('.colour-item'); //find colour container
  colourDiv.remove();

  //remove id from array of valid IDs
  let removeID = Number(btnRemove.id);
  colourIDs.splice(colourIDs.indexOf(removeID), 1);
}

function updateSliderOutputs(slider) {
  let output = document.getElementById(slider.id + 'Value'); //get output span
  output.innerHTML = slider.value;
}

//called when 1 of the hsl / rgb sliders are changed to update the other colour inputs
function onSliderChange(slider) {
  let colourIDNo;

  //if slider is h / s / b
  if (slider.id.includes('hue') ||
    slider.id.includes('sat') ||
    slider.id.includes('light')) {
    if (slider.id.includes('hue'))
      colourIDNo = slider.id.replace('hue', '');
    else if (slider.id.includes('sat'))
      colourIDNo = slider.id.replace('sat', '');
    else
      colourIDNo = slider.id.replace('light', '');

    //get hsl values
    let h = Number(document.getElementById('hue' + colourIDNo).value);
    let s = Number(document.getElementById('sat' + colourIDNo).value);
    let l = Number(document.getElementById('light' + colourIDNo).value);

    updateTxtInput(colourIDNo, 'hsl', [h, s, l]); //update txtbox
    updatePicker(colourIDNo, 'hsl', [h, s, l]); //update colour picker
    updateRGBSliders(colourIDNo, 'hsl', [h, s, l]); //update rgb
  }
  else {
    if (slider.id.includes('red'))
      colourIDNo = slider.id.replace('red', '');
    else if (slider.id.includes('green'))
      colourIDNo = slider.id.replace('green', '');
    else
      colourIDNo = slider.id.replace('blue', '');

    //get rgb values
    let r = Number(document.getElementById('red' + colourIDNo).value);
    let g = Number(document.getElementById('green' + colourIDNo).value);
    let b = Number(document.getElementById('blue' + colourIDNo).value);

    updateTxtInput(colourIDNo, 'rgb', [r, g, b]); //update txtbox
    updatePicker(colourIDNo, 'rgb', [r, g, b]); //update colour picker
    updateHSLSliders(colourIDNo, 'rgb', [r, g, b]); //update hsl
  }
}

//validate user input in colour text fields
function validateHex(input) {
  let hex = input.value.trim();
  // regex to match valid hexadecimal color codes (3 / 6 letters)
  const hexPattern = /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/;

  if (hexPattern.test(hex)) {
    // If the input is 3 characters, expand it to 6 characters
    if (hex.length === 3) {
      input.value = hex
        .split('')
        .map(char => char + char) // Duplicate each char
        .join('');
    }
  } else {
    // Input is invalid
    input.value = 'FFFFFF';
  }

  return input.value;
}

//update colour picker when any colour input changes
function updatePicker(colourNo, inputType, updatedValue) {
  //colourNo = no used in element ID; inputType = text / hsl / rgb; updatedValue = value of input
  let hex = '';

  switch (inputType) {
    case 'text':
      hex = updatedValue;
      break;

    case 'hsl':
      let rgb = HSLToRGB(updatedValue[0], updatedValue[1], updatedValue[2]);
      hex = RGBToHEX(rgb[0], rgb[1], rgb[2]);
      break;

    case 'rgb':
      hex = RGBToHEX(updatedValue[0], updatedValue[1], updatedValue[2]);
      break;

    default:
      break;
  }

  let picker = document.getElementById('colourPicker' + colourNo); //get colour picker
  picker.value = '#' + hex;
}

//update rgb sliders when any colour input changes
function updateRGBSliders(colourNo, inputType, updatedValue) {
  //colourNo = no used in element ID; inputType = text / picker / hsl; updatedValue = value of input
  let rgb = [];

  switch (inputType) {
    case 'text':
      rgb = HEXToRGB(updatedValue); //convert hex to rgb
      break;

    case 'picker':
      rgb = HEXToRGB(updatedValue); //convert hex to rgb
      break;

    case 'hsl':
      rgb = HSLToRGB(updatedValue[0], updatedValue[1], updatedValue[2]);
      //convert hsl to rgb
      break;

    default:
      break;
  }

  //get range inputs
  let redSlider = document.getElementById('red' + colourNo);
  let greenSlider = document.getElementById('green' + colourNo);
  let blueSlider = document.getElementById('blue' + colourNo);
  //update sliders and display text
  redSlider.value = rgb[0];
  updateSliderOutputs(redSlider);
  greenSlider.value = rgb[1];
  updateSliderOutputs(greenSlider);
  blueSlider.value = rgb[2];
  updateSliderOutputs(blueSlider);
}

//update hsl sliders when any colour input changes
function updateHSLSliders(colourNo, inputType, updatedValue) {
  //colourNo = no used in element ID; inputType = text / picker / rgb; updatedValue = value of input
  let hsl = [];

  switch (inputType) {
    case 'text':
      //convert hex to hsl
      const rgb = HEXToRGB(updatedValue);
      hsl = RGBToHSL(rgb[0], rgb[1], rgb[2]);
      break;

    case 'picker':
      //convert hex to hsl
      const rgb2 = HEXToRGB(updatedValue);
      hsl = RGBToHSL(rgb2[0], rgb2[1], rgb2[2]);
      break;

    case 'rgb':
      hsl = RGBToHSL(updatedValue[0], updatedValue[1], updatedValue[2]); //convert rgb to hsl
      break;
  }

  //get range inputs
  let hueSlider = document.getElementById('hue' + colourNo);
  let satSlider = document.getElementById('sat' + colourNo);
  let lightSlider = document.getElementById('light' + colourNo);
  //update sliders and display text
  hueSlider.value = hsl[0];
  updateSliderOutputs(hueSlider);
  satSlider.value = hsl[1];
  updateSliderOutputs(satSlider);
  lightSlider.value = hsl[2];
  updateSliderOutputs(lightSlider);
}

//update text colour input when any colour input changes
function updateTxtInput(colourNo, inputType, updatedValue) {
  //colourNo = no used in element ID; inputType = picker / hsl / rgb; updatedValue = value of input
  let txtInput = document.getElementById('colourText' + colourNo);
  let hex = '';

  switch (inputType) {
    case 'picker':
      hex = updatedValue; //update txtbox value
      break;

    case 'hsl':
      let rgb = HSLToRGB(updatedValue[0], updatedValue[1], updatedValue[2]);
      hex = RGBToHEX(rgb[0], rgb[1], rgb[2]);
      break;

    case 'rgb':
      hex = RGBToHEX(updatedValue[0], updatedValue[1], updatedValue[2]);
      break;

    default:
      break;
  }

  txtInput.value = hex.toUpperCase(); //update txtbox value
}

//convert colours to other colour formats
function HEXToRGB(hex) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
}

function RGBToHSL(r, g, b) {
  //convert rgb to fraction between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let delta = max - min;

  //calc hue
  let h = 0;

  if (delta !== 0) {
    if (max === r) h = (g - b) / delta;
    else if (max === g) h = 2 + ((b - r) / delta);
    else h = 4 + ((r - g) / delta); //max = b / max = r=g=b
  }

  //convert hue to degrees (out of 360)
  h *= 60;
  if (h < 0) h += 360; //hue can't be negative

  let l = (max + min) / 2; //calc lightness

  let s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); //calc saturation

  // convert l and s to % btwn 0 & 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [Math.round(h), s, l];
}

function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;

  let chroma = (1 - Math.abs(2 * l - 1)) * s,
    x = chroma * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - chroma / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = chroma; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = chroma; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = chroma; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = chroma;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = chroma;
  } else if (300 <= h && h < 360) {
    r = chroma; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

function RGBToHEX(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return (r + g + b).toUpperCase();
}

function getColourPairs() {
  let colours = [];
  //get colours from colour picker inputs so I don't hvae to call validateHex
  colourIDs.forEach(id => {
    let colourHex = document.getElementById('colourPicker' + id).value;
    colourHex = colourHex.replace('#', '').toUpperCase(); //remove '#'

    //remove duplicates
    if (!colours.includes(colourHex)) colours.push(colourHex);
  });

  //get colour pairs
  let pairs = []; // Array to store all pairs

  //fill array with pairs of [i, j] while preventing duplicates
  for (let i = 0; i < colours.length; i++) {
    for (let j = i + 1; j < colours.length; j++) {
      pairs.push([colours[i], colours[j]]);
    }
  }

  return pairs; // Return the array of pairs
}

//Convert hex to luminance needed for calculating contrast ratio
function HEXToLuminance(hex) {
  let rgb = HEXToRGB(hex);

  // Parse hex into RGB components
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  // Convert to linear RGB
  const linearize = (c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const rLin = linearize(r);
  const gLin = linearize(g);
  const bLin = linearize(b);

  // Calculate luminance
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

//returns array where [[colour1, colour2, ratio]]
function calcContrastRatio(colourPairs) {
  //colourPairs = [['ffffff', '000000'], more pairs]
  let ratios = [];

  colourPairs.forEach(pairing => {
    const luminance1 = HEXToLuminance(pairing[0]);
    const luminance2 = HEXToLuminance(pairing[1]);

    const L1 = Math.max(luminance1, luminance2); //lighter colour
    const L2 = Math.min(luminance1, luminance2);

    //contrast ration formula: (L1 + 0.05) / (L2 + 0.05)
    let ratio = (L1 + 0.05) / (L2 + 0.05);

    //round off ratio and push to new array
    ratios.push([pairing[0], pairing[1], Math.round(ratio * 100) / 100]);
  });

  // Sort by the contrast ratio (the last element in each sub-array) in descending order
  ratios.sort((a, b) => b[2] - a[2]);
  return ratios;
}

function displayResults(contrastRatios) {
  //contrastRatios = [[colour1, colour2, contrastRatio]]

  //get div to add colour pairs
  let ratioDiv = document.getElementById('ratios');
  ratioDiv.innerHTML = ''; //clear any previous palettes

  for (let i = 0; i < contrastRatios.length; i++) {
    let coloursRatio = contrastRatios[i];

    //create HTML elements
    let pairDiv = document.createElement('div');
    pairDiv.id = `pair${i}`;
    pairDiv.classList.add('pair');

    let infoIcon = document.createElement('i');
    infoIcon.classList.add('bi', 'bi-info-circle');

    let btnInfo = document.createElement('button');
    btnInfo.id = `info${i}`;
    btnInfo.classList.add('btnInfo');
    btnInfo.title = 'Visualise colour pair';
    btnInfo.appendChild(infoIcon);

    let colourSpan1 = document.createElement('span');
    colourSpan1.id = `colour${i}-1`;
    colourSpan1.classList.add('pair-colour');
    colourSpan1.style.backgroundColor = '#' + coloursRatio[0];

    let switchIcon = document.createElement('i');
    switchIcon.classList.add('bi', 'bi-arrow-left-right');

    let btnSwitch = document.createElement('button');
    btnSwitch.id = `switch${i}`;
    btnSwitch.classList.add('btnSwitch');
    btnSwitch.title = 'Switch text and background colours';
    btnSwitch.appendChild(switchIcon);

    let colourSpan2 = document.createElement('span');
    colourSpan2.id = `colour${i}-2`;
    colourSpan2.classList.add('pair-colour');
    colourSpan2.style.backgroundColor = '#' + coloursRatio[1];

    let ratioSpan = document.createElement('span');
    ratioSpan.id = `ratio${i}`;
    ratioSpan.classList.add('contrast-ratio');
    ratioSpan.textContent = coloursRatio[2] + ' '; //display ratio

    let ratioIcon = document.createElement('i');
    ratioIcon.classList.add('bi');

    //if colour contrast ratio >= 4.5, green with tick
    if (coloursRatio[2] >= 4.5) {
      ratioSpan.classList.add('pass');
      ratioIcon.classList.add('bi-check-circle');
    }
    else {
      ratioSpan.classList.add('fail');
      ratioIcon.classList.add('bi-x-circle');
    }

    ratioSpan.appendChild(ratioIcon);
    pairDiv.append(btnInfo, colourSpan1, btnSwitch, colourSpan2, ratioSpan);

    //add event listeners to switch and info buttons
    btnSwitch.addEventListener('click', () => {
      switchForegroundBackground(btnSwitch);
    });
    btnInfo.addEventListener('click', () => {
      displayPair(btnInfo);
    });

    ratioDiv.appendChild(pairDiv);
  }

  //set up visualiser using 1st pair by default
  updateVisualiser('#' + contrastRatios[0][0], '#' + contrastRatios[0][1]);
}

function updateVisualiser(fgColour, bgColour) {
  document.querySelectorAll('.visualiser').forEach(visualiserDiv => {
    visualiserDiv.style.backgroundColor = bgColour;
    visualiserDiv.style.color = fgColour;
  });

  //update chart colours
  if (donutChart) {
    donutChart.data.datasets[0].backgroundColor = [fgColour, bgColour];
    donutChart.update();
  }

  if (mixedChart) {
    mixedChart.data.datasets[0].backgroundColor = bgColour; // bar chart
    mixedChart.data.datasets[1].borderColor = fgColour; // line chart
    mixedChart.update();
  }
}

function switchForegroundBackground(button) {
  //get index of pair to switch
  let index = Number(button.id.replace('switch', ''));

  //switch colours in global variable
  let tempBg = coloursnRatios[index][1]; //store bg in temp
  coloursnRatios[index][1] = coloursnRatios[index][0]; //bg = fg
  coloursnRatios[index][0] = tempBg; //fg = temp = old bg

  //switch in results
  document.getElementById(`colour${index}-1`).style.backgroundColor = '#' + coloursnRatios[index][0];
  document.getElementById(`colour${index}-2`).style.backgroundColor = '#' + coloursnRatios[index][1];

  updateVisualiser('#' + coloursnRatios[index][0], '#' + coloursnRatios[index][1]) //switch in visualiser
}

function displayPair(button) {
  //get index of pair to show
  let index = Number(button.id.replace('info', ''));

  updateVisualiser('#' + coloursnRatios[index][0], '#' + coloursnRatios[index][1]) //show in visualiser
}
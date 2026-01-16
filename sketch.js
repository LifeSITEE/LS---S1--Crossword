//X and Y coordinates for the boxes
// Correct Answer
let words = [
  { answer: "CELLS", inputs: [], x: 190, y: 340, type:"A" },
  { answer: "MULTICELLULAR", inputs: [], x: 130, y: 430, type:"A" },
  { answer: "TRILLIONS", inputs: [], x: 160, y: 550, type:"A" },
  { answer: "PLANTCELLS", inputs: [], x: 100, y: 280, type:"A" },
  { answer: "ANIMALCELLS", inputs: [], x: 430, y: 310, type:"A" },
  { answer: "UNICELLULAR", inputs: [], x: 190, y: 250, type:"D" },
  { answer: "ORGANELLES", inputs: [], x: 430, y: 220, type:"D" },
  { answer: "BACTERIA", inputs: [], x: 610, y: 250, type:"D" },
  { answer: "NUCLEUS", inputs: [], x: 370, y: 100, type:"D" }
];

function draw() {
  background(197, 245, 255);
  
  textSize(20);
  fill(0);
  text("Biology Crossword Puzzle", 100, 40);
  textSize(16);
  fill(0);
  text("Across", 100, 600);
  textSize(14);
  fill(0);
  text("1. The building blocks of plants.", 100, 620);
  text("2. The building blocks of all life on earth.", 100, 635);
  text("3. Organisms that are made up of many cells.", 100, 650);
  text("4. How many cells are working together in",100, 665);
  text("    your body right now?", 100, 680)
  text("5. The building blocks of animals.", 100, 695);
  
  textSize(16);
  fill(0);
  text("Down", 370, 600);
  textSize(14);
  fill(0);
  text("1. Common organelle between plant cells and", 370, 620);
  text("    animal cells that start with the letter N.", 370, 635);
  text("2. Organisms that are made of only one cell.", 370, 650);
  text("3. Parts which have different jobs that make",370, 665);
  text("    up cells.", 370, 680);
  text("4. A type of unicellular organism that start",370, 695);
  text("    with the letter B.", 370, 710);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Times New Roman");
  
  

  let createdInputs = {};
  
  words.forEach(word => {
    for (let i = 0; i < word.answer.length; i++) {
      let xNow, yNow;
      
      if(word.type == "A")
      {
        xNow = word.x + i * 30;
        yNow = word.y;
      }
      else
      {
        xNow = word.x;
        yNow = word.y + i * 30;
      }
      
      let key = xNow+" , "+yNow;
      
      if (createdInputs[key]) 
      {
        word.inputs.push(createdInputs[key]); 
      } 
      
      else 
      {
        let input = createInput("");
        input.position(xNow, yNow);
        input.size(20, 20);
        input.style("text-align", "center");
        input.style("font-size", "12px");
        input.attribute("maxlength", "1");
        
        input.input(() => {
        let val = input.value().toUpperCase();
        input.value(val);

        if (val.length === 1) {
            // Find which index this input is in the current word
            let currentIndex = word.inputs.indexOf(input);
            
            // If there is a "next" box in this word, jump to it
            if (currentIndex < word.inputs.length - 1) {
                word.inputs[currentIndex + 1].elt.focus();
            }
        }
    });

        input.input(() => {
          input.value(input.value().toUpperCase());
        });

        createdInputs[key] = input;
        

        word.inputs.push(input);
      }
    }
  });

  // Button
  checkButton = createButton("Check Answers");
  checkButton.position(520, 130);
  checkButton.mousePressed(checkAnswers);
}

function checkAnswers() {
  words.forEach(word => {
    let correct = true;
    for (let i = 0; i < word.answer.length; i++) {
        if (word.inputs[i].value() !== word.answer[i]) {
          correct = false;
        }
     
    }

    word.inputs.forEach(input => {
      input.style(
        "background-color",
        correct ? "#b6fcb6" : "#fcb6b6"
      );
    });
  });
}

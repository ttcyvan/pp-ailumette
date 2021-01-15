const readlineSync = require('readline-sync');
const fs = require("file-system");
class Piramid{
     gameSave  ;
     maxValueY = 0;
     maxValueX = 0 ;
     PositionXY = {};
     resultData = "";

    allData() {

        let result =  fs.readFileSync('data.txt', 'utf8');
        let resultLine = result.split('\n');         
        let y = -1;

        for (let line of resultLine) {
            let x  = -1;
            y++;
            if (this.maxValueY <= y) {
                this.maxValueY = y + 1
            }
            if (!line) { break; }
            for (let value of line.split('')) {
                x++;
                if (this.maxValueX < x) {
                    this.maxValueX = x
                }
                let position = `${x}:${y}`;
                this.PositionXY[position] = {
                    value: value
                }
            }
        }  
      }

      viewData(){
        let oldY = 0;
        this.gameSave = "";
      for (let obj in this.PositionXY) {
          let XandY = obj.split(":");
          let X = parseInt(XandY[0], 10)
          let Y = parseInt(XandY[1], 10)
          if (Y > oldY) {
            this.gameSave = this.gameSave + '\n'
          }
          this.gameSave = this.gameSave + this.PositionXY[obj]['value']
          oldY = Y
      }
      console.log(this.gameSave);
    }

    testValid(nbDemise, y) {
		let x = 0;
        let count = 0;

		while (x !== this.maxValueX) {
              
               if (this.PositionXY[`${x}:${y}`]['value'] == '|') {
                   if (count != nbDemise) {
                       count++
                       this.PositionXY[`${x}:${y}`]['value'] = ' '
                   } else {
                       this.PositionXY[`${x}:${y}`]['value'] = '|'
                   }
               }
            x++;    
		}
    }
    
    MatchesAll() {
		let count = 0
		Object.entries(this.PositionXY).forEach(obj => {
			if (obj[1].value == '|') {
				count++
			}
		});
		return count;
    }
    
    replay(){
       while(this.maxValueX == 0 && this.maxValueY == 0){
            if (this.PositionXY[`${x}:${y}`]['value'] == ''){
                console.log("ok")
            }
       }

    }
    
}

function jouer(piramid) {

    let line ;
    let valide;
	line = readlineSync.question('Line : ')	
	valide = readlineSync.question('matches : ');
		
	piramid.testValid(valide, line)
	if (piramid.MatchesAll() ===  0) {
		console.log("fin tu as perdu")
        piramid.viewData()
        piramid.replay()
    }


    
}

function nbrPipe(piramid, y){ // value of position
    let x = 0;
    let count = 0;
		while (x !== piramid.maxValueX) {   

               if (piramid.PositionXY[`${x}:${y}`]['value'] == '|') {
                   count++
               }
            x++;    
        }
        
        return count;
}

function IaDeFou(piramid){
let valueY = 0
while(nbrPipe(piramid,valueY) <= 0){
    valueY = Math.round(Math.random() * ((piramid.maxValueY - 2) - 1 + 1) + 1)
}
let valueX = 0
while(valueX <= 0){
   valueX =  Math.round(Math.random() * (nbrPipe(piramid,valueY) - 0 + 1) + 0)
}
piramid.testValid(valueX,valueY)
console.log('IA a jouer en x ;'+ valueX)
console.log('IA a jouer en Y ;'+ valueY)
}


function play(){

let piramid = new Piramid;
    piramid.allData()
    piramid.viewData()

    while(piramid.MatchesAll() !== 0){
        jouer(piramid)
        piramid.viewData()
        IaDeFou(piramid)
        piramid.viewData()
    };
    
}

play()


class Logo {
    constructor(canvasElement) {
        if(canvasElement.getContext('2d')) {
            this.context = canvasElement.getContext('2d');
            this.height  = canvasElement.height;
            this.width   = canvasElement.width;
            
            this.rotation = 90;
            this.stroke = true;
            this.xPos = 0; //xPos is -half width from its real canvas position
            this.yPos = 0; //yPos is -half height its real canvas position
        } else {
            throw "Element is not a Canvas";
        }
    }

    parse(input) {
        if(typeof input == 'string') {
            input = input.replace(/\s+/g,' ').trim().split(' ');
        } else if (!Array.isArray(input)) {
            throw "Input parameters should be passed as an array or string";
        }

        let outputString = '';

        for(let i = 0; i < input.length;) {
            console.log(input[i]);
            switch(input[i].toLocaleLowerCase()) {
                case "fd": {
                    let value = this.preprocessor(input[i+1]);
                    outputString += this.fd(value) + ", ";
                    i++;
                    break;
                }
                case "bk":{
                    let value = this.preprocessor(input[i+1]);
                    outputString += this.bk(value) + ",";
                    i++;
                    break;
                }
                case "rt": {
                    let value = this.preprocessor(input[i+1]);
                    outputString += this.rt(value) + ", ";
                    i++;
                    break;
                }
                case "lt": {
                    let value = this.preprocessor(input[i+1]);
                    outputString += this.lt(value) + ", ";
                    i++;
                    break;
                }
                case "repeat": {
                    let value = this.preprocessor(input[i+1]);
                    let bracket = 1;
                    let j = ++i;
                    j++;
                    while (bracket != 0) {
                        j++;
                        if(input[j] === '[') bracket++;
                        if(input[j] === ']') bracket--;
                        if(input[j] === undefined) throw "Incorrect paramter syntax";
                    }
                    outputString += this.repeat(value, input.slice(i + 2, j)) + ", ";
                    i = j;
                    break;
                }
                case "up": {
                    outputString += this.up() + ", ";
                    break;
                }
                case "down": {
                    outputString += this.down() + ", ";
                    break;
                }
                default: {
                    throw "Unkown command";
                }
            }
            i++;
        }

        return outputString;
    }

    fd(value) {
        this.context.beginPath();
        this.context.moveTo(this.xPos + this.width/2, this.yPos + this.height/2);
        this.xPos += value*Math.cos(this.rotation * Math.PI/180);
        this.yPos -= value*Math.sin(this.rotation * Math.PI/180);
        this.context.lineTo(this.xPos + this.width/2, this.yPos + this.height/2);      
        if(this.stroke) this.context.stroke();
        return `Moved forwards ${value} steps to ${Math.round(this.xPos)}, ${Math.round(this.yPos)}`;
    }

    bk(value) {
        this.context.beginPath();
        this.context.moveTo(this.xPos + this.width/2, this.yPos + this.height/2);
        this.xPos -= value*Math.cos(this.rotation * Math.PI/180);
        this.yPos += value*Math.sin(this.rotation * Math.PI/180);
        this.context.lineTo(this.xPos + this.width/2, this.yPos + this.height/2);
        if(this.stroke) this.context.stroke();
        return `Moved backwards ${value} steps to ${Math.round(this.xPos)}, ${Math.round(this.yPos)}`;

    }

    rt(value) {
        this.rotation = ((this.rotation - value) % 360 + 360) % 360;
        return `Rotated right ${value} degrees to ${this.rotation}`;
    }

    lt(value) {
        this.rotation = (this.rotation + value) % 360;
        return `Rotated left ${value} degrees to ${this.rotation}`;
    }

    up() {
        this.stroke = false;
        return "Raised the pencil";
    }

    down() {
        this.stroke = true;
        return "Lowered the pencil";
    }

    repeat(number, repeatStatements) {
        let outputString = `Repeated ${number} times [ `;
        for(let i = 0; i < number; i++) {
            outputString += this.parse(repeatStatements);
        }
        return outputString + ' ]';
    }

    preprocessor(value) {
        let v = parseInt(value);
        if (isNaN(v)) {
            switch (value) {
                case ":x": {
                    v = this.xPos
                    break;
                }
                case ":y": {
                    v = this.yPos
                    break;
                }
                case ":r": {
                    v = this.rotation;
                    break;
                }
                default: {
                    throw "Unrecognizable argument"
                }
            }
        }
        return v;
    }

    calc(value, parseLevel) {
        let s = '';
        for (let i = 0; i < parseLevel; i++) s+='-';
        console.log(`${s}Parsing ${value} on level ${parseLevel}:`);
        let v = Number(value);
        if (isNaN(v)) {
            let characterArray = value.split('');
            console.log(characterArray);
            for (let i = 0; i < characterArray.length; i++) {
                console.log(i, characterArray[i]);
                switch(characterArray[i]) {
                    case '(': {
                        let parCounter = 1;
                        let j = i;
                        while (parCounter != 0) {
                            j++;
                            if (characterArray[j] === '(') parCounter++;
                            if (characterArray[j] === ')') parCounter--;
                            if (characterArray[j] === undefined) throw "Incorrect syntax";
                        }
                        console.log(`${s}Passing ${characterArray.slice(i+1, j).join('')} setting i to ${j}`)
                        v = this.calc(characterArray.slice(i+1, j).join(''), parseLevel+1);
                        i = j;
                        break;
                    }   
                    case '+': {
                        v = this.calc(characterArray.slice(0, i).join(''), parseLevel+1) + this.calc(characterArray.slice(i+1).join(''), parseLevel+1);
                        break;
                    }
                    case '/': {
                        v = this.calc(characterArray.slice(0, i).join(''), parseLevel+1) / this.calc(characterArray.slice(i+1).join(''), parseLevel+1);
                        break;
                    }
                    case '*': {
                        v = this.calc(characterArray.slice(0, i).join(''), parseLevel+1) * this.calc(characterArray.slice(i+1).join(''), parseLevel+1);
                        break;
                    }
                }
            }
        }
        console.log(`${s}Returning ${v} on level ${parseLevel}`);
        return v;
    }

}
class Logo {
    constructor(canvasElement) {
        if(canvasElement.getContext('2d')) {
            this.context = canvasElement.getContext('2d');
            this.height  = canvasElement.height;
            this.width   = canvasElement.width;
            
            this.rotation = 90;
            this.stroke = true;
            this.xPos = this.width/2;
            this.yPos = this.height/2;
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
            switch(input[i].toLocaleLowerCase()) {
                case "fd": {
                    let value = this.checkInt(input[i+1]);
                    outputString += this.fd(value) + ", ";
                    i++;
                    break;
                }
                case "bk":{
                    let value = this.checkInt(input[i+1]);
                    outputString += this.bk(value) + ",";
                    i++;
                    break;
                }
                case "rt": {
                    let value = this.checkInt(input[i+1]);
                    outputString += this.rt(value) + ", ";
                    i++;
                    break;
                }
                case "lt": {
                    let value = this.checkInt(input[i+1]);
                    outputString += this.lt(value) + ", ";
                    i++;
                    break;
                }
                case "repeat": {
                    let value = checkInt(input[i+1]);
                    let bracket = 1;
                    let j = ++i;
                    j++;
                    while (bracket != 0) {
                        j++;
                        console.log(input[j]);
                        if(input[j] == '[') bracket++;
                        if(input[j] == ']') bracket--;
                        if(input[j] === undefined) throw "Incorrect paramter syntax";
                    }
                    outputString += this.repeat(value, input.slice(i + 2, j)) + ", ";
                    i = j + 1;
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
                    throw "Incorrect parameter syntax";
                }
            }
            i++;
        }

        return outputString;
    }

    fd(value) {
        this.context.beginPath();
        this.context.moveTo(this.xPos, this.yPos);
        this.xPos += value*Math.cos(this.rotation * Math.PI/180);
        this.yPos -= value*Math.sin(this.rotation * Math.PI/180);
        this.context.lineTo(this.xPos, this.yPos);      
        if(this.stroke) this.context.stroke();
        return `Moved forwards ${value} steps to ${Math.round(this.xPos)}, ${Math.round(this.yPos)}`;
    }

    bk(value) {
        this.context.beginPath();
        this.context.moveTo(this.xPos, this.yPos);
        this.xPos -= value*Math.cos(this.rotation * Math.PI/180);
        this.yPos += value*Math.sin(this.rotation * Math.PI/180);
        this.context.lineTo(this.xPos, this.yPos);
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

    checkInt(value) {
        let v = parseInt(value);
        if (isNaN(v)) throw "Argument must be a number";
        return v;
    }
}
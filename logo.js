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

        console.log(input);

        for(let i = 0; i < input.length;) {
            switch(input[i]) {
                case "fd": {
                    let value = parseInt(input[++i]);
                    if (isNaN(value)) throw "Incerrect parameter syntax";
                    this.fd(value);
                    i += 1;
                    break;
                }
                case "bk":{
                    let value = parseInt(input[++i]);
                    if (isNaN(value)) throw "Incerrect parameter syntax";
                    this.bk(value);
                    i += 1;
                    break;
                }
                case "rt": {
                    let value = parseInt(input[++i]);
                    if (isNaN(value)) throw "Incerrect parameter syntax";
                    this.rt(value);
                    i += 1;
                    break;
                }
                case "lt": {
                    let value = parseInt(input[++i]);
                    if (isNaN(value)) throw "Incerrect parameter syntax";
                    this.lt(value);
                    i += 1;
                    break;
                }
                case "repeat": {
                    let value = parseInt(input[++i]);
                    if (isNaN(value)) throw "Incerrect parameter syntax";
                    let bracket = 1;
                    let j = ++i;
                    while (bracket != 0) {
                        j++;
                        if(input[j] == '[') bracket++;
                        if(input[j] == ']') bracket--;
                        if(input[j] === undefined) throw "Incorrect paramter syntax";
                    }
                    this.repeat(value, input.slice(i + 1, j));
                    i = j + 1;
                    break;
                }
                default: {
                    throw "Incorrect parameter syntax";
                }
            }
        }
    }

    fd(value) {
        this.context.beginPath();
        this.context.moveTo(this.xPos, this.yPos);
        this.xPos += value*Math.cos(this.rotation * Math.PI/180);
        this.yPos -= value*Math.sin(this.rotation * Math.PI/180);
        this.context.lineTo(this.xPos, this.yPos);      
        if(this.stroke) this.context.stroke();
    }

    bk(value) {
        this.context.beginPath();
        this.context.moveTo(this.xPos, this.yPos);
        this.xPos -= value*Math.cos(this.rotation * Math.PI/180);
        this.yPos += value*Math.sin(this.rotation * Math.PI/180);
        this.context.lineTo(this.xPos, this.yPos);
        if(this.stroke) this.context.stroke();
    }

    rt(value) {
        this.rotation = ((this.rotation - value) % 360 + 360) % 360;
    }

    lt(value) {
        this.rotation = (this.rotation + value) % 360;
    }

    up() {
        this.stroke = false;
    }

    down() {
        this.stroke = true;
    }

    repeat(number, repeatStatements) {
        for(let i = 0; i < number; i++) {
            this.parse(repeatStatements);   
        }
    }

}
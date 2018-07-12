
const updateButton = document.querySelector("#update");
const fpButton = document.querySelector("#flatPlate");
const phButton = document.querySelector("#portHole");
//const pButton = document.querySelector("#portHole");

const fndShape = document.querySelector("#fndShape");
const fndMeasurmentType = document.querySelector("#fndMeasurmentType");
const fndDiaMeasurment = document.querySelector("#fndDiaMeasurment");
const fndThickness = document.querySelector("#fndThickness");

const bpShape = document.querySelector("#bpShape");
const bpMeasurmentType = document.querySelector("#bpMeasurmentType");
const bpDiaMeasurment = document.querySelector("#bpDiaMeasurment");
const bpThickness = document.querySelector("#bpThickness");

const arQty = document.querySelector("#arQty");
const arDia = document.querySelector("#arDia");
const arMeasurementType = document.querySelector("#arMeasurementType");
const arDiaMeasurement = document.querySelector("#arDiaMeasurement");

const pShape = document.querySelector("#pShape");
const pMeasurmentType = document.querySelector("#pMeasurmentType");
const pDiaMeasurment = document.querySelector("#pDiaMeasurment");
const pThickness = document.querySelector("#pThickness");



const fpTableName = "myTable";
const phTableName = "phTable";

var bpCanvas = document.querySelector('#bpCanvas');
var c=bpCanvas.getContext('2d');
var dwgX = bpCanvas.width/2; 
var dwgY = bpCanvas.height/2;
c.translate(dwgX,dwgY);



//Function retrieves all baseplate values and then updates the baseplate diagram
function update(){
    let basePShape = bpShape.value;
    let basePMeasurmentType = bpMeasurmentType.value;
    let basePDiaMeasurment = bpDiaMeasurment.value;
    let basePThickness = bpThickness.value;
    
    let foundationShape = fndShape.value;
    console.log("this is the value you are looking for" + foundationShape);
    let foundationMeasurmentType = fndMeasurmentType.value;
    let foundationDiaMeasurment = fndDiaMeasurment.value;
    let foundationThickness = fndThickness.value;
    
    let aRodQty = arQty.value;
    let aRodDia = arDia.value;
    let aRodMeasurementType = arMeasurementType.value;
    let aRodDiaMeasurement = arDiaMeasurement.value;
    
    let poleShape = pShape.value;
    let poleMeasurmentType = pMeasurmentType.value;
    let poleDiaMeasurment = pDiaMeasurment.value;
    
    
    //clear canvas
    c.clearRect(-dwgX, -dwgY, bpCanvas.width, bpCanvas.height);
    
    //draw foundation
    foundationDiaMeasurment = measurementToRadius(foundationMeasurmentType,foundationDiaMeasurment,foundationShape)*2;
    //remove dwgX, dwgY replaced with 0
    drawPolygon(foundationShape,0,0,foundationDiaMeasurment/2,c);
    
    //draw baseplate
    basePDiaMeasurment = measurementToRadius(basePMeasurmentType,basePDiaMeasurment,basePShape)*2;
    //remove dwgX, dwgY replaced with 0
    drawPolygon(basePShape,0,0,basePDiaMeasurment/2,c);
    
    //draw Anchor Rod
    let arRadius = measurementToRadius(aRodMeasurementType,aRodDiaMeasurement,aRodQty);
    for (i = 0; i < aRodQty; i++) { 
        let angle = 2*Math.PI/aRodQty*i;
        console.log("the angle is"+ angle);
        //remove dwgX, dwgY replaced with 0
        let x = Math.sin(angle)*arRadius + 0;
        let y = Math.cos(angle)*arRadius + 0;
        console.log(i);
        //remove dwgX, dwgY replaced with 0
        console.log("the x value = "+x+ " " + 0);
        console.log("the y value = "+y+ " "+ 0);
        drawPolygon(200,x,y,aRodDia/2,c);
    }   
    
     //draw tower
    console.log("0 pole dia measurement = " + poleDiaMeasurment);
    poleDiaMeasurment = measurementToRadius(poleMeasurmentType,poleDiaMeasurment,poleShape)*2;
    console.log("1 pole dia measurement = " + poleDiaMeasurment);
    //remove dwgX, dwgY replaced with 0
    drawPolygon(poleShape,0,0,poleDiaMeasurment/2,c);
    
    //draw Flat Plat
    drawFP(poleShape, poleDiaMeasurment,fpTableName);
    
    //draw Port Hole
    drawFP(poleShape, poleDiaMeasurment,phTableName);   
}


//The radius of a regular hexagon, also called its circumradius, is the distance from its center to its vertexes, or points.
function drawPolygon(basePShape,bpX,bpY,bpRadius,c){
    let sides = basePShape;
    let x = bpX;
    let y = bpY;
    let radius = bpRadius;
    let rotation = Math.PI * 0;
    let stepAngle = (Math.PI * 2) / sides

    c.beginPath();
    for (let i = 0; i < sides; i++) {
        let angle = i * stepAngle,
            px = x + Math.cos(rotation + angle) * radius,
            py = y + Math.sin(rotation + angle) * radius;

        c[i === 0 ? 'moveTo' : 'lineTo'](px, py);
    }
    c.closePath();
//    c.fillStyle = 'rgb(204, 62, 62)';
//    c.fill();
//    c.lineWidth = 6;
//    c.strokeStyle = 'rgb(170, 56, 56)';
    c.stroke();
}

function measurementToRadius(measurementType,measurment,numSides){
    
    let r=0;
    let x = Math.PI/numSides;
    let y = Math.PI/2-x;
    switch (measurementType) {
    case '0':
        r=(Math.sin(Math.PI/2)*(measurment/2))/Math.sin(y);
        break;
    case '1':
        r=measurment/2;
        break;
    case '2':
        r=(Math.sin(Math.PI/2)*(measurment/2))/Math.sin(x);
        break;
} 
    return r;
    
}

//Function to draw anchor rods
function drawAR(){
    
}

//Event Listener
function addFp() {
    console.log("Stiffner add row");
    addRow(fpTableName);
}

function addRow(tableName) {
    var table = document.getElementById(tableName);
    rowLength = table.rows.length;
    var row = table.insertRow(rowLength);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = '<td><input type="number" placeholder="Flat Location"></td>';
    cell2.innerHTML = '<td><input type="number" placeholder="Offset"></td>';
    cell3.innerHTML = '<td><input type="number" placeholder="Start Height"></td>';
    cell4.innerHTML = '<td><input type="number" placeholder="Stop Height"></td>';
    cell5.innerHTML = '<td><input type="number" placeholder="Width"></td>';
    cell6.innerHTML = '<td><input type="number" placeholder="Depth"></td>';
}

function drawFP(poleShape, poleDiaMeasurment,tableName){
    var table = document.getElementById(tableName);
    
    var oRows = document.getElementById(tableName).getElementsByTagName('tr');
    var qtFP = oRows.length;
    console.log("table length is" + qtFP);
    
    for (i = 1; i < qtFP; i++) {
        let fLocation = table.rows[i].cells[0].children[0].value;
        let foffset = table.rows[i].cells[1].children[0].value;
        foffset = parseFloat(foffset)*-1;
        let startHeight = table.rows[i].cells[2].children[0].value;
        let endHeight = table.rows[i].cells[3].children[0].value;
        let width = table.rows[i].cells[4].children[0].value;
        let thickness = table.rows[i].cells[5].children[0].value;

        let stepAngle = 2*Math.PI/poleShape;
        fLocation = parseInt(fLocation)+0.5;
        let rotation = stepAngle*(fLocation);

        c.rotate(rotation);
        let fpRadius = poleDiaMeasurment/2;
        c.fillRect(fpRadius,width/-2+foffset,thickness,width);
        c.rotate(rotation*-1);
        console.log("the function ran for "+ i);
    }
    
}

function addPh(){
    addRow(phTableName);
}





// Event listeners for keyboard input and the reset
fpButton.addEventListener("click", addFp, false);
phButton.addEventListener("click", addPh, false);
updateButton.addEventListener("click", update, false);



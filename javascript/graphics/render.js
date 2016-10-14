var HEX_BRANCH = [ {x:1, y:0}, {x:0.5,y:-0.866025403784439}, {x:-0.5,y:-0.866025403784439}, {x:-1, y:0}, {x:-0.5,y:0.866025403784439}, {x:0.5,y:0.866025403784439} ];

/////////////////////////////////////////////////////////////
//////////////////      SNOWFLAKE         ///////////////////
/////////////////////////////////////////////////////////////


var drawBetweenNodes = drawBetweenNodesHex;

function setGrowStyle(input){
	// declared in snowflake.html
	growStyle = input;
	if(growStyle == 0){
		getLength = nodeLengthLinear;
		getThickness = nodeThicknessLinear;
	} else if(growStyle == 1){
		getLength = nodeLengthCascading;
		getThickness = nodeThicknessCascading;
	} else if(growStyle == 2){
		getLength = nodeLengthFromNode;
		getThickness = nodeThicknessFromNode;
	}
}


// call these to draw:
function drawBinaryTree(position){      recurseSimple(this.tree, position);   }
function drawSnowflakeOneArm(position){ recurseReflect(this.tree, position, 0); }
function drawSnowflake6Sides(position){
	for(var angle = 0; angle < 6; angle += 2)
		recurseReflect(this.tree, position, angle);
	for(var angle = 1; angle < 6; angle += 2)
		recurseReflect(this.tree, position, angle);
}
function drawFilledSnowflake6Sides(position){
	for(var angle = 0; angle < 6; angle += 2)
		recurseReflectFilled(this.tree, position, angle);
	for(var angle = 1; angle < 6; angle += 2)
		recurseReflectFilled(this.tree, position, angle);
}

/////////// DRAWING
///////////
// this actually does the drawing
// this function gets called at every iteration of the recusive crawl
function drawBetweenNodesLineWithDots(start, end, angle, thickness){
	line(start.x, start.y, end.x, end.y);
	ellipse(end.x, end.y, 6, 6);
}

function drawBetweenNodesHex(start, end, angle, thickness){
	var length = Math.sqrt( Math.pow(end.y-start.y,2) + Math.pow(end.x-start.x,2) );
	line(start.x, start.y, 
		 start.x + 0.5*length*HEX_BRANCH[mod6(angle+1)].x, 
		 start.y + 0.5*length*HEX_BRANCH[mod6(angle+1)].y);
	line(start.x, start.y, 
		 start.x + 0.5*length*HEX_BRANCH[mod6(angle-1)].x, 
		 start.y + 0.5*length*HEX_BRANCH[mod6(angle-1)].y);
	line(end.x, end.y, 
		 end.x + 0.5*length*HEX_BRANCH[mod6(angle+2)].x, 
		 end.y + 0.5*length*HEX_BRANCH[mod6(angle+2)].y);
	line(end.x, end.y, 
		 end.x + 0.5*length*HEX_BRANCH[mod6(angle-2)].x, 
		 end.y + 0.5*length*HEX_BRANCH[mod6(angle-2)].y);
	line(start.x + 0.5*length*HEX_BRANCH[mod6(angle-1)].x, 
		 start.y + 0.5*length*HEX_BRANCH[mod6(angle-1)].y,
		 end.x + 0.5*length*HEX_BRANCH[mod6(angle-2)].x, 
		 end.y + 0.5*length*HEX_BRANCH[mod6(angle-2)].y);
	line(start.x + 0.5*length*HEX_BRANCH[mod6(angle+1)].x, 
		 start.y + 0.5*length*HEX_BRANCH[mod6(angle+1)].y,
		 end.x + 0.5*length*HEX_BRANCH[mod6(angle+2)].x, 
		 end.y + 0.5*length*HEX_BRANCH[mod6(angle+2)].y);
	// line(start.x, start.y, end.x, end.y);
	// ellipse(end.x, end.y, 6, 6);
}

function drawBetweenNodesRect(start, end, angle, thickness){
	var a = Math.atan2(end.y - start.y, end.x - start.x);
	var length = Math.sqrt( Math.pow(end.y-start.y,2) + Math.pow(end.x-start.x,2) );
	var width = length * 0.33;
	line(start.x - width*Math.cos(a+PI*0.5),
		 start.y - width*Math.sin(a+PI*0.5),
		 start.x + width*Math.cos(a+PI*0.5),
		 start.y + width*Math.sin(a+PI*0.5) );
	line(end.x - width*Math.cos(a+PI*0.5),
		 end.y - width*Math.sin(a+PI*0.5),
		 end.x + width*Math.cos(a+PI*0.5),
		 end.y + width*Math.sin(a+PI*0.5) );
	line(start.x - width*Math.cos(a+PI*0.5),
		 start.y - width*Math.sin(a+PI*0.5),
		 end.x - width*Math.cos(a+PI*0.5),
		 end.y - width*Math.sin(a+PI*0.5) );
	line(start.x + width*Math.cos(a+PI*0.5),
		 start.y + width*Math.sin(a+PI*0.5),
		 end.x + width*Math.cos(a+PI*0.5),
		 end.y + width*Math.sin(a+PI*0.5) );
	// line(start.x, start.y, end.x, end.y);
	// ellipse(end.x, end.y, 6, 6);
}

///////////  LENGTH
///////////

function nodeLengthCascading(node){
	return 100/Math.pow(node.generation+1, .9);
}
function nodeLengthLinear(node){
	return 33;
}
function nodeLengthFromNode(node){
	if(node.data != undefined){
		return node.data.length;
	} else{
		console.log("ERROR [nodeLengthFromNode()]: attempting to get data from node with no data");
		return 1;
	}
}
function nodeThicknessLinear(node){
	return 33*0.866;
}
function nodeThicknessCascading(node){
	var l = 100/Math.pow(node.generation+1, .9);
	return l*0.866;
}
function nodeThicknessFromNode(node){
	if(node.data != undefined){
		return node.data.thickness;
	} else{
		console.log("ERROR [nodeThicknessFromNode()]: attempting to get data from node with no data");
		return 1;
	}
}


var getLength = nodeLengthFromNode;
var getThickness = nodeThicknessFromNode;

function getWidth(node){
	return 20/Math.pow(node.generation+1, .9);
}

///////////  RECURSION
///////////
// these functions do the recursive crawling
// variations: with snowflake property of adding reflections on the right arm
function recurseSimple(node, position){
	var length = getLength(node);
	if(node.right != undefined){
		var end = {x:(position.x + length * HEX_BRANCH[mod6(node.right.rBranches)].x),
		           y:(position.y + length * HEX_BRANCH[mod6(node.right.rBranches)].y)};
		recurseSimple(node.right, end);
		drawBetweenNodes(position, end, mod6(node.right.rBranches));
	}
	if(node.left != undefined){
		var end = {x:(position.x + length * HEX_BRANCH[mod6(node.left.rBranches)].x),
		           y:(position.y + length * HEX_BRANCH[mod6(node.left.rBranches)].y)};
		recurseSimple(node.left, end);
		drawBetweenNodes(position, end, mod6(node.left.rBranches));
	}
}

function recurseReflect(node, position, angle){
	var length = getLength(node);
	if(node.right != undefined){
		var childPos1 = {x:(position.x + length * HEX_BRANCH[mod6(angle+1)].x),
		                 y:(position.y + length * HEX_BRANCH[mod6(angle+1)].y)};
		var childPos2 = {x:(position.x + length * HEX_BRANCH[mod6(angle-1)].x),
		                 y:(position.y + length * HEX_BRANCH[mod6(angle-1)].y)};
		recurseReflect(node.right, childPos1, mod6(angle+1) );
		recurseReflect(node.right, childPos2, mod6(angle-1) );
		drawBetweenNodes(position, childPos1, mod6(angle+1) );
		drawBetweenNodes(position, childPos2, mod6(angle-1) );
	}
	if(node.left != undefined){
		var childPos = {x:(position.x + length * HEX_BRANCH[mod6(angle)].x),
		                y:(position.y + length * HEX_BRANCH[mod6(angle)].y)};
		recurseReflect(node.left, childPos, angle);
		drawBetweenNodes(position, childPos, mod6(angle));
	}
}

function recurseReflectFilled(node, start, angle){
	// LENGTH and THICKNESS
	var length = getLength(node);	
	var thickness = getThickness(node);

	// PARENT NODE LENGTH and THICKNESS
	var pLength, pThickness;
	if(node.parent != undefined){
		pLength = getLength(node.parent);
		pThickness = getThickness(node.parent);
	} else{
		pLength = 0; pThickness = 0;
	}
	// thickness grows HEXAGONALLY, not scaling proportionally
	// thickness = node.length;
	// if(thickness > node.thickness)
	// 	thickness = node.thickness;
	// START AND END
	var end = {
		x:(start.x + length * HEX_BRANCH[angle].x), 
		y:(start.y + length * HEX_BRANCH[angle].y)
	};
	var endThick = {
		x:(start.x + (length+thickness) * HEX_BRANCH[angle].x), 
		y:(start.y + (length+thickness) * HEX_BRANCH[angle].y)
	};
	var startThick = {
		x:(start.x + pThickness * HEX_BRANCH[angle].x), 
		y:(start.y + pThickness * HEX_BRANCH[angle].y)
	};
	var thckAng = 2;
	if(thickness > pThickness){
		startThick = start;
		thckAng = 1;
	}
	if(node.right != undefined){
		recurseReflectFilled(node.right, end, mod6(angle+1) );
		recurseReflectFilled(node.right, end, mod6(angle-1) );
	}
	//first go to the bottom of tree, following the main stem
	if(node.left != undefined)
		recurseReflectFilled(node.left, end, angle);
	
	var point1a = {
		x:(startThick.x + thickness * HEX_BRANCH[mod6(angle-thckAng)].x),
		y:(startThick.y + thickness * HEX_BRANCH[mod6(angle-thckAng)].y) };
	var point1b = {
		x:(startThick.x + thickness * HEX_BRANCH[mod6(angle+thckAng)].x),
		y:(startThick.y + thickness * HEX_BRANCH[mod6(angle+thckAng)].y) };
	var point2a = {
		x:(end.x - thickness * HEX_BRANCH[mod6(angle+2)].x),
		y:(end.y - thickness * HEX_BRANCH[mod6(angle+2)].y) };
	var point2b = {
		x:(end.x - thickness * HEX_BRANCH[mod6(angle-2)].x),
		y:(end.y - thickness * HEX_BRANCH[mod6(angle-2)].y) };

	// fill(255, 128 * sqrt(1.0/node.generation));
	var fillValue = 5*node.age + 150;// + (node.randomValue[angle%6]-5)*2;
	// fill(fillValue, 250);
	beginShape();
	vertex(startThick.x, startThick.y);
	vertex(point1a.x, point1a.y);
	vertex(point2a.x, point2a.y);
	vertex(endThick.x, endThick.y);
	vertex(point2b.x, point2b.y);
	vertex(point1b.x, point1b.y);
	endShape(CLOSE);

	// HEXAGON ARTIFACTS
	// edge thinning
	// if(node.data.thinness != undefined){
	// 	var thinness = (node.data.thinness) * thickness;
	// 	var edges = [point1b, point2b, endThick, point2a, point1a];
	// 	for(var i = 0; i < 4; i++){
	// 		var fillChange = - (sin(-.05 + mod6(angle-(i - 1.5)))*2);  // dramatic lighting
	// 		fill(fillValue + fillChange*10, 250);
	// 		var edgeNear = {
	// 			x:(edges[i].x + thinness * HEX_BRANCH[mod6(angle-i)].x),
	// 			y:(edges[i].y + thinness * HEX_BRANCH[mod6(angle-i)].y) };
	// 		var edgeFar = {
	// 			x:(edges[i+1].x + thinness * HEX_BRANCH[mod6(angle-i + 3)].x),
	// 			y:(edges[i+1].y + thinness * HEX_BRANCH[mod6(angle-i + 3)].y) };
	// 		var innerNear = {
	// 			x:(edgeNear.x + thinness * HEX_BRANCH[mod6(angle-i+2 + 3)].x),
	// 			y:(edgeNear.y + thinness * HEX_BRANCH[mod6(angle-i+2 + 3)].y) };
	// 		var innerFar = {
	// 			x:(edgeFar.x + thinness * HEX_BRANCH[mod6(angle-i+4)].x),
	// 			y:(edgeFar.y + thinness * HEX_BRANCH[mod6(angle-i+4)].y) };
	// 		beginShape();
	// 		vertex(edgeNear.x, edgeNear.y);
	// 		vertex(edgeFar.x, edgeFar.y);
	// 		vertex(innerFar.x, innerFar.y);
	// 		vertex(innerNear.x, innerNear.y);
	// 		endShape(CLOSE);
	// 	}
	// }
}



function drawStylizedSnowflakeFIRST(position){
	if(DEBUG){ console.log('drawStylizedSnowflake()'); }

	for(var angle = 0; angle < 6; angle+=2)
		drawHexagonTreeWithReflections(this.tree, position, angle);
	
	for(var angle = 1; angle < 6; angle+=2)
		drawHexagonTreeWithReflections(this.tree, position, angle);

	function drawHexagonTreeWithReflections(node, start, angle){
		if(node != undefined){
			// LENGTH and THICKNESS
			var length = node.length;
			var thickness = node.thickness;
			var pThickness;
			if(node.parent) pThickness = node.parent.thickness;
			else            pThickness = 0;
			// thickness grows HEXAGONALLY, not scaling proportionally
			// thickness = node.length;
			if(thickness > node.thickness)			
				thickness = node.thickness;
			// START AND END
			var end = {
				x:(start.x + length * HEX_BRANCH[angle].x), 
				y:(start.y + length * HEX_BRANCH[angle].y)
			};
			var endThick = {
				x:(start.x + (length+thickness) * HEX_BRANCH[angle].x), 
				y:(start.y + (length+thickness) * HEX_BRANCH[angle].y)
			};
			var startThick = {
				x:(start.x + pThickness * HEX_BRANCH[angle].x), 
				y:(start.y + pThickness * HEX_BRANCH[angle].y)
			};
			var thckAng = 2;
			if(thickness > pThickness){
				startThick = start;
				thckAng = 1;
			}
			if(node.right != undefined){
				drawHexagonTreeWithReflections(node.right, end, mod6(angle+1) );
				drawHexagonTreeWithReflections(node.right, end, mod6(angle-1) );
			}
			//first go to the bottom of tree, following the main stem
			if(node.left != undefined)
				drawHexagonTreeWithReflections(node.left, end, angle);
			
			var point1a = {
				x:(startThick.x + thickness * HEX_BRANCH[mod6(angle-thckAng)].x),
				y:(startThick.y + thickness * HEX_BRANCH[mod6(angle-thckAng)].y) };
			var point1b = {
				x:(startThick.x + thickness * HEX_BRANCH[mod6(angle+thckAng)].x),
				y:(startThick.y + thickness * HEX_BRANCH[mod6(angle+thckAng)].y) };
			var point2a = {
				x:(end.x - thickness * HEX_BRANCH[mod6(angle+2)].x),
				y:(end.y - thickness * HEX_BRANCH[mod6(angle+2)].y) };
			var point2b = {
				x:(end.x - thickness * HEX_BRANCH[mod6(angle-2)].x),
				y:(end.y - thickness * HEX_BRANCH[mod6(angle-2)].y) };

			// fill(255, 128 * sqrt(1.0/node.generation));
			var fillValue = 5*node.age + 150;// + (node.randomValue[angle%6]-5)*2;
			fill(fillValue, 250);
			beginShape();
			vertex(startThick.x, startThick.y);
			vertex(point1a.x, point1a.y);
			vertex(point2a.x, point2a.y);
			vertex(endThick.x, endThick.y);
			vertex(point2b.x, point2b.y);
			vertex(point1b.x, point1b.y);
			endShape(CLOSE);

			// HEXAGON ARTIFACTS
			// edge thinning
			// if(node.data.thinness != undefined){
			// 	var thinness = (node.data.thinness) * thickness;
			// 	var edges = [point1b, point2b, endThick, point2a, point1a];
			// 	for(var i = 0; i < 4; i++){
			// 		var fillChange = - (sin(-.05 + mod6(angle-(i - 1.5)))*2);  // dramatic lighting
			// 		fill(fillValue + fillChange*10, 250);
			// 		var edgeNear = {
			// 			x:(edges[i].x + thinness * HEX_BRANCH[mod6(angle-i)].x),
			// 			y:(edges[i].y + thinness * HEX_BRANCH[mod6(angle-i)].y) };
			// 		var edgeFar = {
			// 			x:(edges[i+1].x + thinness * HEX_BRANCH[mod6(angle-i + 3)].x),
			// 			y:(edges[i+1].y + thinness * HEX_BRANCH[mod6(angle-i + 3)].y) };
			// 		var innerNear = {
			// 			x:(edgeNear.x + thinness * HEX_BRANCH[mod6(angle-i+2 + 3)].x),
			// 			y:(edgeNear.y + thinness * HEX_BRANCH[mod6(angle-i+2 + 3)].y) };
			// 		var innerFar = {
			// 			x:(edgeFar.x + thinness * HEX_BRANCH[mod6(angle-i+4)].x),
			// 			y:(edgeFar.y + thinness * HEX_BRANCH[mod6(angle-i+4)].y) };
			// 		beginShape();
			// 		vertex(edgeNear.x, edgeNear.y);
			// 		vertex(edgeFar.x, edgeFar.y);
			// 		vertex(innerFar.x, innerFar.y);
			// 		vertex(innerNear.x, innerNear.y);
			// 		endShape(CLOSE);
			// 	}
			// }
		}
	}
}


/////////////////////////////////////////////////////////////
/////////////////      BINARY TREE         //////////////////
/////////////////////////////////////////////////////////////

// todo, replace windowWidth with a frame
/*
function drawBinaryTree(node, position){
	var r = 10;
	// leaf nodes are white with black border
	if(node.leaf){
		fill(255);
	} else{
		fill(0);		
	}
	// child nodes are arrows pointing LEFT or RIGHT, parent is a circle
	if(node.childType == undefined){
		ellipse(position.x, position.y, r, r);
	} else{
		var a = 0;
		if(node.childType == LEFT)  a = PI;
		triangle(position.x+r*0.5*Math.cos(a), position.y+r*0.5*Math.sin(a), 
		         position.x+r*0.5*Math.cos(a+PI*2/3), position.y+r*0.5*Math.sin(a+PI*2/3), 
		         position.x+r*0.5*Math.cos(a+PI*4/3), position.y+r*0.5*Math.sin(a+PI*4/3));
	}
	// recursion:
	if(node.left != undefined){
		var newPosition = {'x':position.x-(windowWidth*.45)/Math.pow(2,node.left.generation), 'y':position.y + 30};
		line(position.x, position.y, newPosition.x, newPosition.y);
		drawBinaryTree(node.left, newPosition);
	}
	if(node.right != undefined){
		var newPosition = {'x':position.x+(windowWidth*.45)/Math.pow(2,node.right.generation), 'y':position.y + 30};
		line(position.x, position.y, newPosition.x, newPosition.y);
		drawBinaryTree(node.right, newPosition);
	}
}
*/
function drawRightBranchingBinaryTree(node, position){

	var r = 10;
	// leaf nodes are white with black border
	if(node.leaf){
		fill(255);
	} else{
		fill(0);		
	}
	// child nodes are arrows pointing LEFT or RIGHT, parent is a circle
	if(node.childType == undefined){
		ellipse(position.x, position.y, r, r);
	} else{
		var a = 0;
		if(node.childType == LEFT)  a = PI;
		triangle(position.x+r*0.5*Math.cos(a), position.y+r*0.5*Math.sin(a), 
		         position.x+r*0.5*Math.cos(a+PI*2/3), position.y+r*0.5*Math.sin(a+PI*2/3), 
		         position.x+r*0.5*Math.cos(a+PI*4/3), position.y+r*0.5*Math.sin(a+PI*4/3));
	}

	// logarithmically shrinking edge lengths
	var LENGTH = 100/Math.pow(node.generation+1, .9);

	if(node.left != undefined){
		var end = {x:(position.x + LENGTH * HEX_BRANCH[int(node.left.rBranches)%6].x),
		           y:(position.y + LENGTH * HEX_BRANCH[int(node.left.rBranches)%6].y)};
		line(position.x, position.y, end.x, end.y);
		drawRightBranchingBinaryTree(node.left, end);
	}
	if(node.right != undefined){
		var end = {x:(position.x + LENGTH * HEX_BRANCH[int(node.right.rBranches)%6].x),
		           y:(position.y + LENGTH * HEX_BRANCH[int(node.right.rBranches)%6].y)};
		line(position.x, position.y, end.x, end.y);
		drawRightBranchingBinaryTree(node.right, end);
	}
}

/////////////////////////////////////////////////////////////
//////////////////      ATMOSPHERE         //////////////////
/////////////////////////////////////////////////////////////

function drawAtmosphereGraph(rect){
	// rect is expecting {'x':_, 'y':_, 'width':_, 'height':_, }
	var MARGIN = 10;

	// bounding box
	stroke(220);
	fill(240);
	beginShape();
	vertex(rect.x-MARGIN, rect.y-MARGIN);
	vertex(rect.x-MARGIN, rect.y+MARGIN + rect.height);
	vertex(rect.x+MARGIN + rect.width, rect.y+MARGIN + rect.height);
	vertex(rect.x+MARGIN + rect.width, rect.y-MARGIN);
	endShape(CLOSE);

	// x=0 origin line
	stroke(220);
	line(rect.x-MARGIN, rect.y + .5 * rect.height, rect.x+MARGIN + rect.width, rect.y + .5 * rect.height);

	// mass, branch, thin
	for(var i = 0; i < (this.length-1); i++){
		stroke(255, 128, 128);
		line(rect.x + (i)/(this.length-1) * rect.width, rect.y + this.mass[i] * rect.height, 
		     rect.x + (i+1)/(this.length-1) * rect.width, rect.y + this.mass[i+1] * rect.height);
		stroke(128, 255, 128);
		line(rect.x + (i)/(this.length-1) * rect.width, rect.y + this.thin[i] * rect.height, 
		     rect.x + (i+1)/(this.length-1) * rect.width, rect.y + this.thin[i+1] * rect.height);
		stroke(128, 128, 255);
		line(rect.x + (i)/(this.length-1) * rect.width, rect.y + this.branch[i] * rect.height, 
		     rect.x + (i+1)/(this.length-1) * rect.width, rect.y + this.branch[i+1] * rect.height);
	}
}

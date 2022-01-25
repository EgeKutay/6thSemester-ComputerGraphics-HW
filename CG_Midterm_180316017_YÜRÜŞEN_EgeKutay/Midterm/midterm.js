var canvas;
var gl;
var vPosition;
var program;
var color, colorLoc;


var letter1vertices, letter2vertices;
var buffer1, buffer2;

var red=1.0;
var green=0.0;
var blue=0.0;

var pX=0;
var pY=0;
var pXLoc;
var pYLoc;

var x_scale=1.0;
var y_scale=1.0
var sXLoc;
var sYLoc;

// TODO: define any global variables you need

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create geometry data
    letter1vertices = [
                        vec2(-0.15, 0.6),    //P1
                        vec2(-0.15, 0.4),    //P2
                        vec2(-0.75, 0.6),    //P3
                        vec2(-0.75, 0.4),    //P4
                        vec2(-0.55, 0.6),    //P5
                        vec2(-0.75, 0.0),    //P6
                        vec2(-0.55, 0.0),    //P7
                        vec2(-0.55, 0.2),    //P8
                        vec2(-0.15, 0.2),    //P9
                        vec2(-0.15, 0.0),    //P10
                        vec2(-0.75, 0.0),    //P6
                        vec2(-0.55, 0.0),    //P7
                        vec2(-0.75, -0.4),    //P11
                        vec2(-0.55, -0.4),    //P12
                        vec2(-0.55, -0.2),    //P13
                        vec2(-0.15, -0.2),    //P14
                        vec2(-0.15, -0.4),    //P15
                        vec2(-0.55, -0.4)    //P12
                    ];
                        

    letter2vertices = [
                        vec2(0.0, 0.60), //p0
                        vec2(0.2, 0.60), //p1
                        vec2(0.3, 0.1),//p2
                        vec2(0.4, 0.2), //p3
                        vec2(0.5, 0.1), //p4
                        vec2(0.6, 0.60), //p5
                        vec2(0.8, 0.60), //p6
                        vec2(0.5, 0.1), //p4
                        vec2(0.3, 0.1),//p2
                        vec2(0.5, -0.4),//p5
                        vec2(0.3, -0.4),//p2
                    ];
    // TODO: create vertex coordinates for your initial letters instead of these vertices

    // Load the data into the GPU		
	buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );  
  
    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );      

    pXLoc = gl.getUniformLocation(program, "pX");
    pYLoc = gl.getUniformLocation(program, "pY");


    sXLoc = gl.getUniformLocation(program, "x_scale");
    sYLoc = gl.getUniformLocation(program, "y_scale");

    colorLoc = gl.getUniformLocation(program,"color");

	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        pX=event.target.value;
    };    
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        pY=event.target.value;
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        x_scale=event.target.value;
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        y_scale=event.target.value;
    };  
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        red=event.target.value
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        green=event.target.value
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        blue=event.target.value
    };

    render();
};

function setUniforms()
{ 
//position x,y
    gl.uniform1f(pXLoc, pX);
    gl.uniform1f(pYLoc, pY);
    gl.uniform1f(sXLoc,x_scale);
    gl.uniform1f(sYLoc,y_scale);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    setUniforms();
    // TODO: Send necessary uniform variables to shader and 
    // perform draw calls for drawing letters

    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw triangle
    color = vec4(red,green,blue,1.0);
	gl.uniform4fv(colorLoc,color);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter1vertices.length);
    
	// bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw rectangle
    color = vec4(1.0-red,1.0-green,1.0-blue,1.0);
	gl.uniform4fv(colorLoc,color);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length);

    window.requestAnimFrame(render);
}

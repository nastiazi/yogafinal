(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"YOGAAA_atlas_1", frames: [[0,0,1387,980]]},
		{name:"YOGAAA_atlas_2", frames: [[0,0,1142,1098],[0,1100,617,678],[619,1100,617,678],[1238,1004,617,678],[1144,0,564,1002]]},
		{name:"YOGAAA_atlas_3", frames: [[1238,672,771,67],[1238,258,808,67],[1780,172,184,84],[0,680,771,67],[1238,327,808,67],[0,749,184,84],[1238,396,808,67],[186,749,184,84],[773,741,771,67],[1238,465,808,67],[372,749,184,84],[1238,534,808,67],[558,749,184,84],[744,810,184,84],[1238,603,808,67],[930,810,184,84],[1780,0,226,84],[1780,86,226,84],[0,0,617,678],[619,0,617,678],[1546,741,397,108],[1496,0,282,180],[1238,0,256,256]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_19 = function() {
	this.initialize(ss["YOGAAA_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["YOGAAA_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["YOGAAA_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["YOGAAA_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(img.CachedBmp_18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,991);


(lib.CachedBmp_17 = function() {
	this.initialize(img.CachedBmp_17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,991);


(lib.CachedBmp_12 = function() {
	this.initialize(img.CachedBmp_12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,991);


(lib.CachedBmp_16 = function() {
	this.initialize(img.CachedBmp_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,991);


(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,985);


(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,991);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,981);


(lib.CachedBmp_20 = function() {
	this.initialize(img.CachedBmp_20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,1207);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,1207);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,1207);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,1207);


(lib.CachedBmp_2 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap16copy = function() {
	this.initialize(ss["YOGAAA_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap20 = function() {
	this.initialize(ss["YOGAAA_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap26 = function() {
	this.initialize(ss["YOGAAA_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.wave7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F4F7F8").s().p("AhJgJQDwAAiXARQgPACgLAAQgqAAgVgTg");
	this.shape.setTransform(16.337,9.8609);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E7F0F4").s().p("AiggBQCOgRChADIASAAIAAAOQgXAGhBAHIgLABIgoAAQgggDgZgLIAAAOIgSABQgTACgRAAQgtAAgagRg");
	this.shape_1.setTransform(16.1,1.6333);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FAFAFC").s().p("AjVAGIgBgGQDWAADFgNIASgBQh5AdiRAAQhOAAhUgJg");
	this.shape_2.setTransform(41.125,6.8061);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave7, new cjs.Rectangle(0,0,62.6,10.8), null);


(lib.wave5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EFF5F9").s().p("ABIAHIigAAIAAgNQBYAABZAGIAAAHIgRAAg");
	this.shape.setTransform(11.175,0.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BAD5E1").s().p("AhqAJIAAgHQCBgSBTAMQABAAAAAGQhOAIhjAAIgkgBg");
	this.shape_1.setTransform(10.725,3.0194);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave5, new cjs.Rectangle(0,0,21.5,4), null);


(lib.wave4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B9D4DF").s().p("AiygGQDOgHCFAHIASAAQhaARhZAAQhYAAhagRg");
	this.shape.setTransform(23.275,1.081);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F3FBFC").s().p("Ah7AAIgBgGIDnAAIASAAQg/ANhKAAQg1AAg6gHg");
	this.shape_1.setTransform(23.3,4.2353);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#BBD5E2").s().p("AgwgaQCqAHh+ArQgJADgHAAQgeAAACg1g");
	this.shape_2.setTransform(4.8898,4.4361);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave4, new cjs.Rectangle(0,0,41.2,7.2), null);


(lib.wave3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BBD5E0").s().p("AgzAEQB7g7gYA4IgmATQgLAHgLAAQgWAAgRgXg");
	this.shape.setTransform(24.9014,8.3689);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BBD5E1").s().p("AiTgQIBIAAIASAAICgAAIARAAQBFAOhnAIIhcAKIgXABQg6AAg8ghg");
	this.shape_1.setTransform(14.768,5.1528);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EFF5F9").s().p("ABIAHIigAAIAAgNQBYAABZAGIAAAHIgRAAg");
	this.shape_2.setTransform(16.125,0.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave3, new cjs.Rectangle(0,0,30.1,11.1), null);


(lib.wave_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.wave = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F7FBFC").s().p("Aj4AeQgdgBALgoQCIADBzgQIARgCIARAAQCPgKBsAZIgSAAQjwAOjyANIAAAOIgSAAg");
	this.shape.setTransform(26.9738,10.3321);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E7F0F4").s().p("AiggBQCOgRChADIASAAIAAAOIgSAAIiyAAIAAAOIgSABQgTACgRAAQgtAAgagRg");
	this.shape_1.setTransform(43.45,1.6333);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave, new cjs.Rectangle(0,0,59.6,13.4), null);


(lib.sun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,571,549);


(lib.Scene_1_Hills = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Hills
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(-0.1,116.15,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_4();
	this.instance_1.setTransform(-0.1,116.15,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_5();
	this.instance_2.setTransform(-0.1,116.15,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_20();
	this.instance_3.setTransform(-0.1,116.15,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_6();
	this.instance_4.setTransform(-0.1,229.05,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_7();
	this.instance_5.setTransform(-0.1,223.75,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_8();
	this.instance_6.setTransform(-0.1,227.15,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_16();
	this.instance_7.setTransform(-0.1,223.75,0.5,0.5);
	this.instance_7._off = true;

	this.instance_8 = new lib.CachedBmp_12();
	this.instance_8.setTransform(-0.1,223.75,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_17();
	this.instance_9.setTransform(-0.1,223.75,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_18();
	this.instance_10.setTransform(-0.1,223.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},34).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_9}]},4).to({state:[{t:this.instance_10}]},20).wait(68));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(44).to({_off:false},0).wait(2).to({_off:true},2).wait(2).to({_off:false},0).wait(3).to({_off:true},4).wait(88));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Breathe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Breathe
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F28657").s().p("AgRBAQARgJANgLIAFgQIAAgCQgCgLgEgHIgBgCQgigMgDgxQAKgSAAASQACArAeANIAEAAIAGAOIAAAAIAAATIAAAEIgGAMIAAACQgLANgPAAIgLgBg");
	this.shape.setTransform(434.6125,316.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FEFEFE").s().p("AETBNQgegIgUgUIgKgLIgHABQgcAJgUgNQgSgOgFgaQgLgHgGgMIAAgBIAAgLQADgEACgEIAAgBQAOgLAUgDIAIgLIABgBQAGgCAFgDIAPAAQAEACAFACQAEAGAGAFIAAABQAfAFAIAcIAAAAQgBAPADANIAAAEIgDALIAAABQgMAJgEAIQAAABAAAAQAAABAAABQABAAAAAAQABABABAAIAAADQASAUAVAQIgCAAgAkUBEIAVgQIAAgBIAAgCIACAAIAAgBQAMgKAJgNIAAgBQgHgQgHgRIgBAAQgBgqAkgGQAFgIAIgGIAAgBIAKgEQAPAAAJAFQADAHAHAEIAAABQAZACAMAOQADAHgBAKIAAACIgPAUIgBABQgEA1g6gJQgNgBgIgHQgOANgQAKIAAABIgGADIAAACIgCAAQgIAGgLAAIgEAAg");
	this.shape_1.setTransform(433.925,325.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FEFEFD").s().p("Ag6BKIgQAAQgugFgEgvQgEgFgIgCIAAgBQgKgHgDgMIAAgCIAAgMIAAgBIAAgEIAHgOIABgBIAVgQQAdgIAfgDQAJgBAIgDQAggKASATQAPAAAJAHIABAAIAKALIABABQA4gKAwgUIADgBQgmAog/AQIgFABQgBAqghAKIgHADQgGAAgDAEQgQAZgiAGIgCAAg");
	this.shape_2.setTransform(414.75,338.6163);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FEFDFC").s().p("AgMAbQgGgHgDgLIAAgCIAAgBIAAgLIAAgCIAAgFQAFgLALgGIAAgBQAIAAAGACQADAEAFADQAQAggbARQgBAAAAAAQgBABAAAAQAAABAAAAQAAABAAAAIgDAAQgIAAgFgEg");
	this.shape_3.setTransform(434.1977,331.2475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FEFEFE").s().p("AEvBNQgegIgVgUIgKgLIgHABQgbAJgUgNQgSgOgGgaQgKgHgGgMIAAgBIAAgLQADgEABgEIABgBQAOgLAUgDIAIgLIABgBQAGgCAFgDIAPAAIAJAEQAEAGAGAFIAAABQAfAFAHAcIABAAQgBAPACANIABAEIgEALIAAABQgLAJgEAIQAAABAAAAQAAABAAAAQAAABABAAQABABABAAIAAADQARAUAWAQIgCAAgAkwBEIAWgQIAAgBIAAgCIABAAIAAgBQAMgKAJgNIAAgBQgHgQgGgRIgCAAQgBgqAkgGQAGgIAHgGIAAgBIAKgEQAPAAAKAFQADAHAGAEIAAABQAaACAMAOQACAHAAAKIAAACIgQAUIgBABQgEA1g6gJQgMgBgJgHQgOANgPAKIgBABIgGADIAAACIgBAAQgJAGgKAAIgFAAg");
	this.shape_4.setTransform(432.95,325.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F28657").s().p("AhXBcQgIgKgFgOQgEgOgBgRQAVgLgDAiIAAADQAHAMALAJIABACQAVAKAeACIACAAQANAEASgDIAAgBIAegDIADAAIAXgLIACAAQAPgVAJgbQAAgBAAAAQAAAAABAAQAAAAABAAQABgBABAAQAFgBgBAEIAAAQIAAADIgCALQgDAMgIAIIgEAEQggAehBAAIgCAAQg1AAgYgdgAgMAIQAQgIAOgLIAFgPIAAgCQgCgLgEgIIgBgBQgigOgDgxQAKgSAAASQACArAeAOIAEABIAGAOIAAAAIAAATIAAADIgGAMIAAACQgMANgOAAIgLgCg");
	this.shape_5.setTransform(434.1273,322.2254);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FEFEFE").s().p("AEnBNQgegIgUgUIgKgLIgHABQgcAJgTgNQgTgOgFgaQgKgHgHgMIAAgBIAAgLQADgEACgEIABgBQANgLAUgDIAIgLIABgBQAGgCAGgDIAOAAQAEACAFACQAEAGAGAFIAAABQAfAFAIAcIABAAQgCAPADANIAAAEIgDALIAAABQgMAJgDAIQgBABAAAAQAAABABABQAAAAABAAQAAABABAAIAAADQASAUAVAQIgCAAgAkoBEIAVgQIAAgBIAAgCIACAAIAAgBQAMgKAIgNIABgBQgIgQgGgRIgBAAQgBgqAkgGQAFgIAHgGIAAgBIAKgEQAQAAAJAFQADAHAHAEIAAABQAZACAMAOQADAHgBAKIAAACIgPAUIgCABQgDA1g6gJQgNgBgJgHQgNANgQAKIAAABIgHADIAAACIgBAAQgIAGgLAAIgEAAg");
	this.shape_6.setTransform(433.8,327.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F28657").s().p("ABABpQgXgIgYgCQgXgCgWAGQgWAGgnADQgGABAAgGQAbgDAVgKQAigQAoALQARAEARAFQAQAGATADIAAACQgFAEgIAAQgIAAgLgEgAgBAUQAQgIAOgMIAFgOIAAgCQgCgLgEgIIgBgBQgigOgDgxQAKgSAAASQABArAfAOIAEABIAGAOIAAAAIAAATIAAADIgGALIAAACQgLAOgQAAIgKgCg");
	this.shape_7.setTransform(433.025,321.0315);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FEFEFD").s().p("Ag6BKIgQAAQgugFgEgvQgFgFgHgCIgBgBQgJgHgDgMIAAgCIAAgMIAAgBIAAgEIAIgOIAAgBIAVgQQAcgIAhgDQAHgBAJgDQAfgKASATQAQAAAJAHIABAAIAKALIAAABQA5gKAwgUIADgBQgmAog/AQIgFABQgBAqghAKIgGADQgHAAgCAEQgRAZgiAGIgCAAg");
	this.shape_8.setTransform(411.3,340.7163);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},145).to({state:[{t:this.shape},{t:this.shape_1}]},72).to({state:[{t:this.shape},{t:this.shape_3,p:{y:331.2475,x:434.1977}},{t:this.shape_2,p:{x:414.75,y:338.6163}}]},38).to({state:[{t:this.shape_2,p:{x:414.75,y:338.6163}},{t:this.shape},{t:this.shape_3,p:{y:331.2475,x:434.1977}}]},6).to({state:[{t:this.shape_2,p:{x:414.75,y:338.6163}},{t:this.shape},{t:this.shape_3,p:{y:331.2475,x:434.1977}}]},30).to({state:[{t:this.shape}]},7).to({state:[{t:this.shape},{t:this.shape_4}]},65).to({state:[{t:this.shape},{t:this.shape_2,p:{x:413.4,y:340.9663}},{t:this.shape_3,p:{y:333.0975,x:434.1977}}]},115).to({state:[{t:this.shape_5}]},97).to({state:[{t:this.shape_7},{t:this.shape_6}]},52).to({state:[{t:this.shape},{t:this.shape_8},{t:this.shape_3,p:{y:331.9975,x:432.8477}}]},32).to({state:[{t:this.shape_5}]},30).to({state:[{t:this.shape_5}]},29).wait(129));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.playAgain = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap26();
	this.instance.setTransform(0,0,1.4751,1.4053);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.playAgain, new cjs.Rectangle(0,0,377.6,359.8), null);


(lib.floerpot = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCA850").s().p("Ag7gEIBtAAIAKAAIgBAEQg7AFg7AAIAAgJg");
	this.shape.setTransform(120,108.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E0CBA7").s().p("ADSAFImtAAIAAgJIGtAAIAKAAIAAAJIgKAAg");
	this.shape_1.setTransform(127,104.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#496B4C").s().p("AgCAAIADAAIADAAg");
	this.shape_2.setTransform(75.85,137.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBD878").s().p("Aq3BFQAAgFgCgDQgKgRAChAQBegUB0gFIAAgFQCRAVCHgeIAKgBQBfAZBdgdQACgBAAgFQBZAtCWgOIAKgBQA8AAA7gFIABgFQCYAIB/gXQABAAAAgFIAKgBQBNgQgRBNIAAATQAAAPgCAAQoJAyoXAAQiqAAirgFg");
	this.shape_3.setTransform(90.6435,113.0658);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F4B258").s().p("AgbAQIARgIQABgBgwgKQCGgChlgVQgNgDA7AGQA8AFgoAPQghAfgSAAQgLAAgHgMg");
	this.shape_4.setTransform(51.788,70.408);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F8B158").s().p("AgGAFQgCgFgFgFQAvgfggA0IgCABQgCAAgEgMg");
	this.shape_5.setTransform(41.44,70.5699);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F5B357").s().p("AgdgCQgBAAAAgFQBDAPgGAAQgFAAg3gKg");
	this.shape_6.setTransform(51.1126,62.8058);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F4B157").s().p("AgEAZQgKgUgHgWQgCgGgFgFQA8gfgDA9QgBAHgHASQgGAMgGAAQgHAAgGgOg");
	this.shape_7.setTransform(65.8821,72.8856);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7D3A0").s().p("AAIAeQAHgugfgDIAAgKQArgEgNA2IgBAJg");
	this.shape_8.setTransform(61.7071,60.983);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EBC693").s().p("AAAA3QgEg3AAg2IAJAAIAABjIAAAKIgFAAg");
	this.shape_9.setTransform(34.5,86.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DD8F2C").s().p("AiODzQgFAAgCgDQgtg9gIhgIAAgKIAAhjIAAgKIAAgeQArhcA4hMQASgZA1ANQARAQAMgKIADgEQACgCAFAAIAeAAIAKAAQAgADgHAvIAFAAIALAHQCbBng2ENQgHAogjAKIgKABQhQARhSAAQg6AAg7gIgABNiIQAFAFACAGQAHAXAJATQAOAdAMgbQAIgRAAgHQACgqgaAAQgNAAgUALgAg8ifQBlAViFACQAwALgCABIgQAIQARAfA0gzQAngPg6gFIgvgEQgFAAAEABgAiYiIQAFAFACAGQAGAQADgGQAUghgMAAQgGAAgSAMgAhHjTQB6AYh7gdQAAAFABAAg");
	this.shape_10.setTransform(55.3209,83.7091);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C1CDAA").s().p("AAAAoQgFgoAAgnQAQAWgHAvIAAAKIgEAAg");
	this.shape_11.setTransform(43.625,18);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#778E4B").s().p("ADwEiIAAgKQAEjqh8hpQgFAAgFACQgpARgnAVIgKAAIhPAAQAAgFgCgBQhFgYg7geQAAgFgDgDQhCg/gVhtQCIgnCtgBIAKAAQBRAmAbBcQACAFAAAFQAAAoAFAnIAFABQBjBcASCwQAEArgBAwIAAAKQgFAAgCACIgEAEQgEAEgFAAQgJAAgLgKg");
	this.shape_12.setTransform(28.01,30.0137);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BCA786").s().p("AAABPQgEhPAAhPIAJAAIAACVIAAAKIgFgBg");
	this.shape_13.setTransform(153.5,97);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E0D1B6").s().p("AgFBBIAAgKIAAh3QAQAvgHBIIAAAKIgJAAg");
	this.shape_14.setTransform(153.625,82.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#B7A078").s().p("AgFB9IAAgKIAAjvQAQBrgHCEIAAAKIgJAAg");
	this.shape_15.setTransform(149.625,50.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#D3BE99").s().p("AgFDIIAAgKIAAmPIAJAAIAAAKQAHDYgQDBIAAgKg");
	this.shape_16.setTransform(149.6125,84);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C3AE85").s().p("AAAEYQgFkYAAkXQAQEHgHEeIAAAKg");
	this.shape_17.setTransform(92.6125,65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#D7C7AB").s().p("AAABkQgEhkAAhjIAJAAIAAC9IAAAKg");
	this.shape_18.setTransform(88.5,58);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#B29C78").s().p("AgFA3IAAgKIAAhjQAQAmgHA9IAAAKIgJAAg");
	this.shape_19.setTransform(88.625,42.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C5B394").s().p("AhUgEICfAAIAKAAIgBAEQhUAFhUAAIAAgJg");
	this.shape_20.setTransform(107.5,20.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#C0AF8E").s().p("AhjgEIC9AAIAKAAIAAAEQhkAFhjAAIAAgJg");
	this.shape_21.setTransform(100,17.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E0D3B9").s().p("AgEBpIAAjbQAQBmgMB/IgEAAIAAgKg");
	this.shape_22.setTransform(153.5104,35.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#BCC8C3").s().p("AAAEjQAOhWBAglQACgCAAgFQhUAfg6A5QgCACgFAAQANhgBig9QhRAVhSBAQgDACgFAAQBMiaCNhYQACgCAAgFQhyAjh1BSQgDACgFAAQAsidB8hOQhSAbhgAsIAAgPQBOhCBDhKIgFAAQg1ArgqgDIAFAAQBNhYBXAcIgFAAQhNBUCJg0QAFgCAFAAQgOBHhSA3QhFAwg2BCQBfgsCQgpIAAAFQg9BZhpBdQgDACAAAFQBHgqBYgaQAFgCAFAAQgtBLg8A3IAFAAQA2gtBBAUQABAAAAAFQhFBCgLA2IAKgKQA0AXhYAdQgHACgMAAQgOAAgVgEg");
	this.shape_23.setTransform(121,63.8581);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FBFCFA").s().p("AkSEuIAAgKQAIkfgSkGIAAgKIAAiWIA8AAIAKAAQBVAABUgFIABgFIE/AAIAKAAIAACqIAAAKIAADwIAAAJIAAGQIAAAKIgKAAImtAAIAAAKIgKABQgXAFgTAAQhhAAAdh+gABTCzQhAAlgOBWQAlAHARgFQBYgdg0gXIgKAKQALg2BFhCQAAgFgBAAQhBgUg2AtIgFAAQA8g3AthLQgFAAgFACQhYAahHAqQAAgFADgCQBpheA9hYIAAgFQiRApheAsQA2hCBFgwQBSg3AOhHQgFAAgFACQiJA0BNhUIAFAAQhXgchNBYIgFAAQAqADA1grIAFAAQhDBKhOBCIAAAPQBggsBSgbQh8BOgsCdQAFAAADgCQB1hSBygjQAAAFgCACQiNBYhMCaQAFAAADgCQBShABRgVQhiA9gNBgQAFAAACgCQA5g5BVgfQAAAFgCACg");
	this.shape_24.setTransform(120.5,62.7849);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#89682D").s().p("Ak/GtIAAgKIAAlyIAAgKIAAi9IAAgKQAIg/gSglIAAgKIAAiWQARgDgCgbIAFAAQBkAABkgFIAAgFQDegIDCAjQARADgEAoIAADcIAAAKIAAEXIAAAKIAAB4IAAAKQAABQAFBPIAFABIAAAKQAAAFgBAAQh+AWiZgHIgKAAIhtAAIAAAKIgKAAQgkAEggAAQhnAAhFgigAkhkOIAAAKQAAEXAFEYIAFAAQgjCWCRgdIAKgBIGtAAIAKAAQARjBgHjZIAAgJIAAgKQAIiFgShrIAAgKIAAiqIgKAAIk/AAIgKAAIigAAIAAAKIgKAAIg8AAIAACWg");
	this.shape_25.setTransform(121,63.1256);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.floerpot, new cjs.Rectangle(0,0,161.3,137.1), null);


(lib.cloud4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D4EAFF").s().p("AhFgEICBAAIAKAAIgBAEQghAFgeAAQgpAAgigJg");
	this.shape.setTransform(51.05,60.5104);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C0DEFF").s().p("AgxgEIBZAAIAKAAQAAAEgBAAQgZAFgWAAQgdAAgWgJg");
	this.shape_1.setTransform(67.05,50.5104);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D1E8FF").s().p("AAeAFIg7AAQgFAAgCgCQgDgDAAgEIBFAAIAKAAIAAAJIgKAAg");
	this.shape_2.setTransform(15.05,42.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BEDDFF").s().p("AgSAMQgCgDgFAAIAAgJQBfgthNA+QgDACgFAAQAAgFgDgCg");
	this.shape_3.setTransform(21.6983,42.0581);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F3FAFF").s().p("AAeAFIhFAAIAAgJQAnAAAoAEIAAAFIgKAAg");
	this.shape_4.setTransform(48.05,27.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D3E9FF").s().p("AgsgEIBPAAIAKAAQAAAEgBAAQgXAFgUAAQgaAAgTgJg");
	this.shape_5.setTransform(140.55,51.5104);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F6FBFF").s().p("AgnATQAZgTAZgSQAEgCAFAAQAFAFAGADQAEACAFAAQAAAFgCABQgwAZgUAAQgGAAgDgCg");
	this.shape_6.setTransform(108.05,31.1407);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F7FBFF").s().p("AgYAJIAAgJIAAgUIAKAAQAAAFACABQAzAjgSAAQgLAAgigMg");
	this.shape_7.setTransform(119.5923,29.1084);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#BADAFF").s().p("AgNANQgDgDgFAAIAAgKQBMgvg7BBQgCACgFAAQAAgFgCgCg");
	this.shape_8.setTransform(83.2016,42.9728);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A5E6FB").s().p("AAjAFIhPAAIAAgJQAtAAAsAEIAAAFIgKAAg");
	this.shape_9.setTransform(83.55,5.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EEF8FF").s().p("AAeAFIhFAAIAAgJQAnAAAoAEIAAAFIgKAAg");
	this.shape_10.setTransform(84.05,19.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#B9D9FF").s().p("AJeAMQgLgHgKgJIBuAAIAKAAIgBAEQgrAFguAAIAAAKQgFAAgEgDgAp6AFIgKAAIAAgFQgrACgRgQIA8AAIAKAAQAFAAACADQADACAAAFIAAAJIgKAAg");
	this.shape_11.setTransform(82.55,44.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F5FBFF").s().p("AhAAAQAFgFAGgDQAEgCAFAAQAqAQBDgCIAAAFIgKAAQgVACgTAAQgtAAgigLg");
	this.shape_12.setTransform(154.55,20.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CEE6FF").s().p("AgngEIBFAAIAKAAQAAAEgBAAQgVAFgQAAQgYAAgRgJg");
	this.shape_13.setTransform(175.05,43.5191);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F8FCFF").s().p("AgPgGQAFAAACgDQADgCAAgFQAFAAAAADQAVAegGAAQgGAAgYgXg");
	this.shape_14.setTransform(170.6555,27.7001);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EDF8FF").s().p("AAyAFIhtAAIAAgJQA7AAA8AEIAAAFIgKAAg");
	this.shape_15.setTransform(173.05,10.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C1EEFC").s().p("AAyAFIhtAAIAAgJQA7AAA7AEIABAFIgKAAg");
	this.shape_16.setTransform(176.05,0.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#A2E3FB").s().p("AgEAeIAAhFQARAbgNAzQAAABgEAAIAAgKg");
	this.shape_17.setTransform(223.5686,26);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F0F9FF").s().p("AghAIIAAgJQAeAAAcgFQABAAAAgFQAFAAABACQAKAVgnAAQgOAAgWgEg");
	this.shape_18.setTransform(208.448,28.1613);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FAFDFF").s().p("AhAAfQAlgRAMgqIABgKQAQgBgCAVIAFAAQANARAlgGIAKgBQAAAFgBAAQgdAEgeAAIAAAKQgFAAgCADQggAZgQAAQgJAAgFgIg");
	this.shape_19.setTransform(204.55,27.8683);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E0F1FE").s().p("AuXAcQgFAAgEACQh9BKg4h9QBpBEBJhaQACgDAAgFIAKAAIAKAAQAXBTBNgIQAKgBAKAFQAmA0BIARIAKABQA6ARBRgMIABgFQBtgaAvhJIgQAAIgKAAIhaAAQgFAAgEgCQhDgWgig4QAtAZA2ATQABABAAAFQB6AMBFgoQAEgCAFAAQAFAAADACQACADAAAFQAAAFgCACQgDADgFAAQBdBQBshEQAEgCAFAAICVAJIAKABQAtgUAlgcQADgCAFAAQAQBABAAOIAKABQAhARA4gMQABAAAAgFQAFAAAEgCQBZglhsgKIAAgKQAuAAArgFIABgFQCKgWAngBIgJAKQgIAJAUgGQAdARAygMQABAAAAgFQBLgeA3gtIAAAFQA3AjA8ARQBgAcAThGQADgrAugCIABgFQAFgFAGgDQAEgCAFAAQAAAFgCAEQgoBFgmBIQgFAAgDACQhoBBhEhXIAAgFQhMBJiQALQAAgFgBgBQg4gMghgfQgwCNiaAbQitAfhBiMQgFAAgEACQh3A9hlg1QgFAAgEACQhdBEhYg8QghgUgYAoQgyBThqAZQhCAQg5AAQi2AAhSikg");
	this.shape_20.setTransform(111.05,50.2195);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CDE6FF").s().p("AgYAPIAAgnIAnAAIAKAAIgBAFQgtACgDAqIAAgKg");
	this.shape_21.setTransform(217.55,34.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FBFDFE").s().p("AxLC1IAAgKQAkhnBmgqQAngQArAVQAXAyAagFQABAAAAgFQA+g5BigVIAKgBQBJAHAoAoQACACAFAAQA2iICTgpQAEgCAFAAIBQAAIAKAAQBiAcAeBdQACAEAAAFQAugSA0gQQACgBAAgFQBdgNAvAfQAEACAFAAQBehEBXA4QAEACAFAAQAsgbA/g2QA5gyBWgTIBuAAIAKAAQCbAoBFCAQABACAFAAQBbg9BMBKQADACAAAEIAAAFQhwgXg6BEIAAAKIgFAAQACgVgRABQAAgFgCgBQhphAiFg7IAAgFQg8gFg8AAIAAAKIgKABQhiAVg+A6QgFAAgEACQgGADgFAEQAvASBJgHIAKgBQA1ALAjAgQACACAAAFQAAAFgCADQgDACgFAAQgFAAgEgCQiihGh3BmIgKAAQgfgCA9gwQAAgFgCgCQgugshmALQAAAFgBAAQg8AOgdApIgKAAIAAAUIAAAKIgKAAIgoAAQgEAAgEgCQgGgDgFgFQAFAAAEgBQBXgdh0gUQgtgEgTAVQgLANgJgEQgrgShJgwIAAgEQgogFgoAAIAAAJIgJABQhmAbBlAWQA7AXhZADQifAFhbAdQAigPgQgMQgDgDgFAAIAAgFQgogFgoAAIAAAKQgFAAgEACQhEAfgrA5QAAgFgCgBQg3gcg1g4QhUgKgMA1QgOBBguAAQgPAAgTgIg");
	this.shape_22.setTransform(112.05,19.8563);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E5F4FE").s().p("AogD1IiCAAIgKgBQhIgRgmg0QgJgFgKABQhOAIgXhUIAAgKQAFAAADgDQBOg+hgAtIgKAAIhGAAQAAAFADADQACACAFAAQARARArgCIAAAFQAAAFgCADQhJBbhphFIAAgKIAAhGQARACgCgWIAFAAQBMAcAShUQAMg1BUAKQA1A4A3AbQACABAAAFQArg4BEgfQAEgCAFAAIBGAAIAKAAQAFAAADADQAQAMgiAPQBbgdCfgGQBZgDg7gWQhlgWBmgbIAJgBIBGAAIAKAAQBJAvArATQAKAEALgNQATgWAsAFQB1AUhXAdQgFABgFAAQgFAAgDACQgaASgaAUQANAMBAgkQACgBAAgFIAoAAIAKAAQBfAhhSg5QgDgBAAgFQAdgpA8gOQABAAAAgFQBngNAtAtQACADAAAFQg9AwAfACIAKAAQB4hnChBHQAEACAFAAQA3A0gmg7QgCgDgFAAQAAgFgCgCQgiggg2gLIAAgFQhEACgqgRQA+g6BigVIAKgBIBuAAIAKAAQCGA7BoBAQACACAAAFIgBAJQgLArgmASQANAVAxgnQADgCAFAAQBQALgOgdQgBgCgFAAIgKABQglAGgNgRIAAgKQA6hFBwAYIAAgFQAFAFADAGQACAEAAAFIAABGIAAAKQAAAFgCADQgDACgFAAQgFAAgEACQgGADgFAFIgKAAIgoAAIAAAnIAAAKQgTBGhggcQg8gRg3gjIAAgFQg3AthLAeIgKAAIhGAAQgUAGAIgJIAJgKQgnABiKAWIgKAAIhuAAQAKAKAMAHQADADAFAAQBtALhaAlQgEACgFAAIgKAAIhQAAIgKgBQhAgPgQhAQgFAAgDADQglAcgtATIgKAAIiVgKQgFAAgDADQhtBEhdhRQAFAAADgDQACgCAAgFQAFAAACgDQA8hChNAxIAAAKQgFAAgDACQhFAoh7gMQAAgFgBgBQg2gTgtgZQAiA4BDAXQAEABAFAAQAmARA9gMQABAAAAgFIAQAAQguBKhuAaIgKAAg");
	this.shape_23.setTransform(111.5375,35.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,224.1,69.5);


(lib.cloud3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3DC7F7").s().p("AgngEIBFAAIAKAAQAAAEgBAAQgVAFgRAAQgYAAgQgJg");
	this.shape.setTransform(106.05,189.5191);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BCDBFF").s().p("AgsgEIBPAAIAKAAQAAAEgBAAQgYAFgTAAQgaAAgTgJg");
	this.shape_1.setTransform(86.55,151.5104);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C4E0FF").s().p("AgDALQgIgEgKAAIAAgJQBHgigtAyQgCADgEAAQAAgFgCgBg");
	this.shape_2.setTransform(120.2772,143.324);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F5FBFF").s().p("AAeAFIhFAAIAAgJQAnAAAoAEIAAAFIgKAAg");
	this.shape_3.setTransform(137.05,105.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D4E9FF").s().p("Ag2gEIBjAAIAKAAQAAAEgBAAQgcAFgXAAQggAAgZgJg");
	this.shape_4.setTransform(59.55,167.5104);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#97D7FC").s().p("AAoAFIhZAAIAAgJQAxAAAxAEIABAFIgKAAg");
	this.shape_5.setTransform(23.05,168.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#79DAF9").s().p("AAeAFIhFAAIAAgJQAnAAAoAEIAAAFIgKAAg");
	this.shape_6.setTransform(31.05,126.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F7FCFE").s().p("AjCAyQBKhKB1ghQADgCAFAAIBGAAIAKAAQA4AAAaAcQADACAFAAQAFAFAGADQAEACAFAAIAAAFQj6gPiLBZIAAgKg");
	this.shape_7.setTransform(26.55,132.9996);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D7F3FD").s().p("AgqgFIBGAAIAJAAIAGAAQgUALgWAAQgUAAgXgLg");
	this.shape_8.setTransform(136.3,95.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#7BD3FA").s().p("AgxgEIBZAAIAKAAQAAAEgBAAQgaAFgVAAQgdAAgWgJg");
	this.shape_9.setTransform(276.05,185.5104);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C3DFFF").s().p("AgsgEIBPAAIAKAAQAAAEgBAAQgYAFgTAAQgaAAgTgJg");
	this.shape_10.setTransform(268.55,171.5104);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BDDCFF").s().p("AgngEIBFAAIAKAAQAAAEgBAAQgVAFgRAAQgYAAgQgJg");
	this.shape_11.setTransform(275.05,149.5191);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D4EAFF").s().p("A4SBfIBuAAIAKAAQAAAFgBAAQgeAFgZAAQgkAAgcgKgAYOAEQgFg1AAg3IAKAAIAABkIAAAJIgFgBg");
	this.shape_12.setTransform(164.55,152.5104);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C7E2FF").s().p("AgxgEIBZAAIAKAAQAAAEgBAAQgaAFgVAAQgdAAgWgJg");
	this.shape_13.setTransform(214.05,181.5104);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C0DEFF").s().p("AgsgEIBPAAIAKAAQAAAEgBAAQgYAFgTAAQgaAAgTgJg");
	this.shape_14.setTransform(178.55,154.5104);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#DBEEFF").s().p("AAAAnQgEgnAAgnIAJAAIAABFIAAAKIgFgBg");
	this.shape_15.setTransform(188.5625,164);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EAF6FF").s().p("AAtAFIhjAAIAAgJQA2AAA3AEIAAAFIgKAAg");
	this.shape_16.setTransform(173.55,91.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CFF1FD").s().p("AgzAEIAAgJIBZAAIAJAAIAGAAQgbALgoAAQgRAAgUgCg");
	this.shape_17.setTransform(162.3,59.6125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EBF7FF").s().p("AgTDMQAnAAAnAFIABAFIgKAAQgOACgLAAQgcAAgQgMgAg2h0QgFgxAAgyIAKAAIAABaIAAAKIgFgBg");
	this.shape_18.setTransform(185.05,71.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#6AD6F8").s().p("AAeAFIhFAAIAAgJQAnAAAnAEIABAFIgKAAg");
	this.shape_19.setTransform(185.05,11.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E4F7FE").s().p("AgngFQAnAAAoAFIAAAEIgKAAQgOACgLAAQgcAAgQgLg");
	this.shape_20.setTransform(310.05,76.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F0F9FF").s().p("Au1BQIiMAAIAAgKQBLAABKAFIABAFIgKAAgACgAeIizAAIAAgKQBeAABeAFIABAFIgKAAgAPyhPIBGAAIAKAAIAAAFQgoAFgoAAIAAgKg");
	this.shape_21.setTransform(184.05,99);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F4FAFF").s().p("AgEAoIAAhZQAQAlgMA9QAAABgEAAIAAgKg");
	this.shape_22.setTransform(291.5604,59);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#7FDCF9").s().p("AgEAoIAAhZQAQAmgMA8QAAABgEAAIAAgKg");
	this.shape_23.setTransform(303.5604,52);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F8FCFF").s().p("AExFjIiMAAIAAgKQBLAABLAFIAAAFIgKAAgAj0lYIhGAAIAAgKQAoAAAnAFIABAFIgKAAg");
	this.shape_24.setTransform(279.55,55.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#9AE3FA").s().p("AA3AFIh3AAIAAgJQBAAABBAEIAAAFIgKAAg");
	this.shape_25.setTransform(253.55,0.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#46C9F7").s().p("AgngEIBFAAIAKAAQAAAEgBAAQgVAFgRAAQgYAAgQgJg");
	this.shape_26.setTransform(390.05,187.5191);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#EDF8FF").s().p("AAtAFIhjAAIAAgJQA2AAA3AEIAAAFIgKAAg");
	this.shape_27.setTransform(386.55,149.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#90D6FB").s().p("Ag7gEIBtAAIAKAAQAAAEgBAAQgeAFgZAAQgjAAgcgJg");
	this.shape_28.setTransform(328.05,192.5104);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CBE5FF").s().p("AgsgEIBPAAIAKAAQAAAEgBAAQgYAFgTAAQgaAAgTgJg");
	this.shape_29.setTransform(342.55,170.5104);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F2FAFF").s().p("AgEAeIAAhFQAQAcgMAyQAAABgEAAIAAgKg");
	this.shape_30.setTransform(351.557,128);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CCE7FE").s().p("AtMCaQgFAAgFACQgkAMg2gEIgKAAIhGAAIgKAAQi/gNhjhrQAAAFgCACQgsAlg2AaIgKAAIiWAAQAAgFgBAAQiCgigxhuIgBgFQgxgFgyAAIAAAKIgKAAQiMgJgeh5QAhAmAwAUQAEACAFAAQAwASBHgNQABAAAAgFQBYgQAyg4QACgDAAgFQA/BcB1AlQAFABAFAAQArASBCgNQABAAAAgFIAKgBQA+gMAcgvQAAgPgFgBQi3hChSieQB5ByDRAaIAKAAQAgASA5gNQABAAAAgFQCfgFBmg/QAEgCAFAAQAKAAAIAEQACABAAAFQAAAFgDACQg7AzhOAgQARCoCiAaQABAAAAAFIBuAAIAKAAQB9gmAyh3QAAgCAFAAIAAiCIAAgKQBIBJB2AaIAKABQAhASA4gNQABAAAAgFQCzgZBnhmQACgDAFAAQhHCHiVA2QgEABgFAAIgKAAQAAAoAFAoIAFAAQAtByCQAPIAKAAQAmASA9gNQABAAAAgFQCugaA3iPQABgFAAgFQBRBACBAQIAKAAQAgARA5gMQABAAAAgFIAKAAQCKgMAWiAIAAgFQljAUiljXQCBBbC/AdIAKAAQAcASAzgMQABgBAAgFQE1gZCQjAQACgDAFAAQgiA+gPBOIgBAKIgKAAQAAA3AFA3IAFAAQAeCMCMAdIAKABQAhASA4gNQABAAAAgFQBtgVA6hHQADgDAAgFQB2DWEWg/QAdgGAZgZIgBAJQgPCBiGALIgKAAIhGAAQgFAAgEgBQiJgwhKhuQAAAFgCAEQhgCYjKAwIgKAAIhuAAQgFAAgEgBQicgshBiHQgFAAgBACQgvBfh/ANIgKAAIhaAAIgKAAQhbgNgxg5QgfBFgqA7QgrA9hGAXQjtBOh+iWQhUCIiKBQQgxAdgzAIQg/AJg4AAQk2AAg7kug");
	this.shape_31.setTransform(204.55,172.5992);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#EFF8FF").s().p("AgHglQAQAWgCAvIAFAAQAAAFgCAAIgGABQgWAAALhLg");
	this.shape_32.setTransform(329.8806,110.8228);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#EBFDFE").s().p("ACHMgIhaAAIgKAAQiQgQgthyIAAgKIAAhGQAFAAAFgCQCVg1BGiHQgFAAgCACQhmBni0AZIgKAAIhQAAIgKgBQh2gahIhJIAAAKIAACCQgFAAAAACQgxB3h+AnIgKAAIhuAAQAAgFgBAAQiigbgRioQBOggA8gzQACgCAAgFQAFAAACgDQAugzhJAiIAAAKQgFAAgDACQhmA+igAGIgKAAIhQAAIgKgBQjQgZh6hyQBSCeC3BCQAFABAAAPQgcAvg+AMIgKABIgKAAIhkAAQgFAAgEgBQh1gmhAhbQAAAFgCADQgxA4hZAQIgKAAIhuAAQgFAAgEgCQgwgVghglIAAgKIAAgeQAchEAkg8QABgCAFAAQCLhaD7APIAAgFQBMi5DNg2IAJgBICMAAIAKAAQCfAaBUBmQACACAFAAQAzhoB4gjQAEgBAFAAIBGAAIAKAAQB1AIg5BXIAKgFQBmhJCJgpQABgBAAgFQA4AGAjgOQAEgCAFAAIC0AAIAKAAIAKABQBWAPAzAEQgDAAgCgCQhQhfiigMIAAgFQgogFgoAAIgKAAIgeAAIAAgFQg3gFg3AAIAAAKQgUAAgPAJQhiA6gHhhQBAi7DfgqQAJgCgLgHQgXgOgCgmIAAgKIAAhaIAAgKIAAgUQAvieDUAIIAKAAQA5AXAtAiQADADAFAAQBiiFDAgkIAKgBIBGAAIAKAAQEdAyBAEOIABAKIAABaIAAAKIgBAKQgXBvg4BPIgKABQk0AfiEDPQAfAOBDgqQCchhDYgiQAoAAAogFIAAgFIAUAAIAKAAICMAAIAKAAQCXAOAcCHIABAKQgMBVAfgJQABgBAAgFQCfg9AoCXIABAKIAABGIAAAKIAAAKQgGAngYAVQAgAaBDgmQAvgcBUAKQA4A7AmBPQABACAFAAIBkAAIAKAAQBRAUAxAtIAAgFQArA0gDBiIAAAKQgYAZgeAHQkVA/h3jXQAAAFgCADQg7BGhtAWIgKAAIhQAAIgKgBQiMgdgeiMIAAgKIAAhkIABgKQAQhOAhg+QgFAAgCADQiPDAk2AZIgKAAIhGAAIgKgBQi/gciBhbQClDWFjgTIAAAFQgWCAiKALIgKABIgKAAIhQAAIgKgBQiAgPhShAQAAAFgBAFQg3CPiuAbIgKAAg");
	this.shape_33.setTransform(204.5473,101);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#A3E5FB").s().p("AAoAFIhZAAIAAgJQAxAAAyAEIAAAFIgKAAg");
	this.shape_34.setTransform(343.05,106.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CEF1FD").s().p("AZeBnQArAQBDgBIAAAFIgKABQgUADgRAAQgsAAgTgYgA7AgmQgGgDgFgFQARgcgCg0IAFAAIAABQIAAAKQgFAAgEgCg");
	this.shape_35.setTransform(218.05,134.7298);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FDFEFE").s().p("AaBLJIAAgGQg3gEg3AAIAAAKQgFAAgBgDQgmhOg4g8QhUgJgvAbQhDAmgggaQAYgVAGgmIAAgKQAFAAABgBQALg0gRgbIgBgKQgoiXifA9IgFAAQADgwgSgWIgBgKQgciIiXgPIAAgEQhLgGhLABIAAAJIgKAAIgUAAIgKAAIhGAAIAAAKQjYAiicBjQhDAqgfgOQCEjQE0ggIAKgBQA4hOAXhvIABgKQAFAAAAAAQANg+gSgmIgBgJQhAkPkdgyIAAgEQgogGgoAAIAAAKIgKABQjAAlhhCEQgFABgDgDQgtgig5gXIgKAAQjVgIgvCdIAAAUIAAALIgKAAQAAAxAFAyIAFABQACAlAXAOQALAIgJABQjfArhAC6QAHBhBig7QAPgIAUgBIBkAAIAKAAIAeAAIAKAAQAXASAvgHIAKgBQCjANBQBfQACACADABQgzgEhXgQIgKgBIAAgEQhfgGhfAAIAAAKQgFAAgEADQgjAOg4gHQAAAGgBAAQiJAphmBKIgKAEQA5hXh1gHIAAgGQgogEgoAAIAAAKQgFgBgEACQh4AigzBoQgFAAgCgCQhUhmifgZIAAgGQhLgEhLAAIAAAKIgJAAQjNA3hMC5IAAgLIAAhPIAAgLIAAgeQBYkeFoA0QBUANA8AxQAeAZASAmQBOhYCFgfIAJgBQAtAYAogYIgFAAQAAgGgCgDQgdhCALhoQAoiICNghIAJgBQBEAHAlgRIgFAAQAAgGgCgCQg0gwgahLIAAgKIAAiMQAxiXCigmIAJgBIBGAAIAKAAQB6AJA0BPQABACAFAAQBchoCNg1QBHgcBVgOIAKgBIB4AAIAKAAQBWANBFAeQDvBlAkEyIAAAKIAABaIAAAKIAAAKQgIB6g+BFQAhAHA6gQQAEgCAFAAQAXASAvgHIAKAAQDSA2AZD0IAFABIBaAAIAKAAQBcANANBgIAFAAIAABaIAAAKQAhASA5gHIAKgBQBwAYAIB/IAAAJQAbAjBJgOIAKgBQBaAQAmBCQACADAAAFIAAAGQgxguhRgTg");
	this.shape_36.setTransform(225.5375,78.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#D4F3FD").s().p("AgxgFQAxAAAxAFIABAEIgKAAQgQACgPAAQgjAAgXgLg");
	this.shape_37.setTransform(364.05,128.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,409.1,218.2);


(lib.blush1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FE9181").s().p("ACqAXQgPgDgLgGQgGgGgCgIIAAgCQAEgHAGgEIAAgBQApgUApATIABABQAFAFAEAIIABABQgOAZgiAAQgKAAgLgCgAjaAOIgKgCQgIgFgCgKIAAgBQAVgYAvAIQAMABAMAFQAGAEACAIIAAACQgBAGgGAEIAAAAQgTAJgVAAQgQAAgRgFg");
	this.shape.setTransform(23.875,2.5111);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.blush1, new cjs.Rectangle(0,0,47.8,5), null);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Scene_1_woman = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// woman
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(290.7,230.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_22();
	this.instance_1.setTransform(290.65,230.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_23();
	this.instance_2.setTransform(290.65,230.75,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_24();
	this.instance_3.setTransform(290.65,230.75,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_25();
	this.instance_4.setTransform(290.65,230.75,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F28657").s().p("AhXAPQgIgLgFgNQgEgNgBgRQAVgLgDAiIAAACQAHANALAIIABACQAVAJAeACIACAAQANAEASgDIAAgBIAegCIADAAIAXgLIACgBQAPgTAJgcQAAAAAAAAQAAAAABgBQAAAAABAAQABAAABAAQAFgBgBAEIAAAQIAAACIgCALQgEALgHAIIgEAEQggAehBAAIgBAAQg2AAgYgcg");
	this.shape.setTransform(434.1273,328.0151);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#948FC3").s().p("AgIAAIAPAAIACAAIAAAAIgRABIAAgBg");
	this.shape_1.setTransform(367.425,569.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#9490C4").s().p("AgMAAIAZAAIAAABIgCAAIgIAAQgIAAgHgBg");
	this.shape_2.setTransform(350,569.6955);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#9A7C94").s().p("AgOgBIAcABIABABIgDAAIgJABQgKAAgHgDg");
	this.shape_3.setTransform(361.1,541.5558);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9491C4").s().p("AgKAAIAUAAIABAAIAAAAIgBABIgDAAIgGAAQgHAAgEgBg");
	this.shape_4.setTransform(338.8,530.1955);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#64A654").s().p("AAAAUIAAgKIAAgdIABAAIAAAng");
	this.shape_5.setTransform(452.95,428.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A69FE6").s().p("AAAAWIAAgCIAAgpQADAUgDAXg");
	this.shape_6.setTransform(545.5143,551.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A29BE5").s().p("AgMAAIAWAAIADAAIgBAAIgYABIAAgBg");
	this.shape_7.setTransform(513.425,569.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A09AE3").s().p("AgIAAIARAAIAAABIgCAAIgGAAQgGAAgDgBg");
	this.shape_8.setTransform(495.975,569.4455);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A9A3E7").s().p("AgNAAIAaAAIABABIgDAAIgIAAQgJAAgHgBg");
	this.shape_9.setTransform(500.15,569.6955);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#A69FE5").s().p("AgPAAIAdAAIACAAIAAAAIgfABIAAgBg");
	this.shape_10.setTransform(524.15,530.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#A58CBE").s().p("AgjAAIAwAAIACAAIASAAIADAAIAAAAIhHABIAAgBg");
	this.shape_11.setTransform(514.575,530.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A587B3").s().p("AhPAAICcAAIADAAIgBAAIhFABQgtAAgsgBg");
	this.shape_12.setTransform(484.575,530.6143);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#997D93").s().p("AgRAAIAhAAIADAAIAAAAIgQABQgLAAgJgBg");
	this.shape_13.setTransform(486.3,525.7231);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#997D94").s().p("AqcAGIAgAAIADAAIgBABIgPABQgLAAgIgCgAKbgFIgXAAIAAgCIAaABIAAABIgDAAg");
	this.shape_14.setTransform(435.05,525.035);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#ABA5E7").s().p("AgIAAIARAAIAAABIgCAAIgGAAQgGAAgDgBg");
	this.shape_15.setTransform(528.775,530.1955);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#9F9BCA").s().p("AAAAXIAAgtIABAAIAAArIAAACg");
	this.shape_16.setTransform(317.925,550.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#65A553").s().p("AAAABIAAgBIAAABg");
	this.shape_17.setTransform(450.7625,354.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AADLwQiPgIiOgMQgxgEgpgLIAAgDIAAAAIAAgCIAAgBIAAgCQAiitA1iZQAVg9ASg/IABgDQAXhLAShOQAGgYADgWIADgtIgCglQgDgTgEgTIgCgBIgMgNIgCAAQgXgMgOgTQgHgJgegfQgfgfgIgqQgJgrACgXIAAgCIAAgQIAAgDIAAgeQAJglAOggQAOgeASgaQAEgGACgGIAFgZQARhSAAhhIAAgBIgBgZIAAgCIAAgBIAAgBIAAgCIAAgBIAAgBIgBgTIAAgBIgHACIAAgCIAAgCIACgCQAYgQAoABIADABIAXAAIACAAIAAAAIAAADIAAANIAAACIAAABIAAACIgCAAIAAAiIABAMIABAAIAAABQAGCzCkAGQBTADApg0QAXgeAMgoIANhbIAAgUIgBgUIAAAAIAAgDIAAAAIAVgBIACABQAbgCATAGQANAFAKAHIAAACIAAACIABCFIABAAQACBYAbA/QANAfAUAYQAKAMAEATQADAPAAAUIAAAXIAAACIAAAVIAAADIAAACQgNBOgmA1IgCAFQggAsgzAZIgBACQgHANgGAPIAAALIAAADIAAAAIAAADIgCAAIAAAdIABALIABAAQAQB+AhBsIACAAIABADQAuCfAyCcQAVBAAJBMIAAABIAAACIgBAEQiSAViXAOQgVACgVAAIgegBg");
	this.shape_18.setTransform(433.575,429.0873);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E4A052").s().p("AAAAwIAAhfIABAAIAABcIAAADg");
	this.shape_19.setTransform(442.775,347.725);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E3A153").s().p("AAAAOIAAgCIAAgZQADAMgDAPg");
	this.shape_20.setTransform(475.1143,296.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E4A153").s().p("AgBgGQADADAAAIIABAAIgBABIgCABQgDAAACgNg");
	this.shape_21.setTransform(475.18,299.5049);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E3B987").s().p("AAAANIAAgbIABAAIAAADQACAPgDALIAAgCg");
	this.shape_22.setTransform(381.4208,373.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#F9C482").s().p("AgBALIABgXIABAAIAAADQACANgDAJIgBgCg");
	this.shape_23.setTransform(386.2583,275.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F59117").s().p("AhpAMIAAgCQAFgRANgKIABgCQAIgFAKgDIAAgBQA1gGA+ACQARAAAYANQAKAHAFAMIABABQAHATgLAMIAAgBQgKgJgIgZIgBgCQgrgPhFAEQgWABgPADIgOALIgCABQgEARgGAQIgCAAQgMgHADgOg");
	this.shape_24.setTransform(454.1784,288.9589);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FAAC54").s().p("AgNAAIAYAAIADAAIAAAAIgbABIAAgBg");
	this.shape_25.setTransform(416.375,288.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#9D99C9").s().p("AgNAAIAZAAIACAAIAAAAIgbABIAAgBg");
	this.shape_26.setTransform(363.275,569.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#7FD198").s().p("AAAAXIAAgMIAAghIABAAIAAAtg");
	this.shape_27.setTransform(416.475,358.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#E3A152").s().p("AgCANQADgLAAgPIABAAIABAGQABAVgEAAIgCgBg");
	this.shape_28.setTransform(392.1882,298.8723);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#F9C687").s().p("AATABIgoAAIAAgBIArAAIAAABIgDAAg");
	this.shape_29.setTransform(431.95,230.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#292423").s().p("AEfAUQgFgXgRgPQgugng6AdQgrAVgFA9IgCABIgDACQgMgEADgUIAAgCQAXhkBxAQQAUADAPAKQAmAaAFA7QABAMgJAAQgNgNgFgYgAh7AUQgFgXgRgPQgugng5AdQgqAVgHA4QgBAFgDADQgNgEADgUIAAgCQAQhXBmAAQAfABATAMQAsAcgCBFIgCABIgCACQgNgNgFgYg");
	this.shape_30.setTransform(433.6929,305.9249);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F9C688").s().p("AAAAOQgBgOABgNQADAKgCAOIAAADg");
	this.shape_31.setTransform(386.2771,285.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#C8750D").s().p("AnYJnQgRgOgPgQQgSgUgHgcQgVhQgBhgIAAgCQACgLgEgGIAAgCIAAgQIAAgCQACgNgFgGIAAgCIAAgTIABgCQABgOgEgHIAAgDIAAgUIAAgDQACgPgEgKIAAgDIAAgcIABgMQABgLAEgHQADgHAAgNIgBgZQgBgMAEgRQADgRAPgwIgBAAIABgaQAEgLgCgQIAAgDIAAgCIAAgXQAEgKgCgQIAAgCIAAgDIAAgSQAEgIgBgNIgBgCIAeApIAfAnIAMAPIAKANQAKAQAPAPQAJANAMAKQAIAHAFAHIACAEIAXAbIACADIAKAIQADADADAHIAOAQQADAGAAAHQgPAggIAlIAAAeIAAACIAAAQIAAADQgDAXAJAqQAIArAfAfQAfAfAGAJIgKAeQgoB6g0BrQg+gTgsgkgAHMJoQhSgbg0g5QgSgUgHgdQgNgxgFg3IABgEQAng1AMhPIAAgCIAAgCIAAgVIAAgDIAAgXQAAgTgDgQQgDgSgKgMQgUgZgOgfIAGgIQAGgKAOgMIAfgfQARgRAZgVQAQgOAOgSIAPgTIABgBIAAAAIADgEIACgBIgBgBIARgWIACgBIBBhcIAAASIAAADIABA1IABAAIAACJQAAAvgCAKQgDALABACQABABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIAAABIAAACIABACIAAAAIABACIAAAIQASA8APBOQATBpgOAvQgoB6g0BsIgEgBgAljk9Qgtg7grg+QgQgXgGghIgBAAIgBACQgOgRgNgWIALhoIAAgPQAhAPAYgbIABgCQAFAOAFAcQAhCrCHBKQA7AgBYAEIAABgQgoAFgkAIIgCABIAAgBIgDAAIgXAAIgCAAQgpgBgXAPQgtgvgog0gAC5joIgCAAIgVAAIAAABIgCgBQgkgIgogFIAAgDIAAhdIAAgCQCUgIBKhSQApgsAag5QAbg6AHhMQAHAUAXAFIACAAQARgCAJgJIACAAQAFgTAGAFIAJA/IgVAqQgRAggTAeQgTAggUAgQhHBxhZBhQgTgGgbABg");
	this.shape_32.setTransform(434.545,377.131);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#F58E11").s().p("AmmFYQgMgXghAHIgBgCQgIgzgBg7IAAgCQACgQgEgKIAAgCIAAhIQAEgJgCgOIAAgDIAAgCIAAgeIAEghIAOgPQBkhrBuhiQBQhHBNhKQAYgDAZAAIAqAAIABAAIAoACQARARAVAOQAWAPAVASQA8AzA5A2QBvAqAqBvIABABQAvAvApA2IAAATIAAACIAAADQgDBigZBMQAHAXADAaIAAACIgCAAQgegMgRAYIAAACIgBAAQAAgJgDgDIgBgCIABgJIABAAQADgRgEgLQg0g2gpg/QhSiAg7iVQgqBKg5A7QhmBqiEBMIACAAQAWACARAHIABACQAKAJAGAMIAAADQAGAPgLANIgBgBQgJgRgGgUIgCAAQgPgLgZAAIgCAAIgZAAIAAACIgDABQhlA1h7AgIAAADIgBAAQABAQgEALIgBgCg");
	this.shape_33.setTransform(434.1375,265.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#E5BD8C").s().p("AAAAJIAAgTIAAAAIABAAIAAABQABANgCAHIAAgCg");
	this.shape_34.setTransform(381.8861,363.65);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#E4BA87").s().p("AAAAbIAAg1QADAXgCAbIAAADg");
	this.shape_35.setTransform(486.4455,361.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#4C41CC").s().p("AG0DHIhnAAIgBgCIgbgBIgDAAIgQAAIAAgBIgSgBQh0gGhqgSQiygciqgmIAAgCQgMgDgGgDIgCAAQgLACgNgJIAAgBQgbAFgegUIgBABQgDAEgWgFIgBAAQgIgCgEgEIAAAAQgNACgFgIIAAACIgOgCIgCAAIgNgGIAAABQgEgDgJACIAAgCQgKABgCgGIgCAAQg3gMg8gQIgBgBQgGgEgFgEIAAABQgUABgcgNIAAAAQgUgBgRgLIgCAAQgVABgTgMQCBgoAniCIABgCQDGAADEACIADAAIEdAAIACAAQBMAEBTgDIABgBIC2AAIACAAIBHgBIAAgBIAqAAIACAAIAhgBIAAgCIASAAIACAAQAFAFAMgCIACAAQCVAUAICjIAAACIAAApIAAACQgDAYgLARQhWB5jPABIgDAAIgWAAIAAADIgDAAg");
	this.shape_36.setTransform(468.3,549.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#352D90").s().p("An0FbIhoAAIAAgBIgZgBQh+gEhZgqQhHghgVhUIAAgCIAAgsIAAgCIAAgTQATigCvgEIACAAQAGAEANgBIACgBIAAACQhAAtgaBQIAAAXIAAADQAGAMAKAHIAAACQAmAKAhgRQBEgjBXgSQAVgFAaACQAKAEARgCIADAAQCqABByA5IACAAQATAMAUAAIACAAQASALATACIAAgBQAdAOAUgCIAAgBQAEAFAHADIAAACQA9AQA2ALIACAAQACAHAKgBIAAABQAJgBAEADIAAgCIAMAHIACAAIAOACIAAgCQAGAHAMgBIABgBQAEAFAHACIACAAQAWAFACgFIACAAQAdATAcgEIAAABQAMAJAMgCIACAAQAGADAMADIAAABQhQAMhWAJQhTAIhPAPQitAijDANIgCAAIgQAAIAAACIgCAAIgRAAIgCAAIgZAAIAAACIgDAAgAFmgsQjEgCjGgBIAAgBIglgTQgBgigMgWQgNgWgZgIQg9gTg2AZQgMAGgLAHQg1AkhVAFIgDAAIggAAIgCAAQg7gCgvgMIEDicICDhPQApALAwAEQCOANCQAIQAlACAigDQCYgPCSgVIAAgDID1CsIBlBIIAAABQgOgEgUAAIAAgBIgagBIAAACIgCABQg0AIg7ADIgCAAIgjAAQgVAAgQgDQg1gMgogWQghgTgpgHQh1gUgHBtIgBAAQgSALgUAJIAAADIgCAAg");
	this.shape_37.setTransform(411.7375,535.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C8750E").s().p("Aj7DHQiTgqhFh5QAtAkA9ATQA1hqAnh6IALgeQAOASAXAMIACABIAMANIACABQAEASACATIADAmIgDAtQgDAWgGAXQgSBPgXBLIgBADIgBgBgADyDAIgCAAQghhtgQh9IAAgpIAAgCIAAgBIAAgCIAAgLQAGgPAHgNIABgCQAzgaAggsQAGA3AMAxQAHAdATAUQAzA4BTAbIACAHIgBACQhQBqiRAqIAAgCg");
	this.shape_38.setTransform(433.9875,435.0375);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#E3BA87").s().p("AAAALIAAgYIABAAIAAACQACAPgDAKIAAgDg");
	this.shape_39.setTransform(381.6455,368.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FEC091").s().p("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");
	this.shape_40.setTransform(425.359,364.7602);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F9C787").s().p("AAAAJIgBgTIADAEQgBAJgBAIIAAgCg");
	this.shape_41.setTransform(482.2747,274.7375);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#64A654").s().p("AAAATIAAgIIABAIgAAAgSIABAAIgBAIIAAACg");
	this.shape_42.setTransform(452.95,428.55);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F28657").s().p("ABAALQgXgIgYgCQgXgCgWAFQgWAGgnAEQgGAAAAgFQAbgDAVgJQAigQAoAKQARAEARAFQAQAGATADIAAABQgFAEgIAAQgIAAgLgDg");
	this.shape_43.setTransform(433.025,329.0984);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AADLyQiPgIiOgNQgxgEgpgLIAAgCIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCQAiiuA1iZQAVg7ASg9IABgDIAAgDQAXhLAShPQAGgXADgXIABhMQgDgUgEgUIgCgBIgMgNQgBAAgHgIQgHgIgbgWIAAgBIgigjQgfgfgIgrQgJgqACgXIAAgDIAAgQIAAgCIAAgeQAJglAOggIAAAAQAOgfASgZQAEgGACgHIAEgRIABgHQARhRAAhgIAAAAIgBgOIAAgLIAAgDIAAgBIAAgEIAAgEIgBgPIAAgDIAAgBIgDAAIgEABIAAgBIAAgDIABAAIABgBQAYgQAoABIADAAIAXAAIACAAIAAABIAAACIAAABIAAACIAAAKIAAADIAAAAIAAADIAAAAIAAADIgCAAIABAfIAAALIABAAIAAABQAGC0CkAGQBTADApg1QAXgdAMgoIANhbIgBgmIAAgCIAAgBIAAAAIAAgCIAAgBIAVAAIACAAQAbgBATAGIACABQAMAEAJAHIAAACIAAACIABCEIABAAQACBZAbA+IAAACQAOAeATAYQAKAMAEASQADAQAAATIAAAXIAAADIAAAVIAAACIAAACQgNBPgmA1IgBAFIgBAAIAAACIg2AsIgLAKIgTARQgHANgGAPIAAAPIAAACIgBAAIgBAAIAAALIAAALIAAAHIAAAAIABAIIABAAQAQB+AhBtIACAAIABADIAAACQAvCeAxCbQAVBAAJBMIAAABIAAACIAAABIAAACIgBADQiSAViXAPQgVABgVAAIgeAAg");
	this.shape_44.setTransform(433.575,428.9371);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#7FD198").s().p("AAAAVIAAgLIAAgeIABAAIAAApg");
	this.shape_45.setTransform(416.475,358.125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#C8750D").s().p("AnYJnQgRgOgPgQQgSgUgHgcQgVhQgBhgIAAgCQACgLgEgGIAAgCIAAgQIAAgCQACgNgFgGIAAgCIAAgTIABgCQABgOgEgHIAAgDIAAgUIAAgDQACgPgEgKIAAgDIAAgcIABgMQABgLAEgHQADgHAAgNIgBgZQgBgMAEgRQADgRAPgwIgBAAIABgaQAEgLgCgQIAAgDIAAgCIAAgXQAEgKgCgQIAAgCIAAgDIAAgSQAEgIgBgNIgBgCIAeApIAfAnIAMAPIAKANQAKAQAPAPQAJANAMAKQAIAHAFAHIACAEIAXAbIACADIAKAIQADADADAHIAOAQQACAFAAAFQgNAggJAlIAAAeIAAACIAAAQIAAADQgDAXAJAqQAJArAeAfIAiAjIAAABQgDAXgEAOQgoB6g0BrQg+gTgsgkgAHNJoIAAgBQhTgag0g6QgSgUgHgcQgNgxgFg3IAAAAIAAgCIAAAAIABgFQAng1AMhPIAAgCIAAgCIAAgVIAAgDIAAgXQAAgTgDgQQgDgSgKgMQgUgYgNgeIAFgHQAGgKAOgMIAfgfQARgRAZgVQAQgOAOgSIAPgTIABgBIAAAAIADgEIACgBIgBgBIARgWIACgBIBBhcIAAASIAAADIABA1IABAAIAACJQAAAvgCAKQgDALABACQABABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIAAABIAAACIABACIAAAAIABACIAAAIQASA8APBOQATBpgOAvQgoB6g0BsIgDgBgAljk9Qgtg7grg+QgQgXgGghIgBAAIgBACQgOgRgNgWIALhoIAAgPQAhAPAYgbIABgCQAFAOAFAcQAhCrCHBKQA7AgBYAEIAABgQgoAFgkAIIgCABIAAgBIAAgCIAAgBIgDAAIgXAAIgCAAQgpgBgXAQIgCABQgsgvgngzgADojmQgUgGgbABIgCAAIgVAAIAAABIABACIgBAAIAAABIgCgBQgkgIgogFIAAgDIAAhdIAAgCQCUgIBKhSQApgsAag5QAbg6AHhMQAHAUAXAFIACAAQARgCAJgJIACAAQAFgTAGAFIAJA/IgVAqQgRAggTAeQgTAggUAgQhHBvhXBhIgBgBg");
	this.shape_46.setTransform(434.545,377.131);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C8750E").s().p("Aj7DHQiTgqhFh5QAtAkA9ATQA1hqAnh6QAEgOAEgXQAbAWAHAIQAHAIABAAIAMANIACABQAEAUADAUIgBBNQgDAWgGAXQgSBPgXBLIAAADIgBADIgBgBgADzC/IgBgDIgCAAQghhsgQh9IgCgIIAAgGIAAgOIAAgCIABgIIABAAIAAgCIAAgPQAGgPAHgNIATgRIALgKIA2gsIABAAQAFA3AMAxQAHAcATAUQAzA5BTAaIAAABIACAGIgBACQhQBriPAqIgBgDg");
	this.shape_47.setTransform(433.9875,435.025);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FEC091").s().p("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");
	this.shape_48.setTransform(425.359,364.7602);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FEC091").s().p("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");
	this.shape_49.setTransform(425.359,364.7602);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#E3A153").s().p("AAAANIAAgCIAAgXQACALgCAOg");
	this.shape_50.setTransform(475.0893,296.325);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#E4A153").s().p("AgBgGQACADAAAIIABAAIABAAIgBABIgCABQgDAAACgNg");
	this.shape_51.setTransform(475.1818,299.53);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AADLyQiPgIiOgNQgxgEgpgLIAAgCIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCQAiiuA1iZQAVg7ASg9IABgDIAAgDQAXhLAShPQAGgXADgXIABgbQBKgIBEgRQApgKAHgtIAAgCIAAgOQAHgHgCAVIgBACQAEAXAMAPIABACQAyAfBRAEQAbABAVAHIABAAIAFAlQAPBaAYBQIADAMIACAAIABADIAAACQAvCeAxCbQAVBAAJBMIAAABIAAACIAAABIAAACIgBADQiSAViXAPQgVABgVAAIgeAAgADrh1IgDAAIgWAAIgCAAQgOACgHgEIgDAAIgFAAIgCAAIgOAAIgCAAQgNACgHgEIgCAAIgYAAIgDAAQgMABgHgEQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQgWgpgJg1QgKgzgRgvIgBAAQgPgLgXAAIgBABQgTAFgLAKIgWBRQgKAmgEAsQgDAWgTADIAAABQgKACgMAAIgCAAIgXAAIgBABQgKABgLAAIgCAAIgNAAIgCAAIgHAAIAAABIgYABIgCAAIgWAAIAAABIgUACIghgjQgfgfgIgrQgJgqACgXIAAgDIAAgQIAAgCIAAgeQAJglAOggIAAAAQAOgfASgZQAEgGACgHIAEgRIABgHIADgMIAGgOQAIgUADgZQAEgVAAgaIAAgCIAAh0IgJAFIAAgBIAAgBIgDAAIgEABIAAgBIAAgCIAAgBIABAAIABgBQAYgQAoABIADAAIAXAAIACAAIAAABIAAACIAAABIAAACIAAAKIAAADIAAAAIAAADIAAAAIAAADIgCAAIABAfIAAALIABAAIAAABQAGC0CkAGQBTADApg1QAXgdAMgoIANhbIgBgmIAAgCIAAgBIAAAAIAAgCIAAgBIAVAAIANABQAMABAJAFIARAJIAAByIAAACQAEByAzBDQAHAQAKANIAAABIAbAzQACAOAAARIAAAXIAAADIAAAVIAAACIAAACQgNBPgmA1IgBAFIgBAAIAAACIgcAYIgGAAIgCAAIgHAAQgJAAgFgDg");
	this.shape_52.setTransform(433.575,428.9371);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F9C482").s().p("AAAALIAAgWIABAAIAAACQACANgDAJIAAgCg");
	this.shape_53.setTransform(386.2338,275.65);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FAAC54").s().p("AgNAAIAbAAIAAAAIgbABIAAgBg");
	this.shape_54.setTransform(416.375,288.475);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#E3A152").s().p("AgCANQADgLAAgPIAAAAIABAAIABAGQABAVgEAAIgCgBg");
	this.shape_55.setTransform(392.1882,298.8723);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#F9C688").s().p("AAAANQAAgNAAgMQACAJgCAOIAAACg");
	this.shape_56.setTransform(386.2535,285.8625);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#C8750D").s().p("AnUJnQgPgMgMgOQBCgKBFgJIAugHQgXA3gZA0Qg9gTgtgkgAHRJoIAAgBQgvgPgmgZIATADIAAABIBTAJIgOAdIgDgBgAGlGaIgDAAIgVAAIgDAAQgOABgHgEIgDAAIgVAAIgDAAQgOACgHgEIgCAAIgWAAIgCAAIgJABIgCgbIgBAAIAAgCIABAAIABgFQAmg1ANhPIAAgCIAAgCIAAgVIAAgDIAAgXQgBgRgCgOQA7BxA2B3QAHAQgNAGIgCAAIgHABQgJAAgFgDgAnSGVIALgVIABAAIABgCIgBgMQBAiDBBiDIABgBIAAgCIAAgCIACgEQACAFABAFQgOAggJAlIAAAeIAAACIAAAQIAAADQgCAXAIAqQAJArAfAfIAgAjIgDAAIgCAAIgWAAIAAABIgYABIgCAAIgWAAIAAABIgYABIgCAAIgVAAIgBABIgXACIgCAAQgbAEgMgLIAAACQgFAHgEAAQgDAAgDgHgAIPCvQgcg/gdg/IgBAAIgDgCQgMgYgNgXQgPgZgQgYIgDgEIgBgCQgBgFgYgbQgQgVgTgUQglgcgygxIgEgDIgFgEIgBAAQgDABgEgGIgBgBIgDgBIgRgJQgIgEgNgCIgMgBIgWAAIAAABIABACIgBAAIAAABIgCgBQgkgIgogFIAAgDIAAhdIAAgCQCUgIBKhSQApgsAbg5QAag6AHhMQAIAUAWAFIACAAQARgCAJgJIACAAQAFgTAGAFIAKA/QAEAfAIApQAHApAEA/QAOAVgIBwQgGBpAHgKIAAASIAAADIABA1IABAAIAACJQAAAvgCAKQgCALABACQAAABAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAIAAABIABACIAAACIABAAIAAACIAAAIQATA8AOBOIACAMIgehIgAGdg1IAFgHIAGgHgAGxhPIABgBIAAAAgAosDNIAAgcIABgMQACgLADgHQAEgHAAgNIgBgZQgBgMADgRQADgRAPgwIAAAAIAAgaQAEgLgCgQIAAgDIAAgCIAAgXIAAgSIAAgEIAAgGQACgBgCgGQgDgFAGgJIAAgBIgBgFQgBgDABgHIABAAQgGgSABgWQAChCAFgpQAGgoAYjNIAAgBIAMhoIAAgPQAgAPAZgbIAAgCQAFAOAFAcQAiCrCHBKQA7AgBXAEIAABgQgnAFglAIIgCABIAAgBIAAgCIAAgBIgDAAIgWAAIgDAAQgpgBgXAQIgCABIAAAAIAAABIgfAgQgmApglAiIgMAQIgCACIgCADIgDADIgLATQgKASgSATIAAABIgBgBIgoA7QgsBWgmBbIgBACIAAgCgAoKiRIAAAGIABgGIgBAAIAAAAgAEmBNIAEAFQAIALAEANQgJgNgHgQg");
	this.shape_57.setTransform(434.1,377.131);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#F58E11").s().p("AmnFZQgHgNgOgEIgKgBIgHAAIgHACIgBgCQgIgzgBg7IAAgCQACgPgDgJIgBgCIAAgCIAAhIIABgBQADgJgCgNIAAgDIAAgCIAAgeQASi9BwhgQBUhIB7ggQAsgLA1gBIABAAIAAgCIArABIAAABQBkACBGAgIACABQDGAKBFCNQARAlAMAuQALAqAAA1QAAAPABAPIABAAIAAAQIAAADIgCAAIAAAgIAAACIAAADQgDBigZBMQAHAXADAaIAAACIgCAAIgKgDIgIgBIgJABQgLADgJAMIAAACIgBAAQAAgIgDgDIAAgBIgBgCIABgJIAAAAIABAAQACgQgDgLIAAgBQg0g2gpg/QhSiAg7iVIAAAAQgqBKg5A7QhmBqiEBMIAAAAIACAAIABAAIAZAFIANAEIABACQAKAJAGAMIAAADQAGAPgLANIgBgBQgJgRgGgUIgCAAQgIgFgJgDIgWgDIgcAAIAAAAIAAACIgDABQhlA1h7AgIAAADIAAAAIgBAAQABAPgEALIAAABIgBgCg");
	this.shape_58.setTransform(434.1875,265.475);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#E5BD8C").s().p("AAAgCIAAAAIAAAFIAAgFg");
	this.shape_59.setTransform(381.8019,362.8375);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#C8750E").s().p("Aj7DHQiTgqhFh5QAtAkA9ATQAag0AWg2QA1gIA2gGIADAAIAAgCIAEgBIAAAbQgDAWgGAXQgSBPgXBLIAAADIgBADIgBgBgADzC/IgBgDIgCAAIgDgLQgYhQgPhaIgFgkQBfALBdAPQAmAYAvAPIAAABIACAGIgBACQhQBriPAqIgBgDgAEWivIgCAAIgRAAIAdgYIABAAIADAbQgJgBgFgCg");
	this.shape_60.setTransform(433.9875,435.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FEC091").s().p("AuNW0IgBgCQgKgHgFgMIAAgDIAAgXQAahRA/gtIABgCIABAAIABgCQA/g0BsgGIACAAQAwAMA6ACIACAAQAPAEAUgDIAAgBQBVgFA2gkQALgHAMgGQA1gZA9ATQAZAIANAWQANAWABAiIAkATIABABIgBADQgmCCiCAnIgCAAQhxg5irgBIAAgBIgegBQgagCgUAFQhXAShFAjQgVAKgWAAQgNAAgOgDgANqUIIi2AAIgDAAIidAAIgCAAIkeAAIAAgDQAUgJARgLIACAAQAGhtB2AUQAoAHAhATQAoAWA1AMQAQADAWAAQAPAEAWgDIAAgBQA6gDA0gIIADgBIAXAAIACAAQAVAAAOAEIAAgBQA8ATAtAjIABABIgCAAIgxAAIAAADIgCAAgAooERQApinA+iQIABgCQAnhbAshWIAng8IABABIAAgBQATgTAJgSIAMgTIACgDIACgDIACgCIAMgQQAlgiAmgpQASgOAUgOIAJgFIAAB0IAAACQAAAagEAVQgDAZgIAUIgGAOQgWAxgbAuIgCAEIAAACIAAACIgBABQhBCDg/CCIAAAMIAAACIgBAAIgLAVQAEAOAKgOIAAgCQAMALAbgEIACAAIAXgCIABgBIAVAAIADAAIAYgBIAAgBIAVAAIACAAIAYgBIAAgBIAWAAIACAAIAEAAIAUgCIAAgBIAWAAIACAAIAYgBIAAgBIAHAAIACAAIANAAIACAAQALAAAKgBIABgBIAXAAIACAAQAMAAAJgCIAAgBQATgDADgWQAEgsAKgmIAWhQQALgKATgFIABgBQAYAAAPALIABAAQARAuAKAzQAJA1AWApQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAQAHAEAMgBIADAAIAYAAIACAAQAHAEANgCIACAAIAOAAIACAAIAFAAIADAAQAHAEAOgCIACAAIAWAAIADAAQAHAEAOgBIACAAIAFAAIARAAIACAAQAFACAJABIAIgBIACAAIAWAAIACAAQAIAEAOgCIACAAIAWAAIACAAQAIAEANgBIADAAIAVAAIADAAQAHAEAOgCIADAAQAMgGgHgQQg2h3g7hwIgagzIgBgBQgEgNgIgLIgEgFQg0hDgDhyIAAgCIAAhyIACABIABABQAFAGACgBIABAAIAFAEIAEADQAyAxAlAcQATAUARAVIAaAiIACAEQAQAYAPAaQANAXAMAYIADACIACAAQAdA/AbA/IAeBHQAuBxAkB8QAXBPg3AgQgJAFgMgBIhogLIhTgJIAAgBIgTgDQhdgPhfgLIgBAAQgVgHgbgBQhRgEgyggIgBgCQgMgPgEgXIABgCQACgVgIAHIAAAOIAAACQgHAtgpALQhDARhLAIIgEABIAAACIgDAAQg2AGg1AIIguAHQhFAJhCAKIg8ALQgQADgOAAQhJAAgBhUgABnjjQikgGgGi0IAAgBIAAgqIAAgDIAAAAIAAgDIAAAAIAAgDIAAgKIAAgCIACgBQAlgIAngFIAAhgQhXgEg7ggQiHhKghirQgGgcgFgOIAAACQgZAbgggPIgBgCQgDgLgGgIIAAgCIAAhYQAFgSAQgGIAAgCIAHgBIAHAAIAKABQAOADAHAOIABACIAAgBIAAABQAHAFgBgaIgBgHIAAgCQB6ghBmg1IACAAIAAAAIAcgBIAAgCIAWADQAJADAIAFIACABQAGATAIASIABAAIAAAAQAMgMgHgQIAAgCQgGgNgJgJIAAgBIgOgFIgZgEIgDgBQCEhMBmhqQA5g7AqhKQA7CVBSCAQApBAA0A1IAAACIAAAYIAAACIAAAAIgBAKIABACIAAAAQgDARAHgEIABgBIAAgDQAIgMALgDIAJgBIAIABIAKADIACABIAAAAQAcAegHBDQgBAJABAKQgHgFgFATIgBAAQgKAJgQACIgDAAQgWgFgIgUQgHBMgaA6QgbA5goAsQhLBSiUAIIAAACIgCAAIABBgIABAAQAoAFAlAIIACABIAAACIABAmIgNBbQgMAogXAdQgnAyhMAAIgJAAgAFwvQQARAPAFAYQAFAYANANQAJAAgBgMQgFg8gmgaQgPgKgUgDQhxgQgXBlIAAACQgDAUAMAEIADgCIACgBQAFg+ArgVQAZgNAWAAQAfAAAaAXgAgqvQQARAPAFAYQAFAYANANIACgCIABgBQAChGgrgcQgTgMgfgBQhmAAgQBYIAAACQgDAUANAEQADgDABgFQAHg5AqgVQAYgMAWAAQAeAAAbAWgADvyEIAAABQgKAEgIAEIgBACQgNALgFASIAAACQgDANAMAIIACgBQAGgQAEgSIACgBIAOgLQAPgCAWgBQBGgEArAOIABADQAIAZAKAKIAAABQALgMgHgUIgBAAQgFgNgKgIQgYgMgRgBIgbAAQgwAAgpAEg");
	this.shape_61.setTransform(423.3875,401.7352);

	this.instance_5 = new lib.blush1();
	this.instance_5.setTransform(433.9,319.6,0.9999,0.6299,0,0,0,23.9,2.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},145).to({state:[{t:this.instance_1}]},72).to({state:[{t:this.instance_2}]},38).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},5).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},37).to({state:[{t:this.shape_41},{t:this.shape_48},{t:this.shape_39},{t:this.shape_47},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_46},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_45},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_44},{t:this.shape_21},{t:this.shape_20},{t:this.shape_43},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_42},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},65).to({state:[{t:this.shape_41},{t:this.shape_49},{t:this.shape_39},{t:this.shape_47},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_46},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_45},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_44},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_42},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},115).to({state:[{t:this.shape_41},{t:this.shape_61},{t:this.shape_60},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_30},{t:this.shape_55},{t:this.shape_45},{t:this.shape_26},{t:this.shape_54},{t:this.shape_24},{t:this.shape_53},{t:this.shape_22},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},97).to({state:[{t:this.shape_41},{t:this.shape_61},{t:this.shape_60},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_30},{t:this.shape_55},{t:this.shape_45},{t:this.shape_26},{t:this.shape_54},{t:this.shape_24},{t:this.shape_53},{t:this.shape_22},{t:this.shape_52},{t:this.shape_50},{t:this.shape_51},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},114).to({state:[{t:this.shape_41},{t:this.shape_61},{t:this.shape_60},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_30},{t:this.shape_55},{t:this.shape_45},{t:this.shape_26},{t:this.shape_54},{t:this.shape_24},{t:this.shape_53},{t:this.shape_22},{t:this.shape_52},{t:this.shape_50},{t:this.shape_51},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_5,p:{scaleX:0.9999,scaleY:0.6299,y:319.6,regY:2.6}}]},11).to({state:[{t:this.shape_41},{t:this.shape_61},{t:this.shape_60},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_30},{t:this.shape_55},{t:this.shape_45},{t:this.shape_26},{t:this.shape_54},{t:this.shape_24},{t:this.shape_53},{t:this.shape_22},{t:this.shape_52},{t:this.shape_50},{t:this.shape_51},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_5,p:{scaleX:1,scaleY:0.84,y:319.65,regY:2.6}}]},26).to({state:[{t:this.shape_41},{t:this.shape_61},{t:this.shape_60},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_30},{t:this.shape_55},{t:this.shape_45},{t:this.shape_26},{t:this.shape_54},{t:this.shape_24},{t:this.shape_53},{t:this.shape_22},{t:this.shape_52},{t:this.shape_50},{t:this.shape_51},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_5,p:{scaleX:1,scaleY:1,y:319.55,regY:2.5}}]},17).to({state:[{t:this.shape_41},{t:this.shape_61},{t:this.shape_60},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_30},{t:this.shape_55},{t:this.shape_45},{t:this.shape_26},{t:this.shape_54},{t:this.shape_24},{t:this.shape_53},{t:this.shape_22},{t:this.shape_52},{t:this.shape_50},{t:this.shape_51},{t:this.shape_19},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_5,p:{scaleX:1,scaleY:1.24,y:319.55,regY:2.5}}]},100).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wave_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wave_6
	this.instance = new lib.wave_6();
	this.instance.setTransform(761.35,707.1,1,1,0,0,0,28.6,4.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({regX:0,regY:0,x:731.0201,y:701.6981},0).wait(1).to({x:729.2627,y:701.0424},0).wait(1).to({x:727.4995,y:700.4105},0).wait(1).to({x:725.7227,y:699.7906},0).wait(1).to({x:723.9467,y:699.1836},0).wait(1).to({x:722.1718,y:698.5871},0).wait(1).to({x:720.3924,y:697.9978},0).wait(1).to({x:718.6074,y:697.4143},0).wait(1).to({x:716.8218,y:696.8375},0).wait(1).to({x:715.0345,y:696.2665},0).wait(1).to({x:713.244,y:695.7005},0).wait(1).to({x:711.4521,y:695.1398},0).wait(1).to({x:709.6589,y:694.5841},0).wait(1).to({x:707.8607,y:694.032},0).wait(1).to({x:706.0674,y:693.4866},0).wait(1).to({x:704.2736,y:692.9459},0).wait(1).to({x:702.4767,y:692.4092},0).wait(1).to({x:700.6761,y:691.8761},0).wait(1).to({x:698.8725,y:691.3469},0).wait(1).to({x:697.0738,y:690.8239},0).wait(1).to({x:695.271,y:690.3042},0).wait(1).to({x:693.4662,y:689.7887},0).wait(1).to({x:691.6568,y:689.2765},0).wait(1).to({x:689.8549,y:688.7711},0).wait(1).to({x:688.0472,y:688.2687},0).wait(1).to({x:686.2354,y:687.7699},0).wait(1).to({x:684.4262,y:687.2766},0).wait(1).to({x:682.616,y:686.7877},0).wait(1).to({x:680.7633,y:686.2923},0).wait(1).to({x:678.9596,y:685.7987},0).wait(1).to({x:677.196,y:685.2052},0).wait(1).to({x:675.4694,y:684.4702},0).wait(1).to({x:673.822,y:683.5763},0).wait(1).to({x:672.2915,y:682.5025},0).wait(1).to({x:670.9214,y:681.2295},0).wait(1).to({x:669.7637,y:679.7502},0).wait(1).to({x:668.8783,y:678.1001},0).wait(1).to({x:668.2876,y:676.3218},0).wait(1).to({x:667.9861,y:674.4733},0).wait(1).to({x:667.9428,y:672.6016},0).wait(1).to({x:668.1179,y:670.7347},0).wait(1).to({x:668.4737,y:668.8895},0).wait(1).to({x:668.9766,y:667.0802},0).wait(1).to({x:669.6002,y:665.3089},0).wait(1).to({x:670.3236,y:663.5771},0).wait(1).to({x:671.1306,y:661.8839},0).wait(1).to({x:672.0088,y:660.2273},0).wait(1).to({x:672.9494,y:658.6042},0).wait(1).to({x:673.9438,y:657.014},0).wait(1).to({x:674.9868,y:655.4538},0).wait(1).to({x:676.0723,y:653.9238},0).wait(1).to({x:677.1966,y:652.4223},0).wait(1).to({x:678.3583,y:650.9456},0).wait(1).to({x:679.5519,y:649.4968},0).wait(1).to({x:680.776,y:648.0741},0).wait(1).to({x:682.0286,y:646.6771},0).wait(1).to({x:683.3096,y:645.3043},0).wait(1).to({x:684.616,y:643.9576},0).wait(1).to({x:685.9481,y:642.6361},0).wait(1).to({x:687.3063,y:641.3393},0).wait(1).to({x:688.6876,y:640.0704},0).wait(1).to({x:690.0938,y:638.829},0).wait(1).to({x:691.5243,y:637.6169},0).wait(1).to({x:692.9816,y:636.435},0).wait(1).to({x:694.4668,y:635.2857},0).wait(1).to({x:696.1955,y:634.7819},0).wait(1).to({x:698.1271,y:634.628},0).wait(1).to({x:700.0099,y:634.4325},0).wait(1).to({x:701.8663,y:634.1926},0).wait(1).to({x:703.7415,y:633.8926},0).wait(1).to({x:705.603,y:633.5134},0).wait(1).to({x:707.4248,y:632.9998},0).wait(1).to({x:709.009,y:632.1295},0).wait(1).to({x:708.1449,y:630.7657},0).wait(1).to({x:706.352,y:630.1218},0).wait(1).to({x:704.5516,y:629.665},0).wait(1).to({x:702.7122,y:629.277},0).wait(1).to({x:700.8622,y:628.9358},0).wait(1).to({x:699.0077,y:628.6279},0).wait(1).to({x:697.1524,y:628.3458},0).wait(1).to({x:695.2947,y:628.0837},0).wait(1).to({x:693.4354,y:627.8385},0).wait(1).to({x:691.5711,y:627.607},0).wait(1).to({x:689.7055,y:627.3881},0).wait(1).to({x:687.8403,y:627.1805},0).wait(1).to({x:685.9711,y:626.9828},0).wait(1).to({x:684.1042,y:626.7948},0).wait(1).to({x:682.2366,y:626.6158},0).wait(1).to({x:680.3639,y:626.4449},0).wait(1).to({x:678.4938,y:626.2827},0).wait(1).to({x:676.6205,y:626.1287},0).wait(1).to({x:674.7483,y:625.9836},0).wait(1).to({x:672.8756,y:625.8475},0).wait(1).to({x:671.0015,y:625.7215},0).wait(1).to({x:669.1258,y:625.6072},0).wait(1).to({x:667.2528,y:625.5077},0).wait(1).to({x:665.4028,y:625.4488},0).wait(1).to({x:663.5093,y:625.2598},0).wait(1).to({x:661.7467,y:624.6356},0).wait(1).to({x:660.4305,y:623.3458},0).wait(1).to({x:659.9498,y:621.559},0).wait(1).to({x:660.1278,y:619.6813},0).wait(1).to({x:660.6547,y:617.896},0).wait(1).to({x:661.3851,y:616.1696},0).wait(1).to({x:662.2446,y:614.5015},0).wait(1).to({x:663.1941,y:612.8812},0).wait(1).to({x:664.2103,y:611.302},0).wait(1).to({x:665.2788,y:609.7571},0).wait(1).to({x:666.3915,y:608.2396},0).wait(1).to({x:667.5398,y:606.7485},0).wait(1).to({x:668.7113,y:605.2901},0).wait(1).to({x:669.9127,y:603.849},0).wait(1).to({x:671.1384,y:602.4272},0).wait(1).to({x:672.3872,y:601.0224},0).wait(1).to({x:673.6537,y:599.6376},0).wait(1).to({x:674.9402,y:598.2684},0).wait(1).to({x:676.2426,y:596.9176},0).wait(1).to({x:677.5623,y:595.583},0).wait(1).to({x:678.897,y:594.2662},0).wait(1).to({x:680.2534,y:592.9611},0).wait(1).to({x:681.6235,y:591.676},0).wait(1).to({x:683.0092,y:590.4104},0).wait(1).to({x:684.4078,y:589.1685},0).wait(1).to({x:685.8302,y:587.9435},0).wait(1).to({x:685.7929,y:586.1158},0).wait(1).to({x:684.06,y:585.9172},0).wait(1).to({x:682.3297,y:586.6964},0).wait(1).to({x:680.6867,y:587.5867},0).wait(1).to({x:679.0157,y:588.4751},0).wait(1).to({x:677.2859,y:589.2618},0).wait(1).to({x:675.4732,y:589.7926},0).wait(1).to({x:673.6275,y:589.7338},0).wait(1).to({x:672.1658,y:588.7068},0).wait(1).to({x:671.3717,y:587.0664},0).wait(1).to({x:670.9941,y:585.083},0).wait(1).to({x:672.3825,y:578.0619},0).wait(1).to({x:674.0779,y:571.0908},0).wait(1).to({x:675.8248,y:564.1411},0).wait(1).to({x:677.5939,y:557.193},0).wait(1).to({x:679.3667,y:550.2457},0).wait(1).to({x:681.1226,y:543.2885},0).wait(1).to({x:682.7,y:536.3},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wave_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wave_5
	this.instance = new lib.wave5();
	this.instance.setTransform(672.9,714.95,1,1,0,0,0,10.7,1.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:2,y:715.05},0).wait(2).to({x:672.95},0).wait(1).to({x:673.05},0).wait(1).to({x:673.15,y:715.1},0).wait(1).to({x:673.3},0).wait(1).to({x:673.45,y:715.15},0).wait(1).to({x:673.6,y:715.2},0).wait(1).to({x:673.85},0).wait(1).to({x:674.1,y:715.25},0).wait(1).to({x:674.35,y:715.3},0).wait(1).to({x:674.7},0).wait(1).to({x:675,y:715.35},0).wait(1).to({x:675.35},0).wait(1).to({x:675.7},0).wait(1).to({x:676.1},0).wait(1).to({x:676.55},0).wait(1).to({x:677},0).wait(1).to({x:677.45,y:715.3},0).wait(1).to({x:677.95,y:715.25},0).wait(1).to({x:678.5,y:715.2},0).wait(1).to({x:679.05,y:715.15},0).wait(1).to({x:679.6,y:715.1},0).wait(1).to({x:680.25,y:715},0).wait(1).to({x:680.85,y:714.9},0).wait(1).to({x:681.5,y:714.75},0).wait(1).to({x:682.2,y:714.65},0).wait(1).to({x:682.85,y:714.5},0).wait(1).to({x:683.6,y:714.35},0).wait(1).to({x:684.3,y:714.15},0).wait(1).to({x:685.1,y:713.95},0).wait(1).to({x:685.85,y:713.75},0).wait(1).to({x:686.65,y:713.5},0).wait(1).to({x:687.5,y:713.25},0).wait(1).to({x:688.35,y:713},0).wait(1).to({x:689.2,y:712.7},0).wait(1).to({x:690.1,y:712.4},0).wait(1).to({x:691,y:712.1},0).wait(1).to({x:691.95,y:711.75},0).wait(1).to({x:692.9,y:711.4},0).wait(1).to({x:693.85,y:711},0).wait(1).to({x:694.85,y:710.6},0).wait(1).to({x:695.85,y:710.15},0).wait(1).to({x:696.9,y:709.7},0).wait(1).to({x:697.95,y:709.25},0).wait(1).to({x:699,y:708.75},0).wait(1).to({x:700.05,y:708.2},0).wait(1).to({x:701.15,y:707.65},0).wait(1).to({x:702.25,y:707.1},0).wait(1).to({x:703.4,y:706.5},0).wait(1).to({x:704.55,y:705.85},0).wait(1).to({x:705.7,y:705.2},0).wait(1).to({x:706.85,y:704.5},0).wait(1).to({x:708.05,y:703.8},0).wait(1).to({x:709.2,y:703.05},0).wait(1).to({x:710.4,y:702.3},0).wait(1).to({x:711.65,y:701.45},0).wait(1).to({x:712.85,y:700.65},0).wait(1).to({x:714.1,y:699.75},0).wait(1).to({x:715.35,y:698.85},0).wait(1).to({x:716.55,y:697.9},0).wait(1).to({x:717.85,y:696.95},0).wait(1).to({x:719.1,y:695.95},0).wait(1).to({x:720.35,y:694.9},0).wait(1).to({x:721.6,y:693.85},0).wait(1).to({x:722.9,y:692.7},0).wait(1).to({x:724.15,y:691.55},0).wait(1).to({x:725.4,y:690.4},0).wait(1).to({x:726.65,y:689.2},0).wait(1).to({x:727.9,y:687.95},0).wait(1).to({x:729.25,y:686.6},0).wait(1).to({x:730.5,y:685.25},0).wait(1).to({x:731.75,y:683.85},0).wait(1).to({x:733,y:682.4},0).wait(1).to({x:734.2,y:680.95},0).wait(1).to({x:735.45,y:679.4},0).wait(1).to({x:736.65,y:677.85},0).wait(1).to({x:737.8,y:676.25},0).wait(1).to({x:738.95,y:674.55},0).wait(1).to({x:740.05,y:672.85},0).wait(1).to({x:741.1,y:671.05},0).wait(1).to({x:742.1,y:669.2},0).wait(1).to({x:743.05,y:667.3},0).wait(1).to({x:743.9,y:665.35},0).wait(1).to({x:744.65,y:663.3},0).wait(1).to({x:745.3,y:661.2},0).wait(1).to({x:745.8,y:659},0).wait(1).to({x:746.1,y:656.8},0).wait(1).to({x:746.15,y:654.5},0).wait(1).to({x:745.85,y:652.2},0).wait(1).to({x:745.1,y:650},0).wait(1).to({x:743.65,y:648.2},0).wait(1).to({x:741.6,y:647.35},0).wait(1).to({x:739.25,y:646.55},0).wait(1).to({x:736.9,y:645.6},0).wait(1).to({x:734.8,y:644.5},0).wait(1).to({x:732.6,y:643.4},0).wait(1).to({x:730.35,y:642.3},0).wait(1).to({x:728,y:641.2},0).wait(1).to({x:725.7,y:640.1},0).wait(1).to({x:723.35,y:639},0).wait(1).to({x:720.95,y:637.9},0).wait(1).to({x:718.55,y:636.75},0).wait(1).to({x:716.25,y:635.4},0).wait(1).to({x:714.65,y:633.3},0).wait(1).to({x:713.75,y:630.75},0).wait(1).to({x:713.45,y:628},0).wait(1).to({x:713.6,y:625.25},0).wait(1).to({x:714.05,y:622.5},0).wait(1).to({x:714.75,y:619.75},0).wait(1).to({x:715.75,y:617.05},0).wait(1).to({x:717,y:614.45},0).wait(1).to({x:719.4,y:613.1},0).wait(1).to({x:721.9,y:611.5},0).wait(1).to({x:724.1,y:609.5},0).wait(1).to({x:726,y:607.2},0).wait(1).to({x:727.55,y:604.65},0).wait(1).to({x:728.65,y:601.85},0).wait(1).to({x:729.1,y:598.8},0).wait(1).to({x:728.9,y:595.75},0).wait(1).to({x:728,y:592.85},0).wait(1).to({x:726.75,y:589.95},0).wait(1).to({x:725.4,y:587.05},0).wait(1).to({x:723.85,y:584.3},0).wait(1).to({x:721.95,y:581.5},0).wait(1).to({x:719.9,y:579.25},0).wait(1).to({x:717.45,y:577.05},0).wait(1).to({x:714.8,y:575.1},0).wait(1).to({x:712.15,y:573.45},0).wait(1).to({x:710.65,y:570.4},0).wait(1).to({x:708.85,y:567.45},0).wait(1).to({x:706.85,y:564.7},0).wait(1).to({x:703.9,y:563.55},0).wait(1).to({x:700.95,y:561.85},0).wait(1).to({x:699.4,y:558.85},0).wait(1).to({x:699.55,y:555.3},0).wait(1).to({x:700.5,y:551.9},0).wait(1).to({x:701.45,y:548.5},0).wait(1).to({x:702.4,y:545.05},0).wait(1).to({x:703.4,y:541.6},0).wait(1).to({x:704.35,y:538.05},0).wait(1).to({x:704.8,y:536.45},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wave_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wave_4
	this.instance = new lib.wave4();
	this.instance.setTransform(447,702.4,1,1,0,0,0,20.6,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:-0.0003},0).wait(1).to({rotation:-0.0013,y:702.35},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-0.003,x:447.1},0).wait(1).to({scaleY:0.9998,rotation:-0.0054,x:447.2},0).wait(1).to({scaleY:0.9997,rotation:-0.0084,x:447.3,y:702.3},0).wait(1).to({scaleX:0.9998,scaleY:0.9996,rotation:-0.0121,x:447.5,y:702.25},0).wait(1).to({scaleX:0.9997,scaleY:0.9994,rotation:-0.0165,x:447.7,y:702.2},0).wait(1).to({scaleX:0.9996,scaleY:0.9992,rotation:-0.0215,x:448,y:702.15},0).wait(1).to({scaleX:0.9995,scaleY:0.999,rotation:-0.0272,x:448.35,y:702.05},0).wait(1).to({scaleX:0.9994,scaleY:0.9988,rotation:-0.0336,x:448.75,y:701.95},0).wait(1).to({scaleX:0.9993,scaleY:0.9985,rotation:-0.0407,x:449.25,y:701.85},0).wait(1).to({scaleX:0.9991,scaleY:0.9983,rotation:-0.0484,x:449.9,y:701.65},0).wait(1).to({scaleX:0.999,scaleY:0.998,rotation:-0.0568,x:450.35,y:701.55},0).wait(1).to({scaleX:0.9988,scaleY:0.9976,rotation:-0.0659,x:450.85,y:701.45},0).wait(1).to({scaleX:0.9987,scaleY:0.9973,rotation:-0.0756,x:451.4,y:701.25},0).wait(1).to({scaleX:0.9985,scaleY:0.9969,rotation:-0.0861,x:452.05,y:701.1},0).wait(1).to({scaleX:0.9983,scaleY:0.9965,rotation:-0.0971,x:452.75,y:700.9},0).wait(1).to({scaleX:0.9981,scaleY:0.9961,rotation:-0.109,x:453.45,y:700.75},0).wait(1).to({scaleX:0.9979,scaleY:0.9957,rotation:-0.1214,x:454.15,y:700.6},0).wait(1).to({scaleX:0.9976,scaleY:0.9952,rotation:-0.1345,x:454.95,y:700.4},0).wait(1).to({scaleX:0.9974,scaleY:0.9947,rotation:-0.1483,x:455.85,y:700.2},0).wait(1).to({scaleX:0.9971,scaleY:0.9942,rotation:-0.1628,x:456.7,y:700},0).wait(1).to({scaleX:0.9969,scaleY:0.9936,rotation:-0.1779,x:457.6,y:699.75},0).wait(1).to({scaleX:0.9966,scaleY:0.9931,rotation:-0.1937,x:458.6,y:699.45},0).wait(1).to({scaleX:0.9963,scaleY:0.9925,rotation:-0.2102,x:459.5,y:699.2},0).wait(1).to({scaleX:0.996,scaleY:0.9919,rotation:-0.2273,x:460.55,y:698.95},0).wait(1).to({scaleX:0.9957,scaleY:0.9912,rotation:-0.2451,x:461.65,y:698.65},0).wait(1).to({scaleX:0.9953,scaleY:0.9906,rotation:-0.2636,x:462.75,y:698.4},0).wait(1).to({scaleX:0.995,scaleY:0.9899,rotation:-0.2828,x:463.9,y:698.1},0).wait(1).to({scaleX:0.9946,scaleY:0.9892,rotation:-0.3027,x:465.1,y:697.85},0).wait(1).to({scaleX:0.9943,scaleY:0.9884,rotation:-0.3232,x:466.35,y:697.55},0).wait(1).to({scaleX:0.9939,scaleY:0.9877,rotation:-0.3444,x:467.6,y:697.25},0).wait(1).to({scaleX:0.9935,scaleY:0.9869,rotation:-0.3662,x:468.9,y:696.85},0).wait(1).to({scaleX:0.9931,scaleY:0.9861,rotation:-0.3887,x:470.25,y:696.55},0).wait(1).to({scaleX:0.9927,scaleY:0.9853,rotation:-0.4119,x:471.7,y:696.2},0).wait(1).to({scaleX:0.9923,scaleY:0.9844,rotation:-0.4358,x:473.15,y:695.85},0).wait(1).to({scaleX:0.9919,scaleY:0.9835,rotation:-0.4603,x:474.6,y:695.5},0).wait(1).to({scaleX:0.9914,scaleY:0.9826,rotation:-0.4856,x:476.1,y:695.15},0).wait(1).to({scaleX:0.9909,scaleY:0.9817,rotation:-0.5115,x:477.65,y:694.7},0).wait(1).to({scaleX:0.9905,scaleY:0.9807,rotation:-0.5381,x:479.25,y:694.3},0).wait(1).to({scaleX:0.99,scaleY:0.9798,rotation:-0.5653,x:480.9,y:693.9},0).wait(1).to({scaleX:0.9895,scaleY:0.9788,rotation:-0.5932,x:482.6,y:693.45},0).wait(1).to({scaleX:0.989,scaleY:0.9777,rotation:-0.6218,x:484.25,y:693.05},0).wait(1).to({scaleX:0.9885,scaleY:0.9767,rotation:-0.651,x:486,y:692.55},0).wait(1).to({scaleX:0.9879,scaleY:0.9756,rotation:-0.681,x:487.85,y:692.15},0).wait(1).to({scaleX:0.9874,scaleY:0.9745,rotation:-0.7116,x:489.65,y:691.7},0).wait(1).to({scaleX:0.9868,scaleY:0.9734,rotation:-0.7429,x:491.55,y:691.25},0).wait(1).to({scaleX:0.9862,scaleY:0.9722,rotation:-0.7748,x:493.45,y:690.75},0).wait(1).to({scaleX:0.9857,scaleY:0.9711,rotation:-0.8074,x:495.4,y:690.25},0).wait(1).to({scaleX:0.9851,scaleY:0.9699,rotation:-0.8407,x:497.4,y:689.75},0).wait(1).to({scaleX:0.9845,scaleY:0.9686,rotation:-0.8747,x:499.45,y:689.25},0).wait(1).to({scaleX:0.9839,scaleY:0.9674,rotation:-0.9093,x:501.5,y:688.75},0).wait(1).to({scaleX:0.9832,scaleY:0.9661,rotation:-0.9446,x:503.65,y:688.2},0).wait(1).to({scaleX:0.9826,scaleY:0.9649,rotation:-0.9806,x:505.8,y:687.65},0).wait(1).to({scaleX:0.982,scaleY:0.9635,rotation:-1.0173,x:507.95,y:687.1},0).wait(1).to({scaleX:0.9813,scaleY:0.9622,rotation:-1.0546,x:510.2,y:686.55},0).wait(1).to({scaleX:0.9806,scaleY:0.9608,rotation:-1.0926,x:512.5,y:685.95},0).wait(1).to({scaleX:0.9799,scaleY:0.9595,rotation:-1.1313,x:514.85,y:685.4},0).wait(1).to({scaleX:0.9792,scaleY:0.9581,rotation:-1.1706,x:517.2,y:684.8},0).wait(1).to({scaleX:0.9785,scaleY:0.9566,rotation:-1.2107,x:519.8,y:684.15},0).wait(1).to({scaleX:0.9778,scaleY:0.9552,rotation:-1.2513,x:522.05,y:683.95},0).wait(1).to({scaleX:0.9771,scaleY:0.9537,rotation:-1.2927,x:521.55,y:686.15},0).wait(1).to({scaleX:0.9763,scaleY:0.9522,rotation:-1.3347,x:521.25,y:688.9},0).wait(1).to({scaleX:0.9756,scaleY:0.9506,rotation:-1.3775,x:521.2,y:691.6},0).wait(1).to({scaleX:0.9748,scaleY:0.9491,rotation:-1.4208,x:521.5,y:694.4},0).wait(1).to({scaleX:0.974,scaleY:0.9475,rotation:-1.4649,x:522.45,y:696.7},0).wait(1).to({scaleX:0.9732,scaleY:0.9459,rotation:-1.5096,x:524.95,y:697.9},0).wait(1).to({scaleX:0.9724,scaleY:0.9443,rotation:-1.555,x:527.7,y:698.35},0).wait(1).to({scaleX:0.9716,scaleY:0.9426,rotation:-1.6011,x:530.55,y:698.3},0).wait(1).to({scaleX:0.9708,scaleY:0.9409,rotation:-1.6478,x:533.45,y:697.85},0).wait(1).to({scaleX:0.9699,scaleY:0.9392,rotation:-1.6952,x:536.2,y:697.1},0).wait(1).to({scaleX:0.9691,scaleY:0.9375,rotation:-1.7434,x:539.7,y:695.8},0).wait(1).to({scaleX:0.9682,scaleY:0.9358,rotation:-1.7921,x:541.85,y:695},0).wait(1).to({scaleX:0.9673,scaleY:0.934,rotation:-1.8415,x:544.75,y:693.95},0).wait(1).to({scaleX:0.9664,scaleY:0.9322,rotation:-1.8916,x:547.75,y:693.1},0).wait(1).to({scaleX:0.9655,scaleY:0.9304,rotation:-1.9424,x:550.8,y:692.3},0).wait(1).to({scaleX:0.9646,scaleY:0.9285,rotation:-1.9939,x:553.85,y:691.5},0).wait(1).to({scaleX:0.9637,scaleY:0.9267,rotation:-2.046,x:557,y:690.75},0).wait(1).to({scaleX:0.9628,scaleY:0.9248,rotation:-2.0988,x:560.15,y:689.95},0).wait(1).to({scaleX:0.9618,scaleY:0.9229,rotation:-2.1523,x:563.4,y:689.2},0).wait(1).to({scaleX:0.9609,scaleY:0.9209,rotation:-2.2064,x:566.75,y:688.5},0).wait(1).to({scaleX:0.9599,scaleY:0.919,rotation:-2.2612,x:570,y:687.75},0).wait(1).to({scaleX:0.9589,scaleY:0.917,rotation:-2.3167,x:573.4,y:687.05},0).wait(1).to({scaleX:0.9579,scaleY:0.915,rotation:-2.3729,x:576.75,y:686.35},0).wait(1).to({scaleX:0.9569,scaleY:0.9129,rotation:-2.4297,x:580.25,y:685.6},0).wait(1).to({scaleX:0.9559,scaleY:0.9108,rotation:-2.4872,x:583.7,y:684.95},0).wait(1).to({scaleX:0.9548,scaleY:0.9088,rotation:-2.5454,x:587.25,y:684.25},0).wait(1).to({scaleX:0.9538,scaleY:0.9066,rotation:-2.6042,x:590.85,y:683.55},0).wait(1).to({scaleX:0.9527,scaleY:0.9045,rotation:-2.6638,x:594.4,y:682.9},0).wait(1).to({scaleX:0.9516,scaleY:0.9023,rotation:-2.724,x:598.25,y:682.2},0).wait(1).to({scaleX:0.9506,scaleY:0.9002,rotation:-2.7848,x:600.65,y:680.45},0).wait(1).to({scaleX:0.9495,scaleY:0.898,rotation:-2.8464,x:602.15,y:676.9},0).wait(1).to({scaleX:0.9484,scaleY:0.8957,rotation:-2.9086,x:603.85,y:673.35},0).wait(1).to({scaleX:0.9473,scaleY:0.8935,rotation:-2.9715,x:605.7,y:669.95},0).wait(1).to({scaleX:0.9461,scaleY:0.8912,rotation:-3.0351,x:607.65,y:666.55},0).wait(1).to({scaleX:0.945,scaleY:0.8889,rotation:-3.0993,x:609.75,y:663.15},0).wait(1).to({scaleX:0.9438,scaleY:0.8866,rotation:-3.1642,x:611.95,y:659.8},0).wait(1).to({scaleX:0.9427,scaleY:0.8842,rotation:-3.2298,x:614.25,y:656.45},0).wait(1).to({scaleX:0.9415,scaleY:0.8819,rotation:-3.296,x:616.65,y:653.1},0).wait(1).to({scaleX:0.9403,scaleY:0.8795,rotation:-3.363,x:619.15,y:649.75},0).wait(1).to({scaleX:0.9391,scaleY:0.877,rotation:-3.4306,x:621.7,y:646.5},0).wait(1).to({scaleX:0.9379,scaleY:0.8746,rotation:-3.4988,x:624.45,y:643.25},0).wait(1).to({scaleX:0.9367,scaleY:0.8721,rotation:-3.5677,x:627.3,y:640.1},0).wait(1).to({scaleX:0.9354,scaleY:0.8696,rotation:-3.6374,x:630.3,y:637},0).wait(1).to({scaleX:0.9342,scaleY:0.8671,rotation:-3.7077,x:633.4,y:633.95},0).wait(1).to({scaleX:0.9329,scaleY:0.8646,rotation:-3.7786,x:636.7,y:631.05},0).wait(1).to({scaleX:0.9317,scaleY:0.862,rotation:-3.8502,x:640.15,y:628.3},0).wait(1).to({scaleX:0.9304,scaleY:0.8594,rotation:-3.9225,x:643.75,y:625.75},0).wait(1).to({scaleX:0.9291,scaleY:0.8568,rotation:-3.9955,x:647.65,y:623.4},0).wait(1).to({scaleX:0.9278,scaleY:0.8541,rotation:-4.0692,x:651.75,y:621.4},0).wait(1).to({scaleX:0.9265,scaleY:0.8515,rotation:-4.1435,x:656.1,y:619.85},0).wait(1).to({scaleX:0.9251,scaleY:0.8488,rotation:-4.2185,x:659.85,y:621.7},0).wait(1).to({scaleX:0.9238,scaleY:0.8461,rotation:-4.2942,x:663.55,y:624.7},0).wait(1).to({scaleX:0.9224,scaleY:0.8433,rotation:-4.3705,x:667.35,y:627.45},0).wait(1).to({scaleX:0.9211,scaleY:0.8406,rotation:-4.4475,x:671.35,y:630},0).wait(1).to({scaleX:0.9197,scaleY:0.8378,rotation:-4.5252,x:675.6,y:632.3},0).wait(1).to({scaleX:0.9183,scaleY:0.835,rotation:-4.6035,x:680,y:634.35},0).wait(1).to({scaleX:0.9169,scaleY:0.8321,rotation:-4.6826,x:684.65,y:635.8},0).wait(1).to({scaleX:0.9155,scaleY:0.8293,rotation:-4.7623,x:689.55,y:636.45},0).wait(1).to({scaleX:0.9141,scaleY:0.8264,rotation:-4.8427,x:694.35,y:635.35},0).wait(1).to({scaleX:0.9126,scaleY:0.8235,rotation:-4.9237,x:697.85,y:631.95},0).wait(1).to({scaleX:0.9112,scaleY:0.8206,rotation:-5.0054,x:700.2,y:627.7},0).wait(1).to({scaleX:0.9097,scaleY:0.8176,rotation:-5.0878,x:704.1,y:624.35},0).wait(1).to({scaleX:0.9082,scaleY:0.8146,rotation:-5.1709,x:708.1,y:620.95},0).wait(1).to({scaleX:0.9067,scaleY:0.8116,rotation:-5.2546,x:712.15,y:617.7},0).wait(1).to({scaleX:0.9052,scaleY:0.8086,rotation:-5.3391,x:716,y:614.25},0).wait(1).to({scaleX:0.9037,scaleY:0.8055,rotation:-5.4241,x:716.45,y:609.2},0).wait(1).to({scaleX:0.9022,scaleY:0.8025,rotation:-5.5099,x:714.4,y:604.25},0).wait(1).to({scaleX:0.9007,scaleY:0.7994,rotation:-5.5963,x:711.2,y:599.85},0).wait(1).to({scaleX:0.8991,scaleY:0.7963,rotation:-5.6834,x:707.1,y:596.65},0).wait(1).to({scaleX:0.8976,scaleY:0.7931,rotation:-5.7712,x:702.6,y:593.55},0).wait(1).to({scaleX:0.896,scaleY:0.79,rotation:-5.8596,x:698.25,y:590.15},0).wait(1).to({scaleX:0.8944,scaleY:0.7868,rotation:-5.9487,x:694.15,y:586.35},0).wait(1).to({scaleX:0.8928,scaleY:0.7835,rotation:-6.0385,x:690.95,y:581.65},0).wait(1).to({scaleX:0.8912,scaleY:0.7803,rotation:-6.129,x:695.05,y:579.85},0).wait(1).to({scaleX:0.8896,scaleY:0.777,rotation:-6.2201,x:700.85,y:580.2},0).wait(1).to({scaleX:0.888,scaleY:0.7737,rotation:-6.3119,x:707.25,y:581.05},0).wait(1).to({scaleX:0.8863,scaleY:0.7704,rotation:-6.4044,x:710.4,y:577.5},0).wait(1).to({scaleX:0.8847,scaleY:0.7671,rotation:-6.4976,x:712,y:571.95},0).wait(1).to({scaleX:0.883,scaleY:0.7637,rotation:-6.5914,x:712.95,y:566.15},0).wait(1).to({scaleX:0.8813,scaleY:0.7603,rotation:-6.6859,x:713.65,y:560.3},0).wait(1).to({scaleX:0.8797,scaleY:0.7569,rotation:-6.7811,x:714.05,y:554.45},0).wait(1).to({scaleX:0.8779,scaleY:0.7535,rotation:-6.8769,x:714.25,y:548.55},0).wait(1).to({scaleX:0.8762,scaleY:0.75,rotation:-6.9735,x:714.3,y:542.55},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wave_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wave_3
	this.instance = new lib.wave3();
	this.instance.setTransform(1028.05,706.4,1,1,0,0,0,15.1,5.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:1028,y:706.35},0).wait(1).to({x:1027.9,y:706.3},0).wait(1).to({x:1027.75,y:706.2},0).wait(1).to({x:1027.55,y:706.1},0).wait(1).to({x:1027.3,y:705.95},0).wait(1).to({x:1026.95,y:705.75},0).wait(1).to({x:1026.55,y:705.55},0).wait(1).to({x:1026.1,y:705.3},0).wait(1).to({x:1025.6,y:705.05},0).wait(1).to({x:1025.05,y:704.75},0).wait(1).to({x:1024.4,y:704.45},0).wait(1).to({x:1023.75,y:704.15},0).wait(1).to({x:1022.95,y:703.8},0).wait(1).to({x:1022.1,y:703.45},0).wait(1).to({x:1021.2,y:703.1},0).wait(1).to({x:1020.25,y:702.75},0).wait(1).to({x:1019.2,y:702.4},0).wait(1).to({x:1018.05,y:702.05},0).wait(1).to({x:1016.85,y:701.75},0).wait(1).to({x:1015.6,y:701.5},0).wait(1).to({x:1014.3,y:701.3},0).wait(1).to({x:1012.85,y:701.15},0).wait(1).to({x:1011.35,y:701.1},0).wait(1).to({x:1009.8},0).wait(1).to({x:1008.2,y:701.25},0).wait(1).to({x:1006.5,y:701.55},0).wait(1).to({x:1004.8,y:702},0).wait(1).to({x:1003.1,y:702.6},0).wait(1).to({x:1001.35,y:703.35},0).wait(1).to({x:999.65,y:704.3},0).wait(1).to({x:997.95,y:705.4},0).wait(1).to({x:996.55,y:706.35},0).wait(1).to({x:995.5,y:706.05},0).wait(1).to({x:993.65,y:705.6},0).wait(1).to({x:992.3,y:705.3},0).wait(1).to({x:990.65,y:704.95},0).wait(1).to({x:989.15,y:704.65},0).wait(1).to({x:987.5,y:704.3},0).wait(1).to({x:985.9,y:703.95},0).wait(1).to({x:984.2,y:703.6},0).wait(1).to({x:982.45,y:703.25},0).wait(1).to({x:980.7,y:702.9},0).wait(1).to({x:978.85,y:702.55},0).wait(1).to({x:977,y:702.25},0).wait(1).to({x:975.1,y:701.9},0).wait(1).to({x:973.15,y:701.55},0).wait(1).to({x:971.15,y:701.2},0).wait(1).to({x:969.1,y:700.9},0).wait(1).to({x:966.8,y:700.5},0).wait(1).to({x:964.65,y:700.2},0).wait(1).to({x:962.75,y:700},0).wait(1).to({x:960.6,y:699.85},0).wait(1).to({x:958.3,y:699.65},0).wait(1).to({x:955.95,y:699.5},0).wait(1).to({x:953.6,y:699.35},0).wait(1).to({x:951.15,y:699.2},0).wait(1).to({x:948.7,y:699.05},0).wait(1).to({x:946.2,y:698.95},0).wait(1).to({x:943.65,y:698.85},0).wait(1).to({x:941.05,y:698.75},0).wait(1).to({x:938.45,y:698.65},0).wait(1).to({x:935.75,y:698.6},0).wait(1).to({x:933.05,y:698.55},0).wait(1).to({x:930.3},0).wait(1).to({x:927.5},0).wait(1).to({x:924.65,y:698.6},0).wait(1).to({x:921.75,y:698.7},0).wait(1).to({x:918.85,y:698.85},0).wait(1).to({x:915.85,y:699.1},0).wait(1).to({x:912.9,y:699.4},0).wait(1).to({x:910.1,y:700.1},0).wait(1).to({x:906.85,y:700.85},0).wait(1).to({x:903.8,y:701.5},0).wait(1).to({x:900.65,y:701.7},0).wait(1).to({x:897.4,y:701.55},0).wait(1).to({x:894.15,y:701.2},0).wait(1).to({x:890.8,y:700.7},0).wait(1).to({x:887.45,y:700.05},0).wait(1).to({x:884.1,y:699.3},0).wait(1).to({x:880.9,y:699.75},0).wait(1).to({x:877.45,y:700.5},0).wait(1).to({x:873.9,y:701.1},0).wait(1).to({x:870.3,y:701.5},0).wait(1).to({x:866.65,y:701.6},0).wait(1).to({x:863.15,y:701.2},0).wait(1).to({x:859.65,y:699.85},0).wait(1).to({x:856.1,y:698.1},0).wait(1).to({x:852.7,y:696.15},0).wait(1).to({x:849.3,y:695.75},0).wait(1).to({x:845.4,y:695.55},0).wait(1).to({x:841.45,y:695.2},0).wait(1).to({x:837.5,y:694.8},0).wait(1).to({x:833.5,y:694.25},0).wait(1).to({x:829.45,y:693.65},0).wait(1).to({x:825.4,y:692.85},0).wait(1).to({x:821.95,y:692},0).wait(1).to({x:817.3,y:689.8},0).wait(1).to({x:815.6,y:686.4},0).wait(1).to({x:817,y:682.85},0).wait(1).to({x:814.95,y:679.05},0).wait(1).to({x:812.55,y:675.35},0).wait(1).to({x:809.9,y:671.8},0).wait(1).to({x:807.1,y:668.4},0).wait(1).to({x:803.8,y:664.75},0).wait(1).to({x:800.95,y:662.2},0).wait(1).to({x:796.8,y:659.55},0).wait(1).to({x:792.8,y:657.3},0).wait(1).to({x:788.6,y:655.2},0).wait(1).to({x:784.25,y:653.3},0).wait(1).to({x:779.8,y:651.65},0).wait(1).to({x:775.5,y:649.9},0).wait(1).to({x:770.95,y:647.85},0).wait(1).to({x:766.55,y:645.55},0).wait(1).to({x:762.3,y:642.45},0).wait(1).to({x:758.7,y:640},0).wait(1).to({x:754.15,y:638},0).wait(1).to({x:749.05,y:636.1},0).wait(1).to({x:744.4,y:634.75},0).wait(1).to({x:739.35,y:633.6},0).wait(1).to({x:734.25,y:632.6},0).wait(1).to({x:729.1,y:631.7},0).wait(1).to({x:723.85,y:630.9},0).wait(1).to({x:718.6,y:630.1},0).wait(1).to({x:713.25,y:629.35},0).wait(1).to({x:707.55,y:628.7},0).wait(1).to({x:708.3,y:624.5},0).wait(1).to({x:706.25,y:619.7},0).wait(1).to({x:700.8,y:617.7},0).wait(1).to({x:695.6,y:617.3},0).wait(1).to({x:689.8,y:616.9},0).wait(1).to({x:684.05,y:615.45},0).wait(1).to({x:680.8,y:611.4},0).wait(1).to({x:679.35,y:605.85},0).wait(1).to({x:679.2,y:600.1},0).wait(1).to({x:679.6,y:594.25},0).wait(1).to({x:680.4,y:588.4},0).wait(1).to({x:681.45,y:582.6},0).wait(1).to({x:682.65,y:576.75},0).wait(1).to({x:684.05,y:570.9},0).wait(1).to({x:685.55,y:565},0).wait(1).to({x:687.15,y:559.15},0).wait(1).to({x:688.85,y:553.25},0).wait(1).to({x:690.6,y:547.3},0).wait(1).to({x:692.5,y:541.35},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wave_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wave
	this.instance = new lib.wave7();
	this.instance.setTransform(743.75,656.55,1,1,0,0,0,31.3,5.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).wait(1).to({x:744.75,y:656.2},0).wait(1).to({x:745.75,y:655.85},0).wait(1).to({x:746.75,y:655.4},0).wait(1).to({x:747.7,y:654.95},0).wait(1).to({x:748.7,y:654.45},0).wait(1).to({x:749.6,y:653.9},0).wait(1).to({x:750.5,y:653.3},0).wait(1).to({x:751.3,y:652.65},0).wait(1).to({x:752.05,y:651.85},0).wait(1).to({x:752.7,y:651},0).wait(1).to({x:753.3,y:650.1},0).wait(1).to({x:753.9,y:649.2},0).wait(1).to({x:754.5,y:648.3},0).wait(1).to({x:755.05,y:647.4},0).wait(1).to({x:755.6,y:646.45},0).wait(1).to({x:756.1,y:645.5},0).wait(1).to({x:756.6,y:644.55},0).wait(1).to({x:757.05,y:643.55},0).wait(1).to({x:757.45,y:642.55},0).wait(1).to({x:757.6,y:641.5},0).wait(1).to({x:757.35,y:640.5},0).wait(1).to({x:756.95,y:639.5},0).wait(1).to({x:756.45,y:638.55},0).wait(1).to({x:755.85,y:637.6},0).wait(1).to({x:755.25,y:636.75},0).wait(1).to({x:754.6,y:635.85},0).wait(1).to({x:753.95,y:635.05},0).wait(1).to({x:753.25,y:634.2},0).wait(1).to({x:752.55,y:633.4},0).wait(1).to({x:751.85,y:632.55},0).wait(1).to({x:751.1,y:631.8},0).wait(1).to({x:750.4,y:631},0).wait(1).to({x:749.65,y:630.2},0).wait(1).to({x:748.9,y:629.45},0).wait(1).to({x:748.15,y:628.7},0).wait(1).to({x:747.35,y:627.9},0).wait(1).to({x:746.6,y:627.15},0).wait(1).to({x:745.8,y:626.45},0).wait(1).to({x:745.05,y:625.7},0).wait(1).to({x:744.25,y:624.95},0).wait(1).to({x:743.45,y:624.25},0).wait(1).to({x:742.65,y:623.5},0).wait(1).to({x:741.85,y:622.8},0).wait(1).to({x:741.05,y:622.1},0).wait(1).to({x:740.2,y:621.4},0).wait(1).to({x:739.4,y:620.7},0).wait(1).to({x:738.55,y:620},0).wait(1).to({x:737.7,y:619.35},0).wait(1).to({x:737.05,y:618.6},0).wait(1).to({x:736.85,y:617.55},0).wait(1).to({x:736.5,y:616.5},0).wait(1).to({x:736.1,y:615.5},0).wait(1).to({x:735.65,y:614.55},0).wait(1).to({x:735.2,y:613.55},0).wait(1).to({x:734.7,y:612.6},0).wait(1).to({x:734.2,y:611.65},0).wait(1).to({x:733.65,y:610.7},0).wait(1).to({x:733.1,y:609.8},0).wait(1).to({x:732.55,y:608.9},0).wait(1).to({x:731.95,y:608},0).wait(1).to({x:731.3,y:607.1},0).wait(1).to({x:730.7,y:606.25},0).wait(1).to({x:729.95,y:605.3},0).wait(1).to({x:729.35,y:604.55},0).wait(1).to({x:728.75,y:603.7},0).wait(1).to({x:728.15,y:602.8},0).wait(1).to({x:727.55,y:601.85},0).wait(1).to({x:727,y:600.95},0).wait(1).to({x:726.5,y:600},0).wait(1).to({x:725.95,y:599.1},0).wait(1).to({x:725.45,y:598.15},0).wait(1).to({x:724.95,y:597.2},0).wait(1).to({x:724.45,y:596.2},0).wait(1).to({x:724,y:595.25},0).wait(1).to({x:723.55,y:594.25},0).wait(1).to({x:722.95,y:593.4},0).wait(1).to({x:722.15,y:592.65},0).wait(1).to({x:721.35,y:591.95},0).wait(1).to({x:720.5,y:591.3},0).wait(1).to({x:719.6,y:590.7},0).wait(1).to({x:718.7,y:590.1},0).wait(1).to({x:717.75,y:589.6},0).wait(1).to({x:716.8,y:589.1},0).wait(1).to({x:715.85,y:588.65},0).wait(1).to({x:714.85,y:588.2},0).wait(1).to({x:713.85,y:587.8},0).wait(1).to({x:712.8,y:587.5},0).wait(1).to({x:711.8,y:587.2},0).wait(1).to({x:710.7,y:586.9},0).wait(1).to({x:709.7,y:586.7},0).wait(1).to({x:709.05,y:585.85},0).wait(1).to({x:708.35,y:585.05},0).wait(1).to({x:707.55,y:584.3},0).wait(1).to({x:706.75,y:583.55},0).wait(1).to({x:705.95,y:582.85},0).wait(1).to({x:705.1,y:582.2},0).wait(1).to({x:704.25,y:581.55},0).wait(1).to({x:703.35,y:580.95},0).wait(1).to({x:702.4,y:580.4},0).wait(1).to({x:701.5,y:579.85},0).wait(1).to({x:700.55,y:579.35},0).wait(1).to({x:699.55,y:578.9},0).wait(1).to({x:698.55,y:578.5},0).wait(1).to({x:697.6,y:578.1},0).wait(1).to({x:696.6,y:577.6},0).wait(1).to({x:695.7,y:577.1},0).wait(1).to({x:694.75,y:576.5},0).wait(1).to({x:693.85,y:575.9},0).wait(1).to({x:693,y:575.3},0).wait(1).to({x:692.15,y:574.6},0).wait(1).to({x:691.35,y:573.9},0).wait(1).to({x:690.6,y:573.1},0).wait(1).to({x:689.95,y:572.25},0).wait(1).to({x:689.35,y:571.35},0).wait(1).to({x:689,y:570.35},0).wait(1).to({x:688.95,y:569.3},0).wait(1).to({x:688.65,y:568.3},0).wait(1).to({x:688.1,y:567.35},0).wait(1).to({x:687.65,y:566.35},0).wait(1).to({x:687.3,y:565.35},0).wait(1).to({x:686.95,y:564.35},0).wait(1).to({x:686.7,y:563.3},0).wait(1).to({x:686.45,y:562.2},0).wait(1).to({y:561.2},0).wait(1).to({x:686.85,y:560.2},0).wait(1).to({x:687.35,y:559.25},0).wait(1).to({x:688,y:558.35},0).wait(1).to({x:688.65,y:557.55},0).wait(1).to({x:689.4,y:556.75},0).wait(1).to({x:690.2,y:556},0).wait(1).to({x:691,y:555.3},0).wait(1).to({x:691.8,y:554.6},0).wait(1).to({x:692.7,y:553.95},0).wait(1).to({x:693.6,y:553.4},0).wait(1).to({x:1049.65,y:682.5},0).wait(1).to({x:1405.75,y:811.6},0).wait(1).to({x:1761.85,y:940.75},0).wait(1).to({x:2117.95,y:1069.85},0).wait(1).to({x:2474.05,y:1199},0).wait(1).to({x:2830.15,y:1328.1},0).wait(1).to({x:3186.2,y:1457.25},0).wait(1).to({x:3542.3,y:1586.35},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wave = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wave
	this.instance = new lib.wave();
	this.instance.setTransform(871.95,671,1,1,0,0,0,29.8,6.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.9967,scaleY:0.9971,x:871.3,y:670.9},0).wait(1).to({scaleX:0.9934,scaleY:0.9941,x:870.7,y:670.75},0).wait(1).to({scaleX:0.9901,scaleY:0.9911,x:870.1,y:670.65},0).wait(1).to({scaleX:0.9867,scaleY:0.988,x:869.5,y:670.55},0).wait(1).to({scaleX:0.9832,scaleY:0.9849,x:868.85,y:670.5},0).wait(1).to({scaleX:0.9798,scaleY:0.9818,x:868.25,y:670.4},0).wait(1).to({scaleX:0.9763,scaleY:0.9787,x:867.6,y:670.3},0).wait(1).to({scaleX:0.9727,scaleY:0.9755,x:867,y:670.25},0).wait(1).to({scaleX:0.9691,scaleY:0.9722,x:866.35,y:670.15},0).wait(1).to({scaleX:0.9655,scaleY:0.969,x:865.65},0).wait(1).to({scaleX:0.9618,scaleY:0.9657,x:864.95,y:670.05},0).wait(1).to({scaleX:0.9581,scaleY:0.9624,x:864.35},0).wait(1).to({scaleX:0.9544,scaleY:0.959,x:863.65,y:670},0).wait(1).to({scaleX:0.9506,scaleY:0.9556,x:862.95,y:669.95},0).wait(1).to({scaleX:0.9468,scaleY:0.9522,x:862.25},0).wait(1).to({scaleX:0.9429,scaleY:0.9487,x:861.55},0).wait(1).to({scaleX:0.939,scaleY:0.9452,x:860.85},0).wait(1).to({scaleX:0.9351,scaleY:0.9417,x:860.1},0).wait(1).to({scaleX:0.9311,scaleY:0.9381,x:859.4,y:670},0).wait(1).to({scaleX:0.9271,scaleY:0.9345,x:858.7,y:670.05},0).wait(1).to({scaleX:0.9231,scaleY:0.9309,x:857.9,y:670.1},0).wait(1).to({scaleX:0.919,scaleY:0.9272,x:857.2,y:670.15},0).wait(1).to({scaleX:0.9149,scaleY:0.9235,x:856.45,y:670.3},0).wait(1).to({scaleX:0.9107,scaleY:0.9197,x:855.7,y:670.4},0).wait(1).to({scaleX:0.9065,scaleY:0.916,x:854.9,y:670.55},0).wait(1).to({scaleX:0.9023,scaleY:0.9122,x:854.2,y:670.7},0).wait(1).to({scaleX:0.898,scaleY:0.9083,x:853.4,y:670.9},0).wait(1).to({scaleX:0.8937,scaleY:0.9044,x:852.65,y:671.05},0).wait(1).to({scaleX:0.8893,scaleY:0.9005,x:851.9,y:671.35},0).wait(1).to({scaleX:0.8849,scaleY:0.8966,x:851.1,y:671.55},0).wait(1).to({scaleX:0.8805,scaleY:0.8926,x:850.4,y:671.85},0).wait(1).to({scaleX:0.876,scaleY:0.8886,x:849.6,y:672.15},0).wait(1).to({scaleX:0.8715,scaleY:0.8845,x:848.85,y:672.5},0).wait(1).to({scaleX:0.867,scaleY:0.8804,x:848.15,y:672.85},0).wait(1).to({scaleX:0.8624,scaleY:0.8763,x:847.4,y:673.25},0).wait(1).to({scaleX:0.8577,scaleY:0.8721,x:846.65,y:673.65},0).wait(1).to({scaleX:0.8531,scaleY:0.8679,x:845.9,y:674.05},0).wait(1).to({scaleX:0.8484,scaleY:0.8637,x:845.2,y:674.55},0).wait(1).to({scaleX:0.8436,scaleY:0.8595,x:844.45,y:675},0).wait(1).to({scaleX:0.8389,scaleY:0.8552,x:843.7,y:675.5},0).wait(1).to({scaleX:0.834,scaleY:0.8508,x:842.95,y:675.95},0).wait(1).to({scaleX:0.8292,scaleY:0.8465,x:842.2,y:676.4},0).wait(1).to({scaleX:0.8243,scaleY:0.8421,x:841.45,y:676.85},0).wait(1).to({scaleX:0.8193,scaleY:0.8376,x:840.65,y:677.25},0).wait(1).to({scaleX:0.8144,scaleY:0.8332,x:839.8,y:677.65},0).wait(1).to({scaleX:0.8094,scaleY:0.8286,x:838.95,y:677.95},0).wait(1).to({scaleX:0.8043,scaleY:0.8241,x:838.05,y:678.15},0).wait(1).to({scaleX:0.7992,scaleY:0.8195,x:837.15,y:678.35},0).wait(1).to({scaleX:0.7941,scaleY:0.8149,x:836.2},0).wait(1).to({scaleX:0.7889,scaleY:0.8103,x:835.25,y:678.3},0).wait(1).to({scaleX:0.7837,scaleY:0.8056,x:834.35,y:678.15},0).wait(1).to({scaleX:0.7785,scaleY:0.8009,x:833.7,y:676.9},0).wait(1).to({scaleX:0.7732,scaleY:0.7961,x:832.8,y:675.2},0).wait(1).to({scaleX:0.7679,scaleY:0.7914,x:831.85,y:673.55},0).wait(1).to({scaleX:0.7625,scaleY:0.7865,x:830.75,y:671.95},0).wait(1).to({scaleX:0.7571,scaleY:0.7817,x:829.65,y:670.5},0).wait(1).to({scaleX:0.7517,scaleY:0.7768,x:828.5,y:668.95},0).wait(1).to({scaleX:0.7462,scaleY:0.7719,x:827.2,y:667.45},0).wait(1).to({scaleX:0.7407,scaleY:0.7669,x:825.9,y:666.1},0).wait(1).to({scaleX:0.7351,scaleY:0.7619,x:824.45,y:664.9},0).wait(1).to({scaleX:0.7296,scaleY:0.7569,x:822.75,y:663.95},0).wait(1).to({scaleX:0.7239,scaleY:0.7519,x:820.9,y:663.2},0).wait(1).to({scaleX:0.7183,scaleY:0.7468,x:819.05,y:662.6},0).wait(1).to({scaleX:0.7126,scaleY:0.7416,x:817.15,y:662.1},0).wait(1).to({scaleX:0.7068,scaleY:0.7365,x:815.15,y:661.7},0).wait(1).to({scaleX:0.701,scaleY:0.7313,x:813.2,y:661.4},0).wait(1).to({scaleX:0.6952,scaleY:0.726,x:811.15,y:661.15},0).wait(1).to({scaleX:0.6894,scaleY:0.7208,x:809.1,y:661},0).wait(1).to({scaleX:0.6835,scaleY:0.7155,x:807.05,y:660.9},0).wait(1).to({scaleX:0.6775,scaleY:0.7101,x:805,y:660.85},0).wait(1).to({scaleX:0.6715,scaleY:0.7048,x:802.85,y:660.9},0).wait(1).to({scaleX:0.6655,scaleY:0.6994,x:800.95,y:660.85},0).wait(1).to({scaleX:0.6595,scaleY:0.6939,x:799.85,y:659.1},0).wait(1).to({scaleX:0.6534,scaleY:0.6884,x:798.8,y:657.2},0).wait(1).to({scaleX:0.6473,scaleY:0.6829,x:797.85,y:655.3},0).wait(1).to({scaleX:0.6411,scaleY:0.6774,x:796.95,y:653.3},0).wait(1).to({scaleX:0.6349,scaleY:0.6718,x:796.05,y:651.35},0).wait(1).to({scaleX:0.6286,scaleY:0.6662,x:795.2,y:649.35},0).wait(1).to({scaleX:0.6224,scaleY:0.6606,x:794.35,y:647.35},0).wait(1).to({scaleX:0.616,scaleY:0.6549,x:793.5,y:645.3},0).wait(1).to({scaleX:0.6097,scaleY:0.6492,x:792.7,y:643.2},0).wait(1).to({scaleX:0.6033,scaleY:0.6434,x:792,y:641.1},0).wait(1).to({scaleX:0.5968,scaleY:0.6376,x:791.2,y:638.95},0).wait(1).to({scaleX:0.5904,scaleY:0.6318,x:790.4,y:636.85},0).wait(1).to({scaleX:0.5838,scaleY:0.6259,x:789.35,y:634.85},0).wait(1).to({scaleX:0.5773,scaleY:0.62,x:788.05,y:633},0).wait(1).to({scaleX:0.5707,scaleY:0.6141,x:786.45,y:631.35},0).wait(1).to({scaleX:0.5641,scaleY:0.6082,x:784.6,y:629.9},0).wait(1).to({scaleX:0.5574,scaleY:0.6022,x:782.6,y:628.8},0).wait(1).to({scaleX:0.5507,scaleY:0.5961,x:780.45,y:627.85},0).wait(1).to({scaleX:0.5439,scaleY:0.5901,x:778.2,y:627.15},0).wait(1).to({scaleX:0.5372,scaleY:0.584,x:775.9,y:626.7},0).wait(1).to({scaleX:0.5303,scaleY:0.5778,x:773.55,y:626.5},0).wait(1).to({scaleX:0.5235,scaleY:0.5717,x:771.15,y:626.55},0).wait(1).to({scaleX:0.5166,scaleY:0.5655,x:768.75,y:626.75},0).wait(1).to({scaleX:0.5096,scaleY:0.5592,x:766.4,y:627.25},0).wait(1).to({scaleX:0.5027,scaleY:0.553,x:764.1,y:627.8},0).wait(1).to({scaleX:0.4956,scaleY:0.5467,x:761.85,y:626.9},0).wait(1).to({scaleX:0.4886,scaleY:0.5403,x:759.7,y:625.7},0).wait(1).to({scaleX:0.4815,scaleY:0.5339,x:757.6,y:624.4},0).wait(1).to({scaleX:0.4744,scaleY:0.5275,x:755.6,y:622.95},0).wait(1).to({scaleX:0.4672,scaleY:0.5211,x:753.6,y:621.4},0).wait(1).to({scaleX:0.46,scaleY:0.5146,x:751.7,y:619.7},0).wait(1).to({scaleX:0.4527,scaleY:0.5081,x:749.9,y:617.95},0).wait(1).to({scaleX:0.4455,scaleY:0.5015,x:748.15,y:616.1},0).wait(1).to({scaleX:0.4381,scaleY:0.495,x:746.5,y:614.15},0).wait(1).to({scaleX:0.4308,scaleY:0.4883,x:744.95,y:612.15},0).wait(1).to({scaleX:0.4234,scaleY:0.4817,x:743.5,y:610.05},0).wait(1).to({scaleX:0.4159,scaleY:0.475,x:742.2,y:607.8},0).wait(1).to({scaleX:0.4084,scaleY:0.4683,x:740.95,y:605.5},0).wait(1).to({scaleX:0.4009,scaleY:0.4615,x:739.5,y:603.35},0).wait(1).to({scaleX:0.3934,scaleY:0.4547,x:737.75,y:601.35},0).wait(1).to({scaleX:0.3858,scaleY:0.4479,x:735.9,y:599.45},0).wait(1).to({scaleX:0.3781,scaleY:0.441,x:733.9,y:597.7},0).wait(1).to({scaleX:0.3705,scaleY:0.4342,x:731.8,y:596.1},0).wait(1).to({scaleX:0.3628,scaleY:0.4272,x:729.55,y:594.55},0).wait(1).to({scaleX:0.355,scaleY:0.4203,x:727.3,y:593.1},0).wait(1).to({scaleX:0.3472,scaleY:0.4133,x:724.95,y:591.75},0).wait(1).to({scaleX:0.3394,scaleY:0.4062,x:722.55,y:590.45},0).wait(1).to({scaleX:0.3315,scaleY:0.3992,x:720.1,y:589.2},0).wait(1).to({scaleX:0.3236,scaleY:0.3921,x:717.6,y:588.1},0).wait(1).to({scaleX:0.3157,scaleY:0.3849,x:715.05,y:587},0).wait(1).to({scaleX:0.3077,scaleY:0.3777,x:712.45,y:586},0).wait(1).to({scaleX:0.2997,scaleY:0.3705,x:709.9,y:585.05},0).wait(1).to({scaleX:0.2916,scaleY:0.3633,x:707.15,y:584.2},0).wait(1).to({scaleX:0.2835,scaleY:0.356,x:704.45,y:583.45},0).wait(1).to({scaleX:0.2754,scaleY:0.3487,x:702.85,y:582.15},0).wait(1).to({scaleX:0.2672,scaleY:0.3414,x:703.9,y:579.5},0).wait(1).to({scaleX:0.259,scaleY:0.334,x:704.5,y:576.7},0).wait(1).to({scaleX:0.2508,scaleY:0.3266,x:704.75,y:573.8},0).wait(1).to({scaleX:0.2425,scaleY:0.3191,x:704.7,y:570.95},0).wait(1).to({scaleX:0.2342,scaleY:0.3116,x:704.3,y:568.05},0).wait(1).to({scaleX:0.2258,scaleY:0.3041,x:703.55,y:565.25},0).wait(1).to({scaleX:0.2174,scaleY:0.2966,x:702.45,y:562.55},0).wait(1).to({scaleX:0.209,scaleY:0.289,x:700.95,y:560},0).wait(1).to({scaleX:0.2005,scaleY:0.2813,x:699.1,y:557.65},0).wait(1).to({scaleX:0.192,scaleY:0.2737,x:697.15,y:555.4},0).wait(1).to({scaleX:0.1834,scaleY:0.266,x:695.15,y:553.2},0).wait(1).to({scaleX:0.1748,scaleY:0.2583,x:693.1,y:551.05},0).wait(1).to({scaleX:0.1662,scaleY:0.2505,x:690.95,y:548.95},0).wait(1).to({scaleX:0.1575,scaleY:0.2427,x:688.75,y:546.85},0).wait(1).to({scaleX:0.1488,scaleY:0.2349,x:686.5,y:544.8},0).wait(1).to({scaleX:0.14,scaleY:0.227,x:684.05,y:542.85},0).wait(1).to({scaleX:0.1312,scaleY:0.2191,x:681.6,y:541.15},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_sun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sun
	this.instance = new lib.sun("synched",0);
	this.instance.setTransform(1080.15,419.55,0.202,0.1819,0,0,0,285.4,274.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(39).to({y:409.45},0).wait(1).to({y:398.25},0).wait(1).to({y:389.3},0).wait(1).to({startPosition:0},0).wait(1).to({y:385.75},0).wait(1).to({y:381.05},0).wait(1).to({y:378.1},0).wait(1).to({y:375.75},0).wait(1).to({y:372.85},0).wait(1).to({y:368.7},0).wait(1).to({y:364},0).wait(1).to({y:361.1},0).wait(1).to({y:358.15},0).wait(1).to({y:355.8},0).wait(1).to({y:351.1},0).wait(1).to({y:347},0).wait(1).to({y:342.85},0).wait(1).to({y:338.75},0).wait(1).to({y:335.8},0).wait(1).to({y:332.9},0).wait(1).to({y:329.35},0).wait(1).to({y:325.8},0).wait(1).to({y:322.85},0).wait(1).to({y:319.95},0).wait(1).to({y:315.15},0).wait(1).to({y:311.35},0).wait(2).to({y:308.95},0).wait(1).to({y:306.55},0).wait(1).to({y:303.2},0).wait(1).to({y:300.35},0).wait(1).to({y:297},0).wait(1).to({y:293.65},0).wait(1).to({y:291.25},0).wait(1).to({y:288.85},0).wait(1).to({y:286.5},0).wait(1).to({y:283.6},0).wait(1).to({y:281.2},0).wait(1).to({y:278.8},0).wait(1).to({y:275},0).wait(1).to({y:272.6},0).wait(1).to({y:270.2},0).wait(1).to({y:267.8},0).wait(1).to({y:264.95},0).wait(1).to({y:262.05},0).wait(1).to({y:259.2},0).wait(1).to({y:256.35},0).wait(1).to({y:254.9},0).wait(1).to({y:251.55},0).wait(1).to({y:248.2},0).wait(1).to({y:244.35},0).wait(1).to({y:240.35},0).wait(1).to({y:236.35},0).wait(1).to({y:230.9},0).wait(1).to({y:226.4},0).wait(1).to({y:221.45},0).wait(1).to({y:217.95},0).wait(1).to({y:213.95},0).wait(1).to({y:210.45},0).wait(1).to({y:205},0).wait(1).to({y:199.05},0).wait(1).to({y:196.05},0).wait(1).to({y:192.6},0).wait(1).to({y:190.1},0).wait(1).to({y:186.1},0).wait(1).to({y:183.1},0).wait(1).to({y:180.1},0).wait(1).to({y:176.15},0).wait(1).to({y:171.7},0).wait(1).to({y:168.75},0).wait(1).to({y:164.25},0).wait(1).to({y:161.25},0).wait(1).to({y:157.25},0).wait(1).to({y:154.25},0).wait(1).to({y:150.8},0).wait(1).to({y:147.35},0).wait(1).to({y:143.35},0).wait(1).to({y:138.9},0).wait(1).to({y:133.95},0).wait(1).to({y:129.5},0).wait(1).to({y:122.55},0).wait(1).to({y:118.6},0).wait(1).to({y:114.1},0).wait(1).to({y:109.1},0).wait(1).to({y:104.6},0).wait(1).to({y:100.15},0).wait(1).to({y:95.15},0).wait(1).to({y:91.7},0).wait(1).to({y:85.2},0).wait(1).to({y:80.25},0).wait(1).to({y:76.75},0).wait(1).to({y:72.8},0).wait(1).to({y:69.3},0).wait(1).to({y:64.8},0).wait(1).to({y:60.8},0).wait(1).to({y:57.35},0).wait(1).to({y:54.35},0).wait(1).to({y:52.35},0).wait(1).to({y:49.95},0).wait(1).to({x:1081.1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(117));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_backround = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// backround
	this.instance = new lib.floerpot();
	this.instance.setTransform(414.6,145.8,1,0.7462,0,0,0,80.7,68.5);

	this.instance_1 = new lib.Bitmap20();
	this.instance_1.setTransform(577,22,0.1448,0.1181);

	this.instance_2 = new lib.Bitmap16copy();
	this.instance_2.setTransform(-4,0,0.9229,0.7326);

	this.instance_3 = new lib.CachedBmp_26();
	this.instance_3.setTransform(841.8,455,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_32();
	this.instance_4.setTransform(841.8,455,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_33();
	this.instance_5.setTransform(841.8,455,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_34();
	this.instance_6.setTransform(841.8,455,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_28();
	this.instance_7.setTransform(686,496.85,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_36();
	this.instance_8.setTransform(686,496.85,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_35();
	this.instance_9.setTransform(841.8,455,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_38();
	this.instance_10.setTransform(686,496.85,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_37();
	this.instance_11.setTransform(841.8,455,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_40();
	this.instance_12.setTransform(686,496.85,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_39();
	this.instance_13.setTransform(841.8,455,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_31();
	this.instance_14.setTransform(704.3,525.6,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_43();
	this.instance_15.setTransform(704.3,525.6,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_42();
	this.instance_16.setTransform(686,496.85,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_41();
	this.instance_17.setTransform(841.8,455,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_46();
	this.instance_18.setTransform(704.3,525.6,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_45();
	this.instance_19.setTransform(686,496.85,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_44();
	this.instance_20.setTransform(841.8,455,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},145).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},70).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},81).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},277).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},114).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_3}]},55).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_4}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_5}]},4).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_7},{t:this.instance_6}]},8).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_9},{t:this.instance_8}]},27).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_11},{t:this.instance_10}]},2).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18}]},1).wait(58));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_actions = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// actions
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(621.85,259.8,0.5,0.5);

	this.start = new lib.playAgain();
	this.start.name = "start";
	this.start.setTransform(684.25,385.15,1.1189,1.0973,0,0,0,188.8,179.9);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(496.9,201.4,0.5,0.5);

	this.playAgain = new lib.playAgain();
	this.playAgain.name = "playAgain";
	this.playAgain.setTransform(585.1,300.75,1,1,0,0,0,188.8,179.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start},{t:this.instance}]}).to({state:[]},1).to({state:[{t:this.playAgain},{t:this.instance_1}]},845).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.allcloud = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.cloud4("synched",0);
	this.instance.setTransform(112,34.7,1,1,0,0,0,112,34.7);

	this.instance_1 = new lib.cloud3("synched",0);
	this.instance_1.setTransform(138.2,128.25,0.3243,0.3321,0,0,0,204.5,109.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C9E3FF").s().p("AghgEIA7AAIAJAAQAAAEgBAAQgSAFgPAAQgUAAgOgJg");
	this.shape.setTransform(248.25,99.462);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EDF7FF").s().p("AAvAEIhmAAIAAgIQA3AAA3AEIABAEIgJAAg");
	this.shape_1.setTransform(211.65,79.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CEF1FD").s().p("AghgEQAhAAAiAEIAAADIgIABQgMABgKAAQgYAAgNgJg");
	this.shape_2.setTransform(214.65,72.046);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8DDEFA").s().p("AAAAnQgDgnAAgnIAHAAIAABGIAAAJIgEgBg");
	this.shape_3.setTransform(190.125,94.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#87DEFA").s().p("AAjAFIhNAAIAAgIQAqgBArAEIAAAFIgIAAg");
	this.shape_4.setTransform(298.2,54.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C1DEFF").s().p("AIfgEIBWAAIAIAAIAAAEQgYAFgVAAQgcAAgVgJgAp8gEIBWAAIAJAAQAAACAAAAQAAABgBABQAAAAAAAAQAAAAAAAAQgYAFgUAAQgdAAgVgJg");
	this.shape_5.setTransform(412.725,107.4533);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C7E2FF").s().p("AF7gEIA8AAIAJAAQAAAEgBAAQgSAFgOAAQgWAAgOgJgAm/gEIA8AAIAJAAQAAAEgBAAQgRAFgPAAQgVAAgPgJg");
	this.shape_6.setTransform(411.875,124.362);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C4E0FF").s().p("AgCAKQgHgDgIAAIAAgIQA5gigjAwQgCADgDAAQAAgFgCgBg");
	this.shape_7.setTransform(384.4086,100.1078);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EEF8FF").s().p("AsGBDIhWAAIAAgJQAvAAAvAEIABAFIgJAAgANDgMQAJgbAMgZQABgCAEAAIAAAJQgGAtgQAAIgEAAgAJ1g5QAnAAAmAFIAAAEIgIABQgNABgLAAQgcAAgRgLg");
	this.shape_8.setTransform(330.925,75.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#B1EAFB").s().p("AAaAEIg8AAIAAgIIA8AAIAIAAIAAAIIgIAAg");
	this.shape_9.setTransform(421.35,51.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#81DDF9").s().p("AAeAEIhEAAIAAgIQAmABAmADIABAEIgJAAg");
	this.shape_10.setTransform(428.675,51.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C8E2FF").s().p("A40AkQACgpgPgUIAAgJQAcgIgKBFIgBAJgAX0AAIBFAAIAJAAIgBAFQgUAEgRAAQgXAAgRgJg");
	this.shape_11.setTransform(419.625,98.9592);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D5EAFF").s().p("AgEAjIAAhOQAEAAABACQACACAAAEIABAJQAGAugOAYIAAgJg");
	this.shape_12.setTransform(563.146,99.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C0DEFF").s().p("AgLARQgCgCAAgFIAAgJQAwgtgjA9QgBACgEAAQgEAAgCgCg");
	this.shape_13.setTransform(505.4913,97.1331);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#63D5F8").s().p("AAnAEIhWAAIAAgIQAwABAuADIABAEIgJAAg");
	this.shape_14.setTransform(526.85,51.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C5EDFE").s().p("AAACSQhAA5hkALQlWAmhokJQgFAAgDACQg5AhhjgJQAAgFgBAAQgggIgbgNIgJABQiOAoh0hEQglA/hNAJQkFAdiFijQgFAAgBACQggBPhTAZIgJAAIhFAAIAAgEQhVgXgahPQgFAAgDACQgtAcgzAYIgIAAIhOAAQAAgFgBAAQhKgdgUhSQAaAfApASQABAAAAAAQAAABABAAQAAABAAAAQAAABAAABIBWAAIAJAAQApgcAigkQACgCAAgFQArA7BEAiQABABAAAEQB5ANAyg7QACgDAAgEQgXgng9gsQgCgCAAgEQAeAIA5AaQADABAEAAQAZAQArgLQABAAAAgFQAwABAXgZQACgCAFAAQAPAUgCAqIAEAAQARBMA7AiQABABAAAEQA4ATBKgBIAIAAQBMggAvg/QACgCAEAAQAuApBcgGIAJAAQBrgfgZhTQAAgBgFAAQgIggBFAxQBdBECcADQAlAQA5gLQAAAAABAAQAAgBAAAAQAAgBAAgBQAAAAAAgCQCMgGBdg2QAEgCAEAAQAJAAAHAEQABABAAAEQgEAAgCACQheBrjAAHQAeBPBSAZQAEABAEAAQAZAQArgLQABAAAAgFQBHgLAngsQACgCAAgEQBQAtA6gSIAIgBQATgyBLAzQAVAOAngGQAvgjAnAEIABAEQAhBBBDgwIAlgZQAyAkA/AYIAIABQAYAQAsgLQABAAAAgFQAEAAAEgBQBQgcAphEIAAgEQjWgShpiBQB6A9CjATIAIAAQAkAQA6gLIABgFQCrgFBihRQACgCAFAAQAAAEACACQACACAEAAQAAAFgCACQgGAHgJAEQAeA+BIAWQABABAAAEQBjANApguQACgCAFAAQA/BdCYAEIAJAAQBXgeAghWQABgEAAgEQAQgZgHguIAAgJQAkAUAqAOIAIABQAcAQAxgLIAAgFQAigFAVgTQAIgIACAEQATAkhcAcQAlBSB+gLIAJAAQBMgcAihHQACgDAAgFQAfA5BHATQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAABIBFAAIAJAAQAVgMASgPQANgLALgNQABgCAFAAQAAAFgCAEQgJAhgTAZQgYAggpARIgJAAQhxgChDg0QAAAFgCADQgjBHhLAbIgJAAIhFAAQAAgEgBAAQhVgagjhMQgoAqgzAjQgzAhg7AUQjQBGhjiKQgEAAgDACQhwBFiUgsQgEAAgDACQgVANgXALIgJAAQhmAGg+ggQhHCqi1AyQhJAUhAAAQiBAAhdhRg");
	this.shape_15.setTransform(411.875,118.1556);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E5F4FE").s().p("AG0EcIg8AAIgIgBQg/gYgyglIglAaQhDAwghhBIgBgFQgngEgvAkQgnAGgVgOQhLg0gTAzIgIABQg6AShQguQAAAEgCADQgnAshHALIgJAAIg8AAQgEAAgEgBQhSgZgehQQDAgHBehrQACgCAEAAQAFAAABgCQAjgyg6AiIAAAJQgEAAgEACQhdA2iMAGIgJAAIhWAAQicgDhdhEQhFgwAIAfQAFAAAAABQAZBThrAfIgJAAQhcAGgugpQgEAAgCACQgvA/hMAgIgIAAQhKABg4gTQAAgEgBgBQg7gigRhMIAAgJQAKhFgbAHIAAAJQgFAAgCACQgXAZgwgBIgIAAIg9AAQgEAAgDgBQg5gagegIQAAAEACACQA9AsAXAnQAAAEgCADQgyA7h5gNQAAgEgBgBQhEgigrg7QAAAFgCACQgiAkgpAcIgJAAIhWAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAAAgBAAQgpgSgagfQAAgEgBgBQgNgGAGgYIAAgJIAAhGIAAgJIAAgbIAIAAQArgoBggeIAIgBIBnAAIAJAAQBjAWA2BFQACACAAAFQAsgwBEgWQAEgBAEAAIBWAAIAJAAQA9AhADgLQAJgfANgSQBAhnCpAFIAIAAQBcAnA1BOQACADAAAFQAzhvCKAVIAJABQAOAvgTAzIAFAAQCEhXC2BBQATAGAcAHQB8h1DmgIIAIAAQAZAQAsgGIAJgBQBJAFAvAdQAEACAEAAQATAGAGgzIABgJQE6g/CqCoQACACAFAAQCXhQCrBKQBOAigvg/QgHg4ApgGIAJgBQB4AEAqBWQABAEAAAEQAuhXBjggQACgBAAgEIBnAAIAJAAQB9AnAMBwIABAJQAYgPA+gUIAIgBIBOAAIAIAAQBMALAfA6QABACAEAAQBriNDRA9QAjAKAhAOIAPAGQACABAEgEQAqBZgdBxQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAQgFAAgBACQgLANgNALQgSAPgVAMIgJAAIhFAAQAAgBAAgBQAAgBAAAAQAAgBAAAAQAAAAgBAAQhHgTgfg5QAAAFgCADQgiBHhMAcIgJAAQh+ALglhSQBcgcgTgkQgCgEgIAIQgVATgiAFIgIAAIhFAAIgIgBQgqgOgkgUQAAgEgCgCQgDgCgEAAIAABPIAAAJQAAAEgBAEQggBWhXAeIgJAAQiYgEg/hdQgFAAgCACQgpAuhjgNQAAgEgBgBQhIgWgeg+QAJgEAGgHQACgCAAgFQAEAAACgBQAjg+gxAuIAAAJQgFAAgCACQhiBRirAFIgJAAIhWAAIgIAAQijgTh6g9QBpCBDWASIAAAEQgpBFhQAcQgEABgEAAIgJAAg");
	this.shape_16.setTransform(412.1604,95.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#ECF7FF").s().p("AAjAEIhNAAIAAgIQArAAAqAEIAAAEIgIAAg");
	this.shape_17.setTransform(575.5,79.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#BDEDFB").s().p("AArAEIheAAIAAgIQAzAAAzAEIABAEIgJAAg");
	this.shape_18.setTransform(611.675,69.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FCFEFE").s().p("A78C0Qg2hFhjgWIgBgFQg3gEg4AAIAAAJIgIABQhgAegqAoIAAgJIAAgSQA4hlCFgXIAJAAQATAQApgHIAIAAQBcAUAxBDQACACAEAAQAWgkAbgdQACgCAAgEQAagKAZgMQABAAAAgFIBXAAIAIAAQAoARAeAZQADACAEABQBRjAD3gVIAJAAIBNAAIAIAAQC8AdBFCUQACAEAAAFQAggiA1gOQAAAAAAAAQABgBAAAAQAAgBAAgBQAAAAAAgCQBcgKAvAjQADABAFAAQD6irGTgPIAIAAIA9AAIAIAAIBGAAIAIAAQDwAhCaB5QACACAAAEQA2gcBUACIAJAAQAwAQAfAjQACABAEAAQBJiXC6giIAIgBIBXAAIAJAAQD2AQBDDMQAAABAFABQAfgjA2gNQABAAAAgFIBNAAIAJAAQA/AgAmA5QADADAAAFQA9g6BWgdIAIgBIBeAAIAJAAQBSARArA6QAMAPAHARQADADAAAFQgFAEgCgBIgPgGQghgOgigKQjSg9hqCNQgFAAgBgCQgfg6hMgLIAAgFQgqgEgrAAIAAAJIgIABQg/AUgYAPIgBgJQgLhxh+gmIgIAAIhoAAQAAAFgCABQhjAfguBXQABgEgCgEQgqhVh4gEIgJABQgpAFAHA4QAvA/hOgiQiqhKiYBQQgFAAgCgCQipink7A/QgEAAgBACQgMAYgJAbQgEAAgDgCQgwgdhJgFIgBgEQgmgEgmAAIgJAAQjlAHh9B1QgcgHgTgHQi2hAiEBXIgEAAQASg0gOguIgJgBQiKgVgzBvQAAgFgCgDQg0hOhcgmIgJAAQipgFhABmQgNASgIAfQgEALg8ghIgBgFQgvgFgvABIAAAJQgFgBgEACQhEAVgsAxQAAgFgCgCg");
	this.shape_19.setTransform(411.45,70.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,634,164.5);


(lib.Scene_1_cloud = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// cloud
	this.instance = new lib.allcloud("synched",0);
	this.instance.setTransform(395.5,122.05,1,0.8896,0,0,0,394.2,99.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:317,regY:82.2,x:318.3,y:106.4},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:318.7},0).wait(1).to({x:319.95},0).wait(1).to({x:321.25},0).wait(1).to({x:322.55},0).wait(1).to({x:323.95},0).wait(1).to({x:325.4},0).wait(1).to({x:326.9},0).wait(1).to({x:328.5},0).wait(1).to({x:330.1},0).wait(1).to({x:331.75},0).wait(1).to({x:333.5},0).wait(1).to({x:335.25},0).wait(1).to({x:337.1},0).wait(1).to({x:339},0).wait(1).to({x:340.95},0).wait(1).to({x:342.95},0).wait(1).to({x:345},0).wait(1).to({x:347.1},0).wait(1).to({x:349.25},0).wait(1).to({x:351.5},0).wait(1).to({x:353.75},0).wait(1).to({x:356.1},0).wait(1).to({x:358.45},0).wait(1).to({x:360.9},0).wait(1).to({x:363.4},0).wait(1).to({x:365.95},0).wait(1).to({x:368.55},0).wait(1).to({x:371.2},0).wait(1).to({x:373.95},0).wait(1).to({x:376.7},0).wait(1).to({x:379.55},0).wait(1).to({x:382.4},0).wait(1).to({x:385.35},0).wait(1).to({x:388.35},0).wait(1).to({x:391.35},0).wait(1).to({x:394.45},0).wait(1).to({x:397.6},0).wait(1).to({x:400.85},0).wait(1).to({x:404.1},0).wait(1).to({x:407.4},0).wait(1).to({x:410.8},0).wait(1).to({x:414.2},0).wait(1).to({x:417.7},0).wait(1).to({x:421.25},0).wait(1).to({x:424.85},0).wait(1).to({x:428.5},0).wait(1).to({x:432.2},0).wait(1).to({x:435.95},0).wait(1).to({x:439.75},0).wait(1).to({x:443.6},0).wait(1).to({x:447.55},0).wait(1).to({x:451.5},0).wait(1).to({x:455.55},0).wait(1).to({x:459.65},0).wait(1).to({x:463.8},0).wait(1).to({x:468},0).wait(1).to({x:472.25},0).wait(1).to({x:476.55},0).wait(1).to({x:480.9},0).wait(1).to({x:485.3},0).wait(1).to({x:489.8},0).wait(1).to({x:494.3},0).wait(1).to({x:498.9},0).wait(1).to({x:503.55},0).wait(1).to({x:508.25},0).wait(1).to({x:513},0).wait(1).to({x:517.8},0).wait(1).to({x:522.65},0).wait(1).to({x:527.55},0).wait(1).to({x:532.5},0).wait(1).to({x:537.55},0).wait(1).to({x:542.6},0).wait(1).to({x:547.75},0).wait(1).to({x:552.95},0).wait(1).to({x:558.2},0).wait(1).to({x:563.5},0).wait(1).to({x:568.8},0).wait(1).to({x:574.25},0).wait(1).to({x:579.7},0).wait(1).to({x:585.2},0).wait(1).to({x:590.8},0).wait(1).to({x:596.4},0).wait(1).to({x:602.1},0).wait(1).to({x:607.8},0).wait(1).to({x:613.6},0).wait(1).to({x:619.45},0).wait(1).to({x:625.35},0).wait(1).to({x:631.3},0).wait(1).to({x:637.35},0).wait(1).to({x:643.4},0).wait(1).to({x:649.5},0).wait(1).to({x:655.7},0).wait(1).to({x:661.9},0).wait(1).to({x:668.2},0).wait(1).to({x:674.55},0).wait(1).to({x:680.95},0).wait(1).to({x:687.4},0).wait(1).to({x:693.9},0).wait(1).to({x:700.45},0).wait(1).to({x:707.1},0).wait(1).to({x:713.75},0).wait(1).to({x:720.45},0).wait(1).to({x:727.25},0).wait(1).to({x:734.1},0).wait(1).to({x:741},0).wait(1).to({x:747.9},0).wait(1).to({x:754.9},0).wait(1).to({x:762},0).wait(1).to({x:769.1},0).wait(1).to({x:776.25},0).wait(1).to({x:783.45},0).wait(1).to({x:790.75},0).wait(1).to({x:798.1},0).wait(1).to({x:805.45},0).wait(1).to({x:812.9},0).wait(1).to({x:820.4},0).wait(1).to({x:827.95},0).wait(1).to({x:835.55},0).wait(1).to({x:843.2},0).wait(1).to({x:850.95},0).wait(1).to({x:858.7},0).wait(1).to({x:866.5},0).wait(1).to({x:874.4},0).wait(1).to({x:882.35},0).wait(1).to({x:890.3},0).wait(1).to({x:898.35},0).wait(1).to({x:906.45},0).wait(1).to({x:914.6},0).wait(1).to({x:922.85},0).wait(1).to({x:931.1},0).wait(1).to({x:939.4},0).wait(1).to({x:947.8},0).wait(1).to({x:956.2},0).wait(1).to({x:963.05},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.YOGAAA = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,846];
	this.streamSoundSymbolsList[0] = [{id:"RelaxingMusicGuitarcut",startFrame:0,endFrame:1,loop:1,offset:0},{id:"RelaxingMusicGuitarcutmp3copy",startFrame:0,endFrame:847,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("RelaxingMusicGuitarcutmp3copy",0);
		this.InsertIntoSoundStreamData(soundInstance,0,847,1);
		var soundInstance = playSound("RelaxingMusicGuitarcut",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		this.start = this.actions.start;
		var self = this; 
		self.stop(); 
		self.start.addEventListener("click", startPlaying);
		function startPlaying()
		{self.gotoAndPlay(1); 
		}
	}
	this.frame_1 = function() {
		this.start = undefined;
	}
	this.frame_846 = function() {
		this.playAgain = this.actions.playAgain;
		this.___loopingOver___ = true;
		var self = this;
		self.stop();
		self.playAgain.addEventListener("click", playAgain);
		function playAgain()
		{	
		self.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(845).call(this.frame_846).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(145).to({scaleX:0.9851,scaleY:0.9851},0).wait(1).to({scaleX:0.9783,scaleY:0.9783,x:638.3916,y:359.5804},0).wait(1).to({scaleX:0.9714,scaleY:0.9714,x:636.7832,y:359.1608},0).wait(1).to({scaleX:0.9646,scaleY:0.9646,x:635.1748,y:358.7412},0).wait(1).to({scaleX:0.9578,scaleY:0.9578,x:633.5664,y:358.3216},0).wait(1).to({scaleX:0.951,scaleY:0.951,x:631.958,y:357.902},0).wait(1).to({scaleX:0.9441,scaleY:0.9441,x:630.3496,y:357.4824},0).wait(1).to({scaleX:0.9373,scaleY:0.9373,x:628.7412,y:357.0628},0).wait(1).to({scaleX:0.9305,scaleY:0.9305,x:627.1328,y:356.6432},0).wait(1).to({scaleX:0.9237,scaleY:0.9237,x:625.5244,y:356.2236},0).wait(1).to({scaleX:0.9168,scaleY:0.9168,x:623.916,y:355.804},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:622.3076,y:355.3844},0).wait(1).to({scaleX:0.9032,scaleY:0.9032,x:620.6992,y:354.9648},0).wait(1).to({scaleX:0.8963,scaleY:0.8963,x:619.0908,y:354.5452},0).wait(1).to({scaleX:0.8895,scaleY:0.8895,x:617.4824,y:354.1256},0).wait(1).to({scaleX:0.8827,scaleY:0.8827,x:615.874,y:353.706},0).wait(1).to({scaleX:0.8759,scaleY:0.8759,x:614.2656,y:353.2864},0).wait(1).to({scaleX:0.869,scaleY:0.869,x:612.6572,y:352.8668},0).wait(1).to({scaleX:0.8622,scaleY:0.8622,x:611.0488,y:352.4472},0).wait(1).to({scaleX:0.8554,scaleY:0.8554,x:609.4404,y:352.0276},0).wait(1).to({scaleX:0.8486,scaleY:0.8486,x:607.832,y:351.608},0).wait(1).to({scaleX:0.8417,scaleY:0.8417,x:606.2236,y:351.1884},0).wait(1).to({scaleX:0.8349,scaleY:0.8349,x:604.6152,y:350.7688},0).wait(1).to({scaleX:0.8281,scaleY:0.8281,x:603.0068,y:350.3492},0).wait(1).to({scaleX:0.8213,scaleY:0.8213,x:601.3984,y:349.9296},0).wait(1).to({scaleX:0.8144,scaleY:0.8144,x:599.79,y:349.51},0).wait(1).to({scaleX:0.8076,scaleY:0.8076,x:598.1816,y:349.0904},0).wait(1).to({scaleX:0.8008,scaleY:0.8008,x:596.5732,y:348.6708},0).wait(1).to({scaleX:0.7939,scaleY:0.7939,x:594.9648,y:348.2512},0).wait(1).to({scaleX:0.7871,scaleY:0.7871,x:593.3564,y:347.8316},0).wait(1).to({scaleX:0.7803,scaleY:0.7803,x:591.748,y:347.412},0).wait(1).to({scaleX:0.7735,scaleY:0.7735,x:590.1396,y:346.9924},0).wait(1).to({scaleX:0.7666,scaleY:0.7666,x:588.5312,y:346.5728},0).wait(1).to({scaleX:0.7598,scaleY:0.7598,x:586.9228,y:346.1532},0).wait(1).to({scaleX:0.753,scaleY:0.753,x:585.3144,y:345.7336},0).wait(1).to({scaleX:0.7462,scaleY:0.7462,x:583.706,y:345.314},0).wait(1).to({scaleX:0.7393,scaleY:0.7393,x:582.0976,y:344.8944},0).wait(1).to({scaleX:0.7325,scaleY:0.7325,x:580.4892,y:344.4748},0).wait(1).to({scaleX:0.7257,scaleY:0.7257,x:578.8808,y:344.0552},0).wait(1).to({scaleX:0.7189,scaleY:0.7189,x:577.2724,y:343.6356},0).wait(1).to({scaleX:0.712,scaleY:0.712,x:575.664,y:343.216},0).wait(1).to({scaleX:0.7052,scaleY:0.7052,x:574.0556,y:342.7964},0).wait(1).to({scaleX:0.6984,scaleY:0.6984,x:572.4472,y:342.3768},0).wait(1).to({scaleX:0.6915,scaleY:0.6915,x:570.8388,y:341.9572},0).wait(1).to({scaleX:0.6847,scaleY:0.6847,x:569.2304,y:341.5376},0).wait(1).to({scaleX:0.6779,scaleY:0.6779,x:567.622,y:341.118},0).wait(1).to({scaleX:0.6711,scaleY:0.6711,x:566.0136,y:340.6984},0).wait(1).to({scaleX:0.6642,scaleY:0.6642,x:564.4052,y:340.2788},0).wait(1).to({scaleX:0.6574,scaleY:0.6574,x:562.7968,y:339.8592},0).wait(1).to({scaleX:0.6506,scaleY:0.6506,x:561.1884,y:339.4396},0).wait(1).to({scaleX:0.6438,scaleY:0.6438,x:559.58,y:339.02},0).wait(1).to({scaleX:0.6369,scaleY:0.6369,x:557.9716,y:338.6004},0).wait(1).to({scaleX:0.6301,scaleY:0.6301,x:556.3632,y:338.1808},0).wait(1).to({scaleX:0.6233,scaleY:0.6233,x:554.7548,y:337.7612},0).wait(1).to({scaleX:0.6165,scaleY:0.6165,x:553.1464,y:337.3416},0).wait(1).to({scaleX:0.6096,scaleY:0.6096,x:551.538,y:336.922},0).wait(1).to({scaleX:0.6028,scaleY:0.6028,x:549.9296,y:336.5024},0).wait(1).to({scaleX:0.596,scaleY:0.596,x:548.3212,y:336.0828},0).wait(1).to({scaleX:0.5891,scaleY:0.5891,x:546.7128,y:335.6632},0).wait(1).to({scaleX:0.5823,scaleY:0.5823,x:545.1044,y:335.2436},0).wait(1).to({scaleX:0.5755,scaleY:0.5755,x:543.496,y:334.824},0).wait(1).to({scaleX:0.5687,scaleY:0.5687,x:541.8876,y:334.4044},0).wait(1).to({scaleX:0.5618,scaleY:0.5618,x:540.2792,y:333.9848},0).wait(1).to({scaleX:0.555,scaleY:0.555,x:538.6708,y:333.5652},0).wait(1).to({scaleX:0.5482,scaleY:0.5482,x:537.0624,y:333.1456},0).wait(1).to({scaleX:0.5414,scaleY:0.5414,x:535.454,y:332.726},0).wait(1).to({scaleX:0.5345,scaleY:0.5345,x:533.8456,y:332.3064},0).wait(1).to({scaleX:0.5277,scaleY:0.5277,x:532.2372,y:331.8868},0).wait(1).to({scaleX:0.5209,scaleY:0.5209,x:530.6288,y:331.4672},0).wait(1).to({scaleX:0.5141,scaleY:0.5141,x:529.0204,y:331.0476},0).wait(1).to({scaleX:0.5072,scaleY:0.5072,x:527.412,y:330.628},0).wait(1).to({scaleX:0.5004,scaleY:0.5004,x:525.8036,y:330.2084},0).wait(1).to({scaleX:0.4936,scaleY:0.4936,x:524.1952,y:329.7888},0).wait(1).to({scaleX:0.4867,scaleY:0.4867,x:522.5868,y:329.3692},0).wait(1).to({scaleX:0.4799,scaleY:0.4799,x:520.9784,y:328.9496},0).wait(1).to({scaleX:0.4731,scaleY:0.4731,x:519.37,y:328.53},0).wait(1).to({scaleX:0.4663,scaleY:0.4663,x:517.7616,y:328.1104},0).wait(1).to({scaleX:0.4594,scaleY:0.4594,x:516.1532,y:327.6908},0).wait(1).to({scaleX:0.4526,scaleY:0.4526,x:514.5448,y:327.2712},0).wait(1).to({scaleX:0.4458,scaleY:0.4458,x:512.9364,y:326.8516},0).wait(1).to({scaleX:0.439,scaleY:0.439,x:511.328,y:326.432},0).wait(1).to({scaleX:0.4321,scaleY:0.4321,x:509.7196,y:326.0124},0).wait(1).to({scaleX:0.4253,scaleY:0.4253,x:508.1112,y:325.5928},0).wait(1).to({scaleX:0.4185,scaleY:0.4185,x:506.5028,y:325.1732},0).wait(1).to({scaleX:0.4117,scaleY:0.4117,x:504.8944,y:324.7536},0).wait(1).to({scaleX:0.4048,scaleY:0.4048,x:503.286,y:324.334},0).wait(1).to({scaleX:0.398,scaleY:0.398,x:501.6776,y:323.9144},0).wait(1).to({scaleX:0.3912,scaleY:0.3912,x:500.0692,y:323.4948},0).wait(1).to({scaleX:0.3843,scaleY:0.3843,x:498.4608,y:323.0752},0).wait(1).to({scaleX:0.3775,scaleY:0.3775,x:496.8524,y:322.6556},0).wait(1).to({scaleX:0.3707,scaleY:0.3707,x:495.244,y:322.236},0).wait(1).to({scaleX:0.3639,scaleY:0.3639,x:493.6356,y:321.8164},0).wait(1).to({scaleX:0.357,scaleY:0.357,x:492.0272,y:321.3968},0).wait(1).to({scaleX:0.3502,scaleY:0.3502,x:490.4188,y:320.9772},0).wait(1).to({scaleX:0.3434,scaleY:0.3434,x:488.8104,y:320.5576},0).wait(1).to({scaleX:0.3366,scaleY:0.3366,x:487.202,y:320.138},0).wait(1).to({scaleX:0.3297,scaleY:0.3297,x:485.5936,y:319.7184},0).wait(1).to({scaleX:0.3229,scaleY:0.3229,x:483.9852,y:319.2988},0).wait(1).to({scaleX:0.3161,scaleY:0.3161,x:482.3768,y:318.8792},0).wait(1).to({scaleX:0.3093,scaleY:0.3093,x:480.7684,y:318.4596},0).wait(1).to({scaleX:0.3024,scaleY:0.3024,x:479.16,y:318.04},0).wait(1).to({scaleX:0.2956,scaleY:0.2956,x:477.5516,y:317.6204},0).wait(1).to({scaleX:0.2888,scaleY:0.2888,x:475.9432,y:317.2008},0).wait(1).to({scaleX:0.2819,scaleY:0.2819,x:474.3348,y:316.7812},0).wait(1).to({scaleX:0.2751,scaleY:0.2751,x:472.7264,y:316.3616},0).wait(1).to({scaleX:0.2683,scaleY:0.2683,x:471.118,y:315.942},0).wait(1).to({scaleX:0.2615,scaleY:0.2615,x:469.5096,y:315.5224},0).wait(1).to({scaleX:0.2546,scaleY:0.2546,x:467.9012,y:315.1028},0).wait(1).to({scaleX:0.2478,scaleY:0.2478,x:466.2928,y:314.6832},0).wait(1).to({scaleX:0.241,scaleY:0.241,x:464.6844,y:314.2636},0).wait(1).to({scaleX:0.2342,scaleY:0.2342,x:463.076,y:313.844},0).wait(1).to({scaleX:0.2273,scaleY:0.2273,x:461.4676,y:313.4244},0).wait(1).to({scaleX:0.2205,scaleY:0.2205,x:459.8592,y:313.0048},0).wait(1).to({scaleX:0.2137,scaleY:0.2137,x:458.2508,y:312.5852},0).wait(1).to({scaleX:0.2069,scaleY:0.2069,x:456.6424,y:312.1656},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:455.034,y:311.746},0).wait(1).to({scaleX:0.1932,scaleY:0.1932,x:453.4256,y:311.3264},0).wait(1).to({scaleX:0.1864,scaleY:0.1864,x:451.8172,y:310.9068},0).wait(1).to({scaleX:0.1795,scaleY:0.1795,x:450.2088,y:310.4872},0).wait(1).to({scaleX:0.1727,scaleY:0.1727,x:448.6004,y:310.0676},0).wait(1).to({scaleX:0.1659,scaleY:0.1659,x:446.992,y:309.648},0).wait(1).to({scaleX:0.1591,scaleY:0.1591,x:445.3836,y:309.2284},0).wait(1).to({scaleX:0.1522,scaleY:0.1522,x:443.7752,y:308.8088},0).wait(1).to({scaleX:0.1454,scaleY:0.1454,x:442.1668,y:308.3892},0).wait(1).to({scaleX:0.1386,scaleY:0.1386,x:440.5584,y:307.9696},0).wait(1).to({scaleX:0.1318,scaleY:0.1318,x:438.95,y:307.55},0).wait(1).to({scaleX:0.1298,scaleY:0.1298,x:438.8138,y:307.5466},0).wait(1).to({scaleX:0.1279,scaleY:0.1279,x:438.6776,y:307.5431},0).wait(1).to({scaleX:0.1259,scaleY:0.1259,x:438.5414,y:307.5397},0).wait(1).to({scaleX:0.124,scaleY:0.124,x:438.4052,y:307.5362},0).wait(1).to({scaleX:0.122,scaleY:0.122,x:438.269,y:307.5328},0).wait(1).to({scaleX:0.1201,scaleY:0.1201,x:438.1328,y:307.5293},0).wait(1).to({scaleX:0.1181,scaleY:0.1181,x:437.9966,y:307.5259},0).wait(1).to({scaleX:0.1162,scaleY:0.1162,x:437.8603,y:307.5224},0).wait(1).to({scaleX:0.1143,scaleY:0.1143,x:437.7241,y:307.519},0).wait(1).to({scaleX:0.1123,scaleY:0.1123,x:437.5879,y:307.5155},0).wait(1).to({scaleX:0.1104,scaleY:0.1104,x:437.4517,y:307.5121},0).wait(1).to({scaleX:0.1084,scaleY:0.1084,x:437.3155,y:307.5086},0).wait(1).to({scaleX:0.1065,scaleY:0.1065,x:437.1793,y:307.5052},0).wait(1).to({scaleX:0.1045,scaleY:0.1045,x:437.0431,y:307.5017},0).wait(1).to({scaleX:0.1026,scaleY:0.1026,x:436.9069,y:307.4983},0).wait(1).to({scaleX:0.1006,scaleY:0.1006,x:436.7707,y:307.4948},0).wait(1).to({scaleX:0.0987,scaleY:0.0987,x:436.6345,y:307.4914},0).wait(1).to({scaleX:0.0967,scaleY:0.0967,x:436.4983,y:307.4879},0).wait(1).to({scaleX:0.0948,scaleY:0.0948,x:436.3621,y:307.4845},0).wait(1).to({scaleX:0.0929,scaleY:0.0929,x:436.2259,y:307.481},0).wait(1).to({scaleX:0.0909,scaleY:0.0909,x:436.0897,y:307.4776},0).wait(1).to({scaleX:0.089,scaleY:0.089,x:435.9535,y:307.4741},0).wait(1).to({scaleX:0.087,scaleY:0.087,x:435.8172,y:307.4707},0).wait(1).to({scaleX:0.0851,scaleY:0.0851,x:435.681,y:307.4672},0).wait(1).to({scaleX:0.0831,scaleY:0.0831,x:435.5448,y:307.4638},0).wait(1).to({scaleX:0.0812,scaleY:0.0812,x:435.4086,y:307.4603},0).wait(1).to({scaleX:0.0792,scaleY:0.0792,x:435.2724,y:307.4569},0).wait(1).to({scaleX:0.0773,scaleY:0.0773,x:435.1362,y:307.4534},0).wait(1).to({scaleX:0.0753,scaleY:0.0753,x:435,y:307.45},0).wait(1).to({scaleX:0.0813,scaleY:0.0813,x:434.3976,y:308.6012},0).wait(1).to({scaleX:0.0872,scaleY:0.0872,x:433.7952,y:309.7524},0).wait(1).to({scaleX:0.0931,scaleY:0.0931,x:433.1928,y:310.9036},0).wait(1).to({scaleX:0.0991,scaleY:0.0991,x:432.5904,y:312.0548},0).wait(1).to({scaleX:0.105,scaleY:0.105,x:431.988,y:313.206},0).wait(1).to({scaleX:0.1109,scaleY:0.1109,x:431.3855,y:314.3572},0).wait(1).to({scaleX:0.1168,scaleY:0.1168,x:430.7831,y:315.5084},0).wait(1).to({scaleX:0.1228,scaleY:0.1228,x:430.1807,y:316.6596},0).wait(1).to({scaleX:0.1287,scaleY:0.1287,x:429.5783,y:317.8108},0).wait(1).to({scaleX:0.1346,scaleY:0.1346,x:428.9759,y:318.962},0).wait(1).to({scaleX:0.1405,scaleY:0.1405,x:428.3735,y:320.1133},0).wait(1).to({scaleX:0.1465,scaleY:0.1465,x:427.7711,y:321.2645},0).wait(1).to({scaleX:0.1524,scaleY:0.1524,x:427.1687,y:322.4157},0).wait(1).to({scaleX:0.1583,scaleY:0.1583,x:426.5663,y:323.5669},0).wait(1).to({scaleX:0.1642,scaleY:0.1642,x:425.9639,y:324.7181},0).wait(1).to({scaleX:0.1702,scaleY:0.1702,x:425.3615,y:325.8693},0).wait(1).to({scaleX:0.1761,scaleY:0.1761,x:424.759,y:327.0205},0).wait(1).to({scaleX:0.182,scaleY:0.182,x:424.1566,y:328.1717},0).wait(1).to({scaleX:0.1879,scaleY:0.1879,x:423.5542,y:329.3229},0).wait(1).to({scaleX:0.1939,scaleY:0.1939,x:422.9518,y:330.4741},0).wait(1).to({scaleX:0.1998,scaleY:0.1998,x:422.3494,y:331.6253},0).wait(1).to({scaleX:0.2057,scaleY:0.2057,x:421.747,y:332.7765},0).wait(1).to({scaleX:0.2116,scaleY:0.2116,x:421.1446,y:333.9277},0).wait(1).to({scaleX:0.2176,scaleY:0.2176,x:420.5422,y:335.0789},0).wait(1).to({scaleX:0.2235,scaleY:0.2235,x:419.9398,y:336.2301},0).wait(1).to({scaleX:0.2294,scaleY:0.2294,x:419.3374,y:337.3813},0).wait(1).to({scaleX:0.2353,scaleY:0.2353,x:418.7349,y:338.5325},0).wait(1).to({scaleX:0.2413,scaleY:0.2413,x:418.1325,y:339.6837},0).wait(1).to({scaleX:0.2472,scaleY:0.2472,x:417.5301,y:340.8349},0).wait(1).to({scaleX:0.2531,scaleY:0.2531,x:416.9277,y:341.9861},0).wait(1).to({scaleX:0.259,scaleY:0.259,x:416.3253,y:343.1374},0).wait(1).to({scaleX:0.265,scaleY:0.265,x:415.7229,y:344.2886},0).wait(1).to({scaleX:0.2709,scaleY:0.2709,x:415.1205,y:345.4398},0).wait(1).to({scaleX:0.2768,scaleY:0.2768,x:414.5181,y:346.591},0).wait(1).to({scaleX:0.2827,scaleY:0.2827,x:413.9157,y:347.7422},0).wait(1).to({scaleX:0.2887,scaleY:0.2887,x:413.3133,y:348.8934},0).wait(1).to({scaleX:0.2946,scaleY:0.2946,x:412.7108,y:350.0446},0).wait(1).to({scaleX:0.3005,scaleY:0.3005,x:412.1084,y:351.1958},0).wait(1).to({scaleX:0.3065,scaleY:0.3065,x:411.506,y:352.347},0).wait(1).to({scaleX:0.3124,scaleY:0.3124,x:410.9036,y:353.4982},0).wait(1).to({scaleX:0.3183,scaleY:0.3183,x:410.3012,y:354.6494},0).wait(1).to({scaleX:0.3242,scaleY:0.3242,x:409.6988,y:355.8006},0).wait(1).to({scaleX:0.3302,scaleY:0.3302,x:409.0964,y:356.9518},0).wait(1).to({scaleX:0.3361,scaleY:0.3361,x:408.494,y:358.103},0).wait(1).to({scaleX:0.342,scaleY:0.342,x:407.8916,y:359.2542},0).wait(1).to({scaleX:0.3479,scaleY:0.3479,x:407.2892,y:360.4054},0).wait(1).to({scaleX:0.3539,scaleY:0.3539,x:406.6868,y:361.5566},0).wait(1).to({scaleX:0.3598,scaleY:0.3598,x:406.0843,y:362.7078},0).wait(1).to({scaleX:0.3657,scaleY:0.3657,x:405.4819,y:363.859},0).wait(1).to({scaleX:0.3716,scaleY:0.3716,x:404.8795,y:365.0102},0).wait(1).to({scaleX:0.3776,scaleY:0.3776,x:404.2771,y:366.1615},0).wait(1).to({scaleX:0.3835,scaleY:0.3835,x:403.6747,y:367.3127},0).wait(1).to({scaleX:0.3894,scaleY:0.3894,x:403.0723,y:368.4639},0).wait(1).to({scaleX:0.3953,scaleY:0.3953,x:402.4699,y:369.6151},0).wait(1).to({scaleX:0.4013,scaleY:0.4013,x:401.8675,y:370.7663},0).wait(1).to({scaleX:0.4072,scaleY:0.4072,x:401.2651,y:371.9175},0).wait(1).to({scaleX:0.4131,scaleY:0.4131,x:400.6627,y:373.0687},0).wait(1).to({scaleX:0.419,scaleY:0.419,x:400.0602,y:374.2199},0).wait(1).to({scaleX:0.425,scaleY:0.425,x:399.4578,y:375.3711},0).wait(1).to({scaleX:0.4309,scaleY:0.4309,x:398.8554,y:376.5223},0).wait(1).to({scaleX:0.4368,scaleY:0.4368,x:398.253,y:377.6735},0).wait(1).to({scaleX:0.4427,scaleY:0.4427,x:397.6506,y:378.8247},0).wait(1).to({scaleX:0.4487,scaleY:0.4487,x:397.0482,y:379.9759},0).wait(1).to({scaleX:0.4546,scaleY:0.4546,x:396.4458,y:381.1271},0).wait(1).to({scaleX:0.4605,scaleY:0.4605,x:395.8434,y:382.2783},0).wait(1).to({scaleX:0.4664,scaleY:0.4664,x:395.241,y:383.4295},0).wait(1).to({scaleX:0.4724,scaleY:0.4724,x:394.6386,y:384.5807},0).wait(1).to({scaleX:0.4783,scaleY:0.4783,x:394.0361,y:385.7319},0).wait(1).to({scaleX:0.4842,scaleY:0.4842,x:393.4337,y:386.8831},0).wait(1).to({scaleX:0.4901,scaleY:0.4901,x:392.8313,y:388.0343},0).wait(1).to({scaleX:0.4961,scaleY:0.4961,x:392.2289,y:389.1855},0).wait(1).to({scaleX:0.502,scaleY:0.502,x:391.6265,y:390.3368},0).wait(1).to({scaleX:0.5079,scaleY:0.5079,x:391.0241,y:391.488},0).wait(1).to({scaleX:0.5139,scaleY:0.5139,x:390.4217,y:392.6392},0).wait(1).to({scaleX:0.5198,scaleY:0.5198,x:389.8193,y:393.7904},0).wait(1).to({scaleX:0.5257,scaleY:0.5257,x:389.2169,y:394.9416},0).wait(1).to({scaleX:0.5316,scaleY:0.5316,x:388.6145,y:396.0928},0).wait(1).to({scaleX:0.5376,scaleY:0.5376,x:388.0121,y:397.244},0).wait(1).to({scaleX:0.5435,scaleY:0.5435,x:387.4096,y:398.3952},0).wait(1).to({scaleX:0.5494,scaleY:0.5494,x:386.8072,y:399.5464},0).wait(1).to({scaleX:0.5553,scaleY:0.5553,x:386.2048,y:400.6976},0).wait(1).to({scaleX:0.5613,scaleY:0.5613,x:385.6024,y:401.8488},0).wait(1).to({scaleX:0.5672,scaleY:0.5672,x:385,y:403},0).wait(1).to({scaleX:0.5622,scaleY:0.5622,x:386.0037,y:401.3944},0).wait(1).to({scaleX:0.5573,scaleY:0.5573,x:387.0074,y:399.7889},0).wait(1).to({scaleX:0.5523,scaleY:0.5523,x:388.0111,y:398.1833},0).wait(1).to({scaleX:0.5473,scaleY:0.5473,x:389.0148,y:396.5778},0).wait(1).to({scaleX:0.5424,scaleY:0.5424,x:390.0185,y:394.9722},0).wait(1).to({scaleX:0.5374,scaleY:0.5374,x:391.0222,y:393.3667},0).wait(1).to({scaleX:0.5325,scaleY:0.5325,x:392.0259,y:391.7611},0).wait(1).to({scaleX:0.5275,scaleY:0.5275,x:393.0296,y:390.1556},0).wait(1).to({scaleX:0.5225,scaleY:0.5225,x:394.0333,y:388.55},0).wait(1).to({scaleX:0.5176,scaleY:0.5176,x:395.037,y:386.9444},0).wait(1).to({scaleX:0.5126,scaleY:0.5126,x:396.0407,y:385.3389},0).wait(1).to({scaleX:0.5077,scaleY:0.5077,x:397.0444,y:383.7333},0).wait(1).to({scaleX:0.5027,scaleY:0.5027,x:398.0482,y:382.1278},0).wait(1).to({scaleX:0.4977,scaleY:0.4977,x:399.0519,y:380.5222},0).wait(1).to({scaleX:0.4928,scaleY:0.4928,x:400.0556,y:378.9167},0).wait(1).to({scaleX:0.4878,scaleY:0.4878,x:401.0593,y:377.3111},0).wait(1).to({scaleX:0.4829,scaleY:0.4829,x:402.063,y:375.7056},0).wait(1).to({scaleX:0.4779,scaleY:0.4779,x:403.0667,y:374.1},0).wait(1).to({scaleX:0.4729,scaleY:0.4729,x:404.0704,y:372.4944},0).wait(1).to({scaleX:0.468,scaleY:0.468,x:405.0741,y:370.8889},0).wait(1).to({scaleX:0.463,scaleY:0.463,x:406.0778,y:369.2833},0).wait(1).to({scaleX:0.4581,scaleY:0.4581,x:407.0815,y:367.6778},0).wait(1).to({scaleX:0.4531,scaleY:0.4531,x:408.0852,y:366.0722},0).wait(1).to({scaleX:0.4481,scaleY:0.4481,x:409.0889,y:364.4667},0).wait(1).to({scaleX:0.4432,scaleY:0.4432,x:410.0926,y:362.8611},0).wait(1).to({scaleX:0.4382,scaleY:0.4382,x:411.0963,y:361.2556},0).wait(1).to({scaleX:0.4333,scaleY:0.4333,x:412.1,y:359.65},0).wait(1).to({scaleX:0.4283,scaleY:0.4283,x:413.1037,y:358.0444},0).wait(1).to({scaleX:0.4233,scaleY:0.4233,x:414.1074,y:356.4389},0).wait(1).to({scaleX:0.4184,scaleY:0.4184,x:415.1111,y:354.8333},0).wait(1).to({scaleX:0.4134,scaleY:0.4134,x:416.1148,y:353.2278},0).wait(1).to({scaleX:0.4085,scaleY:0.4085,x:417.1185,y:351.6222},0).wait(1).to({scaleX:0.4035,scaleY:0.4035,x:418.1222,y:350.0167},0).wait(1).to({scaleX:0.3985,scaleY:0.3985,x:419.1259,y:348.4111},0).wait(1).to({scaleX:0.3936,scaleY:0.3936,x:420.1296,y:346.8056},0).wait(1).to({scaleX:0.3886,scaleY:0.3886,x:421.1333,y:345.2},0).wait(1).to({scaleX:0.3837,scaleY:0.3837,x:422.137,y:343.5944},0).wait(1).to({scaleX:0.3787,scaleY:0.3787,x:423.1407,y:341.9889},0).wait(1).to({scaleX:0.3737,scaleY:0.3737,x:424.1444,y:340.3833},0).wait(1).to({scaleX:0.3688,scaleY:0.3688,x:425.1482,y:338.7778},0).wait(1).to({scaleX:0.3638,scaleY:0.3638,x:426.1519,y:337.1722},0).wait(1).to({scaleX:0.3589,scaleY:0.3589,x:427.1556,y:335.5667},0).wait(1).to({scaleX:0.3539,scaleY:0.3539,x:428.1593,y:333.9611},0).wait(1).to({scaleX:0.3489,scaleY:0.3489,x:429.163,y:332.3556},0).wait(1).to({scaleX:0.344,scaleY:0.344,x:430.1667,y:330.75},0).wait(1).to({scaleX:0.339,scaleY:0.339,x:431.1704,y:329.1444},0).wait(1).to({scaleX:0.3341,scaleY:0.3341,x:432.1741,y:327.5389},0).wait(1).to({scaleX:0.3291,scaleY:0.3291,x:433.1778,y:325.9333},0).wait(1).to({scaleX:0.3241,scaleY:0.3241,x:434.1815,y:324.3278},0).wait(1).to({scaleX:0.3192,scaleY:0.3192,x:435.1852,y:322.7222},0).wait(1).to({scaleX:0.3142,scaleY:0.3142,x:436.1889,y:321.1167},0).wait(1).to({scaleX:0.3093,scaleY:0.3093,x:437.1926,y:319.5111},0).wait(1).to({scaleX:0.3043,scaleY:0.3043,x:438.1963,y:317.9056},0).wait(1).to({scaleX:0.2993,scaleY:0.2993,x:439.2,y:316.3},0).wait(1).to({scaleX:0.297,scaleY:0.297,x:439.1219,y:316.2828},0).wait(1).to({scaleX:0.2947,scaleY:0.2947,x:439.0438,y:316.2656},0).wait(1).to({scaleX:0.2923,scaleY:0.2923,x:438.9656,y:316.2484},0).wait(1).to({scaleX:0.29,scaleY:0.29,x:438.8875,y:316.2313},0).wait(1).to({scaleX:0.2876,scaleY:0.2876,x:438.8094,y:316.2141},0).wait(1).to({scaleX:0.2853,scaleY:0.2853,x:438.7313,y:316.1969},0).wait(1).to({scaleX:0.283,scaleY:0.283,x:438.6531,y:316.1797},0).wait(1).to({scaleX:0.2806,scaleY:0.2806,x:438.575,y:316.1625},0).wait(1).to({scaleX:0.2783,scaleY:0.2783,x:438.4969,y:316.1453},0).wait(1).to({scaleX:0.2759,scaleY:0.2759,x:438.4188,y:316.1281},0).wait(1).to({scaleX:0.2736,scaleY:0.2736,x:438.3406,y:316.1109},0).wait(1).to({scaleX:0.2713,scaleY:0.2713,x:438.2625,y:316.0938},0).wait(1).to({scaleX:0.2689,scaleY:0.2689,x:438.1844,y:316.0766},0).wait(1).to({scaleX:0.2666,scaleY:0.2666,x:438.1063,y:316.0594},0).wait(1).to({scaleX:0.2642,scaleY:0.2642,x:438.0281,y:316.0422},0).wait(1).to({scaleX:0.2619,scaleY:0.2619,x:437.95,y:316.025},0).wait(1).to({scaleX:0.2596,scaleY:0.2596,x:437.8719,y:316.0078},0).wait(1).to({scaleX:0.2572,scaleY:0.2572,x:437.7938,y:315.9906},0).wait(1).to({scaleX:0.2549,scaleY:0.2549,x:437.7156,y:315.9734},0).wait(1).to({scaleX:0.2526,scaleY:0.2526,x:437.6375,y:315.9563},0).wait(1).to({scaleX:0.2502,scaleY:0.2502,x:437.5594,y:315.9391},0).wait(1).to({scaleX:0.2479,scaleY:0.2479,x:437.4813,y:315.9219},0).wait(1).to({scaleX:0.2455,scaleY:0.2455,x:437.4031,y:315.9047},0).wait(1).to({scaleX:0.2432,scaleY:0.2432,x:437.325,y:315.8875},0).wait(1).to({scaleX:0.2409,scaleY:0.2409,x:437.2469,y:315.8703},0).wait(1).to({scaleX:0.2385,scaleY:0.2385,x:437.1688,y:315.8531},0).wait(1).to({scaleX:0.2362,scaleY:0.2362,x:437.0906,y:315.8359},0).wait(1).to({scaleX:0.2338,scaleY:0.2338,x:437.0125,y:315.8188},0).wait(1).to({scaleX:0.2315,scaleY:0.2315,x:436.9344,y:315.8016},0).wait(1).to({scaleX:0.2292,scaleY:0.2292,x:436.8563,y:315.7844},0).wait(1).to({scaleX:0.2268,scaleY:0.2268,x:436.7781,y:315.7672},0).wait(1).to({scaleX:0.2245,scaleY:0.2245,x:436.7,y:315.75},0).wait(1).to({scaleX:0.2221,scaleY:0.2221,x:436.6219,y:315.7328},0).wait(1).to({scaleX:0.2198,scaleY:0.2198,x:436.5438,y:315.7156},0).wait(1).to({scaleX:0.2175,scaleY:0.2175,x:436.4656,y:315.6984},0).wait(1).to({scaleX:0.2151,scaleY:0.2151,x:436.3875,y:315.6813},0).wait(1).to({scaleX:0.2128,scaleY:0.2128,x:436.3094,y:315.6641},0).wait(1).to({scaleX:0.2104,scaleY:0.2104,x:436.2313,y:315.6469},0).wait(1).to({scaleX:0.2081,scaleY:0.2081,x:436.1531,y:315.6297},0).wait(1).to({scaleX:0.2058,scaleY:0.2058,x:436.075,y:315.6125},0).wait(1).to({scaleX:0.2034,scaleY:0.2034,x:435.9969,y:315.5953},0).wait(1).to({scaleX:0.2011,scaleY:0.2011,x:435.9188,y:315.5781},0).wait(1).to({scaleX:0.1988,scaleY:0.1988,x:435.8406,y:315.5609},0).wait(1).to({scaleX:0.1964,scaleY:0.1964,x:435.7625,y:315.5438},0).wait(1).to({scaleX:0.1941,scaleY:0.1941,x:435.6844,y:315.5266},0).wait(1).to({scaleX:0.1917,scaleY:0.1917,x:435.6063,y:315.5094},0).wait(1).to({scaleX:0.1894,scaleY:0.1894,x:435.5281,y:315.4922},0).wait(1).to({scaleX:0.1871,scaleY:0.1871,x:435.45,y:315.475},0).wait(1).to({scaleX:0.1847,scaleY:0.1847,x:435.3719,y:315.4578},0).wait(1).to({scaleX:0.1824,scaleY:0.1824,x:435.2938,y:315.4406},0).wait(1).to({scaleX:0.18,scaleY:0.18,x:435.2156,y:315.4234},0).wait(1).to({scaleX:0.1777,scaleY:0.1777,x:435.1375,y:315.4063},0).wait(1).to({scaleX:0.1754,scaleY:0.1754,x:435.0594,y:315.3891},0).wait(1).to({scaleX:0.173,scaleY:0.173,x:434.9813,y:315.3719},0).wait(1).to({scaleX:0.1707,scaleY:0.1707,x:434.9031,y:315.3547},0).wait(1).to({scaleX:0.1683,scaleY:0.1683,x:434.825,y:315.3375},0).wait(1).to({scaleX:0.166,scaleY:0.166,x:434.7469,y:315.3203},0).wait(1).to({scaleX:0.1637,scaleY:0.1637,x:434.6688,y:315.3031},0).wait(1).to({scaleX:0.1613,scaleY:0.1613,x:434.5906,y:315.2859},0).wait(1).to({scaleX:0.159,scaleY:0.159,x:434.5125,y:315.2688},0).wait(1).to({scaleX:0.1567,scaleY:0.1567,x:434.4344,y:315.2516},0).wait(1).to({scaleX:0.1543,scaleY:0.1543,x:434.3563,y:315.2344},0).wait(1).to({scaleX:0.152,scaleY:0.152,x:434.2781,y:315.2172},0).wait(1).to({scaleX:0.1496,scaleY:0.1496,x:434.2,y:315.2},0).wait(1).to({scaleX:0.1473,scaleY:0.1473,x:434.1219,y:315.1828},0).wait(1).to({scaleX:0.145,scaleY:0.145,x:434.0438,y:315.1656},0).wait(1).to({scaleX:0.1426,scaleY:0.1426,x:433.9656,y:315.1484},0).wait(1).to({scaleX:0.1403,scaleY:0.1403,x:433.8875,y:315.1313},0).wait(1).to({scaleX:0.1379,scaleY:0.1379,x:433.8094,y:315.1141},0).wait(1).to({scaleX:0.1356,scaleY:0.1356,x:433.7313,y:315.0969},0).wait(1).to({scaleX:0.1333,scaleY:0.1333,x:433.6531,y:315.0797},0).wait(1).to({scaleX:0.1309,scaleY:0.1309,x:433.575,y:315.0625},0).wait(1).to({scaleX:0.1286,scaleY:0.1286,x:433.4969,y:315.0453},0).wait(1).to({scaleX:0.1262,scaleY:0.1262,x:433.4188,y:315.0281},0).wait(1).to({scaleX:0.1239,scaleY:0.1239,x:433.3406,y:315.0109},0).wait(1).to({scaleX:0.1216,scaleY:0.1216,x:433.2625,y:314.9938},0).wait(1).to({scaleX:0.1192,scaleY:0.1192,x:433.1844,y:314.9766},0).wait(1).to({scaleX:0.1169,scaleY:0.1169,x:433.1063,y:314.9594},0).wait(1).to({scaleX:0.1145,scaleY:0.1145,x:433.0281,y:314.9422},0).wait(1).to({scaleX:0.1122,scaleY:0.1122,x:432.95,y:314.925},0).wait(1).to({scaleX:0.1099,scaleY:0.1099,x:432.8719,y:314.9078},0).wait(1).to({scaleX:0.1075,scaleY:0.1075,x:432.7938,y:314.8906},0).wait(1).to({scaleX:0.1052,scaleY:0.1052,x:432.7156,y:314.8734},0).wait(1).to({scaleX:0.1029,scaleY:0.1029,x:432.6375,y:314.8563},0).wait(1).to({scaleX:0.1005,scaleY:0.1005,x:432.5594,y:314.8391},0).wait(1).to({scaleX:0.0982,scaleY:0.0982,x:432.4813,y:314.8219},0).wait(1).to({scaleX:0.0958,scaleY:0.0958,x:432.4031,y:314.8047},0).wait(1).to({scaleX:0.0935,scaleY:0.0935,x:432.325,y:314.7875},0).wait(1).to({scaleX:0.0912,scaleY:0.0912,x:432.2469,y:314.7703},0).wait(1).to({scaleX:0.0888,scaleY:0.0888,x:432.1688,y:314.7531},0).wait(1).to({scaleX:0.0865,scaleY:0.0865,x:432.0906,y:314.7359},0).wait(1).to({scaleX:0.0841,scaleY:0.0841,x:432.0125,y:314.7188},0).wait(1).to({scaleX:0.0818,scaleY:0.0818,x:431.9344,y:314.7016},0).wait(1).to({scaleX:0.0795,scaleY:0.0795,x:431.8563,y:314.6844},0).wait(1).to({scaleX:0.0771,scaleY:0.0771,x:431.7781,y:314.6672},0).wait(1).to({scaleX:0.0748,scaleY:0.0748,x:431.7,y:314.65},0).wait(1).to({scaleX:0.0792,scaleY:0.0792,x:432.7067,y:314.795},0).wait(1).to({scaleX:0.0836,scaleY:0.0836,x:433.7133,y:314.94},0).wait(1).to({scaleX:0.088,scaleY:0.088,x:434.72,y:315.085},0).wait(1).to({scaleX:0.0924,scaleY:0.0924,x:435.7267,y:315.23},0).wait(1).to({scaleX:0.0967,scaleY:0.0967,x:436.7333,y:315.375},0).wait(1).to({scaleX:0.1011,scaleY:0.1011,x:437.74,y:315.52},0).wait(1).to({scaleX:0.1055,scaleY:0.1055,x:438.7467,y:315.665},0).wait(1).to({scaleX:0.1099,scaleY:0.1099,x:439.7533,y:315.81},0).wait(1).to({scaleX:0.1143,scaleY:0.1143,x:440.76,y:315.955},0).wait(1).to({scaleX:0.1187,scaleY:0.1187,x:441.7667,y:316.1},0).wait(1).to({scaleX:0.1231,scaleY:0.1231,x:442.7733,y:316.245},0).wait(1).to({scaleX:0.1275,scaleY:0.1275,x:443.78,y:316.39},0).wait(1).to({scaleX:0.1319,scaleY:0.1319,x:444.7867,y:316.535},0).wait(1).to({scaleX:0.1363,scaleY:0.1363,x:445.7933,y:316.68},0).wait(1).to({scaleX:0.1407,scaleY:0.1407,x:446.8,y:316.825},0).wait(1).to({scaleX:0.1451,scaleY:0.1451,x:447.8067,y:316.97},0).wait(1).to({scaleX:0.1495,scaleY:0.1495,x:448.8133,y:317.115},0).wait(1).to({scaleX:0.1538,scaleY:0.1538,x:449.82,y:317.26},0).wait(1).to({scaleX:0.1582,scaleY:0.1582,x:450.8267,y:317.405},0).wait(1).to({scaleX:0.1626,scaleY:0.1626,x:451.8333,y:317.55},0).wait(1).to({scaleX:0.167,scaleY:0.167,x:452.84,y:317.695},0).wait(1).to({scaleX:0.1714,scaleY:0.1714,x:453.8467,y:317.84},0).wait(1).to({scaleX:0.1758,scaleY:0.1758,x:454.8533,y:317.985},0).wait(1).to({scaleX:0.1802,scaleY:0.1802,x:455.86,y:318.13},0).wait(1).to({scaleX:0.1846,scaleY:0.1846,x:456.8667,y:318.275},0).wait(1).to({scaleX:0.189,scaleY:0.189,x:457.8733,y:318.42},0).wait(1).to({scaleX:0.1934,scaleY:0.1934,x:458.88,y:318.565},0).wait(1).to({scaleX:0.1978,scaleY:0.1978,x:459.8867,y:318.71},0).wait(1).to({scaleX:0.2022,scaleY:0.2022,x:460.8933,y:318.855},0).wait(1).to({scaleX:0.2065,scaleY:0.2065,x:461.9,y:319},0).wait(1).to({scaleX:0.2109,scaleY:0.2109,x:462.9067,y:319.145},0).wait(1).to({scaleX:0.2153,scaleY:0.2153,x:463.9133,y:319.29},0).wait(1).to({scaleX:0.2197,scaleY:0.2197,x:464.92,y:319.435},0).wait(1).to({scaleX:0.2241,scaleY:0.2241,x:465.9267,y:319.58},0).wait(1).to({scaleX:0.2285,scaleY:0.2285,x:466.9333,y:319.725},0).wait(1).to({scaleX:0.2329,scaleY:0.2329,x:467.94,y:319.87},0).wait(1).to({scaleX:0.2373,scaleY:0.2373,x:468.9467,y:320.015},0).wait(1).to({scaleX:0.2417,scaleY:0.2417,x:469.9533,y:320.16},0).wait(1).to({scaleX:0.2461,scaleY:0.2461,x:470.96,y:320.305},0).wait(1).to({scaleX:0.2505,scaleY:0.2505,x:471.9667,y:320.45},0).wait(1).to({scaleX:0.2549,scaleY:0.2549,x:472.9733,y:320.595},0).wait(1).to({scaleX:0.2593,scaleY:0.2593,x:473.98,y:320.74},0).wait(1).to({scaleX:0.2636,scaleY:0.2636,x:474.9867,y:320.885},0).wait(1).to({scaleX:0.268,scaleY:0.268,x:475.9933,y:321.03},0).wait(1).to({scaleX:0.2724,scaleY:0.2724,x:477,y:321.175},0).wait(1).to({scaleX:0.2768,scaleY:0.2768,x:478.0067,y:321.32},0).wait(1).to({scaleX:0.2812,scaleY:0.2812,x:479.0133,y:321.465},0).wait(1).to({scaleX:0.2856,scaleY:0.2856,x:480.02,y:321.61},0).wait(1).to({scaleX:0.29,scaleY:0.29,x:481.0267,y:321.755},0).wait(1).to({scaleX:0.2944,scaleY:0.2944,x:482.0333,y:321.9},0).wait(1).to({scaleX:0.2988,scaleY:0.2988,x:483.04,y:322.045},0).wait(1).to({scaleX:0.3032,scaleY:0.3032,x:484.0467,y:322.19},0).wait(1).to({scaleX:0.3076,scaleY:0.3076,x:485.0533,y:322.335},0).wait(1).to({scaleX:0.312,scaleY:0.312,x:486.06,y:322.48},0).wait(1).to({scaleX:0.3164,scaleY:0.3164,x:487.0667,y:322.625},0).wait(1).to({scaleX:0.3207,scaleY:0.3207,x:488.0733,y:322.77},0).wait(1).to({scaleX:0.3251,scaleY:0.3251,x:489.08,y:322.915},0).wait(1).to({scaleX:0.3295,scaleY:0.3295,x:490.0867,y:323.06},0).wait(1).to({scaleX:0.3339,scaleY:0.3339,x:491.0933,y:323.205},0).wait(1).to({scaleX:0.3383,scaleY:0.3383,x:492.1,y:323.35},0).wait(1).to({scaleX:0.3427,scaleY:0.3427,x:493.1067,y:323.495},0).wait(1).to({scaleX:0.3471,scaleY:0.3471,x:494.1133,y:323.64},0).wait(1).to({scaleX:0.3515,scaleY:0.3515,x:495.12,y:323.785},0).wait(1).to({scaleX:0.3559,scaleY:0.3559,x:496.1267,y:323.93},0).wait(1).to({scaleX:0.3603,scaleY:0.3603,x:497.1333,y:324.075},0).wait(1).to({scaleX:0.3647,scaleY:0.3647,x:498.14,y:324.22},0).wait(1).to({scaleX:0.3691,scaleY:0.3691,x:499.1467,y:324.365},0).wait(1).to({scaleX:0.3735,scaleY:0.3735,x:500.1533,y:324.51},0).wait(1).to({scaleX:0.3778,scaleY:0.3778,x:501.16,y:324.655},0).wait(1).to({scaleX:0.3822,scaleY:0.3822,x:502.1667,y:324.8},0).wait(1).to({scaleX:0.3866,scaleY:0.3866,x:503.1733,y:324.945},0).wait(1).to({scaleX:0.391,scaleY:0.391,x:504.18,y:325.09},0).wait(1).to({scaleX:0.3954,scaleY:0.3954,x:505.1867,y:325.235},0).wait(1).to({scaleX:0.3998,scaleY:0.3998,x:506.1933,y:325.38},0).wait(1).to({scaleX:0.4042,scaleY:0.4042,x:507.2,y:325.525},0).wait(1).to({scaleX:0.4086,scaleY:0.4086,x:508.2067,y:325.67},0).wait(1).to({scaleX:0.413,scaleY:0.413,x:509.2133,y:325.815},0).wait(1).to({scaleX:0.4174,scaleY:0.4174,x:510.22,y:325.96},0).wait(1).to({scaleX:0.4218,scaleY:0.4218,x:511.2267,y:326.105},0).wait(1).to({scaleX:0.4262,scaleY:0.4262,x:512.2333,y:326.25},0).wait(1).to({scaleX:0.4306,scaleY:0.4306,x:513.24,y:326.395},0).wait(1).to({scaleX:0.4349,scaleY:0.4349,x:514.2467,y:326.54},0).wait(1).to({scaleX:0.4393,scaleY:0.4393,x:515.2533,y:326.685},0).wait(1).to({scaleX:0.4437,scaleY:0.4437,x:516.26,y:326.83},0).wait(1).to({scaleX:0.4481,scaleY:0.4481,x:517.2667,y:326.975},0).wait(1).to({scaleX:0.4525,scaleY:0.4525,x:518.2733,y:327.12},0).wait(1).to({scaleX:0.4569,scaleY:0.4569,x:519.28,y:327.265},0).wait(1).to({scaleX:0.4613,scaleY:0.4613,x:520.2867,y:327.41},0).wait(1).to({scaleX:0.4657,scaleY:0.4657,x:521.2933,y:327.555},0).wait(1).to({scaleX:0.4701,scaleY:0.4701,x:522.3,y:327.7},0).wait(1).to({scaleX:0.4745,scaleY:0.4745,x:523.3067,y:327.845},0).wait(1).to({scaleX:0.4789,scaleY:0.4789,x:524.3133,y:327.99},0).wait(1).to({scaleX:0.4833,scaleY:0.4833,x:525.32,y:328.135},0).wait(1).to({scaleX:0.4877,scaleY:0.4877,x:526.3267,y:328.28},0).wait(1).to({scaleX:0.492,scaleY:0.492,x:527.3333,y:328.425},0).wait(1).to({scaleX:0.4964,scaleY:0.4964,x:528.34,y:328.57},0).wait(1).to({scaleX:0.5008,scaleY:0.5008,x:529.3467,y:328.715},0).wait(1).to({scaleX:0.5052,scaleY:0.5052,x:530.3533,y:328.86},0).wait(1).to({scaleX:0.5096,scaleY:0.5096,x:531.36,y:329.005},0).wait(1).to({scaleX:0.514,scaleY:0.514,x:532.3667,y:329.15},0).wait(1).to({scaleX:0.5184,scaleY:0.5184,x:533.3733,y:329.295},0).wait(1).to({scaleX:0.5228,scaleY:0.5228,x:534.38,y:329.44},0).wait(1).to({scaleX:0.5272,scaleY:0.5272,x:535.3867,y:329.585},0).wait(1).to({scaleX:0.5316,scaleY:0.5316,x:536.3933,y:329.73},0).wait(1).to({scaleX:0.536,scaleY:0.536,x:537.4,y:329.875},0).wait(1).to({scaleX:0.5404,scaleY:0.5404,x:538.4067,y:330.02},0).wait(1).to({scaleX:0.5447,scaleY:0.5447,x:539.4133,y:330.165},0).wait(1).to({scaleX:0.5491,scaleY:0.5491,x:540.42,y:330.31},0).wait(1).to({scaleX:0.5535,scaleY:0.5535,x:541.4267,y:330.455},0).wait(1).to({scaleX:0.5579,scaleY:0.5579,x:542.4333,y:330.6},0).wait(1).to({scaleX:0.5623,scaleY:0.5623,x:543.44,y:330.745},0).wait(1).to({scaleX:0.5667,scaleY:0.5667,x:544.4467,y:330.89},0).wait(1).to({scaleX:0.5711,scaleY:0.5711,x:545.4533,y:331.035},0).wait(1).to({scaleX:0.5755,scaleY:0.5755,x:546.46,y:331.18},0).wait(1).to({scaleX:0.5799,scaleY:0.5799,x:547.4667,y:331.325},0).wait(1).to({scaleX:0.5843,scaleY:0.5843,x:548.4733,y:331.47},0).wait(1).to({scaleX:0.5887,scaleY:0.5887,x:549.48,y:331.615},0).wait(1).to({scaleX:0.5931,scaleY:0.5931,x:550.4867,y:331.76},0).wait(1).to({scaleX:0.5975,scaleY:0.5975,x:551.4933,y:331.905},0).wait(1).to({scaleX:0.6018,scaleY:0.6018,x:552.5,y:332.05},0).wait(1).to({scaleX:0.6062,scaleY:0.6062,x:553.5067,y:332.195},0).wait(1).to({scaleX:0.6106,scaleY:0.6106,x:554.5133,y:332.34},0).wait(1).to({scaleX:0.615,scaleY:0.615,x:555.52,y:332.485},0).wait(1).to({scaleX:0.6194,scaleY:0.6194,x:556.5267,y:332.63},0).wait(1).to({scaleX:0.6238,scaleY:0.6238,x:557.5333,y:332.775},0).wait(1).to({scaleX:0.6282,scaleY:0.6282,x:558.54,y:332.92},0).wait(1).to({scaleX:0.6326,scaleY:0.6326,x:559.5467,y:333.065},0).wait(1).to({scaleX:0.637,scaleY:0.637,x:560.5533,y:333.21},0).wait(1).to({scaleX:0.6414,scaleY:0.6414,x:561.56,y:333.355},0).wait(1).to({scaleX:0.6458,scaleY:0.6458,x:562.5667,y:333.5},0).wait(1).to({scaleX:0.6502,scaleY:0.6502,x:563.5733,y:333.645},0).wait(1).to({scaleX:0.6546,scaleY:0.6546,x:564.58,y:333.79},0).wait(1).to({scaleX:0.6589,scaleY:0.6589,x:565.5867,y:333.935},0).wait(1).to({scaleX:0.6633,scaleY:0.6633,x:566.5933,y:334.08},0).wait(1).to({scaleX:0.6677,scaleY:0.6677,x:567.6,y:334.225},0).wait(1).to({scaleX:0.6721,scaleY:0.6721,x:568.6067,y:334.37},0).wait(1).to({scaleX:0.6765,scaleY:0.6765,x:569.6133,y:334.515},0).wait(1).to({scaleX:0.6809,scaleY:0.6809,x:570.62,y:334.66},0).wait(1).to({scaleX:0.6853,scaleY:0.6853,x:571.6267,y:334.805},0).wait(1).to({scaleX:0.6897,scaleY:0.6897,x:572.6333,y:334.95},0).wait(1).to({scaleX:0.6941,scaleY:0.6941,x:573.64,y:335.095},0).wait(1).to({scaleX:0.6985,scaleY:0.6985,x:574.6467,y:335.24},0).wait(1).to({scaleX:0.7029,scaleY:0.7029,x:575.6533,y:335.385},0).wait(1).to({scaleX:0.7073,scaleY:0.7073,x:576.66,y:335.53},0).wait(1).to({scaleX:0.7117,scaleY:0.7117,x:577.6667,y:335.675},0).wait(1).to({scaleX:0.716,scaleY:0.716,x:578.6733,y:335.82},0).wait(1).to({scaleX:0.7204,scaleY:0.7204,x:579.68,y:335.965},0).wait(1).to({scaleX:0.7248,scaleY:0.7248,x:580.6867,y:336.11},0).wait(1).to({scaleX:0.7292,scaleY:0.7292,x:581.6933,y:336.255},0).wait(1).to({scaleX:0.7336,scaleY:0.7336,x:582.7,y:336.4},0).wait(1).to({scaleX:0.738,scaleY:0.738,x:583.7067,y:336.545},0).wait(1).to({scaleX:0.7424,scaleY:0.7424,x:584.7133,y:336.69},0).wait(1).to({scaleX:0.7468,scaleY:0.7468,x:585.72,y:336.835},0).wait(1).to({scaleX:0.7512,scaleY:0.7512,x:586.7267,y:336.98},0).wait(1).to({scaleX:0.7556,scaleY:0.7556,x:587.7333,y:337.125},0).wait(1).to({scaleX:0.76,scaleY:0.76,x:588.74,y:337.27},0).wait(1).to({scaleX:0.7644,scaleY:0.7644,x:589.7467,y:337.415},0).wait(1).to({scaleX:0.7688,scaleY:0.7688,x:590.7533,y:337.56},0).wait(1).to({scaleX:0.7731,scaleY:0.7731,x:591.76,y:337.705},0).wait(1).to({scaleX:0.7775,scaleY:0.7775,x:592.7667,y:337.85},0).wait(1).to({scaleX:0.7819,scaleY:0.7819,x:593.7733,y:337.995},0).wait(1).to({scaleX:0.7863,scaleY:0.7863,x:594.78,y:338.14},0).wait(1).to({scaleX:0.7907,scaleY:0.7907,x:595.7867,y:338.285},0).wait(1).to({scaleX:0.7951,scaleY:0.7951,x:596.7933,y:338.43},0).wait(1).to({scaleX:0.7995,scaleY:0.7995,x:597.8,y:338.575},0).wait(1).to({scaleX:0.8039,scaleY:0.8039,x:598.8067,y:338.72},0).wait(1).to({scaleX:0.8083,scaleY:0.8083,x:599.8133,y:338.865},0).wait(1).to({scaleX:0.8127,scaleY:0.8127,x:600.82,y:339.01},0).wait(1).to({scaleX:0.8171,scaleY:0.8171,x:601.8267,y:339.155},0).wait(1).to({scaleX:0.8215,scaleY:0.8215,x:602.8333,y:339.3},0).wait(1).to({scaleX:0.8259,scaleY:0.8259,x:603.84,y:339.445},0).wait(1).to({scaleX:0.8302,scaleY:0.8302,x:604.8467,y:339.59},0).wait(1).to({scaleX:0.8346,scaleY:0.8346,x:605.8533,y:339.735},0).wait(1).to({scaleX:0.839,scaleY:0.839,x:606.86,y:339.88},0).wait(1).to({scaleX:0.8434,scaleY:0.8434,x:607.8667,y:340.025},0).wait(1).to({scaleX:0.8478,scaleY:0.8478,x:608.8733,y:340.17},0).wait(1).to({scaleX:0.8522,scaleY:0.8522,x:609.88,y:340.315},0).wait(1).to({scaleX:0.8566,scaleY:0.8566,x:610.8867,y:340.46},0).wait(1).to({scaleX:0.861,scaleY:0.861,x:611.8933,y:340.605},0).wait(1).to({scaleX:0.8654,scaleY:0.8654,x:612.9,y:340.75},0).wait(1).to({scaleX:0.8698,scaleY:0.8698,x:613.9067,y:340.895},0).wait(1).to({scaleX:0.8742,scaleY:0.8742,x:614.9133,y:341.04},0).wait(1).to({scaleX:0.8786,scaleY:0.8786,x:615.92,y:341.185},0).wait(1).to({scaleX:0.8829,scaleY:0.8829,x:616.9267,y:341.33},0).wait(1).to({scaleX:0.8873,scaleY:0.8873,x:617.9333,y:341.475},0).wait(1).to({scaleX:0.8917,scaleY:0.8917,x:618.94,y:341.62},0).wait(1).to({scaleX:0.8961,scaleY:0.8961,x:619.9467,y:341.765},0).wait(1).to({scaleX:0.9005,scaleY:0.9005,x:620.9533,y:341.91},0).wait(1).to({scaleX:0.9049,scaleY:0.9049,x:621.96,y:342.055},0).wait(1).to({scaleX:0.9093,scaleY:0.9093,x:622.9667,y:342.2},0).wait(1).to({scaleX:0.9137,scaleY:0.9137,x:623.9733,y:342.345},0).wait(1).to({scaleX:0.9181,scaleY:0.9181,x:624.98,y:342.49},0).wait(1).to({scaleX:0.9225,scaleY:0.9225,x:625.9867,y:342.635},0).wait(1).to({scaleX:0.9269,scaleY:0.9269,x:626.9933,y:342.78},0).wait(1).to({scaleX:0.9313,scaleY:0.9313,x:628,y:342.925},0).wait(1).to({scaleX:0.9357,scaleY:0.9357,x:629.0067,y:343.07},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:630.0133,y:343.215},0).wait(1).to({scaleX:0.9444,scaleY:0.9444,x:631.02,y:343.36},0).wait(1).to({scaleX:0.9488,scaleY:0.9488,x:632.0267,y:343.505},0).wait(1).to({scaleX:0.9532,scaleY:0.9532,x:633.0333,y:343.65},0).wait(1).to({scaleX:0.9576,scaleY:0.9576,x:634.04,y:343.795},0).wait(1).to({scaleX:0.962,scaleY:0.962,x:635.0467,y:343.94},0).wait(1).to({scaleX:0.9664,scaleY:0.9664,x:636.0533,y:344.085},0).wait(1).to({scaleX:0.9708,scaleY:0.9708,x:637.06,y:344.23},0).wait(1).to({scaleX:0.9752,scaleY:0.9752,x:638.0667,y:344.375},0).wait(1).to({scaleX:0.9796,scaleY:0.9796,x:639.0733,y:344.52},0).wait(1).to({scaleX:0.984,scaleY:0.984,x:640.08,y:344.665},0).wait(1).to({scaleX:0.9884,scaleY:0.9884,x:641.0867,y:344.81},0).wait(1).to({scaleX:0.9928,scaleY:0.9928,x:642.0933,y:344.955},0).wait(1).to({scaleX:0.9971,scaleY:0.9971,x:643.1,y:345.1},0).wait(1).to({scaleX:1,scaleY:1,x:640,y:360},0).to({_off:true},1).wait(103));

	// actions_obj_
	this.actions = new lib.Scene_1_actions();
	this.actions.name = "actions";
	this.actions.setTransform(684.2,385.1,1,1,0,0,0,684.2,385.1);
	this.actions.depth = 0;
	this.actions.isAttachedToCamera = 0
	this.actions.isAttachedToMask = 0
	this.actions.layerDepth = 0
	this.actions.layerIndex = 0
	this.actions.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.actions).wait(847));

	// cloud_obj_
	this.cloud = new lib.Scene_1_cloud();
	this.cloud.name = "cloud";
	this.cloud.setTransform(318.2,106.5,1,1,0,0,0,318.2,106.5);
	this.cloud.depth = 0;
	this.cloud.isAttachedToCamera = 0
	this.cloud.isAttachedToMask = 0
	this.cloud.layerDepth = 0
	this.cloud.layerIndex = 1
	this.cloud.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.cloud).wait(1).to({regX:640.7,x:640.7},0).wait(143).to({_off:true},1).wait(702));

	// wave_obj_
	this.wave = new lib.Scene_1_wave();
	this.wave.name = "wave";
	this.wave.setTransform(871.9,671,1,1,0,0,0,871.9,671);
	this.wave.depth = 0;
	this.wave.isAttachedToCamera = 0
	this.wave.isAttachedToMask = 0
	this.wave.layerDepth = 0
	this.wave.layerIndex = 2
	this.wave.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wave).wait(1).to({regX:789.7,regY:611.8,x:789.7,y:611.8},0).wait(143).to({_off:true},1).wait(702));

	// wave_3_obj_
	this.wave_3 = new lib.Scene_1_wave_3();
	this.wave_3.name = "wave_3";
	this.wave_3.setTransform(1028,706.4,1,1,0,0,0,1028,706.4);
	this.wave_3.depth = 0;
	this.wave_3.isAttachedToCamera = 0
	this.wave_3.isAttachedToMask = 0
	this.wave_3.layerDepth = 0
	this.wave_3.layerIndex = 3
	this.wave_3.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wave_3).wait(1).to({regX:853.6,regY:623.9,x:853.6,y:623.9},0).wait(143).to({_off:true},1).wait(702));

	// wave_5_obj_
	this.wave_5 = new lib.Scene_1_wave_5();
	this.wave_5.name = "wave_5";
	this.wave_5.setTransform(672.9,715,1,1,0,0,0,672.9,715);
	this.wave_5.depth = 0;
	this.wave_5.isAttachedToCamera = 0
	this.wave_5.isAttachedToMask = 0
	this.wave_5.layerDepth = 0
	this.wave_5.layerIndex = 4
	this.wave_5.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wave_5).wait(1).to({regX:709.6,regY:625.9,x:709.6,y:625.9},0).wait(143).to({_off:true},1).wait(702));

	// wave_4_obj_
	this.wave_4 = new lib.Scene_1_wave_4();
	this.wave_4.name = "wave_4";
	this.wave_4.setTransform(446.9,702.4,1,1,0,0,0,446.9,702.4);
	this.wave_4.depth = 0;
	this.wave_4.isAttachedToCamera = 0
	this.wave_4.isAttachedToMask = 0
	this.wave_4.layerDepth = 0
	this.wave_4.layerIndex = 5
	this.wave_4.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wave_4).wait(1).to({regX:580.8,regY:621.8,x:580.8,y:621.8},0).wait(143).to({_off:true},1).wait(702));

	// wave_6_obj_
	this.wave_6 = new lib.Scene_1_wave_6();
	this.wave_6.name = "wave_6";
	this.wave_6.depth = 0;
	this.wave_6.isAttachedToCamera = 0
	this.wave_6.isAttachedToMask = 0
	this.wave_6.layerDepth = 0
	this.wave_6.layerIndex = 6
	this.wave_6.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wave_6).wait(2).to({regX:682.7,regY:536.3,x:682.7,y:536.3},0).wait(142).to({_off:true},1).wait(702));

	// wave_obj_
	this.wave_1 = new lib.Scene_1_wave_1();
	this.wave_1.name = "wave_1";
	this.wave_1.depth = 0;
	this.wave_1.isAttachedToCamera = 0
	this.wave_1.isAttachedToMask = 0
	this.wave_1.layerDepth = 0
	this.wave_1.layerIndex = 7
	this.wave_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wave_1).wait(3).to({regX:2114.4,regY:1069.9,x:2114.4,y:1069.9},0).wait(141).to({_off:true},1).wait(702));

	// Hills_obj_
	this.Hills = new lib.Scene_1_Hills();
	this.Hills.name = "Hills";
	this.Hills.setTransform(639.9,417.9,1,1,0,0,0,639.9,417.9);
	this.Hills.depth = 0;
	this.Hills.isAttachedToCamera = 0
	this.Hills.isAttachedToMask = 0
	this.Hills.layerDepth = 0
	this.Hills.layerIndex = 8
	this.Hills.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Hills).wait(77).to({_off:true},68).wait(702));

	// sun_obj_
	this.sun = new lib.Scene_1_sun();
	this.sun.name = "sun";
	this.sun.setTransform(1080.2,419.5,1,1,0,0,0,1080.2,419.5);
	this.sun.depth = 0;
	this.sun.isAttachedToCamera = 0
	this.sun.isAttachedToMask = 0
	this.sun.layerDepth = 0
	this.sun.layerIndex = 9
	this.sun.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sun).wait(145).to({regX:1073.5,regY:418.6,scaleX:1.0151,scaleY:1.0151,x:1080.1,y:419.55},0).to({_off:true},117).wait(585));

	// Breathe_obj_
	this.Breathe = new lib.Scene_1_Breathe();
	this.Breathe.name = "Breathe";
	this.Breathe.depth = 0;
	this.Breathe.isAttachedToCamera = 0
	this.Breathe.isAttachedToMask = 0
	this.Breathe.layerDepth = 0
	this.Breathe.layerIndex = 10
	this.Breathe.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Breathe).wait(145).to({regX:9.5,regY:5.3,scaleX:1.0151,scaleY:1.0151},0).wait(72).to({regX:208.3,regY:152.1,scaleX:2.0262,scaleY:2.0262,x:0.05,y:0.05},0).wait(38).to({regX:313.2,regY:229.6,scaleX:4.2711,scaleY:4.2711,x:-0.2,y:0.25},0).wait(6).to({regX:329.8,regY:241.8,scaleX:5.1766,scaleY:5.1766,x:0.05,y:0.3},0).wait(30).to({regX:377.9,regY:274.8,scaleX:11.0034,scaleY:11.0034,x:0,y:0.55},0).wait(7).to({regX:385.7,regY:279.7,scaleX:12.9415,scaleY:12.9415,x:0.65,y:0},0).wait(65).to({regX:105.5,regY:217.5,scaleX:2.1999,scaleY:2.1999,x:-0.1,y:0.15},0).wait(115).to({regX:307.2,regY:243.2,scaleX:4.9735,scaleY:4.9735,x:-0.25,y:0},0).wait(97).to({regX:306.3,regY:226,scaleX:3.7932,scaleY:3.7932,x:0},0).wait(52).to({regX:212.5,regY:151.3,scaleX:2.0324,scaleY:2.0324,x:0.15},0).wait(32).to({regX:154.7,regY:105.3,scaleX:1.5809,scaleY:1.5809,x:0,y:-0.05},0).wait(30).to({regX:100.5,regY:62.3,scaleX:1.3083,scaleY:1.3083,x:-0.05,y:0},0).wait(29).to({regX:48.2,regY:20.6,scaleX:1.1215,scaleY:1.1215,x:0},0).wait(129));

	// woman_obj_
	this.woman = new lib.Scene_1_woman();
	this.woman.name = "woman";
	this.woman.depth = 0;
	this.woman.isAttachedToCamera = 0
	this.woman.isAttachedToMask = 0
	this.woman.layerDepth = 0
	this.woman.layerIndex = 11
	this.woman.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.woman).wait(145).to({regX:9.5,regY:5.3,scaleX:1.0151,scaleY:1.0151},0).wait(72).to({regX:208.3,regY:152.1,scaleX:2.0262,scaleY:2.0262,x:0.05,y:0.05},0).wait(38).to({regX:313.2,regY:229.6,scaleX:4.2711,scaleY:4.2711,x:-0.2,y:0.25},0).wait(1).to({regX:316.1,regY:231.6,scaleX:4.3993,scaleY:4.3993,x:0.25,y:0},0).wait(5).to({regX:329.8,regY:241.8,scaleX:5.1766,scaleY:5.1766,x:0.05,y:0.3},0).wait(37).to({regX:385.7,regY:279.7,scaleX:12.9415,scaleY:12.9415,x:0.65,y:0},0).wait(65).to({regX:105.5,regY:217.5,scaleX:2.1999,scaleY:2.1999,x:-0.1,y:0.15},0).wait(115).to({regX:307.2,regY:243.2,scaleX:4.9735,scaleY:4.9735,x:-0.25,y:0},0).wait(97).to({regX:306.3,regY:226,scaleX:3.7932,scaleY:3.7932,x:0},0).wait(114).to({regX:100.5,regY:62.3,scaleX:1.3083,scaleY:1.3083,x:-0.05},0).wait(11).to({regX:80.8,regY:46.5,scaleX:1.2305,scaleY:1.2305,x:0.1},0).wait(26).to({regX:33.8,regY:9.1,scaleX:1.0789,scaleY:1.0789,x:0},0).wait(17).to({regX:0,regY:0,scaleX:1,scaleY:1},0).wait(104));

	// backround_obj_
	this.backround = new lib.Scene_1_backround();
	this.backround.name = "backround";
	this.backround.depth = 0;
	this.backround.isAttachedToCamera = 0
	this.backround.isAttachedToMask = 0
	this.backround.layerDepth = 0
	this.backround.layerIndex = 12
	this.backround.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.backround).wait(145).to({regX:9.5,regY:5.3,scaleX:1.0151,scaleY:1.0151},0).wait(1).to({regX:12.3,regY:7.4,scaleX:1.0222,scaleY:1.0222},0).wait(1).to({regX:15.1,regY:9.4,scaleX:1.0294,scaleY:1.0294,x:0.05},0).wait(70).to({regX:208.3,regY:152.1,scaleX:2.0262,scaleY:2.0262,y:0.05},0).wait(81).to({regX:385.7,regY:279.7,scaleX:12.9415,scaleY:12.9415,x:0.65,y:0},0).wait(277).to({regX:306.3,regY:226,scaleX:3.7932,scaleY:3.7932,x:0},0).wait(114).to({regX:100.5,regY:62.3,scaleX:1.3083,scaleY:1.3083,x:-0.05},0).wait(55).to({regX:0,regY:0,scaleX:1,scaleY:1,x:0},0).wait(103));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(636,345.2,2937.6,1246.6);
// library properties:
lib.properties = {
	id: 'F5D4B7A2602EFA429D71A80F9BD2832F',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_18.png?1619177894786", id:"CachedBmp_18"},
		{src:"images/CachedBmp_17.png?1619177894786", id:"CachedBmp_17"},
		{src:"images/CachedBmp_12.png?1619177894786", id:"CachedBmp_12"},
		{src:"images/CachedBmp_16.png?1619177894786", id:"CachedBmp_16"},
		{src:"images/CachedBmp_8.png?1619177894786", id:"CachedBmp_8"},
		{src:"images/CachedBmp_7.png?1619177894787", id:"CachedBmp_7"},
		{src:"images/CachedBmp_6.png?1619177894787", id:"CachedBmp_6"},
		{src:"images/CachedBmp_20.png?1619177894787", id:"CachedBmp_20"},
		{src:"images/CachedBmp_5.png?1619177894787", id:"CachedBmp_5"},
		{src:"images/CachedBmp_4.png?1619177894787", id:"CachedBmp_4"},
		{src:"images/CachedBmp_3.png?1619177894787", id:"CachedBmp_3"},
		{src:"images/YOGAAA_atlas_1.png?1619177894498", id:"YOGAAA_atlas_1"},
		{src:"images/YOGAAA_atlas_2.png?1619177894498", id:"YOGAAA_atlas_2"},
		{src:"images/YOGAAA_atlas_3.png?1619177894499", id:"YOGAAA_atlas_3"},
		{src:"sounds/RelaxingMusicGuitarcut.mp3?1619177894787", id:"RelaxingMusicGuitarcut"},
		{src:"sounds/RelaxingMusicGuitarcutmp3copy.mp3?1619177894787", id:"RelaxingMusicGuitarcutmp3copy"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F5D4B7A2602EFA429D71A80F9BD2832F'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
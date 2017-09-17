

var oneKeySynth = {
	freq: 440,
	audioContext: undefined, 
	startSynth: function(){
		var startButton = document.getElementById('startButton');
		startButton.addEventListener('click', function(){
			console.log("synth started");
			oneKeySynth.startAudioContext();
		});
	},

	startAudioContext: function(){
		this.audioContext = new window.AudioContext();
		var myOsc = this.oscillator(this.freq, this.audioContext, 'square', this.audioContext.destination);
		var osc2 = this.oscillator(this.freq, this.audioContext, 'square', this.audioContext.destination);
		var osc3 = this.oscillator(this.freq, this.audioContext, 'square', this.audioContext.destination);
		var osc4 = this.oscillator(this.freq, this.audioContext, 'square', this.audioContext.destination);
		this.raiseTone(myOsc, 'freqDiv');
		this.raiseTone(myOsc, 'freqDiv2');
		this.raiseTone(myOsc, 'freqDiv3');
		this.raiseTone(myOsc, 'freqDiv4');
	},

	oscillator: function(freq, ctx, type, dest) {
		var osc = ctx.createOscillator();
		var gain = ctx.createGain();
		gain.gain.value = 0;
		osc.frequency.value = freq;
		osc.type = type;
		osc.connect(gain);
		gain.connect(dest);
		osc.start();
		this.startOscillator(gain);
		this.stopOscillator(gain);
		return osc;
	},

	stopOscillator: function(gainNode) {
		var stopButton = document.getElementById('stopButton');
		stopButton.addEventListener('click', function(){
			gainNode.gain.value = 0;
		});
	}, 

	startOscillator: function(gainNode) {
		var playButton = document.getElementById('playButton');
		playButton.addEventListener('click', function(){
			gainNode.gain.value = 0.10;
		})
	},

	raiseTone: function(osc, divId) {
		var freqPlus = document.getElementById('freq+');
		var freqDiv = document.getElementById(divId);
		freqDiv.addEventListener('click', function(){
			freqDiv.addEventListener('mousemove', function(mouseEvent){
				var freq = parseFloat('-' + mouseEvent.offsetY) + (140) ;
				var changedFreq = oneKeySynth.freq + freq;
				osc.frequency.value = changedFreq;
			})
		});
	}
}

oneKeySynth.startSynth();
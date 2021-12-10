import React, { useEffect, useState } from "react";

const useAudioRecorder = () => {
  const [detectAudio, setDetectAudio] = useState(false);

  console.log(detectAudio,"Audio")
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var analyser = null;
  var audioContext = null;
  var buflen = 2048;
  var rafID = null;
  var buf = new Float32Array(buflen);

  const getUserMedia = (dictionary, callback,errorCallBack) => {
    try {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      navigator.getUserMedia(dictionary, callback,errorCallBack);
    } catch (e) {
      alert("getUserMedia threw exception :" + e);
    }
  };

  function autoCorrelate(buf, sampleRate) {
    // Implements the ACF2+ algorithm
    var SIZE = buf.length;
    var rms = 0;

    for (var i = 0; i < SIZE; i++) {
      var val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01)
      // not enough signal
      return -1;

    var r1 = 0,
      r2 = SIZE - 1,
      thres = 0.2;
    for (var i = 0; i < SIZE / 2; i++)
      if (Math.abs(buf[i]) < thres) {
        r1 = i;
        break;
      }
    for (var i = 1; i < SIZE / 2; i++)
      if (Math.abs(buf[SIZE - i]) < thres) {
        r2 = SIZE - i;
        break;
      }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    var c = new Array(SIZE).fill(0);
    for (var i = 0; i < SIZE; i++)
      for (var j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i];

    var d = 0;
    while (c[d] > c[d + 1]) d++;
    var maxval = -1,
      maxpos = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    var T0 = maxpos;

    var x1 = c[T0 - 1],
      x2 = c[T0],
      x3 = c[T0 + 1];
   const  a = (x1 + x3 - 2 * x2) / 2;
   const  b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  }

  const updatePitch = (time) => {
    var cycles = new Array();
    analyser.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioContext.sampleRate);
    if (ac == -1) {
      setDetectAudio(false);
    } else {
      setDetectAudio(true);
    }

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	rafID = window.requestAnimationFrame( updatePitch );
  };

  const gotStream = (stream) => {
    // Create an AudioNode from the stream.
    audioContext = new AudioContext();
    const mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect it to the destination.
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.maxDecibels = 30;
    analyser.minDecibels = 0;


    mediaStreamSource.connect(analyser);
    updatePitch();
  };

  useEffect(() => {
    getUserMedia(
      {
        audio: {
          mandatory: {
            googEchoCancellation: "false",
            googAutoGainControl: "false",
            googNoiseSuppression: "false",
            googHighpassFilter: "false",
          },
          optional: [],
        },
      },
      gotStream,()=>{}
    );
  }, []);

  return {detectAudio}
};

export { useAudioRecorder };

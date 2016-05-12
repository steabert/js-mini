class RtspFormat {
  constructor () {
    this.el = {
      play: function (works) {
        if (!works) {
          console.log('on mobile, not playing');
          return Promise.reject();
        }
        else {
          console.log('on desktop, playing ball');
          return Promise.resolve();
        }
      }
    };
  }
  play (works) {
    const maybePlaying = this.el.play(works);
    if (maybePlaying && maybePlaying.then) {
      console.log('we have a promise!');
      return maybePlaying;
    }
  }
  waitForClick() {
    return new Promise((resolve, reject) => {
      console.log('listen for event')
      setTimeout(() => resolve('bam'), 5000);
    });
  }
}

function disableSpinner(arg) {
  console.log('disable spinner', arg);
}

function showPlayButton() {
  console.log('show Play button');
}

let instance = new RtspFormat();
instance.play(false)
.catch(() => {
  disableSpinner(', switch to play button');
  showPlayButton();
  return instance.waitForClick();
})
.then(disableSpinner.bind(this, 'final'));

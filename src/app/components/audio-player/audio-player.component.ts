import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Track } from '../../models/track';
import { AudioPlyerOptions } from '../../models/audio-plyer-options';

import { faPause, faPlay, faRandom, faStepBackward, faStepForward, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent extends AudioPlyerOptions implements OnInit {
    @Input() width;
    @Input() height;
    @Input() backgroundColor;
    @Input() audioTimeColor;
    @Input() audioTitleColor;
    @Input() volumeSliderColor;
    @Input() timeSliderColor;
    @Input() audioList: Track[] = [];
    @Input() indexWanted;
    @Input() next = true;
    @Input() previous = true;
    @Input() shuffle = true;
    @Input() repeat = true;
    @Input() scrollTitle = false;
    @Input() playButtonColor = "rgb(76, 130, 175)";
    @Input() pauseButtonColor = "rgb(76, 130, 175)";
    @Input() nextButtonColor = "rgb(76, 130, 175)";
    @Input() previousButtonColor = "rgb(76, 130, 175)";
    @Input() repeatButtonColor = "rgb(76, 130, 175)";
    @Input() activeRepeatButtonColor = "rgb(76, 130, 175)";
    @Input() volumeButtonColor = "rgb(76, 130, 175)";
    @Input() muteButtonColor = "rgb(76, 130, 175)";
    @Output() nextEvent = new EventEmitter();
    @Output() previousEvent = new EventEmitter();
    @Output() repeatEvent = new EventEmitter();
    @Output() shuffleEvent = new EventEmitter();
    @Output() seekEvent = new EventEmitter();

    faRandom = faRandom;
    faStepBackward = faStepBackward;
    faPlay = faPlay;
    faPause = faPause;
    faStepForward = faStepForward;
    faVolumeUp = faVolumeUp;
    faVolumeMute = faVolumeMute;

    selectedAudio;
    currentAudioIndex = 0;
    repeatActive = false;
    isError = false;
    isShuffle = false;
    volumeBeforeMute;

    constructor() {
        super();
    }

    ngOnInit() {
        this.options();
        // console.log(this.audioList);
        this.initiateAudioPlayer();
        //check audio is ended for next song
        this.isAudioEnded.subscribe(data => {
            if (!this.isRepeat && this.audioList.length > 0) {
                this.nextAudio();
            }
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        //this.doSomething(changes.categoryId.currentValue);
        // You can also use categoryId.previousValue and 
        // categoryId.firstChange for comparing old and new values
        if (this.indexWanted) {
            this.setCurrentAudioIndex();
        }
    }

    nextAudio() {
        if (this.audioList.length - 1 != this.currentAudioIndex) {
            this.currentAudioIndex += 1;
            this.selectedAudio = this.audioList[this.currentAudioIndex];
            this.getAudioLength();
            if (this.isAudioPlaying) {
                this.play();
            }
            this.nextEvent.emit();
        } else {
            this.pause();
        }
    }

    previousAudio() {
        if (this.currentAudioIndex != 0) {
            this.currentAudioIndex -= 1;
            this.selectedAudio = this.audioList[this.currentAudioIndex];
            this.getAudioLength();
            if (this.isAudioPlaying) {
                this.play();
            }
            this.previousEvent.emit();
        }
    }

    seekAudio(seekAudioValue) {
        if (this.audioVolume != 0) {
            this.isMute = false;
        }
        this.audioPlayer.nativeElement.currentTime = seekAudioValue.target.value;
        this.seekEvent.emit();
    }

    repeatAudio() {
        this.isRepeat = !this.isRepeat;
        this.repeatActive = !this.repeatActive;
        this.audioPlayer.nativeElement.loop = this.isRepeat;
        this.repeatEvent.emit();
    }

    /*   shuffleAudio() {
        this.isShuffle = !this.isShuffle;
        if (this.isShuffle) {
        let randomItem = Math.floor(Math.random() * this.audioList.length);
        console.log(randomItem);
        
        }
        this.shuffleEvent.emit();
      } */

    volumeChange(volume) {
        this.audioPlayer.nativeElement.volume = volume.target.value / 100;
    }

    muteAudio() {
        if (this.isMute) {
            this.audioPlayer.nativeElement.volume = 0.5;
            this.isMute = false;
        } else {
            this.audioPlayer.nativeElement.volume = 0;
            this.isMute = true;
        }
    }

    initiateAudioPlayer() {
        if (this.audioList.length <= 0) {
            this.isError = true;
        } else {
            this.selectedAudio = this.audioList[this.currentAudioIndex];
        }
    }

    setCurrentAudioIndex() {
        this.currentAudioIndex = this.indexWanted;
        this.selectedAudio = this.audioList[this.currentAudioIndex];
        if (this.isAudioPlaying) {
            this.play();
        }
    }
}

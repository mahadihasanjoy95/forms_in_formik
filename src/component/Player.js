import {Component} from "react";
import ReactPlayer from "react-player";

export default class Player extends Component {
    ref = player => {
        this.player = player
    }
    onReady = () => {
        const dash = this.player.getInternalPlayer('dash')
        console.log(dash.getXHRWithCredentialsForType('GET'))
    }

    render() {
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    volume={1}
                    controls={true}
                    playbackRate={1}
                    width="640px"
                    height="360px"
                    light="https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k"
                    ref={this.ref}
                    onReady={this.onReady}
                    url='http://192.168.2.130/output2/output/sample.mpd'
                    playing
                />
            </div>
        )
    }
}
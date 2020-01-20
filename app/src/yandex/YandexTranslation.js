import React, {Component} from 'react';
import axios from 'axios';
import TranslateForm from './TranslateForm';
import TranslateOutput from './TranslateOutput';
import {Container} from "react-bootstrap";
import ContextMenu from "./contextmenu";

const key = "trnsl.1.1.20200108T112402Z.673445eef91fd0a3.1291a50e00d5c50e78cbf0ce86d6af81cd6cd831";


class YandexTranslation extends Component {
    state = {
        output: '',
        yandexFormVisible: false
    };

    translate = (textToTranslate, language) => {
        axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key + '&lang=' + language + '&text=' + textToTranslate)
            .then((response) => {
                var output = response.data.text[0];
                this.setState({
                    ...this.state,
                    output: output
                });
            })
            .catch((error) =>
                console.log(error)
            );
    }

    showYandexForm = () => {
        this.setState({
            ...this.state,
            yandexFormVisible: true
        });
    }
    render() {
        return (
            <Container>
                <div id="that"><ContextMenu showYandexForm={this.showYandexForm}/></div>
                {this.state.yandexFormVisible ? <TranslateForm translate={this.translate}/> : <div></div>}
                {this.state.yandexFormVisible ? <TranslateOutput output={this.state.output}/> : <div></div>}
            </Container>
        );
    }
}

export default YandexTranslation;

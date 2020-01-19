import React, {Component} from 'react'

class RecruiterCheckTestView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {

        await this.setState({data: this.props.location.state.data})

        console.log(this.state.data)

    }

    // Wczytanie wszystkich danych
    // wyswietlenie obok siebie
    // jestli sugerowana odp to tez podac
    // punktacja 0,1,2

    //podsumowac i odesłac 75% zalicza elo

    render(){
        return(
        <div>
            <h1>
                Tutaj bedzie sprawdzane
            </h1>
        </div>
        )
    }
}

export default RecruiterCheckTestView;
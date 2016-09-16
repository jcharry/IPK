import React from 'react';

/**
 * Card component represents an expandable card \n
 * Must be used inside CardList
 * @extends {React.Component})
*/
class Card extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @prop {object} styles - style object representing height and width
         */
        this.styles = {
            //backgroundImage: 'url('+this.props.imgSrc+')',
            height: '30vh',
            width: '50%',
            //backgroundColor: 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')',
        };
    }

    /**
     * Handler for click on card itself.\n
     * Only fires when card is in 'closed' state
     * @param {SyntheticEvent} e
    */
    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onCardClick(this.props.id);
    }

    /**
     * Fired when close button is clicked.
     * @param {SyntheticEvent} e
    */
    handleCloseButton(e) {
        e.stopPropagation();
        this.props.onCardClick(null);
    }

    /**
     * Fires parent goToMap function \n
     * Which redirects the app to the #map page
     * @param {SyntheticEvent} e
    */
    goToMap(e) {
        e.stopPropagation();
        this.props.goToMap(this.props.id);
    }

    render() {
        var { cardTitle, cardContent, imgSrc, selected, posId } = this.props;
        imgSrc = imgSrc || '';

        var pos = {
            left: (posId % 2) * window.innerWidth/2 + 'px',
            top: posId % 2 == 0 ? '0px' : window.innerHeight*0.3 * (posId - 1) + 'px'
        };

        if (selected) {
            this.styles = {
                ...this.styles,
                width: '100%',
                height: '100vh',
                position: 'fixed',
                zIndex: '10',
                top: '0px',
                left: '0px',
                //backgroundColor: 'purple'
            };
        } else {
            this.styles = {
                ...this.styles,
                width: '50%',
                position: 'relative',
                height: '30vh',
                zIndex: '0',
                //backgroundColor: 'transparent'
            };
        }

        var selectClasses = () => {
            return selected ? 'card' : 'card card-hover';
        };

        var renderButtons = () => {
            if (selected) {
                return (
                    <div className='card-content column'>
                        <p>{cardContent}</p>
                        <div className='row'>
                            <button className='card-close-btn' onClick={this.handleCloseButton.bind(this)} >x</button>
                            <button onClick={this.goToMap.bind(this)}>View Projects</button>
                        </div>
                    </div>
                );
            }
        };
        return (
            <div style={this.styles} className={selectClasses()} ref={(c) => {this._elt = c;}} onClick={this.handleClick.bind(this)}>
                <h1 className='card-text'>{capitalizeFirstLetter(cardTitle)}</h1>
                {renderButtons()}
            </div>
        );
    }
}

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};


export default Card;

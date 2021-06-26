import React from "react";
import {  
    Modal, 
    Header,
    Icon,
    Button
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


class Result extends React.Component {
    
    redirect = () => {
        window.location.reload();
    }

    render() {
        const { redirect } = this;

        const { 
            accuracy, 
            playerName 
        } = this.props;

        return (
            <Modal 
                basic
                onClose={() => redirect()}
                size="small"
                open={true} 
            >
                <Header icon>
                    <Icon name="trophy" />
                    {accuracy}%
                </Header>
                <Modal.Content>
                    
                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>
            </Modal>
        )
    }
}

export default Result;
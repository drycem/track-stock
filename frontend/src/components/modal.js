import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };

    render() {
         const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Urun</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="code">Urun Kodu</Label>
                            <Input 
                            type="text" 
                            name="code"
                            value={this.state.activeItem.code}
                            onChange={this.handleChange}
                            placeholder="Urun kodu..."
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Kaydet
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
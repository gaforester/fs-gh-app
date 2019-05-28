import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "75%"
    }
};

Modal.setAppElement('#root')

const ModalView = (props) => {
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Issue Detail"
        >
            <h2>Issue Detail <button type="button" className="close"
                                     aria-label="Close"
                                     onClick={props.closeModal}>
                <span aria-hidden="true">&times;</span>
            </button></h2>
            <dl className="row">
                <dt className="col-sm-3">Issue Number</dt>
                <dd className="col-sm-9">{props.rowinfo.number || "N/A"}</dd>
                <dt className="col-sm-3">Title</dt>
                <dd className="col-sm-9">{props.rowinfo.title || "N/A"}</dd>
                <dt className="col-sm-3 text-truncate">Description</dt>
                <dd className="col-sm-9"> {props.rowinfo.body || "N/A"}</dd>
                <dt className="col-sm-3">Created Date</dt>
                <dd className="col-sm-9"> {props.rowinfo.created_at || "N/A"}</dd>
                <dt className="col-sm-3">Updated Date</dt>
                <dd className="col-sm-9"> {props.rowinfo.updated_at || "N/A"}</dd> 
                <dt className="col-sm-3">Issue Url</dt>
                <dd className="col-sm-9"><a href={props.rowinfo.html_url}>{props.rowinfo.html_url}</a></dd>
                <dt className="col-sm-3">Repo Url</dt>
                <dd className="col-sm-9"><a href={props.rowinfo.repository_url}>{props.rowinfo.repository_url}</a></dd>
                <dt className="col-sm-3">Reporter</dt>
                <dd className="col-sm-9"> {props.rowinfo.user.login || "N/A"} / {props.rowinfo.email || "N/A"}</dd>
                <dt className="col-sm-3">Assignee</dt>
                <dd className="col-sm-9"> {props.rowinfo.assignee.login || "N/A"}</dd>
                <dt className="col-sm-3">Status</dt>
                <dd className="col-sm-9"> {props.rowinfo.state || "N/A"}</dd>
                <dt className="col-sm-3">Repo Url</dt>
                <dd className="col-sm-9"><a href={props.rowinfo.fsSessionUrl}>Latest Fullstory Session</a></dd>
            </dl>
        </Modal>)
}

export default ModalView;

